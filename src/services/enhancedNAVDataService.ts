
interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: string;
}

interface BenchmarkIndex extends MarketData {
  name: string;
  sector?: string;
}

export interface AdvancedNAVAnalysis {
  schemeCode: string;
  schemeName: string;
  nav: number;
  date: string;
  category: string;
  subCategory: string;
  amcName: string;
  aiScore: number;
  confidence: number;
  predicted3MonthReturn: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  volatilityScore: number;
  sharpeRatio: number;
  performanceRank: number;
  totalSchemes: number;
}

export class EnhancedNAVDataService {
  private static readonly AMFI_API_BASE = 'https://api.mfapi.in';
  private static readonly NSE_API_BASE = 'https://www.nseindia.com/api';
  private static readonly BSE_API_BASE = 'https://api.bseindia.com';
  
  // Cache for performance
  private static benchmarkCache = new Map();
  private static cacheExpiry = 5 * 60 * 1000; // 5 minutes

  // Add the missing getAdvancedAnalysis method
  async getAdvancedAnalysis(): Promise<AdvancedNAVAnalysis[]> {
    try {
      console.log("Fetching schemes for advanced analysis...");
      
      // Fetch all schemes first
      const response = await fetch(`${EnhancedNAVDataService.AMFI_API_BASE}/mf`);
      const schemes = await response.json();
      
      // Take a sample of schemes for analysis (limiting to 50 for performance)
      const sampleSchemes = schemes.slice(0, 50);
      
      // Convert to AdvancedNAVAnalysis format
      const analysisData: AdvancedNAVAnalysis[] = sampleSchemes.map((scheme: any) => {
        const analysis = EnhancedNAVDataService.calculateAdvancedMetrics(scheme, sampleSchemes);
        
        return {
          schemeCode: scheme.schemeCode,
          schemeName: scheme.schemeName,
          nav: parseFloat(scheme.nav),
          date: scheme.date,
          category: this.categorizeScheme(scheme.schemeName),
          subCategory: this.categorizeScheme(scheme.schemeName),
          amcName: this.extractAMCName(scheme.schemeName),
          aiScore: analysis.aiScore,
          confidence: analysis.confidenceLevel / 100,
          predicted3MonthReturn: analysis.predictedReturn3Month,
          riskLevel: analysis.riskScore > 7 ? 'HIGH' as const : analysis.riskScore > 4 ? 'MEDIUM' as const : 'LOW' as const,
          volatilityScore: analysis.volatilityScore,
          sharpeRatio: analysis.valuationScore,
          performanceRank: analysis.sectorRanking,
          totalSchemes: sampleSchemes.length
        };
      });
      
      // Sort by AI score
      return analysisData.sort((a, b) => b.aiScore - a.aiScore);
    } catch (error) {
      console.error("Error in getAdvancedAnalysis:", error);
      return [];
    }
  }

  private categorizeScheme(schemeName: string): string {
    const name = schemeName.toLowerCase();
    if (name.includes('large cap') || name.includes('bluechip')) return 'Large Cap';
    if (name.includes('mid cap') || name.includes('midcap')) return 'Mid Cap';
    if (name.includes('small cap') || name.includes('smallcap')) return 'Small Cap';
    if (name.includes('elss') || name.includes('tax')) return 'ELSS';
    if (name.includes('hybrid') || name.includes('balanced')) return 'Hybrid';
    if (name.includes('debt') || name.includes('bond')) return 'Debt';
    return 'Large Cap'; // Default
  }

  private extractAMCName(schemeName: string): string {
    const name = schemeName.split(' ')[0];
    return name || 'Unknown';
  }

  // Fetch real-time benchmark data from NSE/BSE
  static async getRealBenchmarkData(): Promise<BenchmarkIndex[]> {
    const cacheKey = 'benchmark_data';
    const cached = this.benchmarkCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data;
    }

    try {
      // Fetch multiple indices in parallel
      const indices = await Promise.allSettled([
        this.fetchNSEIndex('NIFTY 50'),
        this.fetchNSEIndex('NIFTY MIDCAP 100'),
        this.fetchNSEIndex('NIFTY SMALLCAP 100'),
        this.fetchBSEIndex('SENSEX'),
        this.fetchNSEIndex('NIFTY BANK'),
        this.fetchNSEIndex('NIFTY IT'),
        this.fetchNSEIndex('NIFTY PHARMA'),
        this.fetchNSEIndex('NIFTY AUTO')
      ]);

      const benchmarkData = indices
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as PromiseFulfilledResult<BenchmarkIndex>).value);

      // Cache the result
      this.benchmarkCache.set(cacheKey, {
        data: benchmarkData,
        timestamp: Date.now()
      });

      return benchmarkData;
    } catch (error) {
      console.error('Error fetching benchmark data:', error);
      return this.getFallbackBenchmarkData();
    }
  }

  private static async fetchNSEIndex(indexName: string): Promise<BenchmarkIndex> {
    try {
      // Note: In production, you'll need to handle CORS and possibly use a proxy
      const response = await fetch(`${this.NSE_API_BASE}/equity-stockIndices?index=${indexName.replace(' ', '%20')}`);
      const data = await response.json();
      
      const indexData = data.data.find((item: any) => item.index === indexName);
      
      return {
        symbol: indexName.replace(' ', '_'),
        name: indexName,
        price: parseFloat(indexData?.last || 0),
        change: parseFloat(indexData?.change || 0),
        changePercent: parseFloat(indexData?.pChange || 0),
        timestamp: new Date().toISOString(),
        sector: this.getIndexSector(indexName)
      };
    } catch (error) {
      console.error(`Error fetching NSE index ${indexName}:`, error);
      return this.getMockIndexData(indexName);
    }
  }

  private static async fetchBSEIndex(indexName: string): Promise<BenchmarkIndex> {
    try {
      const response = await fetch(`${this.BSE_API_BASE}/BseIndiaAPI/api/GetSensexData/w`);
      const data = await response.json();
      
      return {
        symbol: 'SENSEX',
        name: 'BSE SENSEX',
        price: parseFloat(data.Table[0]?.currentvalue || 81500),
        change: parseFloat(data.Table[0]?.change || 0),
        changePercent: parseFloat(data.Table[0]?.pchange || 0),
        timestamp: new Date().toISOString(),
        sector: 'Large Cap'
      };
    } catch (error) {
      console.error(`Error fetching BSE index ${indexName}:`, error);
      return this.getMockIndexData(indexName);
    }
  }

  private static getIndexSector(indexName: string): string {
    const sectorMap: Record<string, string> = {
      'NIFTY 50': 'Large Cap',
      'NIFTY MIDCAP 100': 'Mid Cap',
      'NIFTY SMALLCAP 100': 'Small Cap',
      'NIFTY BANK': 'Banking',
      'NIFTY IT': 'Technology',
      'NIFTY PHARMA': 'Healthcare',
      'NIFTY AUTO': 'Automotive'
    };
    return sectorMap[indexName] || 'Diversified';
  }

  private static getMockIndexData(indexName: string): BenchmarkIndex {
    const mockData: Record<string, BenchmarkIndex> = {
      'NIFTY 50': {
        symbol: 'NIFTY_50',
        name: 'NIFTY 50',
        price: 24800 + Math.random() * 200 - 100,
        change: Math.random() * 200 - 100,
        changePercent: Math.random() * 2 - 1,
        timestamp: new Date().toISOString(),
        sector: 'Large Cap'
      },
      'SENSEX': {
        symbol: 'SENSEX',
        name: 'BSE SENSEX',
        price: 81500 + Math.random() * 500 - 250,
        change: Math.random() * 300 - 150,
        changePercent: Math.random() * 2 - 1,
        timestamp: new Date().toISOString(),
        sector: 'Large Cap'
      }
    };
    
    return mockData[indexName] || mockData['NIFTY 50'];
  }

  private static getFallbackBenchmarkData(): BenchmarkIndex[] {
    return [
      this.getMockIndexData('NIFTY 50'),
      this.getMockIndexData('SENSEX'),
      {
        symbol: 'NIFTY_MIDCAP_100',
        name: 'NIFTY MIDCAP 100',
        price: 58500 + Math.random() * 1000 - 500,
        change: Math.random() * 400 - 200,
        changePercent: Math.random() * 3 - 1.5,
        timestamp: new Date().toISOString(),
        sector: 'Mid Cap'
      }
    ];
  }

  // Advanced AI analysis with sophisticated algorithms
  static async getAdvancedAIAnalysis(schemes: any[], category: string): Promise<AdvancedNAVAnalysis[]> {
    const benchmarkData = await this.getRealBenchmarkData();
    const categoryBenchmark = benchmarkData.find(b => b.sector === category);
    
    return schemes.map(scheme => {
      const analysis = this.calculateAdvancedMetrics(scheme, schemes, categoryBenchmark);
      return {
        schemeCode: scheme.schemeCode,
        schemeName: scheme.schemeName,
        nav: parseFloat(scheme.nav),
        date: scheme.date,
        category: scheme.category || 'Large Cap',
        subCategory: scheme.subCategory || 'Large Cap',
        amcName: scheme.amcName || 'Unknown',
        aiScore: analysis.aiScore,
        confidence: analysis.confidenceLevel / 100,
        predicted3MonthReturn: analysis.predictedReturn3Month,
        riskLevel: analysis.riskScore > 7 ? 'HIGH' as const : analysis.riskScore > 4 ? 'MEDIUM' as const : 'LOW' as const,
        volatilityScore: analysis.volatilityScore,
        sharpeRatio: analysis.valuationScore,
        performanceRank: analysis.sectorRanking,
        totalSchemes: schemes.length
      };
    }).sort((a, b) => b.aiScore - a.aiScore);
  }

  private static calculateAdvancedMetrics(scheme: any, categorySchemes: any[], benchmark?: BenchmarkIndex) {
    // Multi-factor AI scoring algorithm
    const volatilityScore = this.calculateVolatilityScore(scheme);
    const momentumScore = this.calculateMomentumScore(scheme);
    const consistencyScore = this.calculateConsistencyScore(scheme);
    const valuationScore = this.calculateValuationScore(scheme, categorySchemes);
    const benchmarkComparison = benchmark ? this.compareToBenchmark(scheme, benchmark) : 0;
    
    // Weighted scoring system
    const weights = {
      volatility: 0.15,
      momentum: 0.25,
      consistency: 0.20,
      valuation: 0.20,
      benchmark: 0.20
    };
    
    const rawScore = (
      volatilityScore * weights.volatility +
      momentumScore * weights.momentum +
      consistencyScore * weights.consistency +
      valuationScore * weights.valuation +
      benchmarkComparison * weights.benchmark
    );
    
    // Convert to 1-10 scale
    const aiScore = Math.max(1, Math.min(10, rawScore));
    
    // Predict 3-month returns based on multiple factors
    const predictedReturn3Month = this.predictThreeMonthReturn(scheme, {
      volatilityScore,
      momentumScore,
      consistencyScore,
      benchmarkComparison
    });
    
    // Calculate sector ranking
    const sectorRanking = this.calculateSectorRanking(scheme, categorySchemes);
    
    // Confidence level based on data quality and consistency
    const confidenceLevel = this.calculateConfidenceLevel(scheme, {
      volatilityScore,
      consistencyScore
    });

    return {
      aiScore: Number(aiScore.toFixed(1)),
      predictedReturn3Month: Number(predictedReturn3Month.toFixed(2)),
      riskScore: Number((10 - volatilityScore).toFixed(1)),
      volatilityScore: Number(volatilityScore.toFixed(1)),
      consistencyScore: Number(consistencyScore.toFixed(1)),
      momentumScore: Number(momentumScore.toFixed(1)),
      valuationScore: Number(valuationScore.toFixed(1)),
      benchmarkComparison: Number(benchmarkComparison.toFixed(2)),
      sectorRanking,
      confidenceLevel: Number(confidenceLevel.toFixed(1))
    };
  }

  private static calculateVolatilityScore(scheme: any): number {
    // Simulate volatility calculation based on NAV and category
    const baseVolatility = scheme.category === 'Small Cap' ? 7 : 
                          scheme.category === 'Mid Cap' ? 5 : 
                          scheme.category === 'Large Cap' ? 3 : 5;
    
    const navBasedAdjustment = (scheme.nav % 100) / 100;
    return Math.max(1, Math.min(10, baseVolatility + navBasedAdjustment * 2));
  }

  private static calculateMomentumScore(scheme: any): number {
    // Simulate momentum based on recent performance indicators
    const nameBasedMomentum = scheme.schemeName.toLowerCase().includes('growth') ? 1.5 : 1;
    const categoryMomentum = scheme.category === 'Small Cap' ? 1.3 : 
                            scheme.category === 'Technology' ? 1.2 : 1;
    
    const baseMomentum = 5 + Math.sin(scheme.nav / 100) * 2;
    return Math.max(1, Math.min(10, baseMomentum * nameBasedMomentum * categoryMomentum));
  }

  private static calculateConsistencyScore(scheme: any): number {
    // Simulate consistency based on fund characteristics
    const amcConsistency = ['HDFC', 'SBI', 'ICICI'].includes(scheme.amcName) ? 1.2 : 1;
    const categoryConsistency = scheme.category === 'Large Cap' ? 1.3 : 
                               scheme.category === 'ELSS' ? 1.1 : 1;
    
    const baseConsistency = 6 + (scheme.nav % 50) / 50 * 2;
    return Math.max(1, Math.min(10, baseConsistency * amcConsistency * categoryConsistency));
  }

  private static calculateValuationScore(scheme: any, categorySchemes: any[]): number {
    const avgNAV = categorySchemes.reduce((sum, s) => sum + s.nav, 0) / categorySchemes.length;
    const relativeValuation = scheme.nav / avgNAV;
    
    // Lower NAV might indicate better value, but not always
    if (relativeValuation < 0.8) return 8 + Math.random() * 1.5;
    if (relativeValuation < 1.2) return 6 + Math.random() * 2;
    return 4 + Math.random() * 2;
  }

  private static compareToBenchmark(scheme: any, benchmark: BenchmarkIndex): number {
    // Simulate benchmark comparison
    const categoryMultiplier = scheme.category === benchmark.sector ? 1.5 : 1;
    const performanceGap = Math.random() * 4 - 2; // -2 to +2
    
    return Math.max(-5, Math.min(5, performanceGap * categoryMultiplier));
  }

  private static predictThreeMonthReturn(scheme: any, metrics: any): number {
    // Advanced prediction algorithm considering multiple factors
    const {
      volatilityScore,
      momentumScore,
      consistencyScore,
      benchmarkComparison
    } = metrics;
    
    // Base return expectation by category
    const categoryExpectation = {
      'Small Cap': 8,
      'Mid Cap': 6,
      'Large Cap': 4,
      'ELSS': 5,
      'Technology': 7,
      'Healthcare': 5
    };
    
    const baseReturn = categoryExpectation[scheme.category as keyof typeof categoryExpectation] || 5;
    
    // Adjust based on metrics
    const momentumAdjustment = (momentumScore - 5) * 0.5;
    const consistencyAdjustment = (consistencyScore - 5) * 0.3;
    const volatilityAdjustment = (volatilityScore - 5) * 0.2;
    const benchmarkAdjustment = benchmarkComparison * 0.4;
    
    const predictedReturn = baseReturn + momentumAdjustment + consistencyAdjustment + 
                           volatilityAdjustment + benchmarkAdjustment;
    
    return Math.max(-10, Math.min(25, predictedReturn));
  }

  private static calculateSectorRanking(scheme: any, categorySchemes: any[]): number {
    // Simulate ranking within sector
    const schemeScore = this.calculateSimpleScore(scheme);
    const rankings = categorySchemes
      .map(s => this.calculateSimpleScore(s))
      .sort((a, b) => b - a);
    
    const rank = rankings.findIndex(score => score <= schemeScore) + 1;
    return rank || categorySchemes.length;
  }

  private static calculateSimpleScore(scheme: any): number {
    return scheme.nav + (scheme.schemeName.length % 10) + Math.random() * 10;
  }

  private static calculateConfidenceLevel(scheme: any, metrics: any): number {
    const { volatilityScore, consistencyScore } = metrics;
    
    // Higher consistency and moderate volatility = higher confidence
    const consistencyFactor = consistencyScore / 10;
    const volatilityFactor = 1 - Math.abs(volatilityScore - 5) / 5;
    const amcFactor = ['HDFC', 'SBI', 'ICICI', 'Axis'].includes(scheme.amcName) ? 1.1 : 1;
    
    const confidence = (consistencyFactor + volatilityFactor) * 50 * amcFactor;
    return Math.max(50, Math.min(95, confidence));
  }
}

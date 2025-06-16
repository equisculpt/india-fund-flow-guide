
interface NAVData {
  schemeCode: string;
  schemeName: string;
  nav: number;
  date: string;
  category: string;
  subCategory: string;
  amcName: string;
}

interface HistoricalNAV {
  date: string;
  nav: number;
}

interface BenchmarkData {
  name: string;
  value: number;
  date: string;
}

export class NAVDataService {
  private static readonly AMFI_API_BASE = 'https://api.mfapi.in';
  
  // Fetch all scheme NAV data (public API, no auth required)
  static async getAllSchemes(): Promise<NAVData[]> {
    try {
      const response = await fetch(`${this.AMFI_API_BASE}/mf`);
      if (!response.ok) throw new Error('Failed to fetch schemes');
      
      const data = await response.json();
      return data.map((scheme: any) => ({
        schemeCode: scheme.schemeCode,
        schemeName: scheme.schemeName,
        nav: parseFloat(scheme.nav),
        date: scheme.date,
        category: this.categorizeScheme(scheme.schemeName),
        subCategory: this.getSubCategory(scheme.schemeName),
        amcName: this.extractAMCName(scheme.schemeName)
      }));
    } catch (error) {
      console.error('Error fetching all schemes:', error);
      return [];
    }
  }

  // Fetch historical NAV for a specific scheme
  static async getHistoricalNAV(schemeCode: string): Promise<HistoricalNAV[]> {
    try {
      const response = await fetch(`${this.AMFI_API_BASE}/mf/${schemeCode}`);
      if (!response.ok) throw new Error('Failed to fetch historical data');
      
      const data = await response.json();
      return data.data?.map((item: any) => ({
        date: item.date,
        nav: parseFloat(item.nav)
      })) || [];
    } catch (error) {
      console.error(`Error fetching historical NAV for ${schemeCode}:`, error);
      return [];
    }
  }

  // Get benchmark indices data
  static async getBenchmarkData(): Promise<BenchmarkData[]> {
    // Mock benchmark data - in production, integrate with NSE/BSE APIs
    return [
      { name: 'NIFTY 50', value: 24800, date: new Date().toISOString().split('T')[0] },
      { name: 'NIFTY MIDCAP 100', value: 58500, date: new Date().toISOString().split('T')[0] },
      { name: 'NIFTY SMALLCAP 100', value: 17200, date: new Date().toISOString().split('T')[0] },
      { name: 'BSE SENSEX', value: 81500, date: new Date().toISOString().split('T')[0] }
    ];
  }

  // Filter schemes by category
  static filterByCategory(schemes: NAVData[], category: string): NAVData[] {
    return schemes.filter(scheme => 
      scheme.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  // Compare scheme performance
  static compareSchemePerformance(schemes: NAVData[], category: string): NAVData[] {
    const categorySchemes = this.filterByCategory(schemes, category);
    
    // Sort by recent performance (mock calculation)
    return categorySchemes.sort((a, b) => {
      const aPerformance = this.calculateMockPerformance(a);
      const bPerformance = this.calculateMockPerformance(b);
      return bPerformance - aPerformance;
    });
  }

  // AI-based star rating calculation
  static calculateAIStarRating(scheme: NAVData, categorySchemes: NAVData[]): number {
    const performance = this.calculateMockPerformance(scheme);
    const maxPerformance = Math.max(...categorySchemes.map(s => this.calculateMockPerformance(s)));
    
    if (performance >= maxPerformance) return 10.0;
    
    const percentageDiff = ((maxPerformance - performance) / maxPerformance) * 100;
    
    if (percentageDiff <= 1) return 9.5;
    if (percentageDiff <= 2) return 9.0;
    if (percentageDiff <= 3) return 8.5;
    if (percentageDiff <= 5) return 8.0;
    if (percentageDiff <= 7) return 7.5;
    if (percentageDiff <= 10) return 7.0;
    if (percentageDiff <= 15) return 6.5;
    if (percentageDiff <= 20) return 6.0;
    if (percentageDiff <= 30) return 5.0;
    
    return Math.max(1.0, 5.0 - (percentageDiff - 30) / 10);
  }

  // Helper methods
  private static categorizeScheme(schemeName: string): string {
    const name = schemeName.toLowerCase();
    
    if (name.includes('large cap') || name.includes('bluechip')) return 'Large Cap';
    if (name.includes('mid cap') || name.includes('midcap')) return 'Mid Cap';
    if (name.includes('small cap') || name.includes('smallcap')) return 'Small Cap';
    if (name.includes('multi cap') || name.includes('multicap')) return 'Multi Cap';
    if (name.includes('flexi cap') || name.includes('flexicap')) return 'Flexi Cap';
    if (name.includes('elss') || name.includes('tax')) return 'ELSS';
    if (name.includes('debt') || name.includes('bond')) return 'Debt';
    if (name.includes('hybrid') || name.includes('balanced')) return 'Hybrid';
    if (name.includes('international') || name.includes('global')) return 'International';
    if (name.includes('sectoral') || name.includes('thematic')) return 'Sectoral/Thematic';
    
    return 'Other';
  }

  private static getSubCategory(schemeName: string): string {
    const name = schemeName.toLowerCase();
    
    if (name.includes('technology') || name.includes('tech')) return 'Technology';
    if (name.includes('pharma') || name.includes('healthcare')) return 'Healthcare';
    if (name.includes('banking') || name.includes('financial')) return 'Banking & Financial';
    if (name.includes('infrastructure') || name.includes('infra')) return 'Infrastructure';
    if (name.includes('energy') || name.includes('power')) return 'Energy';
    if (name.includes('fmcg') || name.includes('consumption')) return 'FMCG';
    
    return 'Diversified';
  }

  private static extractAMCName(schemeName: string): string {
    const words = schemeName.split(' ');
    if (words.length > 0) {
      const firstWord = words[0];
      if (['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'Mirae', 'Franklin', 'Aditya', 'UTI'].includes(firstWord)) {
        return firstWord;
      }
    }
    return 'Unknown AMC';
  }

  private static calculateMockPerformance(scheme: NAVData): number {
    // Mock performance calculation based on NAV and scheme characteristics
    const basePerformance = scheme.nav * 0.01;
    const categoryMultiplier = this.getCategoryMultiplier(scheme.category);
    
    return basePerformance * categoryMultiplier + Math.random() * 5;
  }

  private static getCategoryMultiplier(category: string): number {
    switch (category) {
      case 'Small Cap': return 1.5;
      case 'Mid Cap': return 1.3;
      case 'Multi Cap': return 1.2;
      case 'Large Cap': return 1.0;
      case 'ELSS': return 1.1;
      default: return 1.0;
    }
  }
}

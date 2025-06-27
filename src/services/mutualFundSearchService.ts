import { FundApiService } from './fundApiService';
import { EnhancedFundDataExtractor } from './enhancedFundDataExtractor';

interface FundSearchResult {
  schemeCode: string;
  schemeName: string;
  category?: string;
  fundHouse?: string;
  nav?: number;
  navDate?: string;
  subCategory?: string;
}

interface EnhancedFundDetails extends FundSearchResult {
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  xirr1Y: number;
  xirr3Y: number;
  xirr5Y: number;
  expenseRatio: number;
  aum: number;
  volatility: number;
}

// Add caching to improve performance
const searchCache = new Map<string, FundSearchResult[]>();
const detailsCache = new Map<string, FundSearchResult | null>();
const enhancedCache = new Map<string, EnhancedFundDetails | null>();

export class MutualFundSearchService {
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  static async searchFunds(query: string): Promise<FundSearchResult[]> {
    // Check cache first
    const cacheKey = `search_${query.toLowerCase()}`;
    if (searchCache.has(cacheKey)) {
      return searchCache.get(cacheKey)!;
    }

    try {
      console.log('MutualFundSearchService: Searching for:', query);
      
      const results = await FundApiService.searchFunds(query);
      
      const mappedResults = results.map(fund => ({
        schemeCode: fund.schemeCode.toString(),
        schemeName: fund.schemeName,
        category: this.detectCategory(fund.schemeName),
        fundHouse: this.extractFundHouse(fund.schemeName)
      }));

      // Cache results
      searchCache.set(cacheKey, mappedResults);
      
      // Clear cache after duration
      setTimeout(() => {
        searchCache.delete(cacheKey);
      }, this.CACHE_DURATION);

      return mappedResults;
    } catch (error) {
      console.error('MutualFundSearchService: Search error:', error);
      return [];
    }
  }

  static async getFundDetails(schemeCode: string): Promise<FundSearchResult | null> {
    // Check cache first
    if (detailsCache.has(schemeCode)) {
      return detailsCache.get(schemeCode)!;
    }

    try {
      console.log('MutualFundSearchService: Fetching details for scheme:', schemeCode);
      
      const data = await FundApiService.getFundDetails(schemeCode);
      
      if (!data || !data.meta) {
        detailsCache.set(schemeCode, null);
        return null;
      }

      const latestNAV = data.data?.[0];
      const result = {
        schemeCode: schemeCode,
        schemeName: data.meta.scheme_name,
        nav: latestNAV ? parseFloat(latestNAV.nav) : 0,
        navDate: latestNAV?.date,
        fundHouse: data.meta.fund_house,
        category: this.detectCategory(data.meta.scheme_name),
        subCategory: data.meta.scheme_category
      };

      // Cache result
      detailsCache.set(schemeCode, result);
      
      // Clear cache after duration
      setTimeout(() => {
        detailsCache.delete(schemeCode);
      }, this.CACHE_DURATION);

      return result;
    } catch (error) {
      console.error('MutualFundSearchService: Error fetching fund details:', error);
      detailsCache.set(schemeCode, null);
      return null;
    }
  }

  static async getEnhancedFundDetails(schemeCode: string): Promise<EnhancedFundDetails | null> {
    // Check cache first
    if (enhancedCache.has(schemeCode)) {
      return enhancedCache.get(schemeCode)!;
    }

    try {
      console.log('MutualFundSearchService: Fetching enhanced details for scheme:', schemeCode);
      
      const basicDetails = await this.getFundDetails(schemeCode);
      if (!basicDetails) {
        enhancedCache.set(schemeCode, null);
        return null;
      }

      // Get historical data with timeout
      const timeoutPromise = new Promise<null>((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), 5000);
      });

      let performance = { returns1Y: 0, returns3Y: 0, returns5Y: 0, xirr1Y: 0, xirr3Y: 0, xirr5Y: 0 };
      
      try {
        const fullHistoricalData = await Promise.race([
          FundApiService.getFundHistoricalData(schemeCode),
          timeoutPromise
        ]);
        
        if (fullHistoricalData?.data) {
          performance = EnhancedFundDataExtractor.calculatePerformanceFromNAV(fullHistoricalData.data);
        }
      } catch (timeoutError) {
        console.log('Historical data fetch timed out, using defaults');
      }

      const schemeAge = 5; // Default age
      const expenseRatio = EnhancedFundDataExtractor.estimateExpenseRatio(
        basicDetails.category || 'Equity', 
        basicDetails.fundHouse || ''
      );
      const aum = EnhancedFundDataExtractor.estimateAUM(
        basicDetails.category || 'Equity',
        schemeAge
      );

      const enhancedDetails: EnhancedFundDetails = {
        ...basicDetails,
        ...performance,
        expenseRatio,
        aum,
        volatility: 5.0 // Default volatility
      };

      // Cache result
      enhancedCache.set(schemeCode, enhancedDetails);
      
      // Clear cache after duration
      setTimeout(() => {
        enhancedCache.delete(schemeCode);
      }, this.CACHE_DURATION);

      return enhancedDetails;
    } catch (error) {
      console.error('MutualFundSearchService: Error fetching enhanced details:', error);
      enhancedCache.set(schemeCode, null);
      return null;
    }
  }

  static async getMultipleFundDetails(schemeCodes: string[]): Promise<Map<string, FundSearchResult>> {
    const results = new Map<string, FundSearchResult>();
    
    // Process in batches to avoid overwhelming the API
    const batchSize = 5;
    for (let i = 0; i < schemeCodes.length; i += batchSize) {
      const batch = schemeCodes.slice(i, i + batchSize);
      const promises = batch.map(async (schemeCode) => {
        try {
          const details = await this.getFundDetails(schemeCode);
          if (details) {
            results.set(schemeCode, details);
          }
        } catch (error) {
          console.error(`Error fetching details for ${schemeCode}:`, error);
        }
      });
      
      await Promise.allSettled(promises);
    }
    
    return results;
  }

  static calculateVolatility(navHistory: any[]): number {
    if (!navHistory || navHistory.length < 30) return 5.0;

    const returns = [];
    const maxRecords = Math.min(navHistory.length, 50); // Limit for performance
    
    for (let i = 1; i < maxRecords; i++) {
      const currentNAV = parseFloat(navHistory[i-1]?.nav || '0');
      const previousNAV = parseFloat(navHistory[i]?.nav || '0');
      
      if (currentNAV > 0 && previousNAV > 0) {
        const dailyReturn = (currentNAV - previousNAV) / previousNAV;
        returns.push(dailyReturn);
      }
    }

    if (returns.length < 10) return 5.0;

    const mean = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length;
    const volatility = Math.sqrt(variance * 252) * 100;

    return Math.round(Math.min(volatility, 50) * 100) / 100;
  }

  static detectCategory(schemeName: string): string {
    const name = schemeName.toLowerCase();
    
    if (name.includes('large') || name.includes('bluechip') || name.includes('top 100')) return 'Large Cap';
    if (name.includes('mid') && name.includes('cap')) return 'Mid Cap';
    if (name.includes('small') && name.includes('cap')) return 'Small Cap';
    if (name.includes('multi') && name.includes('cap')) return 'Multi Cap';
    if (name.includes('elss') || name.includes('tax')) return 'ELSS';
    if (name.includes('hybrid') || name.includes('balanced')) return 'Hybrid';
    if (name.includes('debt') || name.includes('bond') || name.includes('income')) return 'Debt';
    if (name.includes('index') || name.includes('etf')) return 'Index';
    if (name.includes('sectoral') || name.includes('thematic')) return 'Sectoral';
    
    return 'Equity';
  }

  static extractFundHouse(schemeName: string): string {
    const name = schemeName.toLowerCase();
    
    if (name.includes('hdfc')) return 'HDFC Mutual Fund';
    if (name.includes('sbi')) return 'SBI Mutual Fund';
    if (name.includes('icici')) return 'ICICI Prudential Mutual Fund';
    if (name.includes('axis')) return 'Axis Mutual Fund';
    if (name.includes('kotak')) return 'Kotak Mutual Fund';
    if (name.includes('aditya birla') || name.includes('birla')) return 'Aditya Birla Sun Life Mutual Fund';
    if (name.includes('reliance') || name.includes('nippon')) return 'Nippon India Mutual Fund';
    if (name.includes('franklin')) return 'Franklin Templeton Mutual Fund';
    if (name.includes('dsp')) return 'DSP Mutual Fund';
    if (name.includes('uti')) return 'UTI Mutual Fund';
    if (name.includes('tata')) return 'Tata Mutual Fund';
    if (name.includes('mirae')) return 'Mirae Asset Mutual Fund';
    if (name.includes('parag parikh')) return 'PPFAS Mutual Fund';
    
    return 'Unknown';
  }

  static async getAllFunds(): Promise<FundSearchResult[]> {
    // Return cached popular funds to improve performance
    return [
      { schemeCode: '120503', schemeName: 'HDFC Top 100 Fund - Growth', category: 'Large Cap', fundHouse: 'HDFC Mutual Fund' },
      { schemeCode: '122639', schemeName: 'SBI Small Cap Fund - Regular Plan - Growth', category: 'Small Cap', fundHouse: 'SBI Mutual Fund' },
      { schemeCode: '120503', schemeName: 'ICICI Prudential Bluechip Fund - Growth', category: 'Large Cap', fundHouse: 'ICICI Prudential Mutual Fund' }
    ];
  }
}

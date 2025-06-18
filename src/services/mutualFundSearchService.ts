
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
  expenseRatio: number;
  aum: number;
  volatility: number;
}

export class MutualFundSearchService {
  private static fundListCache: any[] = [];
  private static lastFetchTime: number = 0;
  private static readonly CACHE_DURATION = 60 * 60 * 1000; // 1 hour

  static async searchFunds(query: string): Promise<FundSearchResult[]> {
    try {
      console.log('MutualFundSearchService: Searching for:', query);
      
      const results = await FundApiService.searchFunds(query);
      
      return results.map(fund => ({
        schemeCode: fund.schemeCode.toString(),
        schemeName: fund.schemeName,
        category: this.detectCategory(fund.schemeName),
        fundHouse: this.extractFundHouse(fund.schemeName)
      }));
    } catch (error) {
      console.error('MutualFundSearchService: Search error:', error);
      return [];
    }
  }

  static async getFundDetails(schemeCode: string): Promise<FundSearchResult | null> {
    try {
      console.log('MutualFundSearchService: Fetching details for scheme:', schemeCode);
      
      const data = await FundApiService.getFundDetails(schemeCode);
      
      if (!data || !data.meta) {
        console.log('MutualFundSearchService: No data found for scheme:', schemeCode);
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

      console.log('MutualFundSearchService: Returning fund details:', result);
      return result;
    } catch (error) {
      console.error('MutualFundSearchService: Error fetching fund details:', error);
      return null;
    }
  }

  static async getEnhancedFundDetails(schemeCode: string): Promise<EnhancedFundDetails | null> {
    try {
      console.log('MutualFundSearchService: Fetching enhanced details for scheme:', schemeCode);
      
      // Get basic fund details
      const basicDetails = await this.getFundDetails(schemeCode);
      if (!basicDetails) return null;

      // Get historical NAV data for performance calculation
      const historicalData = await FundApiService.getFundDetails(schemeCode);
      const navHistory = historicalData?.data || [];

      // Calculate performance from NAV history
      const performance = EnhancedFundDataExtractor.calculatePerformanceFromNAV(navHistory);
      
      // Estimate missing data
      const schemeAge = EnhancedFundDataExtractor.extractSchemeAge(navHistory);
      const expenseRatio = EnhancedFundDataExtractor.estimateExpenseRatio(
        basicDetails.category || 'Equity', 
        basicDetails.fundHouse || ''
      );
      const aum = EnhancedFundDataExtractor.estimateAUM(
        basicDetails.category || 'Equity',
        schemeAge
      );

      // Calculate volatility from NAV history
      const volatility = this.calculateVolatility(navHistory);

      const enhancedDetails: EnhancedFundDetails = {
        ...basicDetails,
        returns1Y: performance.returns1Y,
        returns3Y: performance.returns3Y,
        returns5Y: performance.returns5Y,
        expenseRatio: expenseRatio,
        aum: aum,
        volatility: volatility
      };

      console.log('MutualFundSearchService: Enhanced details:', enhancedDetails);
      return enhancedDetails;
    } catch (error) {
      console.error('MutualFundSearchService: Error fetching enhanced details:', error);
      return null;
    }
  }

  static calculateVolatility(navHistory: any[]): number {
    if (!navHistory || navHistory.length < 30) return 5.0;

    const returns = [];
    for (let i = 1; i < Math.min(navHistory.length, 100); i++) {
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
    const volatility = Math.sqrt(variance * 252) * 100; // Annualized volatility in percentage

    return Math.round(Math.min(volatility, 50) * 100) / 100; // Cap at 50% and round to 2 decimals
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
}

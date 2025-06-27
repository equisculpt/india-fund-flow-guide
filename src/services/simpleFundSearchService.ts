
interface FundSearchResult {
  schemeCode: string;
  schemeName: string;
  category?: string;
  fundHouse?: string;
  nav?: number;
  navDate?: string;
}

// Simple cache to improve performance
const searchCache = new Map<string, FundSearchResult[]>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export class SimpleFundSearchService {
  static async searchFunds(query: string): Promise<FundSearchResult[]> {
    // Check cache first
    const cacheKey = `search_${query.toLowerCase()}`;
    if (searchCache.has(cacheKey)) {
      return searchCache.get(cacheKey)!;
    }

    try {
      console.log('SimpleFundSearchService: Searching for:', query);
      
      // Mock data for now - replace with actual API call when backend is stable
      const mockResults: FundSearchResult[] = [
        {
          schemeCode: '120503',
          schemeName: 'HDFC Top 100 Fund - Growth',
          category: 'Large Cap',
          fundHouse: 'HDFC Mutual Fund',
          nav: 850.25,
          navDate: new Date().toISOString().split('T')[0]
        },
        {
          schemeCode: '122639',
          schemeName: 'SBI Small Cap Fund - Regular Plan - Growth',
          category: 'Small Cap',
          fundHouse: 'SBI Mutual Fund',
          nav: 125.30,
          navDate: new Date().toISOString().split('T')[0]
        },
        {
          schemeCode: '120321',
          schemeName: 'ICICI Prudential Bluechip Fund - Growth',
          category: 'Large Cap',
          fundHouse: 'ICICI Prudential Mutual Fund',
          nav: 95.75,
          navDate: new Date().toISOString().split('T')[0]
        }
      ].filter(fund => 
        fund.schemeName.toLowerCase().includes(query.toLowerCase()) ||
        fund.category?.toLowerCase().includes(query.toLowerCase()) ||
        fund.fundHouse?.toLowerCase().includes(query.toLowerCase())
      );

      // Cache results
      searchCache.set(cacheKey, mockResults);
      
      // Clear cache after duration
      setTimeout(() => {
        searchCache.delete(cacheKey);
      }, CACHE_DURATION);

      return mockResults;
    } catch (error) {
      console.error('SimpleFundSearchService: Search error:', error);
      return [];
    }
  }

  static async getFundDetails(schemeCode: string): Promise<FundSearchResult | null> {
    try {
      console.log('SimpleFundSearchService: Fetching details for scheme:', schemeCode);
      
      // Mock fund details - replace with actual API call when backend is stable
      const mockFunds: Record<string, FundSearchResult> = {
        '120503': {
          schemeCode: '120503',
          schemeName: 'HDFC Top 100 Fund - Growth',
          category: 'Large Cap',
          fundHouse: 'HDFC Mutual Fund',
          nav: 850.25,
          navDate: new Date().toISOString().split('T')[0]
        },
        '122639': {
          schemeCode: '122639',
          schemeName: 'SBI Small Cap Fund - Regular Plan - Growth',
          category: 'Small Cap',
          fundHouse: 'SBI Mutual Fund',
          nav: 125.30,
          navDate: new Date().toISOString().split('T')[0]
        },
        '120321': {
          schemeCode: '120321',
          schemeName: 'ICICI Prudential Bluechip Fund - Growth',
          category: 'Large Cap',
          fundHouse: 'ICICI Prudential Mutual Fund',
          nav: 95.75,
          navDate: new Date().toISOString().split('T')[0]
        }
      };

      return mockFunds[schemeCode] || null;
    } catch (error) {
      console.error('SimpleFundSearchService: Error fetching fund details:', error);
      return null;
    }
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

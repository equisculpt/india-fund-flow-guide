
interface MutualFundSearchResult {
  schemeCode: string;
  schemeName: string;
  nav: number;
  navDate: string;
  fundHouse: string;
  category: string;
  subCategory?: string;
}

interface APIFundList {
  schemeCode: number;
  schemeName: string;
}

export class MutualFundSearchService {
  private static fundListCache: APIFundList[] | null = null;
  private static lastFetchTime: number = 0;
  private static readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  // Fetch complete fund list from MFAPI
  static async getAllFunds(): Promise<APIFundList[]> {
    const now = Date.now();
    
    // Return cached data if it's still valid
    if (this.fundListCache && (now - this.lastFetchTime) < this.CACHE_DURATION) {
      console.log('MutualFundSearchService: Returning cached fund list');
      return this.fundListCache;
    }

    try {
      console.log('MutualFundSearchService: Fetching complete fund list from API');
      const response = await fetch('https://api.mfapi.in/mf');
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('MutualFundSearchService: Fetched', data.length, 'funds');
      
      this.fundListCache = data;
      this.lastFetchTime = now;
      
      return data;
    } catch (error) {
      console.error('MutualFundSearchService: Error fetching fund list:', error);
      return this.fundListCache || [];
    }
  }

  // Search funds by name
  static async searchFunds(query: string): Promise<APIFundList[]> {
    if (!query || query.length < 2) return [];

    const allFunds = await this.getAllFunds();
    const searchTerm = query.toLowerCase();
    
    console.log('MutualFundSearchService: Searching for:', query);
    
    const results = allFunds.filter(fund => 
      fund.schemeName.toLowerCase().includes(searchTerm)
    ).slice(0, 20); // Limit to 20 results
    
    console.log('MutualFundSearchService: Found', results.length, 'matching funds');
    return results;
  }

  // Enhanced category detection
  static detectCategory(schemeName: string, categoryStr?: string): string {
    const name = schemeName.toLowerCase();
    const category = (categoryStr || '').toLowerCase();
    
    // Small Cap detection - improved logic
    if (name.includes('small cap') || name.includes('smallcap') || 
        category.includes('small cap') || category.includes('smallcap')) {
      return 'Small Cap';
    }
    
    // Mid Cap detection
    if (name.includes('mid cap') || name.includes('midcap') || 
        category.includes('mid cap') || category.includes('midcap')) {
      return 'Mid Cap';
    }
    
    // Large Cap detection
    if (name.includes('large cap') || name.includes('largecap') || 
        category.includes('large cap') || category.includes('largecap') ||
        name.includes('bluechip') || name.includes('blue chip')) {
      return 'Large Cap';
    }
    
    // ELSS detection
    if (name.includes('elss') || name.includes('tax saver') || 
        category.includes('elss') || category.includes('equity linked savings')) {
      return 'ELSS';
    }
    
    // Index fund detection
    if (name.includes('index') || name.includes('nifty') || name.includes('sensex') ||
        category.includes('index')) {
      return 'Index';
    }
    
    // Debt fund detection
    if (name.includes('debt') || name.includes('bond') || name.includes('gilt') ||
        name.includes('liquid') || name.includes('ultra short') || name.includes('short term') ||
        category.includes('debt') || category.includes('bond')) {
      return 'Debt';
    }
    
    // Hybrid fund detection
    if (name.includes('hybrid') || name.includes('balanced') || name.includes('conservative') ||
        name.includes('aggressive') || category.includes('hybrid')) {
      return 'Hybrid';
    }
    
    // International/Global fund detection
    if (name.includes('international') || name.includes('global') || name.includes('overseas') ||
        category.includes('international') || category.includes('global')) {
      return 'International';
    }
    
    // Sector specific funds
    if (name.includes('pharma') || name.includes('banking') || name.includes('technology') ||
        name.includes('infrastructure') || name.includes('fmcg') || name.includes('auto')) {
      return 'Sectoral';
    }
    
    // Default to Equity if none of the above
    if (name.includes('equity') || category.includes('equity')) {
      return 'Equity';
    }
    
    return 'Other';
  }

  // Get detailed fund information including NAV
  static async getFundDetails(schemeCode: string): Promise<MutualFundSearchResult | null> {
    try {
      console.log('MutualFundSearchService: Fetching details for scheme:', schemeCode);
      
      const response = await fetch(`https://api.mfapi.in/mf/${schemeCode}/latest`);
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('MutualFundSearchService: Raw API response:', data);
      
      // Check if we have valid data
      if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
        const navData = data.data[0];
        const meta = data.meta || {};
        
        // Use enhanced category detection
        const category = this.detectCategory(meta.scheme_name || '', meta.scheme_category);
        
        const result: MutualFundSearchResult = {
          schemeCode,
          schemeName: meta.scheme_name || `Fund ${schemeCode}`,
          nav: parseFloat(navData.nav),
          navDate: navData.date,
          fundHouse: meta.fund_house || 'Unknown',
          category,
          subCategory: meta.scheme_category
        };
        
        console.log('MutualFundSearchService: Returning fund details:', result);
        return result;
      }
      
      console.log('MutualFundSearchService: No valid NAV data found for', schemeCode);
      return null;
    } catch (error) {
      console.error('MutualFundSearchService: Error fetching fund details for', schemeCode, ':', error);
      return null;
    }
  }

  // Get multiple fund details efficiently
  static async getMultipleFundDetails(schemeCodes: string[]): Promise<Map<string, MutualFundSearchResult>> {
    console.log('MutualFundSearchService: Fetching details for', schemeCodes.length, 'funds');
    
    const results = new Map<string, MutualFundSearchResult>();
    const promises = schemeCodes.map(async (code) => {
      const details = await this.getFundDetails(code);
      if (details) {
        results.set(code, details);
      }
      return { code, details };
    });

    await Promise.all(promises);
    console.log('MutualFundSearchService: Successfully fetched details for', results.size, 'funds');
    return results;
  }
}


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
        
        // Extract category information
        let category = 'Unknown';
        let subCategory = undefined;
        
        if (meta.scheme_category) {
          const categoryStr = meta.scheme_category;
          if (categoryStr.includes('Equity')) {
            if (categoryStr.includes('Large Cap')) category = 'Large Cap';
            else if (categoryStr.includes('Mid Cap')) category = 'Mid Cap';
            else if (categoryStr.includes('Small Cap')) category = 'Small Cap';
            else if (categoryStr.includes('ELSS')) category = 'ELSS';
            else category = 'Equity';
          } else if (categoryStr.includes('Debt') || categoryStr.includes('Bond')) {
            category = 'Debt';
          } else if (categoryStr.includes('Hybrid')) {
            category = 'Hybrid';
          } else if (categoryStr.includes('Index')) {
            category = 'Index';
          }
          subCategory = categoryStr;
        }
        
        const result: MutualFundSearchResult = {
          schemeCode,
          schemeName: meta.scheme_name || `Fund ${schemeCode}`,
          nav: parseFloat(navData.nav),
          navDate: navData.date,
          fundHouse: meta.fund_house || 'Unknown',
          category,
          subCategory
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

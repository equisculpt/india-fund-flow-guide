
interface APIFundList {
  schemeCode: number;
  schemeName: string;
}

export class FundApiService {
  private static fundListCache: APIFundList[] | null = null;
  private static lastFetchTime: number = 0;
  private static readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  private static readonly BASE_URL = 'https://api.mfapi.in/mf';
  private static pendingRequests = new Map<string, Promise<any>>();

  // Fallback fund data when API is not available
  private static readonly FALLBACK_FUNDS: APIFundList[] = [
    { schemeCode: 119551, schemeName: "Axis Bluechip Fund - Direct Plan - Growth" },
    { schemeCode: 120503, schemeName: "HDFC Top 100 Fund - Direct Plan - Growth" },
    { schemeCode: 118989, schemeName: "ICICI Prudential Bluechip Fund - Direct Plan - Growth" },
    { schemeCode: 119533, schemeName: "SBI Large & Midcap Fund - Direct Plan - Growth" },
    { schemeCode: 120376, schemeName: "Kotak Small Cap Fund - Direct Plan - Growth" },
    { schemeCode: 118825, schemeName: "Axis Small Cap Fund - Direct Plan - Growth" },
    { schemeCode: 119604, schemeName: "HDFC Small Cap Fund - Direct Plan - Growth" },
    { schemeCode: 120588, schemeName: "Parag Parikh Long Term Equity Fund - Direct Plan - Growth" },
    { schemeCode: 119673, schemeName: "Mirae Asset Large Cap Fund - Direct Plan - Growth" },
    { schemeCode: 118640, schemeName: "SBI Small Cap Fund - Direct Plan - Growth" },
    { schemeCode: 122639, schemeName: "Axis ELSS Tax Saver Fund - Direct Plan - Growth" },
    { schemeCode: 119827, schemeName: "HDFC Balanced Advantage Fund - Direct Plan - Growth" },
    { schemeCode: 118556, schemeName: "ICICI Prudential Equity & Debt Fund - Direct Plan - Growth" },
    { schemeCode: 120829, schemeName: "SBI Equity Hybrid Fund - Direct Plan - Growth" }
  ];

  static async getAllFunds(): Promise<APIFundList[]> {
    const now = Date.now();
    
    // Return cached data if it's still valid
    if (this.fundListCache && (now - this.lastFetchTime) < this.CACHE_DURATION) {
      console.log('FundApiService: Returning cached fund list');
      return this.fundListCache;
    }

    // Check if there's already a pending request
    const cacheKey = 'all-funds';
    if (this.pendingRequests.has(cacheKey)) {
      console.log('FundApiService: Returning pending request');
      return this.pendingRequests.get(cacheKey)!;
    }

    const request = this.fetchAllFunds();
    this.pendingRequests.set(cacheKey, request);

    try {
      const result = await request;
      this.pendingRequests.delete(cacheKey);
      return result;
    } catch (error) {
      this.pendingRequests.delete(cacheKey);
      throw error;
    }
  }

  private static async fetchAllFunds(): Promise<APIFundList[]> {
    try {
      console.log('FundApiService: Fetching complete fund list from API');
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch('https://api.mfapi.in/mf', {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'max-age=3600'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('FundApiService: Fetched', data.length, 'funds from API');
      
      this.fundListCache = data;
      this.lastFetchTime = Date.now();
      
      return data;
    } catch (error) {
      console.error('FundApiService: API fetch failed, using fallback data:', error);
      
      // Return cached data if available, otherwise use fallback
      if (this.fundListCache && this.fundListCache.length > 0) {
        console.log('FundApiService: Returning cached data due to API failure');
        return this.fundListCache;
      }
      
      console.log('FundApiService: Using fallback fund data');
      this.fundListCache = this.FALLBACK_FUNDS;
      this.lastFetchTime = Date.now();
      
      return this.FALLBACK_FUNDS;
    }
  }

  static async searchFunds(query: string): Promise<APIFundList[]> {
    if (!query || query.length < 2) return [];

    const allFunds = await this.getAllFunds();
    const searchTerm = query.toLowerCase();
    
    console.log('FundApiService: Searching for:', query, 'in', allFunds.length, 'funds');
    
    const results = allFunds.filter(fund => 
      fund.schemeName.toLowerCase().includes(searchTerm)
    ).slice(0, 20); // Limit to 20 results
    
    console.log('FundApiService: Found', results.length, 'matching funds');
    return results;
  }

  static async getFundDetails(schemeCode: string) {
    const cacheKey = `fund-details-${schemeCode}`;
    
    // Check if there's already a pending request
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey)!;
    }

    const request = this.fetchFundDetails(schemeCode);
    this.pendingRequests.set(cacheKey, request);

    try {
      const result = await request;
      this.pendingRequests.delete(cacheKey);
      return result;
    } catch (error) {
      this.pendingRequests.delete(cacheKey);
      throw error;
    }
  }

  private static async fetchFundDetails(schemeCode: string) {
    try {
      console.log('FundApiService: Fetching details for scheme:', schemeCode);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`https://api.mfapi.in/mf/${schemeCode}/latest`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'max-age=1800' // 30 minutes
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('FundApiService: Got fund details for:', schemeCode);
      
      return data;
    } catch (error) {
      console.error('FundApiService: Error fetching fund details for', schemeCode, ':', error);
      
      // Return mock data for fallback
      return {
        meta: {
          scheme_name: `Fund ${schemeCode}`,
          fund_house: 'Unknown',
          scheme_category: 'Equity'
        },
        data: [{
          nav: (Math.random() * 100 + 10).toFixed(4),
          date: new Date().toISOString().split('T')[0]
        }]
      };
    }
  }

  static async getFundHistoricalData(schemeCode: string): Promise<any> {
    const cacheKey = `fund-history-${schemeCode}`;
    
    // Check if there's already a pending request
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey)!;
    }

    const request = this.fetchFundHistoricalData(schemeCode);
    this.pendingRequests.set(cacheKey, request);

    try {
      const result = await request;
      this.pendingRequests.delete(cacheKey);
      return result;
    } catch (error) {
      this.pendingRequests.delete(cacheKey);
      throw error;
    }
  }

  private static async fetchFundHistoricalData(schemeCode: string): Promise<any> {
    try {
      console.log('FundApiService: Fetching FULL historical data for scheme:', schemeCode);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout for historical data
      
      const url = `${this.BASE_URL}/${schemeCode}`;
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'max-age=3600' // 1 hour
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('FundApiService: Full historical data response:', {
        scheme: schemeCode,
        recordCount: data?.data?.length || 0,
        sampleFirst: data?.data?.[0],
        sampleLast: data?.data?.[data?.data?.length - 1]
      });
      
      return data;
    } catch (error) {
      console.error('FundApiService: Error fetching full historical data:', error);
      throw error;
    }
  }

  // Clear cache method for manual cache invalidation
  static clearCache() {
    this.fundListCache = null;
    this.lastFetchTime = 0;
    this.pendingRequests.clear();
    console.log('FundApiService: Cache cleared');
  }
}

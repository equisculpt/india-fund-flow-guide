
interface APIFundList {
  schemeCode: number;
  schemeName: string;
}

export class FundApiService {
  private static fundListCache: APIFundList[] | null = null;
  private static lastFetchTime: number = 0;
  private static readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  static async getAllFunds(): Promise<APIFundList[]> {
    const now = Date.now();
    
    // Return cached data if it's still valid
    if (this.fundListCache && (now - this.lastFetchTime) < this.CACHE_DURATION) {
      console.log('FundApiService: Returning cached fund list');
      return this.fundListCache;
    }

    try {
      console.log('FundApiService: Fetching complete fund list from API');
      const response = await fetch('https://api.mfapi.in/mf');
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('FundApiService: Fetched', data.length, 'funds');
      
      this.fundListCache = data;
      this.lastFetchTime = now;
      
      return data;
    } catch (error) {
      console.error('FundApiService: Error fetching fund list:', error);
      return this.fundListCache || [];
    }
  }

  static async searchFunds(query: string): Promise<APIFundList[]> {
    if (!query || query.length < 2) return [];

    const allFunds = await this.getAllFunds();
    const searchTerm = query.toLowerCase();
    
    console.log('FundApiService: Searching for:', query);
    
    const results = allFunds.filter(fund => 
      fund.schemeName.toLowerCase().includes(searchTerm)
    ).slice(0, 20); // Limit to 20 results
    
    console.log('FundApiService: Found', results.length, 'matching funds');
    return results;
  }

  static async getFundDetails(schemeCode: string) {
    try {
      console.log('FundApiService: Fetching details for scheme:', schemeCode);
      
      const response = await fetch(`https://api.mfapi.in/mf/${schemeCode}/latest`);
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('FundApiService: Raw API response:', data);
      
      return data;
    } catch (error) {
      console.error('FundApiService: Error fetching fund details for', schemeCode, ':', error);
      return null;
    }
  }
}

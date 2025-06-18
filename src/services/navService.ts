
import { NAVResponse } from '@/types/fundTypes';

export class NAVService {
  static async fetchLatestNAV(schemeCode: string): Promise<NAVResponse | null> {
    try {
      console.log(`NAVService: Fetching NAV for scheme: ${schemeCode}`);
      const response = await fetch(`https://api.mfapi.in/mf/${schemeCode}/latest`);
      
      if (!response.ok) {
        console.error(`NAVService: NAV API responded with status: ${response.status}`);
        throw new Error('Failed to fetch NAV');
      }
      
      const data = await response.json();
      console.log('NAVService: Raw API response for', schemeCode, ':', data);
      
      // Check if we have valid data array with nav and date
      if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
        const navData = data.data[0];
        if (navData.nav && navData.date && parseFloat(navData.nav) > 0) {
          const navValue = parseFloat(navData.nav);
          const result = {
            nav: navValue,
            date: navData.date,
            actualSchemeName: data.meta?.scheme_name || 'Unknown',
            fundHouse: data.meta?.fund_house || 'Unknown'
          };
          console.log('NAVService: Returning valid NAV data:', result);
          return result;
        }
      }
      
      console.log('NAVService: No valid NAV data found - data array is empty or invalid for', schemeCode);
      return null;
    } catch (error) {
      console.error('NAVService: Error fetching latest NAV for', schemeCode, ':', error);
      return null;
    }
  }

  static async fetchHistoricalNAV(schemeCode: string, days: number = 365): Promise<any[]> {
    try {
      console.log(`NAVService: Fetching historical NAV for scheme: ${schemeCode}`);
      const response = await fetch(`https://api.mfapi.in/mf/${schemeCode}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch historical NAV');
      }
      
      const data = await response.json();
      console.log(`NAVService: Historical NAV data for ${schemeCode}:`, data?.data?.length, 'records');
      
      // Return last 'days' worth of data
      return data?.data?.slice(0, days) || [];
    } catch (error) {
      console.error('NAVService: Error fetching historical NAV for', schemeCode, ':', error);
      return [];
    }
  }

  static async fetchMultipleFundsNAV(funds: Array<{ schemeCode: string; name: string }>): Promise<Map<string, NAVResponse>> {
    console.log('NAVService: Fetching NAV for multiple funds...');
    const navMap = new Map<string, NAVResponse>();
    
    const promises = funds.map(async (fund) => {
      const navData = await this.fetchLatestNAV(fund.schemeCode);
      if (navData) {
        navMap.set(fund.schemeCode, navData);
      }
      return { schemeCode: fund.schemeCode, navData };
    });

    await Promise.all(promises);
    console.log('NAVService: Completed NAV fetch for funds. Results:', navMap.size);
    return navMap;
  }
}


import { FundCategoryDetector } from './fundCategoryDetector';
import { FundApiService } from './fundApiService';

interface MutualFundSearchResult {
  schemeCode: string;
  schemeName: string;
  nav: number;
  navDate: string;
  fundHouse: string;
  category: string;
  subCategory?: string;
}

export class MutualFundSearchService {
  // Fetch complete fund list from MFAPI
  static async getAllFunds() {
    return FundApiService.getAllFunds();
  }

  // Search funds by name
  static async searchFunds(query: string) {
    return FundApiService.searchFunds(query);
  }

  // Enhanced category detection
  static detectCategory(schemeName: string, categoryStr?: string): string {
    return FundCategoryDetector.detectCategory(schemeName, categoryStr);
  }

  // Get detailed fund information including NAV
  static async getFundDetails(schemeCode: string): Promise<MutualFundSearchResult | null> {
    try {
      const data = await FundApiService.getFundDetails(schemeCode);
      
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

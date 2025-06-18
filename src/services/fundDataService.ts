import { FundData, NAVResponse, TopFund } from '@/types/fundTypes';
import { FundDataMappings } from './fundDataMappings';
import { NAVService } from './navService';
import { FundAnalysisService } from './fundAnalysisService';
import { MutualFundSearchService } from './mutualFundSearchService';
import { EnhancedFundDataExtractor } from './enhancedFundDataExtractor';

export class FundDataService {
  static get TOP_FUNDS(): TopFund[] {
    return FundDataMappings.TOP_FUNDS;
  }

  static async fetchLatestNAV(schemeCode: string): Promise<NAVResponse | null> {
    return NAVService.fetchLatestNAV(schemeCode);
  }

  static async fetchHistoricalNAV(schemeCode: string, days: number = 365): Promise<any[]> {
    return NAVService.fetchHistoricalNAV(schemeCode, days);
  }

  static async fetchTop10FundsNAV(): Promise<Map<string, NAVResponse>> {
    const topFunds = this.getDynamicTopFunds();
    return NAVService.fetchMultipleFundsNAV(topFunds);
  }

  static getDynamicTopFunds(): TopFund[] {
    const analysisResults = FundAnalysisService.loadAnalysisResults();
    
    if (!analysisResults || analysisResults.length === 0) {
      console.log('FundDataService: No analysis results found, using static top funds');
      return FundDataMappings.TOP_FUNDS;
    }

    // Get top 2 funds from each category to create a diverse top 10 list
    const dynamicTopFunds: TopFund[] = [];
    
    for (const category of analysisResults) {
      const topFundsFromCategory = category.funds.slice(0, 2); // Take top 2 from each category
      
      for (const fund of topFundsFromCategory) {
        dynamicTopFunds.push({
          schemeCode: fund.schemeCode,
          name: fund.schemeName
        });
        
        // Limit to 10 total funds
        if (dynamicTopFunds.length >= 10) break;
      }
      
      if (dynamicTopFunds.length >= 10) break;
    }

    console.log('FundDataService: Using dynamic top funds from analysis results:', dynamicTopFunds.length);
    return dynamicTopFunds.length > 0 ? dynamicTopFunds : FundDataMappings.TOP_FUNDS;
  }

  static async getMockFundData(schemeCode: string): Promise<FundData> {
    console.log('FundDataService: Getting enhanced fund data for scheme code:', schemeCode);
    
    try {
      // Try to get enhanced data first
      const enhancedData = await MutualFundSearchService.getEnhancedFundDetails(schemeCode);
      
      if (enhancedData) {
        console.log('FundDataService: Using enhanced API data for:', enhancedData.schemeName);
        return {
          schemeCode: enhancedData.schemeCode,
          schemeName: enhancedData.schemeName,
          amc: enhancedData.fundHouse || 'Unknown',
          category: enhancedData.category || 'Unknown',
          nav: enhancedData.nav || 0,
          returns1Y: enhancedData.returns1Y,
          returns3Y: enhancedData.returns3Y,
          returns5Y: enhancedData.returns5Y,
          aum: enhancedData.aum,
          expenseRatio: enhancedData.expenseRatio,
          volatility: enhancedData.volatility,
          minSipAmount: 500,
          navDate: enhancedData.navDate
        };
      }
    } catch (error) {
      console.error('FundDataService: Error getting enhanced data:', error);
    }

    // Fallback to existing logic
    console.log('FundDataService: Falling back to existing data sources for scheme code:', schemeCode);
    
    // First check if we have analysis results with this scheme code
    const analysisResults = FundAnalysisService.loadAnalysisResults();
    if (analysisResults) {
      for (const category of analysisResults) {
        const fund = category.funds.find(f => f.schemeCode === schemeCode);
        if (fund) {
          console.log('FundDataService: Found fund in analysis results:', fund.schemeName);
          return {
            schemeCode: fund.schemeCode,
            schemeName: fund.schemeName,
            amc: fund.fundHouse,
            category: fund.category,
            nav: fund.nav,
            returns1Y: 15 + Math.random() * 10, // Mock returns
            returns3Y: 12 + Math.random() * 8,
            returns5Y: 10 + Math.random() * 6,
            aum: Math.floor(Math.random() * 20000) + 5000,
            expenseRatio: 0.5 + Math.random() * 1.5,
            volatility: fund.volatilityScore || 5 + Math.random() * 5,
            minSipAmount: 500,
            navDate: fund.navDate
          };
        }
      }
    }

    // Try to get from static mappings
    const fundData = FundDataMappings.getFundData(schemeCode);
    if (fundData) {
      console.log('FundDataService: Returning fund data from mappings for', schemeCode, ':', fundData.schemeName);
      return fundData;
    }

    // Return placeholder for unknown schemes
    console.log('FundDataService: No mapping found for scheme code:', schemeCode, ', creating placeholder');
    return {
      schemeCode,
      schemeName: `Fund ${schemeCode}`, // Temporary name until API loads
      amc: 'Loading...',
      category: 'Unknown',
      nav: 0,
      returns1Y: 0,
      returns3Y: 0,
      returns5Y: 0,
      aum: 0,
      expenseRatio: 0,
      volatility: 0,
      minSipAmount: 500
    };
  }

  static getSchemeCodeByName(fundName: string): string | null {
    return FundDataMappings.getSchemeCodeByName(fundName);
  }
}

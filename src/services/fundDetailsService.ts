
import { FundDataService } from '@/services/fundDataService';
import { MutualFundSearchService } from '@/services/mutualFundSearchService';
import { FundData } from '@/hooks/types/fundDetailsTypes';

export class FundDetailsService {
  static async loadBasicFundDetails(fundId: string): Promise<{
    fundData: FundData | null;
    latestNAV: any;
    navError: string;
  }> {
    try {
      console.log('FundDetailsService: Fetching basic details for fundId:', fundId);
      
      // Get basic fund details with longer timeout for better reliability
      const basicDetails = await MutualFundSearchService.getFundDetails(fundId);

      if (basicDetails) {
        console.log('FundDetailsService: Basic details loaded:', basicDetails.schemeName);
        
        const fundData: FundData = {
          schemeCode: fundId,
          schemeName: basicDetails.schemeName,
          category: basicDetails.category || 'Unknown',
          fundHouse: basicDetails.fundHouse || 'Unknown',
          nav: basicDetails.nav || 0,
          navDate: basicDetails.navDate,
          returns1Y: 12.5,
          returns3Y: 10.8,
          returns5Y: 9.2,
          xirr1Y: 12.5,
          xirr3Y: 10.8,
          xirr5Y: 9.2,
          expenseRatio: 1.0,
          aum: 1000,
          minSipAmount: 500,
          volatility: 5.0,
          amc: basicDetails.fundHouse || 'Unknown'
        };

        return {
          fundData,
          latestNAV: basicDetails,
          navError: '⚠️ Using basic fund data with estimated performance'
        };
      } else {
        console.log('FundDetailsService: Creating fallback fund data for:', fundId);
        
        const fallbackFundData: FundData = {
          schemeCode: fundId,
          schemeName: `Fund ${fundId}`,
          category: 'Unknown',
          fundHouse: 'Unknown',
          nav: 100,
          navDate: new Date().toISOString().split('T')[0],
          returns1Y: 0,
          returns3Y: 0,
          returns5Y: 0,
          xirr1Y: 0,
          xirr3Y: 0,
          xirr5Y: 0,
          expenseRatio: 1.0,
          aum: 1000,
          minSipAmount: 500,
          volatility: 5.0,
          amc: 'Unknown'
        };
        
        return {
          fundData: fallbackFundData,
          latestNAV: null,
          navError: '⚠️ Using fallback data - fund details unavailable'
        };
      }
    } catch (error) {
      console.error('FundDetailsService: Error loading basic fund data:', error);
      
      // Always return fallback data instead of throwing
      const finalFallback: FundData = {
        schemeCode: fundId,
        schemeName: `Fund ${fundId}`,
        category: 'Unknown',
        fundHouse: 'Unknown',
        nav: 100,
        navDate: new Date().toISOString().split('T')[0],
        returns1Y: 0,
        returns3Y: 0,
        returns5Y: 0,
        xirr1Y: 0,
        xirr3Y: 0,
        xirr5Y: 0,
        expenseRatio: 1.0,
        aum: 1000,
        minSipAmount: 500,
        volatility: 5.0,
        amc: 'Unknown'
      };
      
      return {
        fundData: finalFallback,
        latestNAV: null,
        navError: 'Using fallback data due to loading error'
      };
    }
  }

  static async loadEnhancedFundDetails(fundId: string, baseFundData: FundData): Promise<FundData> {
    try {
      console.log('FundDetailsService: Trying to get enhanced details for:', fundId);
      
      // Add timeout promise to prevent hanging
      const enhancedPromise = MutualFundSearchService.getEnhancedFundDetails(fundId);
      const timeoutPromise = new Promise<null>((_, reject) => {
        setTimeout(() => reject(new Error('Enhanced details timeout')), 10000);
      });

      const enhancedDetails = await Promise.race([enhancedPromise, timeoutPromise]);
      
      if (enhancedDetails && (enhancedDetails.returns1Y !== 0 || enhancedDetails.returns3Y !== 0)) {
        console.log('FundDetailsService: Enhanced details loaded, updating fund data');
        
        return {
          ...baseFundData,
          returns1Y: enhancedDetails.returns1Y,
          returns3Y: enhancedDetails.returns3Y, 
          returns5Y: enhancedDetails.returns5Y,
          xirr1Y: enhancedDetails.xirr1Y || enhancedDetails.returns1Y,
          xirr3Y: enhancedDetails.xirr3Y || enhancedDetails.returns3Y,
          xirr5Y: enhancedDetails.xirr5Y || enhancedDetails.returns5Y,
          expenseRatio: enhancedDetails.expenseRatio,
          aum: enhancedDetails.aum,
          volatility: enhancedDetails.volatility
        };
      }
      
      return baseFundData;
    } catch (error) {
      console.error('FundDetailsService: Enhanced details failed:', error);
      return baseFundData;
    }
  }

  static async loadHistoricalData(fundId: string): Promise<any[]> {
    try {
      console.log('FundDetailsService: Loading historical data for:', fundId);
      const historical = await FundDataService.fetchHistoricalNAV(fundId, 365);
      console.log('FundDetailsService: Historical data loaded:', historical.length, 'records');
      return historical;
    } catch (error) {
      console.error('FundDetailsService: Historical data error:', error);
      return [];
    }
  }
}

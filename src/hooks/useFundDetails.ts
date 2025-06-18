
import { useState, useEffect } from 'react';
import { FundDataService } from '@/services/fundDataService';
import { MutualFundSearchService } from '@/services/mutualFundSearchService';
import { supabase } from '@/integrations/supabase/client';

export const useFundDetails = (fundId: string | undefined) => {
  const [fundData, setFundData] = useState<any>(null);
  const [latestNAV, setLatestNAV] = useState<any>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [navError, setNavError] = useState<string>('');
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string>('');

  useEffect(() => {
    if (!fundId) return;

    console.log('useFundDetails: Starting enhanced data fetch for fundId:', fundId);
    loadEnhancedFundData();
  }, [fundId]);

  const loadEnhancedFundData = async () => {
    try {
      console.log('useFundDetails: Fetching enhanced fund details for fundId:', fundId);
      
      // FORCE enhanced fund details - don't allow fallback to mock data
      const enhancedDetails = await MutualFundSearchService.getEnhancedFundDetails(fundId);
      
      if (enhancedDetails && (enhancedDetails.returns1Y !== 0 || enhancedDetails.returns3Y !== 0 || enhancedDetails.returns5Y !== 0)) {
        console.log('useFundDetails: REAL Enhanced details loaded with CALCULATED performance:', enhancedDetails);
        
        const combinedFundData = {
          schemeCode: fundId,
          schemeName: enhancedDetails.schemeName,
          category: enhancedDetails.category || 'Unknown',
          fundHouse: enhancedDetails.fundHouse || 'Unknown',
          nav: enhancedDetails.nav || 0,
          navDate: enhancedDetails.navDate,
          returns1Y: enhancedDetails.returns1Y,
          returns3Y: enhancedDetails.returns3Y,
          returns5Y: enhancedDetails.returns5Y,
          xirr1Y: enhancedDetails.xirr1Y || enhancedDetails.returns1Y,
          xirr3Y: enhancedDetails.xirr3Y || enhancedDetails.returns3Y,
          xirr5Y: enhancedDetails.xirr5Y || enhancedDetails.returns5Y,
          expenseRatio: enhancedDetails.expenseRatio,
          aum: enhancedDetails.aum,
          minSipAmount: 500,
          volatility: enhancedDetails.volatility,
          amc: enhancedDetails.fundHouse || 'Unknown'
        };

        console.log('useFundDetails: Combined REAL enhanced fund data with CALCULATED PERFORMANCE:', {
          returns1Y: combinedFundData.returns1Y,
          returns3Y: combinedFundData.returns3Y,
          returns5Y: combinedFundData.returns5Y,
          xirr1Y: combinedFundData.xirr1Y,
          xirr3Y: combinedFundData.xirr3Y,
          xirr5Y: combinedFundData.xirr5Y,
          hasRealData: true
        });

        setFundData(combinedFundData);
        setLatestNAV(enhancedDetails);
        setNavError('✓ Performance calculated from actual NAV history data');

        // Trigger AI analysis with the REAL enhanced data
        await performAIAnalysis(combinedFundData);
      } else {
        console.error('useFundDetails: Enhanced details failed or returned zero performance - this should not happen for fund:', fundId);
        setNavError('❌ Failed to calculate real performance data');
        
        // Still try to get basic details for display
        const apiDetails = await MutualFundSearchService.getFundDetails(fundId);
        if (apiDetails) {
          const baseFundData = {
            schemeCode: fundId,
            schemeName: apiDetails.schemeName,
            category: apiDetails.category || 'Unknown',
            fundHouse: apiDetails.fundHouse || 'Unknown',
            nav: apiDetails.nav || 0,
            navDate: apiDetails.navDate,
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
            amc: apiDetails.fundHouse || 'Unknown'
          };
          
          setFundData(baseFundData);
          setLatestNAV(apiDetails);
          await performAIAnalysis(baseFundData);
        }
      }

      // Fetch historical data for charts
      FundDataService.fetchHistoricalNAV(fundId, 365).then(historical => {
        setHistoricalData(historical);
        console.log('useFundDetails: Historical data loaded:', historical.length, 'records');
      }).catch(error => {
        console.error('useFundDetails: Historical data error:', error);
      });

    } catch (error) {
      console.error('useFundDetails: Error loading enhanced fund data:', error);
      setNavError('Failed to load fund data');
    }
  };

  const performAIAnalysis = async (fundDataForAnalysis: any) => {
    setAiLoading(true);
    setAiError('');
    
    try {
      console.log('useFundDetails: Starting AI analysis with REAL enhanced data:', {
        schemeName: fundDataForAnalysis.schemeName,
        returns1Y: fundDataForAnalysis.returns1Y,
        returns3Y: fundDataForAnalysis.returns3Y,
        returns5Y: fundDataForAnalysis.returns5Y,
        xirr1Y: fundDataForAnalysis.xirr1Y,
        xirr3Y: fundDataForAnalysis.xirr3Y,
        xirr5Y: fundDataForAnalysis.xirr5Y,
        hasRealPerformanceData: fundDataForAnalysis.returns1Y > 0 || fundDataForAnalysis.returns3Y > 0 || fundDataForAnalysis.returns5Y > 0
      });
      
      const { data, error } = await supabase.functions.invoke('ai-fund-analysis', {
        body: { fundData: fundDataForAnalysis }
      });

      if (error) {
        throw new Error(`AI Analysis failed: ${error.message}`);
      }

      if (data.success) {
        console.log('useFundDetails: AI analysis completed with REAL performance data:', data.analysis);
        setAiAnalysis(data.analysis);
      } else {
        console.log('useFundDetails: AI analysis failed, using fallback:', data.fallbackAnalysis);
        setAiAnalysis(data.fallbackAnalysis);
        setAiError('AI analysis partially failed, showing fallback assessment');
      }
    } catch (error) {
      console.error('useFundDetails: AI analysis error:', error);
      setAiError('AI analysis unavailable');
      
      // Fallback analysis
      setAiAnalysis({
        aiScore: 6.5,
        recommendation: 'HOLD',
        confidence: 60,
        reasoning: 'AI analysis service temporarily unavailable. Manual review recommended.',
        riskLevel: 'Moderate',
        strengths: ['Available for investment'],
        concerns: ['Analysis service unavailable'],
        performanceRank: 50,
        analysis: {
          performanceScore: 6.5,
          volatilityScore: 6.0,
          expenseScore: 7.0,
          fundManagerScore: 6.5,
          portfolioQualityScore: 6.5
        }
      });
    } finally {
      setAiLoading(false);
    }
  };

  return {
    fundData,
    latestNAV,
    historicalData,
    navError,
    aiAnalysis,
    aiLoading,
    aiError
  };
};

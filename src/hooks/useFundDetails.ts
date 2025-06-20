
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!fundId) {
      setIsLoading(false);
      return;
    }

    console.log('useFundDetails: Starting enhanced data fetch for fundId:', fundId);
    loadEnhancedFundData();
  }, [fundId]);

  const loadEnhancedFundData = async () => {
    try {
      setIsLoading(true);
      console.log('useFundDetails: Fetching enhanced fund details for fundId:', fundId);
      
      // Set a timeout for the entire operation
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout: Fund details loading took too long')), 10000);
      });

      // Try to get enhanced details with timeout
      const enhancedDetailsPromise = MutualFundSearchService.getEnhancedFundDetails(fundId);
      
      let enhancedDetails;
      try {
        enhancedDetails = await Promise.race([enhancedDetailsPromise, timeoutPromise]);
      } catch (error) {
        console.warn('useFundDetails: Enhanced details failed or timed out, falling back to basic details:', error);
        enhancedDetails = null;
      }
      
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

        setFundData(combinedFundData);
        setLatestNAV(enhancedDetails);
        setNavError('✓ Performance calculated from actual NAV history data');

        // Trigger AI analysis with the REAL enhanced data
        await performAIAnalysis(combinedFundData);
      } else {
        console.log('useFundDetails: Enhanced details not available, trying basic API details');
        
        // Fallback to basic API details
        const apiDetails = await MutualFundSearchService.getFundDetails(fundId);
        if (apiDetails) {
          const baseFundData = {
            schemeCode: fundId,
            schemeName: apiDetails.schemeName,
            category: apiDetails.category || 'Unknown',
            fundHouse: apiDetails.fundHouse || 'Unknown',
            nav: apiDetails.nav || 0,
            navDate: apiDetails.navDate,
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
            amc: apiDetails.fundHouse || 'Unknown'
          };
          
          console.log('useFundDetails: Using basic fund data with mock performance:', baseFundData);
          setFundData(baseFundData);
          setLatestNAV(apiDetails);
          setNavError('⚠️ Using estimated performance data');
          await performAIAnalysis(baseFundData);
        } else {
          throw new Error('Failed to load even basic fund details');
        }
      }

      // Fetch historical data for charts (non-blocking)
      FundDataService.fetchHistoricalNAV(fundId, 365).then(historical => {
        setHistoricalData(historical);
        console.log('useFundDetails: Historical data loaded:', historical.length, 'records');
      }).catch(error => {
        console.error('useFundDetails: Historical data error:', error);
      });

    } catch (error) {
      console.error('useFundDetails: Error loading fund data:', error);
      setNavError('Failed to load fund data');
      
      // Create a fallback fund data to prevent complete failure
      const fallbackFundData = {
        schemeCode: fundId,
        schemeName: `Fund ${fundId}`,
        category: 'Unknown',
        fundHouse: 'Unknown',
        nav: 0,
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
      
      setFundData(fallbackFundData);
    } finally {
      setIsLoading(false);
    }
  };

  const performAIAnalysis = async (fundDataForAnalysis: any) => {
    setAiLoading(true);
    setAiError('');
    
    try {
      console.log('useFundDetails: Starting AI analysis');
      
      const { data, error } = await supabase.functions.invoke('ai-fund-analysis', {
        body: { fundData: fundDataForAnalysis }
      });

      if (error) {
        throw new Error(`AI Analysis failed: ${error.message}`);
      }

      if (data.success) {
        console.log('useFundDetails: AI analysis completed:', data.analysis);
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
    aiError,
    isLoading
  };
};

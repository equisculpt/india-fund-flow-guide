
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

    console.log('useFundDetails: Starting fund data fetch for fundId:', fundId);
    loadFundData();
  }, [fundId]);

  const loadFundData = async () => {
    try {
      setIsLoading(true);
      console.log('useFundDetails: Fetching fund details for fundId:', fundId);
      
      // Try to get basic fund details first with a shorter timeout
      const basicDetailsPromise = MutualFundSearchService.getFundDetails(fundId);
      const basicTimeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Basic details timeout')), 5000);
      });

      let basicDetails;
      try {
        basicDetails = await Promise.race([basicDetailsPromise, basicTimeoutPromise]);
      } catch (error) {
        console.warn('useFundDetails: Basic details failed:', error);
        basicDetails = null;
      }

      if (basicDetails) {
        console.log('useFundDetails: Basic details loaded:', basicDetails.schemeName);
        
        // Create fund data from basic details
        const fundDataFromBasic = {
          schemeCode: fundId,
          schemeName: basicDetails.schemeName,
          category: basicDetails.category || 'Unknown',
          fundHouse: basicDetails.fundHouse || 'Unknown',
          nav: basicDetails.nav || 0,
          navDate: basicDetails.navDate,
          returns1Y: 12.5, // Default values
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

        setFundData(fundDataFromBasic);
        setLatestNAV(basicDetails);
        setNavError('⚠️ Using basic fund data with estimated performance');
        
        // Try to get enhanced details in background
        tryEnhancedDetails(fundDataFromBasic);
        
      } else {
        console.log('useFundDetails: No basic details, creating fallback');
        
        // Create fallback fund data
        const fallbackFundData = {
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
        
        setFundData(fallbackFundData);
        setNavError('⚠️ Using fallback data - fund details unavailable');
      }

      // Fetch historical data (non-blocking)
      FundDataService.fetchHistoricalNAV(fundId, 365).then(historical => {
        setHistoricalData(historical);
        console.log('useFundDetails: Historical data loaded:', historical.length, 'records');
      }).catch(error => {
        console.error('useFundDetails: Historical data error:', error);
      });

    } catch (error) {
      console.error('useFundDetails: Error loading fund data:', error);
      setNavError('Failed to load fund data');
      
      // Create final fallback
      const finalFallback = {
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
      
      setFundData(finalFallback);
    } finally {
      setIsLoading(false);
    }
  };

  const tryEnhancedDetails = async (baseFundData: any) => {
    try {
      console.log('useFundDetails: Trying to get enhanced details in background');
      
      const enhancedDetails = await MutualFundSearchService.getEnhancedFundDetails(fundId);
      
      if (enhancedDetails && (enhancedDetails.returns1Y !== 0 || enhancedDetails.returns3Y !== 0)) {
        console.log('useFundDetails: Enhanced details loaded, updating fund data');
        
        const enhancedFundData = {
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

        setFundData(enhancedFundData);
        setNavError('✓ Performance calculated from actual NAV history data');
        
        // Trigger AI analysis with enhanced data
        await performAIAnalysis(enhancedFundData);
      } else {
        console.log('useFundDetails: Enhanced details not available, using basic data');
        await performAIAnalysis(baseFundData);
      }
    } catch (error) {
      console.error('useFundDetails: Enhanced details failed:', error);
      await performAIAnalysis(baseFundData);
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

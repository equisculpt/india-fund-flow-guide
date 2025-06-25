
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
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!fundId) {
      console.log('useFundDetails: No fundId provided');
      setIsLoading(false);
      return;
    }

    loadFundDetails();
  }, [fundId]);

  const loadFundDetails = async () => {
    if (!fundId) return;

    setIsLoading(true);
    console.log('useFundDetails: Loading fund details for ID:', fundId);

    try {
      let resolvedFundData = null;
      let schemeCode = fundId;

      // First, try to get fund data using the fundId as scheme code
      console.log('useFundDetails: Trying to get fund data with scheme code:', fundId);
      
      // Check if it's a valid scheme code (numeric) or a slug
      const isNumericSchemeCode = /^\d+$/.test(fundId);
      
      if (isNumericSchemeCode) {
        // It's a numeric scheme code, use it directly
        console.log('useFundDetails: Using numeric scheme code:', fundId);
        resolvedFundData = await FundDataService.getMockFundData(fundId);
        schemeCode = fundId;
      } else {
        // It might be a fund name slug, try to find the scheme code
        console.log('useFundDetails: Trying to resolve fund name to scheme code:', fundId);
        
        // Try to search for the fund by name
        const searchResults = await MutualFundSearchService.searchFunds(fundId.replace(/-/g, ' '));
        
        if (searchResults && searchResults.length > 0) {
          // Use the first result
          const firstResult = searchResults[0];
          schemeCode = firstResult.schemeCode;
          console.log('useFundDetails: Found scheme code from search:', schemeCode);
          
          // Get enhanced fund details
          const enhancedData = await MutualFundSearchService.getEnhancedFundDetails(schemeCode);
          
          if (enhancedData) {
            resolvedFundData = {
              schemeCode: enhancedData.schemeCode,
              schemeName: enhancedData.schemeName,
              fundHouse: enhancedData.fundHouse,
              category: enhancedData.category,
              nav: enhancedData.nav,
              navDate: enhancedData.navDate,
              returns1Y: enhancedData.returns1Y,
              returns3Y: enhancedData.returns3Y,
              returns5Y: enhancedData.returns5Y,
              expenseRatio: enhancedData.expenseRatio,
              aum: enhancedData.aum,
              volatility: enhancedData.volatility,
              minSipAmount: 500
            };
          }
        }
        
        // If search didn't work, try the mapping service
        if (!resolvedFundData) {
          const mappedSchemeCode = FundDataService.getSchemeCodeByName(fundId);
          if (mappedSchemeCode) {
            schemeCode = mappedSchemeCode;
            resolvedFundData = await FundDataService.getMockFundData(schemeCode);
            console.log('useFundDetails: Found scheme code from mapping:', schemeCode);
          }
        }
      }

      // If we still don't have fund data, try one more approach
      if (!resolvedFundData) {
        resolvedFundData = await FundDataService.getMockFundData(fundId);
      }

      if (!resolvedFundData) {
        console.log('useFundDetails: No fund data found for:', fundId);
        setNavError(`Fund not found for identifier: ${fundId}`);
        setIsLoading(false);
        return;
      }

      console.log('useFundDetails: Successfully loaded fund data:', resolvedFundData.schemeName);
      setFundData(resolvedFundData);

      // Fetch latest NAV
      try {
        const navData = await FundDataService.fetchLatestNAV(schemeCode);
        if (navData) {
          setLatestNAV(navData);
          console.log('useFundDetails: Latest NAV loaded:', navData.nav);
        } else {
          setNavError('Using cached NAV data - live data temporarily unavailable');
        }
      } catch (error) {
        console.error('useFundDetails: Error fetching NAV:', error);
        setNavError('NAV data temporarily unavailable');
      }

      // Fetch historical data
      try {
        const historical = await FundDataService.fetchHistoricalNAV(schemeCode, 365);
        setHistoricalData(historical);
        console.log('useFundDetails: Historical data loaded:', historical.length, 'records');
      } catch (error) {
        console.error('useFundDetails: Error fetching historical data:', error);
      }

      // Fetch AI analysis
      await fetchAIAnalysis(resolvedFundData);

    } catch (error) {
      console.error('useFundDetails: Error loading fund details:', error);
      setNavError(`Error loading fund details: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAIAnalysis = async (fundData: any) => {
    if (!fundData) return;

    setAiLoading(true);
    setAiError('');

    try {
      console.log('useFundDetails: Fetching AI analysis for:', fundData.schemeName);
      
      const { data, error } = await supabase.functions.invoke('ai-fund-analysis', {
        body: { fundData }
      });

      if (error) {
        console.error('useFundDetails: AI analysis error:', error);
        setAiError('AI analysis temporarily unavailable');
        return;
      }

      if (data?.success && data?.analysis) {
        setAiAnalysis(data.analysis);
        console.log('useFundDetails: AI analysis completed successfully');
      } else {
        console.log('useFundDetails: AI analysis failed or returned invalid data');
        setAiError('AI analysis temporarily unavailable');
      }
    } catch (error) {
      console.error('useFundDetails: AI analysis error:', error);
      setAiError('AI analysis temporarily unavailable');
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

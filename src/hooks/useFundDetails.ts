
import { useState, useEffect } from 'react';
import { FundDetailsService } from '@/services/fundDetailsService';
import { AIAnalysisService } from '@/services/aiAnalysisService';
import { FundData, UseFundDetailsReturn } from './types/fundDetailsTypes';

export const useFundDetails = (fundId: string | undefined): UseFundDetailsReturn => {
  const [fundData, setFundData] = useState<FundData | null>(null);
  const [latestNAV, setLatestNAV] = useState<any>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [navError, setNavError] = useState<string>('');
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('useFundDetails: Effect triggered with fundId:', fundId);
    
    if (!fundId || fundId === 'undefined') {
      console.log('useFundDetails: Invalid fundId, stopping loading');
      setIsLoading(false);
      setNavError('Invalid fund ID');
      return;
    }

    console.log('useFundDetails: Starting fund data fetch for fundId:', fundId);
    loadFundData();
  }, [fundId]);

  const loadFundData = async () => {
    if (!fundId || fundId === 'undefined') {
      console.log('useFundDetails: Invalid fundId in loadFundData');
      return;
    }

    try {
      setIsLoading(true);
      setNavError('');
      console.log('useFundDetails: Loading basic fund details for:', fundId);
      
      // Load basic fund details - this should always return something
      const { fundData: basicFundData, latestNAV: nav, navError: error } = 
        await FundDetailsService.loadBasicFundDetails(fundId);
      
      console.log('useFundDetails: Basic fund data loaded:', basicFundData);
      
      if (basicFundData) {
        setFundData(basicFundData);
        setLatestNAV(nav);
        setNavError(error);
        setIsLoading(false); // Set loading to false immediately after basic data is loaded
        
        // Load enhanced details and AI analysis in background (non-blocking)
        loadEnhancedDataInBackground(basicFundData);
        
        // Load historical data (non-blocking)
        FundDetailsService.loadHistoricalData(fundId)
          .then(setHistoricalData)
          .catch(err => console.error('Historical data failed:', err));
      } else {
        console.error('useFundDetails: No basic fund data available');
        setIsLoading(false);
        setNavError('Failed to load fund data');
      }
    } catch (error) {
      console.error('useFundDetails: Error in loadFundData:', error);
      setIsLoading(false);
      setNavError('Failed to load fund data');
    }
  };

  const loadEnhancedDataInBackground = async (basicFundData: FundData) => {
    if (!fundId || fundId === 'undefined') return;

    try {
      console.log('useFundDetails: Loading enhanced details in background...');
      
      // Try to get enhanced fund details
      const enhancedFundData = await FundDetailsService.loadEnhancedFundDetails(fundId, basicFundData);
      
      if (enhancedFundData !== basicFundData) {
        console.log('useFundDetails: Enhanced data loaded, updating state');
        setFundData(enhancedFundData);
        setNavError('✓ Performance calculated from actual NAV history data');
      }
      
      // Perform AI analysis with the final fund data
      await performAIAnalysis(enhancedFundData);
      
    } catch (error) {
      console.error('useFundDetails: Error loading enhanced data:', error);
      // Still perform AI analysis with basic data
      await performAIAnalysis(basicFundData);
    }
  };

  const performAIAnalysis = async (fundDataForAnalysis: FundData) => {
    try {
      setAiLoading(true);
      console.log('useFundDetails: Starting AI analysis...');
      
      const { analysis, loading, error } = await AIAnalysisService.performFundAnalysis(fundDataForAnalysis);
      
      setAiAnalysis(analysis);
      setAiLoading(loading);
      setAiError(error);
      
      console.log('useFundDetails: AI analysis completed');
    } catch (error) {
      console.error('useFundDetails: AI analysis error:', error);
      setAiLoading(false);
      setAiError('AI analysis failed');
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

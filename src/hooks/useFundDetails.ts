
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
    if (!fundId) {
      setIsLoading(false);
      return;
    }

    console.log('useFundDetails: Starting fund data fetch for fundId:', fundId);
    loadFundData();
  }, [fundId]);

  const loadFundData = async () => {
    if (!fundId) return;

    try {
      setIsLoading(true);
      
      // Load basic fund details
      const { fundData: basicFundData, latestNAV: nav, navError: error } = 
        await FundDetailsService.loadBasicFundDetails(fundId);
      
      if (basicFundData) {
        setFundData(basicFundData);
        setLatestNAV(nav);
        setNavError(error);
        
        // Load enhanced details and AI analysis in background
        loadEnhancedDataInBackground(basicFundData);
        
        // Load historical data (non-blocking)
        FundDetailsService.loadHistoricalData(fundId).then(setHistoricalData);
      }
    } catch (error) {
      console.error('useFundDetails: Error in loadFundData:', error);
      setNavError('Failed to load fund data');
    } finally {
      setIsLoading(false);
    }
  };

  const loadEnhancedDataInBackground = async (basicFundData: FundData) => {
    if (!fundId) return;

    try {
      // Try to get enhanced fund details
      const enhancedFundData = await FundDetailsService.loadEnhancedFundDetails(fundId, basicFundData);
      
      if (enhancedFundData !== basicFundData) {
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
    setAiLoading(true);
    
    const { analysis, loading, error } = await AIAnalysisService.performFundAnalysis(fundDataForAnalysis);
    
    setAiAnalysis(analysis);
    setAiLoading(loading);
    setAiError(error);
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

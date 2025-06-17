
import { useState, useEffect } from 'react';
import AIFundComparison from './AIFundComparison';
import { FundDataService } from '@/services/fundDataService';
import { FundAnalysisService } from '@/services/fundAnalysisService';
import { supabase } from '@/integrations/supabase/client';

interface FundComparisonData {
  schemeCode: string;
  schemeName: string;
  category: string;
  nav: number;
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  expenseRatio: number;
  aum: number;
  aiScore?: number;
  recommendation?: string;
  confidence?: number;
  reasoning?: string;
  riskLevel?: string;
  strengths?: string[];
  concerns?: string[];
  performanceRank?: number;
  analysis?: any;
}

const FundComparisonContainer = () => {
  const [fund1, setFund1] = useState<FundComparisonData | null>(null);
  const [fund2, setFund2] = useState<FundComparisonData | null>(null);
  const [availableFunds, setAvailableFunds] = useState<any[]>([]);

  useEffect(() => {
    loadAvailableFunds();
  }, []);

  const loadAvailableFunds = () => {
    try {
      // Get funds from analysis results
      const analysisResults = FundAnalysisService.loadAnalysisResults();
      
      if (analysisResults && analysisResults.length > 0) {
        const allFunds = analysisResults.flatMap(category => category.funds);
        setAvailableFunds(allFunds);
        console.log('Loaded funds for comparison:', allFunds.length);
      } else {
        // Fallback to top funds
        const topFunds = FundDataService.TOP_FUNDS.map(fund => ({
          schemeCode: fund.schemeCode,
          schemeName: fund.name
        }));
        setAvailableFunds(topFunds);
      }
    } catch (error) {
      console.error('Error loading available funds:', error);
    }
  };

  const enhanceFundWithAI = async (fundData: FundComparisonData): Promise<FundComparisonData> => {
    try {
      console.log('Enhancing fund with AI analysis:', fundData.schemeName);
      
      const { data, error } = await supabase.functions.invoke('ai-fund-analysis', {
        body: { fundData }
      });

      if (data?.success && data?.analysis) {
        return {
          ...fundData,
          aiScore: data.analysis.aiScore,
          recommendation: data.analysis.recommendation,
          confidence: data.analysis.confidence,
          reasoning: data.analysis.reasoning,
          riskLevel: data.analysis.riskLevel,
          strengths: data.analysis.strengths,
          concerns: data.analysis.concerns,
          performanceRank: data.analysis.performanceRank,
          analysis: data.analysis.analysis
        };
      } else if (data?.fallbackAnalysis) {
        return {
          ...fundData,
          ...data.fallbackAnalysis
        };
      }
    } catch (error) {
      console.error('Error enhancing fund with AI:', error);
    }

    // Return original data if AI enhancement fails
    return fundData;
  };

  const handleFund1Change = async (fund: FundComparisonData) => {
    const enhancedFund = await enhanceFundWithAI(fund);
    setFund1(enhancedFund);
  };

  const handleFund2Change = async (fund: FundComparisonData) => {
    const enhancedFund = await enhanceFundWithAI(fund);
    setFund2(enhancedFund);
  };

  return (
    <AIFundComparison
      fund1={fund1}
      fund2={fund2}
      onFund1Change={handleFund1Change}
      onFund2Change={handleFund2Change}
      availableFunds={availableFunds}
    />
  );
};

export default FundComparisonContainer;

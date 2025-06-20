
import { supabase } from '@/integrations/supabase/client';
import { FundData } from '@/hooks/types/fundDetailsTypes';

export class AIAnalysisService {
  static async performFundAnalysis(fundData: FundData): Promise<{
    analysis: any;
    loading: boolean;
    error: string;
  }> {
    console.log('AIAnalysisService: Starting AI analysis');
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-fund-analysis', {
        body: { fundData }
      });

      if (error) {
        throw new Error(`AI Analysis failed: ${error.message}`);
      }

      if (data.success) {
        console.log('AIAnalysisService: AI analysis completed:', data.analysis);
        return {
          analysis: data.analysis,
          loading: false,
          error: ''
        };
      } else {
        console.log('AIAnalysisService: AI analysis failed, using fallback:', data.fallbackAnalysis);
        return {
          analysis: data.fallbackAnalysis,
          loading: false,
          error: 'AI analysis partially failed, showing fallback assessment'
        };
      }
    } catch (error) {
      console.error('AIAnalysisService: AI analysis error:', error);
      
      // Fallback analysis
      const fallbackAnalysis = {
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
      };
      
      return {
        analysis: fallbackAnalysis,
        loading: false,
        error: 'AI analysis unavailable'
      };
    }
  }
}

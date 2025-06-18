
import { supabase } from "@/integrations/supabase/client";
import { FundWithDetails, EnhancedComparisonResult } from './types';

export class AIComparisonService {
  static async performAIComparison(enhancedFunds: FundWithDetails[]): Promise<EnhancedComparisonResult> {
    console.log('AIComparisonService: Calling AI comparison service...');
    
    const { data, error } = await supabase.functions.invoke('ai-fund-comparison', {
      body: { funds: enhancedFunds }
    });

    if (error) {
      console.error('AIComparisonService: AI service error:', error);
      throw new Error(`AI Comparison failed: ${error.message}`);
    }

    if (!data.success || !data.analysis) {
      console.log('AIComparisonService: AI analysis failed, invalid data returned');
      throw new Error('AI analysis returned invalid data');
    }

    console.log('AIComparisonService: AI analysis completed successfully - READY FOR CACHING');
    
    return this.transformAIResponse(data.analysis, enhancedFunds);
  }

  private static transformAIResponse(aiAnalysis: any, enhancedFunds: FundWithDetails[]): EnhancedComparisonResult {
    const bestFund = aiAnalysis.overallWinner;
    
    // Map individual fund analysis
    const analysisResults = aiAnalysis.individualAnalysis.map((aiResult: any) => {
      const originalFund = enhancedFunds.find(f => f.schemeName === aiResult.fundName);
      return {
        ...originalFund,
        aiScore: aiResult.aiScore,
        recommendation: aiResult.rating,
        confidence: aiResult.confidence,
        reasoning: aiResult.performanceAnalysis,
        strengths: aiResult.strengths,
        concerns: aiResult.concerns,
        riskAnalysis: aiResult.riskAnalysis,
        fundManagerAnalysis: aiResult.fundManagerAnalysis,
        expenseAnalysis: aiResult.expenseAnalysis,
        investmentRecommendation: aiResult.recommendation,
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };
    });

    return {
      bestFund: bestFund.fundName,
      bestScore: bestFund.aiScore,
      analysis: analysisResults,
      reasoning: bestFund.reasoning,
      marketRecommendation: aiAnalysis.marketContext.allocationAdvice,
      marketTiming: {
        currentPhase: aiAnalysis.marketContext.currentMarketPhase,
        allocation: { recommendation: aiAnalysis.marketContext.allocationAdvice },
        confidence: 8,
        nextReview: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      isStableResult: true,
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      aiAnalysis: aiAnalysis,
      categoryComparison: aiAnalysis.categoryComparison,
      keyInsights: aiAnalysis.keyInsights
    };
  }
}

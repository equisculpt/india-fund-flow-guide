
import { AnalysisResult } from './types.ts';

export function generateFallbackAnalysis(): AnalysisResult {
  return {
    aiScore: 6.5,
    recommendation: 'REVIEW',
    confidence: 60,
    reasoning: 'AI research analysis temporarily unavailable. Manual review suggested for detailed assessment.',
    riskLevel: 'Moderate',
    strengths: ['Available for investment'],
    concerns: ['Analysis service temporarily unavailable'],
    performanceRank: 50,
    analysis: {
      performanceScore: 6.5,
      volatilityScore: 6.0,
      expenseScore: 7.0,
      fundManagerScore: 6.5,
      portfolioQualityScore: 6.5
    }
  };
}

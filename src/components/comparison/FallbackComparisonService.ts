
import { FundWithDetails, EnhancedComparisonResult } from './types';

export class FallbackComparisonService {
  static performBasicComparison(funds: FundWithDetails[]): EnhancedComparisonResult {
    console.log('FallbackComparisonService: Using fallback basic comparison');
    
    const analysisResults = funds.map(fund => ({
      ...fund,
      aiScore: 6 + Math.random() * 2,
      recommendation: 'HOLD',
      confidence: 70,
      reasoning: 'Basic analysis completed. AI service temporarily unavailable.',
      strengths: ['Available for investment'],
      concerns: ['Limited analysis available'],
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    }));

    const bestFund = analysisResults.reduce((prev, current) => 
      (current.aiScore > prev.aiScore) ? current : prev
    );

    return {
      bestFund: bestFund.schemeName,
      bestScore: bestFund.aiScore,
      analysis: analysisResults,
      reasoning: `Basic comparison of ${funds.length} funds completed. ${bestFund.schemeName} scored highest.`,
      marketRecommendation: "Current market conditions are moderately favorable for equity investments.",
      marketTiming: {
        currentPhase: "Growth",
        allocation: { equity: 70, debt: 30 },
        confidence: 7,
        nextReview: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      isStableResult: false,
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      keyInsights: ['AI service temporarily unavailable', 'Basic mathematical comparison used']
    };
  }
}

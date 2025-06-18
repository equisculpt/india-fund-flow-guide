import { RecentPerformanceAnalyzer } from "@/services/recentPerformanceAnalyzer";
import { MarketCycleAnalyzer } from "@/services/marketCycleAnalyzer";
import { StableFundComparison } from "@/services/stableFundComparison";
import { FundScoring } from "./FundScoring";
import { RecommendationGenerator } from "./RecommendationGenerator";

export interface FundWithDetails {
  schemeCode: string;
  schemeName: string;
  category?: string;
  fundHouse?: string;
  nav: number;
  navDate: string;
  returns1M?: number;
  returns2M?: number;
  returns3M?: number;
  returns6M?: number;
  returns1Y?: number;
  returns3Y?: number;
  returns5Y?: number;
  expenseRatio?: number;
  aum?: number;
}

export interface EnhancedComparisonResult {
  bestFund: string;
  bestScore: number;
  analysis: any[];
  reasoning: string;
  marketRecommendation: string;
  marketTiming: {
    currentPhase: string;
    allocation: any;
    confidence: number;
    nextReview: string;
  };
  isStableResult: boolean;
  validUntil: string;
}

export class FundComparisonLogic {
  static performComparison(funds: FundWithDetails[]): EnhancedComparisonResult | null {
    if (funds.length < 2) return null;

    console.log('FundComparisonLogic: Starting enhanced stable comparison for', funds.length, 'funds');

    const fundIds = funds.map(f => f.schemeCode);
    
    // Check for stable cached results first
    const stableComparison = StableFundComparison.getStableComparison(fundIds);
    if (stableComparison) {
      console.log('FundComparisonLogic: Using stable cached comparison results');
      return this.formatStableResult(funds, stableComparison);
    }

    // Get current market cycle analysis
    const marketCycle = MarketCycleAnalyzer.getCurrentMarketCycle();
    console.log('FundComparisonLogic: Market phase:', marketCycle.phase, 'Confidence:', marketCycle.confidenceLevel);

    // Perform fresh analysis with market context
    const analysisResults = this.performFreshAnalysis(funds, marketCycle);

    // Find the best fund and save stable comparison
    const bestFund = analysisResults.reduce((prev, current) => 
      (current.aiScore > prev.aiScore) ? current : prev
    );

    this.saveStableComparison(fundIds, analysisResults, marketCycle);

    // Generate comparison result
    return this.generateComparisonResult(analysisResults, bestFund, marketCycle, funds);
  }

  private static performFreshAnalysis(funds: FundWithDetails[], marketCycle: any) {
    return funds.map(fund => {
      const recentPerformance = RecentPerformanceAnalyzer.analyzeRecentPerformance({
        returns1M: fund.returns1M || 0,
        returns2M: fund.returns2M || 0,
        returns3M: fund.returns3M || 0,
        returns6M: fund.returns6M || 0,
        returns1Y: fund.returns1Y || 0,
        returns3Y: fund.returns3Y || 0,
        returns5Y: fund.returns5Y || 0,
      });

      // Calculate base scores
      const portfolioScore = FundScoring.calculatePortfolioScore(fund);
      const recentScore = recentPerformance.momentumScore;
      const expenseScore = FundScoring.calculateExpenseScore(fund);
      
      // Apply market cycle adjustments
      const marketWeight = FundScoring.getMarketCycleWeight(fund.category || 'Large Cap', marketCycle);
      const marketScore = 5 * marketWeight;

      // Calculate base AI score
      const baseAIScore = (portfolioScore * 0.4) + 
                         (recentScore * 0.35) + 
                         (expenseScore * 0.15) + 
                         (marketScore * 0.1);

      // Generate stability score for consistent results
      const stabilityScore = StableFundComparison.calculateStabilityScore(
        fund.schemeCode, 
        baseAIScore, 
        marketCycle
      );

      return {
        ...fund,
        aiScore: stabilityScore.marketAdjustedScore,
        baseScore: stabilityScore.baseScore,
        portfolioScore,
        recentScore,
        expenseScore,
        marketScore,
        confidence: stabilityScore.confidence,
        recentPerformance,
        recommendation: FundScoring.getRecommendation(stabilityScore.marketAdjustedScore),
        validUntil: stabilityScore.nextReviewDate
      };
    });
  }

  private static saveStableComparison(fundIds: string[], analysisResults: any[], marketCycle: any) {
    const stableRankings = analysisResults.map(fund => ({
      fundId: fund.schemeCode,
      baseScore: fund.baseScore,
      marketAdjustedScore: fund.aiScore,
      confidence: fund.confidence,
      lastUpdated: new Date().toISOString(),
      nextReviewDate: fund.validUntil
    }));

    const avgConfidence = analysisResults.reduce((sum, f) => sum + f.confidence, 0) / analysisResults.length;
    
    StableFundComparison.saveStableComparison(
      fundIds,
      stableRankings,
      marketCycle.reasoning,
      avgConfidence
    );
  }

  private static generateComparisonResult(analysisResults: any[], bestFund: any, marketCycle: any, funds: FundWithDetails[]): EnhancedComparisonResult {
    return {
      bestFund: bestFund.schemeName,
      bestScore: bestFund.aiScore,
      analysis: analysisResults,
      reasoning: RecommendationGenerator.generateEnhancedReasoning(analysisResults, bestFund, marketCycle),
      marketRecommendation: RecommendationGenerator.generateMarketAwareRecommendation(funds, marketCycle),
      marketTiming: {
        currentPhase: marketCycle.phase,
        allocation: marketCycle.allocationRecommendation,
        confidence: marketCycle.confidenceLevel,
        nextReview: marketCycle.nextPhaseExpected
      },
      isStableResult: false,
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
  }

  private static formatStableResult(funds: FundWithDetails[], stableComparison: any): EnhancedComparisonResult {
    // Reconstruct analysis from stable comparison
    const analysis = funds.map(fund => {
      const stableScore = stableComparison.stableRankings.find(r => r.fundId === fund.schemeCode);
      return {
        ...fund,
        aiScore: stableScore?.marketAdjustedScore || 5,
        confidence: stableScore?.confidence || 7,
        recommendation: FundScoring.getRecommendation(stableScore?.marketAdjustedScore || 5),
        isStableResult: true
      };
    });

    const bestFund = analysis.reduce((prev, current) => 
      (current.aiScore > prev.aiScore) ? current : prev
    );

    const marketCycle = MarketCycleAnalyzer.getCurrentMarketCycle();

    return {
      bestFund: bestFund.schemeName,
      bestScore: bestFund.aiScore,
      analysis,
      reasoning: `Stable analysis (${stableComparison.recommendationConfidence.toFixed(1)}/10 confidence): ${stableComparison.marketContext}`,
      marketRecommendation: StableFundComparison.generateMarketTimingAdvice(marketCycle),
      marketTiming: {
        currentPhase: marketCycle.phase,
        allocation: marketCycle.allocationRecommendation,
        confidence: marketCycle.confidenceLevel,
        nextReview: marketCycle.nextPhaseExpected
      },
      isStableResult: true,
      validUntil: stableComparison.validUntil
    };
  }
}


import { RecentPerformanceAnalyzer } from "@/services/recentPerformanceAnalyzer";
import { MarketCycleAnalyzer } from "@/services/marketCycleAnalyzer";
import { StableFundComparison } from "@/services/stableFundComparison";

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
    const analysisResults = funds.map(fund => {
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
      const portfolioScore = this.calculatePortfolioScore(fund);
      const recentScore = recentPerformance.momentumScore;
      const expenseScore = this.calculateExpenseScore(fund);
      
      // Apply market cycle adjustments
      const marketWeight = this.getMarketCycleWeight(fund.category || 'Large Cap', marketCycle);
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
        recommendation: this.getRecommendation(stabilityScore.marketAdjustedScore),
        validUntil: stabilityScore.nextReviewDate
      };
    });

    // Find the best fund based on market-adjusted scores
    const bestFund = analysisResults.reduce((prev, current) => 
      (current.aiScore > prev.aiScore) ? current : prev
    );

    // Save stable comparison for future use
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

    // Generate comparison result
    const comparison: EnhancedComparisonResult = {
      bestFund: bestFund.schemeName,
      bestScore: bestFund.aiScore,
      analysis: analysisResults,
      reasoning: this.generateEnhancedReasoning(analysisResults, bestFund, marketCycle),
      marketRecommendation: this.generateMarketAwareRecommendation(funds, marketCycle),
      marketTiming: {
        currentPhase: marketCycle.phase,
        allocation: marketCycle.allocationRecommendation,
        confidence: marketCycle.confidenceLevel,
        nextReview: marketCycle.nextPhaseExpected
      },
      isStableResult: false,
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    return comparison;
  }

  private static formatStableResult(funds: FundWithDetails[], stableComparison: any): EnhancedComparisonResult {
    // Reconstruct analysis from stable comparison
    const analysis = funds.map(fund => {
      const stableScore = stableComparison.stableRankings.find(r => r.fundId === fund.schemeCode);
      return {
        ...fund,
        aiScore: stableScore?.marketAdjustedScore || 5,
        confidence: stableScore?.confidence || 7,
        recommendation: this.getRecommendation(stableScore?.marketAdjustedScore || 5),
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

  private static getMarketCycleWeight(category: string, marketCycle: any): number {
    const phaseWeights = {
      'Bottom': {
        'Small Cap': 1.3,
        'Mid Cap': 1.2,
        'Large Cap': 1.0,
        'Debt': 0.8,
        'ELSS': 1.1,
        'Hybrid': 0.9
      },
      'Recovery': {
        'Small Cap': 1.2,
        'Mid Cap': 1.15,
        'Large Cap': 1.05,
        'Debt': 0.9,
        'ELSS': 1.1,
        'Hybrid': 1.0
      },
      'Growth': {
        'Small Cap': 1.1,
        'Mid Cap': 1.1,
        'Large Cap': 1.0,
        'Debt': 1.0,
        'ELSS': 1.05,
        'Hybrid': 1.0
      },
      'Peak': {
        'Small Cap': 0.8,
        'Mid Cap': 0.85,
        'Large Cap': 1.1,
        'Debt': 1.3,
        'ELSS': 0.9,
        'Hybrid': 1.15
      },
      'Correction': {
        'Small Cap': 0.7,
        'Mid Cap': 0.8,
        'Large Cap': 1.2,
        'Debt': 1.4,
        'ELSS': 0.9,
        'Hybrid': 1.1
      }
    };

    return phaseWeights[marketCycle.phase]?.[category] || 1.0;
  }

  private static calculatePortfolioScore(fund: FundWithDetails): number {
    let score = 5; // Base score
    
    // AUM factor
    if (fund.aum && fund.aum > 10000) score += 1;
    else if (fund.aum && fund.aum > 5000) score += 0.5;
    
    // Category stability factor
    if (fund.category?.includes('Large Cap')) score += 0.5;
    if (fund.category?.includes('Small Cap')) score += 1; // Higher growth potential
    
    return Math.min(10, Math.max(1, score));
  }

  private static calculateExpenseScore(fund: FundWithDetails): number {
    if (!fund.expenseRatio) return 5;
    
    if (fund.expenseRatio < 0.5) return 9;
    if (fund.expenseRatio < 1.0) return 8;
    if (fund.expenseRatio < 1.5) return 6;
    if (fund.expenseRatio < 2.0) return 4;
    return 2;
  }

  private static getRecommendation(score: number): string {
    if (score >= 8.5) return 'STRONG BUY';
    if (score >= 7.5) return 'BUY';
    if (score >= 6.5) return 'HOLD';
    if (score >= 5.5) return 'WEAK HOLD';
    return 'AVOID';
  }

  private static generateEnhancedReasoning(analysis: any[], bestFund: any, marketCycle: any): string {
    const marketContext = `In current ${marketCycle.phase} market phase, `;
    const bestFundReasons = [];
    
    if (bestFund.portfolioScore > 7) bestFundReasons.push('strong portfolio quality');
    if (bestFund.recentScore > 7) bestFundReasons.push('excellent recent momentum');
    if (bestFund.expenseScore > 7) bestFundReasons.push('cost efficiency');
    if (bestFund.marketScore > 6) bestFundReasons.push('favorable market positioning');
    
    return marketContext + bestFundReasons.join(', ') + ` gives ${bestFund.schemeName} the highest market-adjusted score of ${bestFund.aiScore.toFixed(1)}/10.`;
  }

  private static generateMarketAwareRecommendation(funds: FundWithDetails[], marketCycle: any): string {
    const categories = [...new Set(funds.map(f => f.category))];
    const phase = marketCycle.phase;
    const allocation = marketCycle.allocationRecommendation;
    
    let recommendation = `Market Timing Analysis: Currently in ${phase} phase. `;
    recommendation += `Recommended allocation - Equity: ${allocation.equity}%, Debt: ${allocation.debt}%. `;
    
    if (categories.length === 1) {
      const category = categories[0];
      switch (phase) {
        case 'Bottom':
          recommendation += category?.includes('Small') ? 'Excellent timing for small cap investments.' : 'Good time to accumulate quality equity funds.';
          break;
        case 'Peak':
          recommendation += category?.includes('Debt') ? 'Debt funds well-positioned in current environment.' : 'Consider reducing equity exposure gradually.';
          break;
        default:
          recommendation += 'Maintain systematic investment approach.';
      }
    } else {
      recommendation += `Among compared categories (${categories.join(', ')}), market favors diversified approach with current phase preferences.`;
    }
    
    return recommendation;
  }
}

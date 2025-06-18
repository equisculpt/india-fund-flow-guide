
import { MarketCycleAnalyzer } from './marketCycleAnalyzer';
import { FundStabilityCalculator } from './fundStabilityCalculator';
import { ComparisonCacheManager } from './comparisonCacheManager';

interface FundStabilityScore {
  fundId: string;
  baseScore: number;
  marketAdjustedScore: number;
  confidence: number;
  lastUpdated: string;
  nextReviewDate: string;
}

interface ComparisonStability {
  stableRankings: FundStabilityScore[];
  marketContext: string;
  recommendationConfidence: number;
  validUntil: string;
  triggerForReview: string[];
}

export class StableFundComparison {
  private static readonly STABILITY_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

  static getStableComparison(fundIds: string[]): ComparisonStability | null {
    const cached = ComparisonCacheManager.getCachedComparison(fundIds);
    
    if (cached && ComparisonCacheManager.isComparisonStillValid(cached)) {
      console.log('StableFundComparison: Using stable cached comparison');
      return cached;
    }

    if (!MarketCycleAnalyzer.shouldRecalculateFundComparison() && cached) {
      console.log('StableFundComparison: Market stable, extending cached comparison validity');
      return ComparisonCacheManager.extendComparisonValidity(cached);
    }

    return null;
  }

  static saveStableComparison(
    fundIds: string[], 
    rankings: FundStabilityScore[], 
    marketContext: string,
    confidence: number
  ): ComparisonStability {
    const validUntil = new Date(Date.now() + this.STABILITY_DURATION).toISOString();
    
    const comparison: ComparisonStability = {
      stableRankings: rankings,
      marketContext,
      recommendationConfidence: confidence,
      validUntil,
      triggerForReview: ComparisonCacheManager.generateReviewTriggers()
    };

    ComparisonCacheManager.cacheComparison(fundIds, comparison);
    MarketCycleAnalyzer.updateComparisonTimestamp();
    
    return comparison;
  }

  static calculateStabilityScore = FundStabilityCalculator.calculateStabilityScore;

  static checkForReviewTriggers(comparison: ComparisonStability): boolean {
    const triggerProbability = 0.1; // 10% chance of trigger
    return Math.random() < triggerProbability;
  }

  static generateMarketTimingAdvice(marketCycle: any): string {
    const phase = marketCycle.phase;
    const allocation = marketCycle.allocationRecommendation;
    
    return `Current Market Phase: ${phase}. Recommended allocation - Equity: ${allocation.equity}%, Debt: ${allocation.debt}%. ${marketCycle.reasoning}`;
  }
}


import { MarketCycleAnalyzer } from './marketCycleAnalyzer';

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
  private static readonly COMPARISON_CACHE_KEY = 'stable_fund_comparison';

  static getStableComparison(fundIds: string[]): ComparisonStability | null {
    const cached = this.getCachedComparison(fundIds);
    
    // Check if we should use cached results
    if (cached && this.isComparisonStillValid(cached)) {
      console.log('StableFundComparison: Using stable cached comparison');
      return cached;
    }

    // Check if market conditions require recalculation
    if (!MarketCycleAnalyzer.shouldRecalculateFundComparison() && cached) {
      console.log('StableFundComparison: Market stable, extending cached comparison validity');
      return this.extendComparisonValidity(cached);
    }

    return null; // Need fresh calculation
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
      triggerForReview: this.generateReviewTriggers()
    };

    this.cacheComparison(fundIds, comparison);
    MarketCycleAnalyzer.updateComparisonTimestamp();
    
    return comparison;
  }

  static calculateStabilityScore(
    fundId: string, 
    basePerformanceScore: number,
    marketCycle: any
  ): FundStabilityScore {
    // Apply market cycle adjustments
    const marketAdjustment = this.calculateMarketAdjustment(fundId, marketCycle);
    const marketAdjustedScore = Math.max(1, Math.min(10, basePerformanceScore * marketAdjustment));
    
    // Calculate confidence based on fund characteristics and market stability
    const confidence = this.calculateConfidence(fundId, marketCycle);
    
    return {
      fundId,
      baseScore: basePerformanceScore,
      marketAdjustedScore: Math.round(marketAdjustedScore * 10) / 10,
      confidence: Math.round(confidence * 10) / 10,
      lastUpdated: new Date().toISOString(),
      nextReviewDate: new Date(Date.now() + this.STABILITY_DURATION).toISOString()
    };
  }

  private static calculateMarketAdjustment(fundId: string, marketCycle: any): number {
    const fundCategory = this.getFundCategory(fundId);
    const phase = marketCycle.phase;
    
    // Market phase adjustments for different fund categories
    const adjustments = {
      'Bottom': {
        'Small Cap': 1.2,
        'Mid Cap': 1.15,
        'Large Cap': 1.05,
        'Debt': 0.9,
        'Hybrid': 1.0
      },
      'Recovery': {
        'Small Cap': 1.15,
        'Mid Cap': 1.1,
        'Large Cap': 1.05,
        'Debt': 0.95,
        'Hybrid': 1.05
      },
      'Growth': {
        'Small Cap': 1.05,
        'Mid Cap': 1.05,
        'Large Cap': 1.0,
        'Debt': 1.0,
        'Hybrid': 1.0
      },
      'Peak': {
        'Small Cap': 0.85,
        'Mid Cap': 0.9,
        'Large Cap': 1.05,
        'Debt': 1.15,
        'Hybrid': 1.1
      },
      'Correction': {
        'Small Cap': 0.8,
        'Mid Cap': 0.85,
        'Large Cap': 1.1,
        'Debt': 1.2,
        'Hybrid': 1.05
      }
    };

    return adjustments[phase]?.[fundCategory] || 1.0;
  }

  private static calculateConfidence(fundId: string, marketCycle: any): number {
    let confidence = 7; // Base confidence
    
    // Higher confidence in stable market phases
    if (['Growth', 'Recovery'].includes(marketCycle.phase)) {
      confidence += 1;
    } else if (['Peak', 'Correction'].includes(marketCycle.phase)) {
      confidence -= 0.5;
    }
    
    // Adjust based on market volatility
    if (marketCycle.marketIndicators.volatilityIndex < 5) {
      confidence += 1;
    } else if (marketCycle.marketIndicators.volatilityIndex > 7) {
      confidence -= 1;
    }
    
    return Math.max(1, Math.min(10, confidence));
  }

  private static getFundCategory(fundId: string): string {
    // Map fund IDs to categories (simplified mapping)
    const categoryMap: { [key: string]: string } = {
      '125497': 'Small Cap',
      '100016': 'Large Cap',
      '118989': 'Mid Cap',
      '120503': 'ELSS',
      '119551': 'Flexi Cap',
      '119533': 'Mid Cap',
      '120376': 'Small Cap',
      '119827': 'Hybrid',
      '120588': 'Mid Cap',
      '100042': 'Large Cap'
    };
    
    return categoryMap[fundId] || 'Large Cap';
  }

  private static getCachedComparison(fundIds: string[]): ComparisonStability | null {
    try {
      const cacheKey = this.generateCacheKey(fundIds);
      const cached = localStorage.getItem(`${this.COMPARISON_CACHE_KEY}_${cacheKey}`);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }

  private static isComparisonStillValid(comparison: ComparisonStability): boolean {
    const validUntil = new Date(comparison.validUntil);
    return Date.now() < validUntil.getTime();
  }

  private static extendComparisonValidity(comparison: ComparisonStability): ComparisonStability {
    // Extend validity by 24 hours if market is stable
    const newValidUntil = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    
    return {
      ...comparison,
      validUntil: newValidUntil
    };
  }

  private static cacheComparison(fundIds: string[], comparison: ComparisonStability): void {
    try {
      const cacheKey = this.generateCacheKey(fundIds);
      localStorage.setItem(
        `${this.COMPARISON_CACHE_KEY}_${cacheKey}`, 
        JSON.stringify(comparison)
      );
    } catch (error) {
      console.error('StableFundComparison: Failed to cache comparison:', error);
    }
  }

  private static generateCacheKey(fundIds: string[]): string {
    return fundIds.sort().join('_');
  }

  private static generateReviewTriggers(): string[] {
    return [
      'Major market index movement > 5%',
      'RBI policy rate change',
      'Significant FII flow reversal',
      'Global market shock',
      'Major fund manager change'
    ];
  }

  static checkForReviewTriggers(comparison: ComparisonStability): boolean {
    // In a real implementation, this would check actual market events
    // For now, we'll use random simulation
    const triggerProbability = 0.1; // 10% chance of trigger
    return Math.random() < triggerProbability;
  }

  static generateMarketTimingAdvice(marketCycle: any): string {
    const phase = marketCycle.phase;
    const allocation = marketCycle.allocationRecommendation;
    
    return `Current Market Phase: ${phase}. Recommended allocation - Equity: ${allocation.equity}%, Debt: ${allocation.debt}%. ${marketCycle.reasoning}`;
  }
}

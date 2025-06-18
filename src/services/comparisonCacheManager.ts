
interface ComparisonStability {
  stableRankings: any[];
  marketContext: string;
  recommendationConfidence: number;
  validUntil: string;
  triggerForReview: string[];
}

export class ComparisonCacheManager {
  private static readonly COMPARISON_CACHE_KEY = 'stable_fund_comparison';

  static getCachedComparison(fundIds: string[]): ComparisonStability | null {
    try {
      const cacheKey = this.generateCacheKey(fundIds);
      const cached = localStorage.getItem(`${this.COMPARISON_CACHE_KEY}_${cacheKey}`);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }

  static isComparisonStillValid(comparison: ComparisonStability): boolean {
    const validUntil = new Date(comparison.validUntil);
    return Date.now() < validUntil.getTime();
  }

  static extendComparisonValidity(comparison: ComparisonStability): ComparisonStability {
    const newValidUntil = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    
    return {
      ...comparison,
      validUntil: newValidUntil
    };
  }

  static cacheComparison(fundIds: string[], comparison: ComparisonStability): void {
    try {
      const cacheKey = this.generateCacheKey(fundIds);
      localStorage.setItem(
        `${this.COMPARISON_CACHE_KEY}_${cacheKey}`, 
        JSON.stringify(comparison)
      );
    } catch (error) {
      console.error('ComparisonCacheManager: Failed to cache comparison:', error);
    }
  }

  private static generateCacheKey(fundIds: string[]): string {
    return fundIds.sort().join('_');
  }

  static generateReviewTriggers(): string[] {
    return [
      'Major market index movement > 5%',
      'RBI policy rate change',
      'Significant FII flow reversal',
      'Global market shock',
      'Major fund manager change'
    ];
  }
}

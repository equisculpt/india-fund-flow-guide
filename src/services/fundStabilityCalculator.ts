
interface FundStabilityScore {
  fundId: string;
  baseScore: number;
  marketAdjustedScore: number;
  confidence: number;
  lastUpdated: string;
  nextReviewDate: string;
}

export class FundStabilityCalculator {
  private static readonly STABILITY_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

  static calculateStabilityScore(
    fundId: string, 
    basePerformanceScore: number,
    marketCycle: any
  ): FundStabilityScore {
    const marketAdjustment = this.calculateMarketAdjustment(fundId, marketCycle);
    const marketAdjustedScore = Math.max(1, Math.min(10, basePerformanceScore * marketAdjustment));
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
    
    const adjustments = {
      'Bottom': {
        'Small Cap': 1.2, 'Mid Cap': 1.15, 'Large Cap': 1.05, 'Debt': 0.9, 'Hybrid': 1.0
      },
      'Recovery': {
        'Small Cap': 1.15, 'Mid Cap': 1.1, 'Large Cap': 1.05, 'Debt': 0.95, 'Hybrid': 1.05
      },
      'Growth': {
        'Small Cap': 1.05, 'Mid Cap': 1.05, 'Large Cap': 1.0, 'Debt': 1.0, 'Hybrid': 1.0
      },
      'Peak': {
        'Small Cap': 0.85, 'Mid Cap': 0.9, 'Large Cap': 1.05, 'Debt': 1.15, 'Hybrid': 1.1
      },
      'Correction': {
        'Small Cap': 0.8, 'Mid Cap': 0.85, 'Large Cap': 1.1, 'Debt': 1.2, 'Hybrid': 1.05
      }
    };

    return adjustments[phase]?.[fundCategory] || 1.0;
  }

  private static calculateConfidence(fundId: string, marketCycle: any): number {
    let confidence = 7;
    
    if (['Growth', 'Recovery'].includes(marketCycle.phase)) {
      confidence += 1;
    } else if (['Peak', 'Correction'].includes(marketCycle.phase)) {
      confidence -= 0.5;
    }
    
    if (marketCycle.marketIndicators.volatilityIndex < 5) {
      confidence += 1;
    } else if (marketCycle.marketIndicators.volatilityIndex > 7) {
      confidence -= 1;
    }
    
    return Math.max(1, Math.min(10, confidence));
  }

  private static getFundCategory(fundId: string): string {
    const categoryMap: { [key: string]: string } = {
      '125497': 'Small Cap', '100016': 'Large Cap', '118989': 'Mid Cap',
      '120503': 'ELSS', '119551': 'Flexi Cap', '119533': 'Mid Cap',
      '120376': 'Small Cap', '119827': 'Hybrid', '120588': 'Mid Cap', '100042': 'Large Cap'
    };
    
    return categoryMap[fundId] || 'Large Cap';
  }
}

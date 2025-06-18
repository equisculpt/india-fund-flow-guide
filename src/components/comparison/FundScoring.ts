
interface FundWithDetails {
  schemeCode: string;
  schemeName: string;
  category?: string;
  aum?: number;
  expenseRatio?: number;
}

export class FundScoring {
  static calculatePortfolioScore(fund: FundWithDetails): number {
    let score = 5; // Base score
    
    // AUM factor
    if (fund.aum && fund.aum > 10000) score += 1;
    else if (fund.aum && fund.aum > 5000) score += 0.5;
    
    // Category stability factor
    if (fund.category?.includes('Large Cap')) score += 0.5;
    if (fund.category?.includes('Small Cap')) score += 1; // Higher growth potential
    
    return Math.min(10, Math.max(1, score));
  }

  static calculateExpenseScore(fund: FundWithDetails): number {
    if (!fund.expenseRatio) return 5;
    
    if (fund.expenseRatio < 0.5) return 9;
    if (fund.expenseRatio < 1.0) return 8;
    if (fund.expenseRatio < 1.5) return 6;
    if (fund.expenseRatio < 2.0) return 4;
    return 2;
  }

  static getRecommendation(score: number): string {
    if (score >= 8.5) return 'STRONG BUY';
    if (score >= 7.5) return 'BUY';
    if (score >= 6.5) return 'HOLD';
    if (score >= 5.5) return 'WEAK HOLD';
    return 'AVOID';
  }

  static getMarketCycleWeight(category: string, marketCycle: any): number {
    const phaseWeights = {
      'Bottom': { 'Small Cap': 1.3, 'Mid Cap': 1.2, 'Large Cap': 1.0, 'Debt': 0.8, 'ELSS': 1.1, 'Hybrid': 0.9 },
      'Recovery': { 'Small Cap': 1.2, 'Mid Cap': 1.15, 'Large Cap': 1.05, 'Debt': 0.9, 'ELSS': 1.1, 'Hybrid': 1.0 },
      'Growth': { 'Small Cap': 1.1, 'Mid Cap': 1.1, 'Large Cap': 1.0, 'Debt': 1.0, 'ELSS': 1.05, 'Hybrid': 1.0 },
      'Peak': { 'Small Cap': 0.8, 'Mid Cap': 0.85, 'Large Cap': 1.1, 'Debt': 1.3, 'ELSS': 0.9, 'Hybrid': 1.15 },
      'Correction': { 'Small Cap': 0.7, 'Mid Cap': 0.8, 'Large Cap': 1.2, 'Debt': 1.4, 'ELSS': 0.9, 'Hybrid': 1.1 }
    };

    return phaseWeights[marketCycle.phase]?.[category] || 1.0;
  }
}

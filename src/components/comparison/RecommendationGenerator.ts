
interface FundWithDetails {
  category?: string;
}

export class RecommendationGenerator {
  static generateEnhancedReasoning(analysis: any[], bestFund: any, marketCycle: any): string {
    const marketContext = `In current ${marketCycle.phase} market phase, `;
    const bestFundReasons = [];
    
    if (bestFund.portfolioScore > 7) bestFundReasons.push('strong portfolio quality');
    if (bestFund.recentScore > 7) bestFundReasons.push('excellent recent momentum');
    if (bestFund.expenseScore > 7) bestFundReasons.push('cost efficiency');
    if (bestFund.marketScore > 6) bestFundReasons.push('favorable market positioning');
    
    return marketContext + bestFundReasons.join(', ') + ` gives ${bestFund.schemeName} the highest market-adjusted score of ${bestFund.aiScore.toFixed(1)}/10.`;
  }

  static generateMarketAwareRecommendation(funds: FundWithDetails[], marketCycle: any): string {
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

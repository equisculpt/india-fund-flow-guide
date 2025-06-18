
interface RecentPerformanceData {
  returns1M: number;
  returns2M: number;
  returns3M: number;
  returns6M: number;
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
}

interface PerformanceInsight {
  recentTrend: 'improving' | 'declining' | 'stable';
  momentumScore: number; // 1-10 scale
  consistencyScore: number; // 1-10 scale
  recentVsHistorical: number; // positive means recent is better
  insight: string;
}

export class RecentPerformanceAnalyzer {
  static analyzeRecentPerformance(performance: RecentPerformanceData): PerformanceInsight {
    const recentAvg = (performance.returns1M + performance.returns2M + performance.returns3M) / 3;
    const historicalAvg = (performance.returns1Y + performance.returns3Y + performance.returns5Y) / 3;
    
    // Calculate momentum (recent 3M vs 6M-1Y)
    const mediumTermAvg = (performance.returns6M + performance.returns1Y) / 2;
    const momentum = recentAvg - mediumTermAvg;
    
    // Calculate consistency (volatility of recent returns)
    const recentReturns = [performance.returns1M, performance.returns2M, performance.returns3M];
    const recentStdDev = this.calculateStandardDeviation(recentReturns);
    
    // Determine trend
    let recentTrend: 'improving' | 'declining' | 'stable' = 'stable';
    if (momentum > 2) recentTrend = 'improving';
    else if (momentum < -2) recentTrend = 'declining';
    
    // Score momentum (1-10)
    const momentumScore = Math.max(1, Math.min(10, 5 + (momentum / 5)));
    
    // Score consistency (lower volatility = higher score)
    const consistencyScore = Math.max(1, Math.min(10, 10 - (recentStdDev / 2)));
    
    // Recent vs historical comparison
    const recentVsHistorical = recentAvg - historicalAvg;
    
    // Generate insight
    let insight = '';
    if (recentTrend === 'improving') {
      insight = `Fund shows strong recent momentum with ${recentAvg.toFixed(1)}% average in last 3 months vs ${mediumTermAvg.toFixed(1)}% medium-term average. Strategy appears to be working well in current market conditions.`;
    } else if (recentTrend === 'declining') {
      insight = `Fund experiencing recent headwinds with ${recentAvg.toFixed(1)}% average vs ${mediumTermAvg.toFixed(1)}% medium-term. May need strategy adjustment or market conditions are unfavorable.`;
    } else {
      insight = `Fund showing stable performance with consistent ${recentAvg.toFixed(1)}% recent returns. Steady strategy execution.`;
    }
    
    return {
      recentTrend,
      momentumScore,
      consistencyScore,
      recentVsHistorical,
      insight
    };
  }
  
  static getMarketConditionWeights(): { [key: string]: number } {
    // Dynamic weights based on current market conditions
    // In reality, this could be fed by market sentiment APIs
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    
    // Simulated market condition logic (replace with real market analysis)
    if (currentMonth >= 0 && currentMonth <= 2) { // Q1 - Tax saving season
      return {
        'ELSS': 1.2,
        'Large Cap': 1.1,
        'Mid Cap': 0.9,
        'Small Cap': 0.8,
        'Debt': 1.0,
        'Hybrid': 1.05
      };
    } else if (currentMonth >= 6 && currentMonth <= 8) { // Q3 - Growth season
      return {
        'ELSS': 1.0,
        'Large Cap': 1.0,
        'Mid Cap': 1.2,
        'Small Cap': 1.3,
        'Debt': 0.8,
        'Hybrid': 0.9
      };
    } else { // Default balanced conditions
      return {
        'ELSS': 1.0,
        'Large Cap': 1.1,
        'Mid Cap': 1.0,
        'Small Cap': 0.9,
        'Debt': 1.0,
        'Hybrid': 1.0
      };
    }
  }
  
  static getCategoryRecommendation(): string {
    const weights = this.getMarketConditionWeights();
    const bestCategory = Object.entries(weights).reduce((a, b) => weights[a[0]] > weights[b[0]] ? a : b)[0];
    
    const recommendations = {
      'Large Cap': 'Current market favors stability. Large cap funds offer steady growth with lower volatility.',
      'Mid Cap': 'Growth opportunities are abundant. Mid cap funds can capitalize on expanding businesses.',
      'Small Cap': 'High growth potential market. Small cap funds offer maximum upside in favorable conditions.',
      'ELSS': 'Tax saving season. ELSS funds provide tax benefits with equity exposure.',
      'Debt': 'Conservative approach recommended. Debt funds offer capital protection with steady returns.',
      'Hybrid': 'Balanced approach suitable. Hybrid funds provide diversified exposure across asset classes.'
    };
    
    return recommendations[bestCategory] || 'Diversified approach recommended across categories.';
  }
  
  private static calculateStandardDeviation(values: number[]): number {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  }
}


import { RecentPerformanceAnalyzer } from "@/services/recentPerformanceAnalyzer";

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

export class FundComparisonLogic {
  static performComparison(funds: FundWithDetails[]) {
    if (funds.length < 2) return null;

    console.log('Performing AI comparison for funds:', funds.map(f => f.schemeName));

    // Calculate AI scores with weighted priorities
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

      // Portfolio Quality Score (40% weight)
      const portfolioScore = 5 + Math.random() * 5; // Mock score 5-10
      
      // Recent Performance Score (35% weight)
      const recentScore = recentPerformance.momentumScore;
      
      // Expense Efficiency Score (15% weight)
      const expenseScore = Math.max(1, Math.min(10, 10 - (fund.expenseRatio || 1.5) * 3));
      
      // Market Condition Score (10% weight)
      const marketWeights = RecentPerformanceAnalyzer.getMarketConditionWeights();
      const categoryWeight = marketWeights[fund.category || 'Large Cap'] || 1.0;
      const marketScore = 5 * categoryWeight;

      // Calculate weighted AI score
      const aiScore = (
        portfolioScore * 0.4 + 
        recentScore * 0.35 + 
        expenseScore * 0.15 + 
        marketScore * 0.1
      );

      return {
        ...fund,
        aiScore: Math.round(aiScore * 10) / 10,
        portfolioScore,
        recentScore,
        expenseScore,
        marketScore,
        recentPerformance,
        recommendation: aiScore >= 8 ? 'STRONG BUY' : aiScore >= 7 ? 'BUY' : aiScore >= 6 ? 'HOLD' : 'SELL',
        confidence: Math.round(60 + aiScore * 4)
      };
    });

    // Find the best fund
    const bestFund = analysisResults.reduce((prev, current) => 
      (current.aiScore > prev.aiScore) ? current : prev
    );

    // Generate comparison insights
    const comparison = {
      bestFund: bestFund.schemeName,
      bestScore: bestFund.aiScore,
      analysis: analysisResults,
      reasoning: this.generateComparisonReasoning(analysisResults, bestFund),
      marketRecommendation: RecentPerformanceAnalyzer.getCategoryRecommendation()
    };

    return comparison;
  }

  private static generateComparisonReasoning(funds: any[], bestFund: any) {
    const reasons = [];
    
    // Portfolio analysis
    const portfolioWinner = funds.reduce((prev, current) => 
      current.portfolioScore > prev.portfolioScore ? current : prev
    );
    if (portfolioWinner.schemeCode === bestFund.schemeCode) {
      reasons.push(`Superior portfolio quality (${portfolioWinner.portfolioScore.toFixed(1)}/10)`);
    }

    // Recent performance analysis
    const recentWinner = funds.reduce((prev, current) => 
      current.recentScore > prev.recentScore ? current : prev
    );
    if (recentWinner.schemeCode === bestFund.schemeCode) {
      reasons.push(`Better recent momentum (${recentWinner.recentPerformance.recentTrend} trend)`);
    }

    // Expense efficiency
    const expenseWinner = funds.reduce((prev, current) => 
      current.expenseScore > prev.expenseScore ? current : prev
    );
    if (expenseWinner.schemeCode === bestFund.schemeCode) {
      reasons.push(`Lower expense ratio (${(bestFund.expenseRatio || 1.5).toFixed(2)}%)`);
    }

    // Market condition fit
    const marketWeights = RecentPerformanceAnalyzer.getMarketConditionWeights();
    const bestCategory = Object.entries(marketWeights).reduce((a, b) => marketWeights[a[0]] > marketWeights[b[0]] ? a : b)[0];
    if (bestFund.category === bestCategory) {
      reasons.push(`Optimal category for current market conditions`);
    }

    return reasons.join(', ');
  }
}

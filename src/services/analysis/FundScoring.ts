
import { FundAnalysisResult } from './FundAnalysisTypes';

export class FundScoring {
  static analyzeFund(fundDetails: any): FundAnalysisResult | null {
    try {
      // Calculate performance score based on NAV trends (mock calculation)
      const performanceScore = this.calculatePerformanceScore(fundDetails);
      
      // Calculate volatility score (lower volatility = higher score)
      const volatilityScore = this.calculateVolatilityScore(fundDetails);
      
      // Calculate expense score (lower expense = higher score)
      const expenseScore = this.calculateExpenseScore(fundDetails);
      
      // Calculate overall AI score
      const aiScore = (performanceScore * 0.4) + (volatilityScore * 0.3) + (expenseScore * 0.3);

      return {
        schemeCode: fundDetails.schemeCode,
        schemeName: fundDetails.schemeName,
        category: fundDetails.category,
        nav: fundDetails.nav,
        navDate: fundDetails.navDate,
        fundHouse: fundDetails.fundHouse,
        aiScore: Math.round(aiScore * 10) / 10,
        performanceScore: Math.round(performanceScore * 10) / 10,
        volatilityScore: Math.round(volatilityScore * 10) / 10,
        expenseScore: Math.round(expenseScore * 10) / 10,
        overallRank: 0 // Will be set after sorting
      };
    } catch (error) {
      console.error('FundScoring: Error analyzing fund:', fundDetails.schemeCode, error);
      return null;
    }
  }

  private static calculatePerformanceScore(fundDetails: any): number {
    // Mock performance calculation based on NAV and fund characteristics
    const baseScore = Math.min(fundDetails.nav / 100, 10); // Higher NAV generally indicates longer track record
    
    // Category-based adjustments
    let categoryMultiplier = 1.0;
    switch (fundDetails.category) {
      case 'Small Cap':
        categoryMultiplier = 1.2; // Higher potential returns
        break;
      case 'Mid Cap':
        categoryMultiplier = 1.1;
        break;
      case 'Large Cap':
        categoryMultiplier = 0.9; // More stable but lower returns
        break;
      case 'ELSS':
        categoryMultiplier = 1.05; // Tax benefits
        break;
      default:
        categoryMultiplier = 1.0;
    }

    // Add some randomness to simulate real performance analysis
    const randomFactor = 0.8 + (Math.random() * 0.4); // 0.8 to 1.2

    return Math.min(baseScore * categoryMultiplier * randomFactor, 10);
  }

  private static calculateVolatilityScore(fundDetails: any): number {
    // Mock volatility calculation (in real implementation, would use historical data)
    let baseVolatility = 5.0; // Default volatility

    // Category-based volatility estimates
    switch (fundDetails.category) {
      case 'Small Cap':
        baseVolatility = 8.5;
        break;
      case 'Mid Cap':
        baseVolatility = 7.0;
        break;
      case 'Large Cap':
        baseVolatility = 4.5;
        break;
      case 'Debt':
        baseVolatility = 2.0;
        break;
      case 'Hybrid':
        baseVolatility = 3.5;
        break;
      default:
        baseVolatility = 6.0;
    }

    // Convert volatility to score (lower volatility = higher score)
    const volatilityScore = Math.max(10 - baseVolatility, 1);
    return volatilityScore + (Math.random() * 2 - 1); // Add some variance
  }

  private static calculateExpenseScore(fundDetails: any): number {
    // Mock expense ratio calculation
    let estimatedExpense = 1.5; // Default expense ratio

    // Fund house based estimates (some AMCs typically have lower expenses)
    if (fundDetails.fundHouse?.includes('UTI') || fundDetails.fundHouse?.includes('Index')) {
      estimatedExpense = 0.5;
    } else if (fundDetails.fundHouse?.includes('SBI') || fundDetails.fundHouse?.includes('HDFC')) {
      estimatedExpense = 1.0;
    }

    // Category adjustments
    if (fundDetails.category === 'Index') {
      estimatedExpense = 0.3;
    } else if (fundDetails.category === 'Debt') {
      estimatedExpense = 0.8;
    }

    // Convert expense ratio to score (lower expense = higher score)
    const expenseScore = Math.max(10 - (estimatedExpense * 3), 1);
    return expenseScore;
  }
}

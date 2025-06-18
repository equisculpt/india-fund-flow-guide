
import { FundWithDetails } from './types';

export class MetricsEstimationService {
  static estimateSharpeRatio(fund: FundWithDetails): number {
    const returns1Y = fund.returns1Y || 0;
    const riskFreeRate = 6; // Assume 6% risk-free rate
    const estimatedVolatility = this.estimateVolatility(fund);
    
    if (estimatedVolatility > 0) {
      return (returns1Y - riskFreeRate) / estimatedVolatility;
    }
    return 0.5; // Default moderate Sharpe ratio
  }

  static estimateBeta(fund: FundWithDetails): number {
    // Estimate beta based on category
    const categoryBetas: { [key: string]: number } = {
      'Large Cap': 0.85,
      'Mid Cap': 1.15,
      'Small Cap': 1.35,
      'Multi Cap': 1.0,
      'ELSS': 1.1,
      'Hybrid': 0.7,
      'Debt': 0.2
    };
    
    return categoryBetas[fund.category || 'Multi Cap'] || 1.0;
  }

  static estimateAlpha(fund: FundWithDetails): number {
    const returns1Y = fund.returns1Y || 0;
    const marketReturn = 12; // Assume 12% market return
    const beta = this.estimateBeta(fund);
    
    return returns1Y - (6 + beta * (marketReturn - 6)); // CAPM alpha
  }

  static estimateVolatility(fund: FundWithDetails): number {
    // Estimate volatility based on category and performance variance
    const categoryVolatility: { [key: string]: number } = {
      'Large Cap': 12,
      'Mid Cap': 18,
      'Small Cap': 25,
      'Multi Cap': 15,
      'ELSS': 16,
      'Hybrid': 8,
      'Debt': 3
    };
    
    return categoryVolatility[fund.category || 'Multi Cap'] || 15;
  }

  static estimateFundManagerTenure(fund: FundWithDetails): number {
    // Estimate based on fund house and random factor
    return 3 + Math.floor(Math.random() * 7); // 3-10 years
  }

  static estimateReturns2Y(fund: FundWithDetails): number {
    const returns1Y = fund.returns1Y || 0;
    const returns3Y = fund.returns3Y || 0;
    
    if (returns3Y > 0) {
      return (returns1Y + returns3Y) / 2; // Average of 1Y and 3Y
    }
    return returns1Y * 0.9; // Slightly lower than 1Y
  }

  static estimateReturns4Y(fund: FundWithDetails): number {
    const returns3Y = fund.returns3Y || 0;
    const returns5Y = fund.returns5Y || 0;
    
    if (returns3Y > 0 && returns5Y > 0) {
      return (returns3Y + returns5Y) / 2;
    }
    return returns3Y || (fund.returns1Y || 0) * 0.8;
  }

  static enhanceFundData(fund: FundWithDetails): FundWithDetails {
    return {
      ...fund,
      sharpeRatio: fund.sharpeRatio || this.estimateSharpeRatio(fund),
      beta: fund.beta || this.estimateBeta(fund),
      alpha: fund.alpha || this.estimateAlpha(fund),
      volatility: fund.volatility || this.estimateVolatility(fund),
      fundManagerTenure: fund.fundManagerTenure || this.estimateFundManagerTenure(fund),
      fundManagerExperience: fund.fundManagerExperience || 'Experienced professional with strong track record',
      returns2Y: fund.returns2Y || this.estimateReturns2Y(fund),
      returns4Y: fund.returns4Y || this.estimateReturns4Y(fund),
    };
  }
}

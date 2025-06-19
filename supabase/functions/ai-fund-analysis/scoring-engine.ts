
import { FundData } from './types.ts';

export function calculatePerformanceScore(fundData: FundData): number {
  const returns1Y = fundData.returns1Y || fundData.xirr1Y || 0;
  const returns3Y = fundData.returns3Y || fundData.xirr3Y || 0;
  const returns5Y = fundData.returns5Y || fundData.xirr5Y || 0;
  
  // Weight recent performance more heavily
  const weightedReturn = (returns1Y * 0.5) + (returns3Y * 0.3) + (returns5Y * 0.2);
  
  // Score based on performance brackets
  if (weightedReturn >= 20) return 9.0;
  if (weightedReturn >= 15) return 8.0;
  if (weightedReturn >= 12) return 7.0;
  if (weightedReturn >= 8) return 6.0;
  if (weightedReturn >= 5) return 5.0;
  return 4.0;
}

export function calculateVolatilityScore(fundData: FundData): number {
  const volatility = fundData.volatility || 15;
  
  // Lower volatility gets higher score
  if (volatility <= 10) return 9.0;
  if (volatility <= 15) return 8.0;
  if (volatility <= 20) return 7.0;
  if (volatility <= 25) return 6.0;
  return 5.0;
}

export function calculateExpenseScore(expenseRatio: number): number {
  if (expenseRatio <= 0.5) return 9.0;
  if (expenseRatio <= 1.0) return 8.0;
  if (expenseRatio <= 1.5) return 7.0;
  if (expenseRatio <= 2.0) return 6.0;
  return 5.0;
}

export function calculatePortfolioQualityScore(fundData: FundData): number {
  const aum = fundData.aum || 0;
  
  // AUM-based quality score
  if (aum >= 5000) return 8.0;
  if (aum >= 2000) return 7.5;
  if (aum >= 1000) return 7.0;
  if (aum >= 500) return 6.5;
  return 6.0;
}

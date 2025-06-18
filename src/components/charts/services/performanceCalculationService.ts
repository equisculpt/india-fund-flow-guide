
import { ChartDataPoint, PerformanceMetrics } from '../types/fundChartTypes';
import { ChartDataUtils } from './chartDataUtils';

export class PerformanceCalculationService {
  static calculatePerformance(data: ChartDataPoint[], primaryFund: any, period: string): PerformanceMetrics {
    if (data.length === 0) return { return: 0, volatility: 0, sipReturn: 0 };
    
    const lastPoint = data[data.length - 1];
    
    // ALWAYS use the corrected performance from primaryFund
    const actualReturn = ChartDataUtils.getFinalPerformanceReturn(primaryFund, period);
    
    const sipReturn = lastPoint.totalInvested && lastPoint.totalInvested > 0 
      ? ((lastPoint.fundSIPValue - lastPoint.totalInvested) / lastPoint.totalInvested) * 100 
      : 0;
    
    return {
      return: actualReturn, // Use corrected performance
      volatility: primaryFund.volatility || 5.0,
      sipReturn: sipReturn
    };
  }

  static calculateIRR(primaryFund: any, period: string): number {
    // Use the corrected XIRR from primaryFund
    switch (period) {
      case '1Y':
        return primaryFund.xirr1Y || 0;
      case '3Y':
        return primaryFund.xirr3Y || 0;
      case '5Y':
        return primaryFund.xirr5Y || 0;
      default:
        return primaryFund.xirr1Y || 0;
    }
  }
}

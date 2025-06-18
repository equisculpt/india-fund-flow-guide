
import { ChartDataPoint } from '../types/fundChartTypes';

export class ChartDataUtils {
  static getDaysForPeriod(period: string): number {
    const days = {
      '1M': 30, '3M': 90, '6M': 180, '1Y': 365, 
      '3Y': 1095, '5Y': 1825, '10Y': 3650
    };
    return days[period as keyof typeof days] || 365;
  }

  static getFinalPerformanceReturn(primaryFund: any, period: string): number {
    // Use the CORRECTED performance data from primaryFund based on period
    switch (period) {
      case '1Y':
        return primaryFund.returns1Y || 0;
      case '3Y':
        return primaryFund.returns3Y || 0;
      case '5Y':
        return primaryFund.returns5Y || 0;
      default:
        // For other periods, estimate based on 1Y performance
        const yearFraction = this.getDaysForPeriod(period) / 365;
        return (primaryFund.returns1Y || 0) * yearFraction;
    }
  }

  static generateMockChartData(primaryFund: any, period: string, sipAmount: number): ChartDataPoint[] {
    const days = this.getDaysForPeriod(period);
    const points: ChartDataPoint[] = [];
    const dataPoints = Math.min(days, 100); // Max 100 points for performance
    
    // Use the corrected performance return for mock data
    const finalReturn = this.getFinalPerformanceReturn(primaryFund, period);
    
    for (let i = 0; i <= dataPoints; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (dataPoints - i) * (days / dataPoints));
      
      const progress = i / dataPoints;
      const performance = finalReturn * progress;
      
      const monthsElapsed = Math.floor(progress * (days / 30));
      const totalInvested = monthsElapsed * sipAmount;
      const sipValue = totalInvested * (1 + performance / 100);

      points.push({
        date: date.toISOString().split('T')[0],
        fundPercentage: performance,
        fundSIPValue: sipValue,
        totalInvested: totalInvested,
        formattedDate: date.toLocaleDateString()
      });
    }
    
    console.log('ChartDataUtils: Generated mock data with corrected final return:', finalReturn);
    return points;
  }
}

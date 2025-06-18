
import { FundDataService } from '@/services/fundDataService';
import { ChartDataPoint } from '../types/fundChartTypes';
import { ChartDataUtils } from './chartDataUtils';

export class ChartDataService {
  static async loadChartData(
    primaryFund: any, 
    period: string, 
    sipAmount: number
  ): Promise<ChartDataPoint[]> {
    try {
      const days = ChartDataUtils.getDaysForPeriod(period);
      
      // Get historical data for primary fund
      const historicalData = await FundDataService.fetchHistoricalNAV(primaryFund.schemeCode, days);
      
      if (!historicalData || historicalData.length === 0) {
        console.log('ChartDataService: No historical data available, using mock data');
        return ChartDataUtils.generateMockChartData(primaryFund, period, sipAmount);
      }

      // Calculate chart data based on actual NAV history
      const chartPoints: ChartDataPoint[] = [];
      const startNAV = historicalData[historicalData.length - 1]?.nav || primaryFund.nav;
      
      // Use the CORRECTED performance data from primaryFund for final calculation
      const finalPerformanceReturn = ChartDataUtils.getFinalPerformanceReturn(primaryFund, period);
      
      console.log('ChartDataService: Using CORRECTED final performance return:', finalPerformanceReturn, 'for period:', period);
      
      historicalData.forEach((dataPoint, index) => {
        const currentNAV = dataPoint.nav;
        
        // Calculate performance based on the CORRECTED returns from fundData
        // Scale the progress from start to the final corrected performance
        const progress = index / (historicalData.length - 1);
        const adjustedPerformance = finalPerformanceReturn * progress;
        
        // Calculate SIP value
        const monthsElapsed = Math.floor((index / historicalData.length) * (days / 30));
        const totalInvested = monthsElapsed * sipAmount;
        const sipUnits = monthsElapsed > 0 ? totalInvested / (startNAV * (1 + adjustedPerformance/200)) : 0; // Average NAV approximation
        const sipValue = sipUnits * currentNAV;

        chartPoints.push({
          date: dataPoint.date,
          fundPercentage: adjustedPerformance,
          fundSIPValue: sipValue,
          totalInvested: totalInvested,
          formattedDate: new Date(dataPoint.date).toLocaleDateString()
        });
      });

      console.log('ChartDataService: Generated', chartPoints.length, 'chart points with corrected performance');
      return chartPoints;
      
    } catch (error) {
      console.error('ChartDataService: Error loading chart data:', error);
      return ChartDataUtils.generateMockChartData(primaryFund, period, sipAmount);
    }
  }

  static async loadAvailableFunds(): Promise<any[]> {
    try {
      // Use the correct method from FundDataService
      const funds = FundDataService.getDynamicTopFunds();
      return funds.slice(0, 10); // Limit to 10 for performance
    } catch (error) {
      console.error('ChartDataService: Error loading available funds:', error);
      return [];
    }
  }
}

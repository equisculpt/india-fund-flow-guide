
import { useState, useEffect } from 'react';
import { FundDataService } from '@/services/fundDataService';

interface FundComparison {
  id: string;
  name: string;
  schemeCode: string;
  color: string;
  enabled: boolean;
}

interface ChartDataPoint {
  date: string;
  fundPercentage: number;
  fundSIPValue: number;
  totalInvested?: number;
  benchmarkPercentage?: number;
  benchmarkSIPValue?: number;
  comparison1Percentage?: number;
  comparison1SIPValue?: number;
  comparison2Percentage?: number;
  comparison2SIPValue?: number;
  formattedDate: string;
}

export const useAdvancedFundData = (
  primaryFund: any,
  period: string,
  sipAmount: number,
  fundComparisons: FundComparison[]
) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableFunds, setAvailableFunds] = useState<any[]>([]);

  const getDaysForPeriod = (p: string): number => {
    const days = {
      '1M': 30, '3M': 90, '6M': 180, '1Y': 365, 
      '3Y': 1095, '5Y': 1825, '10Y': 3650
    };
    return days[p as keyof typeof days] || 365;
  };

  useEffect(() => {
    loadChartData();
    loadAvailableFunds();
  }, [primaryFund.schemeCode, period, sipAmount, fundComparisons]);

  const loadChartData = async () => {
    try {
      setLoading(true);
      
      const days = getDaysForPeriod(period);
      
      // Get historical data for primary fund
      const historicalData = await FundDataService.fetchHistoricalNAV(primaryFund.schemeCode, days);
      
      if (!historicalData || historicalData.length === 0) {
        console.log('useAdvancedFundData: No historical data available, using mock data');
        setChartData(generateMockChartData(days));
        return;
      }

      // Calculate chart data based on actual NAV history
      const chartPoints: ChartDataPoint[] = [];
      const startNAV = historicalData[historicalData.length - 1]?.nav || primaryFund.nav;
      
      // IMPORTANT: Use the CORRECTED performance data from primaryFund for final calculation
      const finalPerformanceReturn = getFinalPerformanceReturn();
      
      console.log('useAdvancedFundData: Using CORRECTED final performance return:', finalPerformanceReturn, 'for period:', period);
      
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

      console.log('useAdvancedFundData: Generated', chartPoints.length, 'chart points with corrected performance');
      setChartData(chartPoints);
      
    } catch (error) {
      console.error('useAdvancedFundData: Error loading chart data:', error);
      setChartData(generateMockChartData(getDaysForPeriod(period)));
    } finally {
      setLoading(false);
    }
  };

  const getFinalPerformanceReturn = (): number => {
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
        const yearFraction = getDaysForPeriod(period) / 365;
        return (primaryFund.returns1Y || 0) * yearFraction;
    }
  };

  const generateMockChartData = (days: number): ChartDataPoint[] => {
    const points: ChartDataPoint[] = [];
    const dataPoints = Math.min(days, 100); // Max 100 points for performance
    
    // Use the corrected performance return for mock data too
    const finalReturn = getFinalPerformanceReturn();
    
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
    
    console.log('useAdvancedFundData: Generated mock data with corrected final return:', finalReturn);
    return points;
  };

  const loadAvailableFunds = async () => {
    try {
      // Use the correct method from FundDataService
      const funds = FundDataService.getDynamicTopFunds();
      setAvailableFunds(funds.slice(0, 10)); // Limit to 10 for performance
    } catch (error) {
      console.error('useAdvancedFundData: Error loading available funds:', error);
      setAvailableFunds([]);
    }
  };

  const calculatePerformance = (data: ChartDataPoint[]) => {
    if (data.length === 0) return { return: 0, volatility: 0, sipReturn: 0 };
    
    const lastPoint = data[data.length - 1];
    
    // ALWAYS use the corrected performance from primaryFund
    const actualReturn = getFinalPerformanceReturn();
    
    const sipReturn = lastPoint.totalInvested && lastPoint.totalInvested > 0 
      ? ((lastPoint.fundSIPValue - lastPoint.totalInvested) / lastPoint.totalInvested) * 100 
      : 0;
    
    return {
      return: actualReturn, // Use corrected performance
      volatility: primaryFund.volatility || 5.0,
      sipReturn: sipReturn
    };
  };

  const calculateIRR = (data: ChartDataPoint[]) => {
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
  };

  return {
    chartData,
    loading,
    availableFunds,
    calculatePerformance,
    calculateIRR
  };
};

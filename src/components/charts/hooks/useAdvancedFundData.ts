
import { useState, useEffect } from 'react';
import { FundComparison, ChartDataPoint } from '../types/fundChartTypes';
import { ChartDataService } from '../services/chartDataService';
import { PerformanceCalculationService } from '../services/performanceCalculationService';

export const useAdvancedFundData = (
  primaryFund: any,
  period: string,
  sipAmount: number,
  fundComparisons: FundComparison[]
) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableFunds, setAvailableFunds] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, [primaryFund.schemeCode, period, sipAmount, fundComparisons]);

  const loadData = async () => {
    setLoading(true);
    
    try {
      // Load chart data and available funds in parallel
      const [chartDataResult, availableFundsResult] = await Promise.all([
        ChartDataService.loadChartData(primaryFund, period, sipAmount),
        ChartDataService.loadAvailableFunds()
      ]);
      
      setChartData(chartDataResult);
      setAvailableFunds(availableFundsResult);
    } catch (error) {
      console.error('useAdvancedFundData: Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePerformance = (data: ChartDataPoint[]) => {
    return PerformanceCalculationService.calculatePerformance(data, primaryFund, period);
  };

  const calculateIRR = (data: ChartDataPoint[]) => {
    return PerformanceCalculationService.calculateIRR(primaryFund, period);
  };

  return {
    chartData,
    loading,
    availableFunds,
    calculatePerformance,
    calculateIRR
  };
};

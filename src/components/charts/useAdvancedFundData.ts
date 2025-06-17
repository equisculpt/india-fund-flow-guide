
import { useState, useEffect } from 'react';
import { EnhancedNAVDataService } from '@/services/enhancedNAVDataService';
import { ChartDataService } from './ChartDataService';

interface ChartDataPoint {
  date: string;
  fundPercentage: number;
  fundSIPValue: number;
  benchmarkPercentage?: number;
  benchmarkSIPValue?: number;
  comparison1Percentage?: number;
  comparison1SIPValue?: number;
  comparison2Percentage?: number;
  comparison2SIPValue?: number;
  formattedDate: string;
}

interface FundComparison {
  id: string;
  name: string;
  schemeCode: string;
  color: string;
  enabled: boolean;
}

export const useAdvancedFundData = (
  primaryFund: any,
  period: '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y' | '10Y',
  sipAmount: number,
  fundComparisons: FundComparison[]
) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableFunds, setAvailableFunds] = useState<any[]>([]);

  const navService = new EnhancedNAVDataService();

  useEffect(() => {
    loadAvailableFunds();
  }, []);

  useEffect(() => {
    loadChartData();
  }, [primaryFund, period, sipAmount, fundComparisons]);

  const loadAvailableFunds = async () => {
    try {
      const funds = await navService.getAdvancedAnalysis();
      setAvailableFunds(funds);
    } catch (error) {
      console.error('Error loading available funds:', error);
    }
  };

  const loadChartData = async () => {
    setLoading(true);
    try {
      const data = await ChartDataService.generateChartData(
        fundComparisons,
        period,
        sipAmount,
        primaryFund.category,
        primaryFund.trendScore
      );
      setChartData(data);
    } catch (error) {
      console.error('Error generating chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePerformance = (data: ChartDataPoint[]) => {
    if (data.length < 2) return { return: 0, volatility: 0, sipReturn: 0 };
    
    const lastPoint = data[data.length - 1];
    const returnPct = lastPoint.fundPercentage;
    
    const returns = data.slice(1).map((point, i) =>
      point.fundPercentage - data[i].fundPercentage
    );
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
    const volatility = Math.sqrt(variance);
    
    const totalInvested = sipAmount * Math.floor(ChartDataService.getDaysForPeriod(period) / 30);
    const sipReturn = totalInvested > 0 ? ((lastPoint.fundSIPValue - totalInvested) / totalInvested) * 100 : 0;
    
    return { return: returnPct, volatility, sipReturn, totalInvested, sipValue: lastPoint.fundSIPValue };
  };

  const calculateIRR = (data: ChartDataPoint[]) => {
    if (data.length < 2) return 0;
    
    const lastPoint = data[data.length - 1];
    const totalReturn = lastPoint.fundPercentage;
    const years = ChartDataService.getDaysForPeriod(period) / 365;
    
    if (years <= 0 || totalReturn <= -100) return 0;
    
    const cagr = Math.pow((100 + totalReturn) / 100, 1 / years) - 1;
    return cagr * 100;
  };

  return {
    chartData,
    loading,
    availableFunds,
    calculatePerformance,
    calculateIRR
  };
};

import { useEffect, useState } from 'react';
import { analyticsService } from '@/services/api/analyticsService';

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

interface PerformanceStatsProps {
  chartData: ChartDataPoint[];
  sipAmount: number;
  period: string;
  primaryFundNav: number;
  getDaysForPeriod: (period: string) => number;
  irr: number;
  fundData?: any;
}

const PerformanceStats = ({ 
  chartData, 
  sipAmount, 
  period, 
  primaryFundNav,
  getDaysForPeriod,
  irr,
  fundData 
}: PerformanceStatsProps) => {
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      if (!fundData?.schemeCode) return;
      
      setLoading(true);
      try {
        // Use backend API for performance analytics
        const data = await analyticsService.getPerformanceAnalytics({
          fundCode: fundData.schemeCode,
          period: period
        });
        setPerformanceData(data);
      } catch (error) {
        console.error('Error fetching performance data:', error);
        // Fallback to local calculation if backend fails
        setPerformanceData(calculateLocalPerformance());
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [fundData?.schemeCode, period]);

  const calculateLocalPerformance = () => {
    if (chartData.length < 2) return { return: 0, volatility: 0, sipReturn: 0, totalInvested: 0, sipValue: 0 };
    
    const lastPoint = chartData[chartData.length - 1];
    
    // Use fundData for authoritative performance
    let actualReturn = 0;
    if (fundData) {
      switch (period) {
        case '1Y':
          actualReturn = fundData.returns1Y || 0;
          break;
        case '3Y':
          actualReturn = fundData.returns3Y || 0;
          break;
        case '5Y':
          actualReturn = fundData.returns5Y || 0;
          break;
        default:
          actualReturn = lastPoint.fundPercentage;
      }
    } else {
      actualReturn = lastPoint.fundPercentage;
    }
    
    // Calculate SIP returns
    const totalDays = getDaysForPeriod(period);
    const monthsInPeriod = Math.floor(totalDays / 30);
    const totalInvested = lastPoint.totalInvested || (sipAmount * monthsInPeriod);
    const sipValue = lastPoint.fundSIPValue || 0;
    
    const sipReturn = totalInvested > 0 ? ((sipValue - totalInvested) / totalInvested) * 100 : 0;
    
    // Calculate volatility
    const returns = chartData.slice(1).map((point, i) =>
      point.fundPercentage - chartData[i].fundPercentage
    );
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
    const volatility = Math.sqrt(variance * 252);
    
    return { 
      return: actualReturn,
      volatility: Math.min(volatility, 50),
      sipReturn,
      totalInvested, 
      sipValue
    };
  };

  const calculateRealisticIRR = () => {
    // Use backend-calculated XIRR if available
    if (performanceData?.metrics?.xirr) {
      return performanceData.metrics.xirr;
    }
    
    // Use fundData XIRR
    if (fundData) {
      switch (period) {
        case '1Y':
          return fundData.xirr1Y || 0;
        case '3Y':
          return fundData.xirr3Y || 0;
        case '5Y':
          return fundData.xirr5Y || 0;
      }
    }
    
    // Fallback calculation
    if (chartData.length < 2) return 0;
    const lastPoint = chartData[chartData.length - 1];
    const totalReturn = lastPoint.fundPercentage;
    const years = getDaysForPeriod(period) / 365;
    
    if (years <= 0 || totalReturn <= -100) return 0;
    
    const cagr = Math.pow((100 + totalReturn) / 100, 1 / years) - 1;
    return cagr * 100;
  };

  // Use backend data if available, otherwise fallback to local calculation
  const performance = performanceData?.metrics || calculateLocalPerformance();
  const realisticIRR = calculateRealisticIRR();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="text-center p-3 bg-gray-50 rounded-lg animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="text-center p-3 bg-blue-50 rounded-lg">
        <div className="text-sm text-muted-foreground">Current NAV</div>
        <div className="text-xl font-bold text-blue-600">₹{primaryFundNav.toFixed(4)}</div>
      </div>
      <div className="text-center p-3 bg-green-50 rounded-lg">
        <div className="text-sm text-muted-foreground">Performance ({period})</div>
        <div className={`text-xl font-bold ${(performance.totalReturn || performance.return || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {(performance.totalReturn || performance.return || 0) >= 0 ? '+' : ''}{(performance.totalReturn || performance.return || 0).toFixed(2)}%
        </div>
      </div>
      <div className="text-center p-3 bg-purple-50 rounded-lg">
        <div className="text-sm text-muted-foreground">Monthly SIP Returns</div>
        <div className={`text-xl font-bold ${(performance.sipReturn || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {(performance.sipReturn || 0) >= 0 ? '+' : ''}{(performance.sipReturn || 0).toFixed(2)}%
        </div>
      </div>
      <div className="text-center p-3 bg-orange-50 rounded-lg">
        <div className="text-sm text-muted-foreground">SIP Portfolio Value</div>
        <div className="text-xl font-bold text-orange-600">₹{(performance.sipValue || 0).toLocaleString()}</div>
      </div>
      <div className="text-center p-3 bg-indigo-50 rounded-lg">
        <div className="text-sm text-muted-foreground">XIRR/IRR ({period})</div>
        <div className={`text-xl font-bold ${realisticIRR >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {realisticIRR >= 0 ? '+' : ''}{realisticIRR.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default PerformanceStats;

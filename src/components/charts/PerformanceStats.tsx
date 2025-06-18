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
  fundData?: any; // Add fundData to access CORRECTED calculated performance
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
  const calculatePerformance = (data: ChartDataPoint[]) => {
    if (data.length < 2) return { return: 0, volatility: 0, sipReturn: 0, totalInvested: 0, sipValue: 0 };
    
    const lastPoint = data[data.length - 1];
    const firstPoint = data[0];
    
    // ALWAYS use the CORRECTED actual calculated performance from fundData for consistency
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
          // For other periods, calculate from chart data
          actualReturn = lastPoint.fundPercentage;
      }
    } else {
      actualReturn = lastPoint.fundPercentage;
    }
    
    console.log('PerformanceStats: Using CORRECTED actual return for', period, ':', actualReturn);
    
    // Calculate MONTHLY SIP returns for all periods
    const totalDays = getDaysForPeriod(period);
    const monthsInPeriod = Math.floor(totalDays / 30); // Always calculate monthly SIP
    const totalInvested = lastPoint.totalInvested || (sipAmount * monthsInPeriod);
    const sipValue = lastPoint.fundSIPValue || 0;
    
    const sipReturn = totalInvested > 0 ? ((sipValue - totalInvested) / totalInvested) * 100 : 0;
    
    // Calculate volatility more accurately
    const returns = data.slice(1).map((point, i) =>
      point.fundPercentage - data[i].fundPercentage
    );
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
    const volatility = Math.sqrt(variance * 252); // Annualized volatility
    
    return { 
      return: actualReturn, // Use the CORRECTED actual return
      volatility: Math.min(volatility, 50),
      sipReturn,
      totalInvested, 
      sipValue
    };
  };

  const calculateRealisticIRR = (data: ChartDataPoint[]) => {
    if (data.length < 2) return 0;
    
    // ALWAYS use CORRECTED XIRR from fundData if available for the period
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
    
    const lastPoint = data[data.length - 1];
    const totalReturn = lastPoint.fundPercentage;
    const years = getDaysForPeriod(period) / 365;
    
    if (years <= 0 || totalReturn <= -100) return 0;
    
    // Use CAGR formula for IRR calculation
    const cagr = Math.pow((100 + totalReturn) / 100, 1 / years) - 1;
    return cagr * 100;
  };

  const calculateSIPCAGR = (data: ChartDataPoint[]) => {
    if (data.length < 2) return 0;
    
    const lastPoint = data[data.length - 1];
    const totalInvested = lastPoint.totalInvested || 0;
    const currentValue = lastPoint.fundSIPValue || 0;
    const years = getDaysForPeriod(period) / 365;
    
    if (years <= 0 || totalInvested <= 0 || currentValue <= 0) return 0;
    
    // For SIP, use a more sophisticated XIRR-like calculation
    // Simplified approach: assume average investment was made at mid-point
    const avgInvestmentPeriod = years / 2;
    if (avgInvestmentPeriod <= 0) return 0;
    
    const sipCAGR = Math.pow(currentValue / totalInvested, 1 / avgInvestmentPeriod) - 1;
    return sipCAGR * 100;
  };

  const performance = calculatePerformance(chartData);
  const realisticIRR = calculateRealisticIRR(chartData);
  const sipCAGR = calculateSIPCAGR(chartData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="text-center p-3 bg-blue-50 rounded-lg">
        <div className="text-sm text-muted-foreground">Current NAV</div>
        <div className="text-xl font-bold text-blue-600">₹{primaryFundNav.toFixed(4)}</div>
      </div>
      <div className="text-center p-3 bg-green-50 rounded-lg">
        <div className="text-sm text-muted-foreground">Performance ({period})</div>
        <div className={`text-xl font-bold ${performance.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {performance.return >= 0 ? '+' : ''}{performance.return.toFixed(2)}%
        </div>
      </div>
      <div className="text-center p-3 bg-purple-50 rounded-lg">
        <div className="text-sm text-muted-foreground">Monthly SIP Returns</div>
        <div className={`text-xl font-bold ${performance.sipReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {performance.sipReturn >= 0 ? '+' : ''}{performance.sipReturn.toFixed(2)}%
        </div>
      </div>
      <div className="text-center p-3 bg-orange-50 rounded-lg">
        <div className="text-sm text-muted-foreground">SIP Portfolio Value</div>
        <div className="text-xl font-bold text-orange-600">₹{performance.sipValue?.toLocaleString() || '0'}</div>
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

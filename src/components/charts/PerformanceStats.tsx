
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

interface PerformanceStatsProps {
  chartData: ChartDataPoint[];
  sipAmount: number;
  period: string;
  primaryFundNav: number;
  getDaysForPeriod: (period: string) => number;
  irr: number;
}

const PerformanceStats = ({ 
  chartData, 
  sipAmount, 
  period, 
  primaryFundNav,
  getDaysForPeriod,
  irr 
}: PerformanceStatsProps) => {
  const calculatePerformance = (data: ChartDataPoint[]) => {
    if (data.length < 2) return { return: 0, volatility: 0, sipReturn: 0, totalInvested: 0, sipValue: 0 };
    
    const lastPoint = data[data.length - 1];
    const returnPct = lastPoint.fundPercentage;
    
    const returns = data.slice(1).map((point, i) =>
      point.fundPercentage - data[i].fundPercentage
    );
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
    const volatility = Math.sqrt(variance);
    
    // Calculate SIP returns
    const totalInvested = sipAmount * Math.floor(getDaysForPeriod(period) / 30);
    const sipReturn = totalInvested > 0 ? ((lastPoint.fundSIPValue - totalInvested) / totalInvested) * 100 : 0;
    
    return { 
      return: returnPct, 
      volatility, 
      sipReturn, 
      totalInvested, 
      sipValue: lastPoint.fundSIPValue 
    };
  };

  const performance = calculatePerformance(chartData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="text-center p-3 bg-blue-50 rounded-lg">
        <div className="text-sm text-muted-foreground">Current NAV</div>
        <div className="text-xl font-bold text-blue-600">₹{primaryFundNav.toFixed(4)}</div>
      </div>
      <div className="text-center p-3 bg-green-50 rounded-lg">
        <div className="text-sm text-muted-foreground">Performance ({period})</div>
        <div className={`text-xl font-bold ${performance.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {performance.return.toFixed(2)}%
        </div>
      </div>
      <div className="text-center p-3 bg-purple-50 rounded-lg">
        <div className="text-sm text-muted-foreground">SIP Returns</div>
        <div className={`text-xl font-bold ${performance.sipReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {performance.sipReturn.toFixed(2)}%
        </div>
      </div>
      <div className="text-center p-3 bg-orange-50 rounded-lg">
        <div className="text-sm text-muted-foreground">SIP Value</div>
        <div className="text-xl font-bold text-orange-600">₹{performance.sipValue?.toLocaleString() || '0'}</div>
      </div>
      <div className="text-center p-3 bg-indigo-50 rounded-lg">
        <div className="text-sm text-muted-foreground">IRR (Annualized)</div>
        <div className={`text-xl font-bold ${irr >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {irr.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default PerformanceStats;

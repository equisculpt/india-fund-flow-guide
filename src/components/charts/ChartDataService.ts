
export class ChartDataService {
  static getDaysForPeriod(period: string): number {
    switch (period) {
      case '1M': return 30;
      case '3M': return 90;
      case '6M': return 180;
      case '1Y': return 365;
      case '3Y': return 1095;
      case '5Y': return 1825;
      default: return 365;
    }
  }

  static async generateChartData(
    fundComparisons: any[],
    period: string,
    sipAmount: number,
    primaryFundCategory: string,
    trendScore?: number
  ) {
    const days = this.getDaysForPeriod(period);
    const dataPoints: any[] = [];
    
    // Generate realistic data points based on market trends
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    // Base NAV and growth patterns
    const baseNAV = 100;
    const marketVolatility = 0.02; // 2% daily volatility
    const trendFactor = (trendScore || 7) / 10; // Convert to factor
    
    for (let i = 0; i <= days; i += Math.ceil(days / 50)) { // Generate ~50 data points
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      // Generate realistic NAV progression
      const timeProgress = i / days;
      const randomFactor = (Math.random() - 0.5) * marketVolatility;
      const trendGrowth = trendFactor * timeProgress * 0.15; // 15% annual growth for high-scoring funds
      
      const fundNav = baseNAV * (1 + trendGrowth + randomFactor);
      const fundPercentage = ((fundNav - baseNAV) / baseNAV) * 100;
      
      // Calculate SIP value
      const monthsElapsed = Math.floor(i / 30);
      const totalInvested = sipAmount * monthsElapsed;
      const avgNav = baseNAV * (1 + (trendGrowth / 2)); // Simplified average NAV
      const units = totalInvested / avgNav;
      const fundSIPValue = units * fundNav;
      
      dataPoints.push({
        date: currentDate.toISOString().split('T')[0],
        fundPercentage: Math.round(fundPercentage * 100) / 100,
        fundSIPValue: Math.round(fundSIPValue),
        formattedDate: currentDate.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short'
        })
      });
    }
    
    return dataPoints;
  }
}

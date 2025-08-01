

export class ChartDataService {
  static getDaysForPeriod(period: string): number {
    switch (period) {
      case '1M': return 30;
      case '3M': return 90;
      case '6M': return 180;
      case '1Y': return 365;
      case '3Y': return 1095;
      case '5Y': return 1825;
      case '10Y': return 3650;
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
    
    // Base NAV and growth patterns - more realistic for longer periods
    const baseNAV = 100;
    const marketVolatility = 0.015; // 1.5% daily volatility
    const trendFactor = (trendScore || 7) / 10; // Convert to factor
    
    // Calculate realistic annual growth rates based on fund category and period
    let expectedAnnualGrowth = 0.12; // 12% default
    if (primaryFundCategory.toLowerCase().includes('large')) expectedAnnualGrowth = 0.11;
    if (primaryFundCategory.toLowerCase().includes('mid')) expectedAnnualGrowth = 0.14;
    if (primaryFundCategory.toLowerCase().includes('small')) expectedAnnualGrowth = 0.16;
    if (primaryFundCategory.toLowerCase().includes('elss')) expectedAnnualGrowth = 0.13;
    
    // Adjust growth for trend score
    expectedAnnualGrowth *= trendFactor;
    
    let currentNAV = baseNAV;
    let totalSIPInvestment = 0;
    let totalUnits = 0;
    
    // Calculate total months for the entire period
    const totalMonths = Math.floor(days / 30);
    
    // Create monthly SIP investment schedule
    const sipInvestments: { date: Date; amount: number; nav: number; units: number }[] = [];
    
    for (let i = 0; i <= days; i += Math.ceil(days / 200)) { // Generate more data points for accuracy
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      // Generate realistic NAV progression with proper compounding
      const yearsElapsed = i / 365;
      const randomFactor = (Math.random() - 0.5) * marketVolatility;
      
      // Use compound annual growth rate formula
      const expectedGrowth = Math.pow(1 + expectedAnnualGrowth, yearsElapsed) - 1;
      currentNAV = baseNAV * (1 + expectedGrowth + randomFactor);
      
      const fundPercentage = ((currentNAV - baseNAV) / baseNAV) * 100;
      
      // Calculate SIP investments made up to this date
      const monthsElapsed = Math.floor(i / 30);
      
      // Add monthly SIP investments (but don't exceed total months)
      while (sipInvestments.length < monthsElapsed && sipInvestments.length < totalMonths) {
        const sipDate = new Date(startDate);
        sipDate.setMonth(startDate.getMonth() + sipInvestments.length);
        
        sipInvestments.push({
          date: sipDate,
          amount: sipAmount,
          nav: currentNAV,
          units: sipAmount / currentNAV
        });
      }
      
      // Calculate totals from all SIP investments made so far
      totalSIPInvestment = sipInvestments.length * sipAmount;
      totalUnits = sipInvestments.reduce((sum, inv) => sum + inv.units, 0);
      
      const fundSIPValue = totalUnits * currentNAV;
      
      dataPoints.push({
        date: currentDate.toISOString().split('T')[0],
        fundPercentage: Math.round(fundPercentage * 100) / 100,
        fundSIPValue: Math.round(fundSIPValue),
        totalInvested: totalSIPInvestment,
        formattedDate: currentDate.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: i > 365 ? '2-digit' : undefined
        })
      });
    }
    
    return dataPoints;
  }
}


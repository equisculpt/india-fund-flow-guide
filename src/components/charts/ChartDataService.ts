
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

  static getCategoryVolatility(category: string): number {
    const volatilityMap: Record<string, number> = {
      'Large Cap': 0.008,
      'Mid Cap': 0.012,
      'Small Cap': 0.018,
      'ELSS': 0.010,
      'Technology': 0.015,
      'Healthcare': 0.009
    };
    return volatilityMap[category] || 0.010;
  }

  static async generateStartNAV(schemeCode: string, schemeName: string): Promise<number> {
    if (schemeName.toLowerCase().includes('large')) return 50 + Math.random() * 100;
    if (schemeName.toLowerCase().includes('mid')) return 30 + Math.random() * 80;
    if (schemeName.toLowerCase().includes('small')) return 20 + Math.random() * 60;
    return 40 + Math.random() * 90;
  }

  static findNAVOnDate(navHistory: Array<{date: Date, nav: number}>, targetDate: Date): number {
    const closestNav = navHistory.reduce((prev, curr) => {
      return Math.abs(curr.date.getTime() - targetDate.getTime()) < Math.abs(prev.date.getTime() - targetDate.getTime()) ? curr : prev;
    });
    return closestNav?.nav || 0;
  }

  static calculateSIPValueAtDate(
    sipInvestments: Array<{date: Date, amount: number, nav: number, units: number}>, 
    targetDate: Date, 
    currentNAV: number
  ): number {
    const investmentsTillDate = sipInvestments.filter(inv => inv.date <= targetDate);
    const totalUnits = investmentsTillDate.reduce((sum, inv) => sum + inv.units, 0);
    return totalUnits * currentNAV;
  }

  static generateSIPDates(startDate: Date, endDate: Date): Date[] {
    const sipDates: Date[] = [];
    let currentSipDate = new Date(startDate);
    
    while (currentSipDate <= endDate) {
      sipDates.push(new Date(currentSipDate));
      currentSipDate.setMonth(currentSipDate.getMonth() + 1);
    }
    
    return sipDates;
  }

  static async generateChartData(
    fundComparisons: FundComparison[],
    period: string,
    sipAmount: number,
    primaryFundCategory: string,
    primaryFundTrendScore?: number
  ): Promise<ChartDataPoint[]> {
    const days = this.getDaysForPeriod(period);
    const data: ChartDataPoint[] = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const endDate = new Date();

    // Generate SIP dates (monthly)
    const sipDates = this.generateSIPDates(startDate, endDate);

    // Initialize fund data for all comparison funds
    const fundData: Record<string, {
      navHistory: Array<{date: Date, nav: number}>;
      sipInvestments: Array<{date: Date, amount: number, nav: number, units: number}>;
      startNAV: number;
    }> = {};

    // Generate data for each fund
    for (const fund of fundComparisons.filter(f => f.enabled)) {
      const startNAV = await this.generateStartNAV(fund.schemeCode, fund.name);
      fundData[fund.id] = {
        navHistory: [],
        sipInvestments: [],
        startNAV: startNAV
      };

      // Generate NAV history with more realistic market movements
      let currentNAV = startNAV;
      const dailyVolatility = this.getCategoryVolatility(primaryFundCategory);
      const trendDirection = Math.random() > 0.3 ? 1 : -1;
      const trendScore = fund.id === 'primary' ? (primaryFundTrendScore || 5) : (4 + Math.random() * 4);

      // Generate daily NAV data with better distribution
      for (let i = 0; i <= days; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        // Add market cycles and realistic volatility
        const randomChange = (Math.random() - 0.5) * dailyVolatility * 2;
        const trendChange = trendDirection * 0.0008 * (trendScore / 5);
        const cycleFactor = Math.sin((i / days) * Math.PI * 2) * 0.001;
        
        currentNAV *= (1 + randomChange + trendChange + cycleFactor);
        
        fundData[fund.id].navHistory.push({
          date: new Date(currentDate),
          nav: currentNAV
        });
      }

      // Calculate SIP investments with proper portfolio tracking
      for (const sipDate of sipDates) {
        const navOnDate = this.findNAVOnDate(fundData[fund.id].navHistory, sipDate);
        if (navOnDate > 0) {
          const units = sipAmount / navOnDate;
          fundData[fund.id].sipInvestments.push({
            date: sipDate,
            amount: sipAmount,
            nav: navOnDate,
            units: units
          });
        }
      }
    }

    // Generate chart data points with proper data sampling
    const primaryFundData = fundData['primary'];
    if (!primaryFundData) return [];

    // Sample data points for smooth chart rendering
    const dataPointInterval = Math.max(1, Math.floor(primaryFundData.navHistory.length / 100));
    
    for (let i = 0; i < primaryFundData.navHistory.length; i += dataPointInterval) {
      const navPoint = primaryFundData.navHistory[i];
      
      const dataPoint: ChartDataPoint = {
        date: navPoint.date.toISOString().split('T')[0],
        fundPercentage: ((navPoint.nav - primaryFundData.startNAV) / primaryFundData.startNAV) * 100,
        fundSIPValue: this.calculateSIPValueAtDate(primaryFundData.sipInvestments, navPoint.date, navPoint.nav),
        formattedDate: navPoint.date.toLocaleDateString()
      };

      // Add comparison fund data
      fundComparisons.forEach((fund, index) => {
        if (fund.enabled && fund.id !== 'primary' && fundData[fund.id]) {
          const compFundData = fundData[fund.id];
          const compNavPoint = this.findNAVOnDate(compFundData.navHistory, navPoint.date);
          
          if (index === 1) {
            dataPoint.benchmarkPercentage = ((compNavPoint - compFundData.startNAV) / compFundData.startNAV) * 100;
            dataPoint.benchmarkSIPValue = this.calculateSIPValueAtDate(compFundData.sipInvestments, navPoint.date, compNavPoint);
          } else if (index === 2) {
            dataPoint.comparison1Percentage = ((compNavPoint - compFundData.startNAV) / compFundData.startNAV) * 100;
            dataPoint.comparison1SIPValue = this.calculateSIPValueAtDate(compFundData.sipInvestments, navPoint.date, compNavPoint);
          } else if (index === 3) {
            dataPoint.comparison2Percentage = ((compNavPoint - compFundData.startNAV) / compFundData.startNAV) * 100;
            dataPoint.comparison2SIPValue = this.calculateSIPValueAtDate(compFundData.sipInvestments, navPoint.date, compNavPoint);
          }
        }
      });

      data.push(dataPoint);
    }

    return data.filter(point => point.fundSIPValue > 0);
  }
}

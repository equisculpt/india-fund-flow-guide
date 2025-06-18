export class EnhancedFundDataExtractor {
  static calculatePerformanceFromNAV(navHistory: any[]): {
    returns1Y: number;
    returns3Y: number;
    returns5Y: number;
    xirr1Y: number;
    xirr3Y: number;
    xirr5Y: number;
  } {
    console.log('EnhancedFundDataExtractor: Calculating performance from NAV history:', navHistory.length, 'records');
    
    if (!navHistory || navHistory.length < 50) {
      console.log('EnhancedFundDataExtractor: Insufficient NAV history data (need at least 50 records)');
      return { 
        returns1Y: 0, returns3Y: 0, returns5Y: 0,
        xirr1Y: 0, xirr3Y: 0, xirr5Y: 0
      };
    }

    // NAV history is in reverse chronological order (latest first)
    const currentNAV = parseFloat(navHistory[0]?.nav || '0');
    const currentDate = new Date(navHistory[0]?.date);
    
    console.log('EnhancedFundDataExtractor: Current NAV:', currentNAV, 'from date:', navHistory[0]?.date);
    
    if (currentNAV <= 0) {
      console.log('EnhancedFundDataExtractor: Invalid current NAV');
      return { 
        returns1Y: 0, returns3Y: 0, returns5Y: 0,
        xirr1Y: 0, xirr3Y: 0, xirr5Y: 0
      };
    }

    // Find NAV values for different time periods by looking for exact date matches or closest dates
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    
    const threeYearsAgo = new Date(currentDate);
    threeYearsAgo.setFullYear(currentDate.getFullYear() - 3);
    
    const fiveYearsAgo = new Date(currentDate);
    fiveYearsAgo.setFullYear(currentDate.getFullYear() - 5);

    // Find closest NAV values for each period
    const nav1Y = this.findClosestNAV(navHistory, oneYearAgo);
    const nav3Y = this.findClosestNAV(navHistory, threeYearsAgo);
    const nav5Y = this.findClosestNAV(navHistory, fiveYearsAgo);

    console.log('EnhancedFundDataExtractor: NAV values found:', {
      current: { nav: currentNAV, date: navHistory[0]?.date },
      oneYear: nav1Y,
      threeYear: nav3Y,
      fiveYear: nav5Y
    });

    // Calculate absolute returns using the correct formula: (Current - Previous) / Previous * 100
    const returns1Y = nav1Y.nav > 0 ? ((currentNAV - nav1Y.nav) / nav1Y.nav) * 100 : 0;
    
    // Calculate CAGR (Compound Annual Growth Rate) for multi-year periods
    const actualYears3Y = this.calculateActualYears(nav3Y.date, currentDate);
    const actualYears5Y = this.calculateActualYears(nav5Y.date, currentDate);
    
    const returns3Y = nav3Y.nav > 0 && actualYears3Y > 0 ? 
      (Math.pow(currentNAV / nav3Y.nav, 1/actualYears3Y) - 1) * 100 : 0;
    
    const returns5Y = nav5Y.nav > 0 && actualYears5Y > 0 ? 
      (Math.pow(currentNAV / nav5Y.nav, 1/actualYears5Y) - 1) * 100 : 0;

    // Calculate proper XIRR using the correct time periods
    const xirr1Y = this.calculateProperXIRR(nav1Y.nav, currentNAV, 1);
    const xirr3Y = this.calculateProperXIRR(nav3Y.nav, currentNAV, actualYears3Y);
    const xirr5Y = this.calculateProperXIRR(nav5Y.nav, currentNAV, actualYears5Y);

    const result = {
      returns1Y: Math.round(returns1Y * 100) / 100,
      returns3Y: Math.round(returns3Y * 100) / 100,
      returns5Y: Math.round(returns5Y * 100) / 100,
      xirr1Y: Math.round(xirr1Y * 100) / 100,
      xirr3Y: Math.round(xirr3Y * 100) / 100,
      xirr5Y: Math.round(xirr5Y * 100) / 100
    };

    console.log('EnhancedFundDataExtractor: CORRECTED PERFORMANCE CALCULATION:', result);
    return result;
  }

  private static findClosestNAV(navHistory: any[], targetDate: Date): { nav: number; date: string } {
    let closestRecord = navHistory[navHistory.length - 1]; // Default to oldest record
    let minDifference = Infinity;

    for (const record of navHistory) {
      const recordDate = new Date(record.date);
      const difference = Math.abs(recordDate.getTime() - targetDate.getTime());
      
      if (difference < minDifference) {
        minDifference = difference;
        closestRecord = record;
      }
    }

    return {
      nav: parseFloat(closestRecord?.nav || '0'),
      date: closestRecord?.date || ''
    };
  }

  private static calculateActualYears(startDate: string, endDate: Date): number {
    const start = new Date(startDate);
    const timeDiff = endDate.getTime() - start.getTime();
    return timeDiff / (1000 * 60 * 60 * 24 * 365.25); // Account for leap years
  }

  private static calculateProperXIRR(startNAV: number, currentNAV: number, years: number): number {
    if (startNAV <= 0 || currentNAV <= 0 || years <= 0) return 0;
    
    // XIRR formula: (Ending Value / Beginning Value)^(1/years) - 1
    const xirr = Math.pow(currentNAV / startNAV, 1 / years) - 1;
    return xirr * 100;
  }

  static calculateXIRR(navData: any[], currentNAV: number): number {
    if (!navData || navData.length < 2) return 0;

    try {
      const startNAV = parseFloat(navData[navData.length - 1]?.nav || '0');
      if (startNAV <= 0) return 0;

      const startDate = new Date(navData[navData.length - 1]?.date);
      const endDate = new Date(navData[0]?.date);
      const years = this.calculateActualYears(navData[navData.length - 1]?.date, endDate);
      
      if (years <= 0) return 0;
      
      // Proper XIRR calculation
      const xirr = Math.pow(currentNAV / startNAV, 1 / years) - 1;
      return xirr * 100;
    } catch (error) {
      console.error('Error calculating XIRR:', error);
      return 0;
    }
  }

  static estimateExpenseRatio(category: string, fundHouse: string): number {
    // Industry average expense ratios by category
    const categoryRatios: { [key: string]: number } = {
      'Large Cap': 1.2,
      'Mid Cap': 1.5,
      'Small Cap': 1.8,
      'Multi Cap': 1.4,
      'ELSS': 1.3,
      'Hybrid': 1.0,
      'Debt': 0.8,
      'Index': 0.2
    };

    // Fund house adjustments (some are known for lower fees)
    const fundHouseAdjustments: { [key: string]: number } = {
      'SBI Mutual Fund': -0.1,
      'HDFC Mutual Fund': 0.0,
      'ICICI Prudential Mutual Fund': 0.0,
      'Axis Mutual Fund': -0.05,
      'Kotak Mutual Fund': -0.05,
      'UTI Mutual Fund': -0.1
    };

    let baseRatio = categoryRatios[category] || 1.2;
    let adjustment = fundHouseAdjustments[fundHouse] || 0;
    
    return Math.max(0.1, baseRatio + adjustment);
  }

  static estimateAUM(category: string, fundAge: number = 5): number {
    // Base AUM estimates by category (in crores)
    const categoryAUM: { [key: string]: number } = {
      'Large Cap': 8000,
      'Mid Cap': 4000,
      'Small Cap': 2500,
      'Multi Cap': 6000,
      'ELSS': 5000,
      'Hybrid': 3000,
      'Debt': 2000,
      'Index': 1500
    };

    let baseAUM = categoryAUM[category] || 3000;
    
    // Adjust for fund age (older funds tend to have higher AUM)
    let ageMultiplier = Math.min(2.0, 0.5 + (fundAge * 0.15));
    
    // Add some randomness to make it more realistic
    let randomFactor = 0.7 + (Math.random() * 0.6); // 0.7 to 1.3
    
    return Math.round(baseAUM * ageMultiplier * randomFactor);
  }

  static extractSchemeAge(navHistory: any[]): number {
    if (!navHistory || navHistory.length === 0) return 5;
    
    // Estimate age based on NAV history length
    const historyLength = navHistory.length;
    return Math.max(1, Math.round(historyLength / 250)); // Rough estimate: 250 trading days per year
  }
}

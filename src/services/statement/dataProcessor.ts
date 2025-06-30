
import { format } from 'date-fns';
import { StatementData } from './types';

export class StatementDataProcessor {
  static calculateMonthsBetween(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.max(1, (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()));
  }

  static getSchemeNameByCode(schemeCode: string): string {
    const schemeMap: Record<string, string> = {
      '120503': 'HDFC Top 100 Fund-Direct Plan-Growth',
      '119551': 'SBI Small Cap Fund-Direct Plan-Growth',
      '118989': 'Axis Bluechip Fund-Direct Plan-Growth'
    };
    return schemeMap[schemeCode] || `Scheme ${schemeCode}`;
  }

  static processPortfolioData(holdings: any[]) {
    const totalInvested = holdings.reduce((sum, h) => sum + h.investedValue, 0);
    const currentValue = holdings.reduce((sum, h) => sum + h.marketValue, 0);
    const totalReturns = currentValue - totalInvested;
    const returnsPercentage = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;

    return {
      totalInvested,
      currentValue,
      totalReturns,
      returnsPercentage,
      xirr: 18.5 + Math.random() * 10, // Mock XIRR
      activeSIPs: 0, // Will be set by caller
      completedSIPs: Math.floor(Math.random() * 3)
    };
  }

  static processSIPData(sipsResponse: any[]) {
    return sipsResponse.map(sip => {
      const monthsActive = StatementDataProcessor.calculateMonthsBetween(sip.startDate, new Date().toISOString().split('T')[0]);
      const totalInvested = sip.sipAmount * monthsActive;
      const currentValue = totalInvested * (1 + Math.random() * 0.3); // Mock growth
      
      return {
        sipId: sip.sipId,
        schemeCode: sip.schemeCode,
        schemeName: StatementDataProcessor.getSchemeNameByCode(sip.schemeCode),
        sipAmount: sip.sipAmount,
        frequency: sip.sipFrequency,
        startDate: sip.startDate,
        endDate: sip.endDate,
        status: sip.sipStatus,
        nextDueDate: sip.nextDueDate,
        totalInstallments: monthsActive + 12, // Mock total planned
        completedInstallments: monthsActive,
        totalInvested,
        currentValue,
        returns: totalInvested > 0 ? ((currentValue - totalInvested) / totalInvested) * 100 : 0
      };
    });
  }

  static enhanceHoldingsWithSIPData(holdings: any[]) {
    return holdings.map(h => ({
      ...h,
      sipStatus: Math.random() > 0.5 ? 'ACTIVE' : undefined,
      sipAmount: Math.random() > 0.5 ? 5000 : undefined,
      nextSIPDate: Math.random() > 0.5 ? format(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd') : undefined
    }));
  }
}

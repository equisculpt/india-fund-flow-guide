
import { bseStarMFService } from './bseStarMFService';
import { format, subMonths, subYears } from 'date-fns';

// Statement data service that uses BSE STAR MF API format
export interface StatementData {
  userInfo: {
    name: string;
    clientCode: string;
    panMasked: string;
    email: string;
    mobile: string;
    sipBreweryId: string;
  };
  portfolio: {
    totalInvested: number;
    currentValue: number;
    totalReturns: number;
    returnsPercentage: number;
    xirr: number;
    activeSIPs: number;
    completedSIPs: number;
  };
  holdings: Array<{
    schemeCode: string;
    schemeName: string;
    folioNumber: string;
    units: number;
    averageNav: number;
    currentNav: number;
    marketValue: number;
    investedValue: number;
    pnl: number;
    pnlPercentage: number;
    lastTransactionDate: string;
    sipStatus?: 'ACTIVE' | 'PAUSED' | 'STOPPED';
    sipAmount?: number;
    nextSIPDate?: string;
  }>;
  transactions: Array<{
    orderNumber: string;
    transactionDate: string;
    schemeCode: string;
    schemeName: string;
    transactionType: 'PURCHASE' | 'REDEMPTION' | 'SIP';
    amount: number;
    units: number;
    nav: number;
    folioNumber: string;
    settlementDate: string;
  }>;
  capitalGains: {
    shortTerm: Array<{
      schemeName: string;
      purchaseDate: string;
      saleDate: string;
      purchaseValue: number;
      saleValue: number;
      gain: number;
      taxRate: number;
    }>;
    longTerm: Array<{
      schemeName: string;
      purchaseDate: string;
      saleDate: string;
      purchaseValue: number;
      saleValue: number;
      gain: number;
      taxRate: number;
    }>;
  };
  sips: Array<{
    sipId: string;
    schemeCode: string;
    schemeName: string;
    sipAmount: number;
    frequency: string;
    startDate: string;
    endDate?: string;
    status: 'ACTIVE' | 'PAUSED' | 'STOPPED';
    nextDueDate?: string;
    totalInstallments: number;
    completedInstallments: number;
    totalInvested: number;
    currentValue: number;
    returns: number;
  }>;
  rewards: {
    totalEarned: number;
    referralBonus: number;
    loyaltyPoints: number;
    cashback: number;
    recentTransactions: Array<{
      date: string;
      type: string;
      amount: number;
      description: string;
    }>;
  };
}

class StatementDataService {
  async getStatementData(clientCode: string, statementType: string): Promise<StatementData> {
    console.log(`Fetching statement data for client: ${clientCode}, type: ${statementType}`);
    
    // Fetch data from BSE STAR MF APIs (using mock responses for now)
    const [holdingsResponse, transactionsResponse, sipsResponse] = await Promise.all([
      bseStarMFService.getHoldings(clientCode),
      bseStarMFService.getTransactions(clientCode),
      bseStarMFService.getSIPs(clientCode)
    ]);

    // Mock user info (would come from your user database)
    const userInfo = {
      name: 'Milin R. Parekh',
      clientCode: clientCode,
      panMasked: 'ABCD****1234',
      email: 'milin@example.com',
      mobile: '+91 98765****43',
      sipBreweryId: `SB${clientCode}`
    };

    // Process holdings data
    const holdings = holdingsResponse.holdings || [];
    const totalInvested = holdings.reduce((sum, h) => sum + h.investedValue, 0);
    const currentValue = holdings.reduce((sum, h) => sum + h.marketValue, 0);
    const totalReturns = currentValue - totalInvested;
    const returnsPercentage = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;

    // Process SIP data
    const processedSIPs = sipsResponse.map(sip => {
      const monthsActive = this.calculateMonthsBetween(sip.startDate, new Date().toISOString().split('T')[0]);
      const totalInvested = sip.sipAmount * monthsActive;
      const currentValue = totalInvested * (1 + Math.random() * 0.3); // Mock growth
      
      return {
        sipId: sip.sipId,
        schemeCode: sip.schemeCode,
        schemeName: this.getSchemeNameByCode(sip.schemeCode),
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

    // Mock capital gains data
    const capitalGains = this.generateMockCapitalGains();

    // Mock rewards data
    const rewards = {
      totalEarned: 2500,
      referralBonus: 1500,
      loyaltyPoints: 750,
      cashback: 250,
      recentTransactions: [
        {
          date: format(subMonths(new Date(), 1), 'yyyy-MM-dd'),
          type: 'Referral Bonus',
          amount: 500,
          description: 'Referral reward for Raj Patel'
        },
        {
          date: format(subMonths(new Date(), 2), 'yyyy-MM-dd'),
          type: 'Loyalty Cashback',
          amount: 100,
          description: 'SIP consistency reward'
        }
      ]
    };

    return {
      userInfo,
      portfolio: {
        totalInvested,
        currentValue,
        totalReturns,
        returnsPercentage,
        xirr: 18.5 + Math.random() * 10, // Mock XIRR
        activeSIPs: sipsResponse.filter(s => s.sipStatus === 'ACTIVE').length,
        completedSIPs: Math.floor(Math.random() * 3)
      },
      holdings: holdings.map(h => ({
        ...h,
        sipStatus: Math.random() > 0.5 ? 'ACTIVE' : undefined,
        sipAmount: Math.random() > 0.5 ? 5000 : undefined,
        nextSIPDate: Math.random() > 0.5 ? format(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd') : undefined
      })),
      transactions: transactionsResponse.transactions || [],
      capitalGains,
      sips: processedSIPs,
      rewards
    };
  }

  private calculateMonthsBetween(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.max(1, (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()));
  }

  private getSchemeNameByCode(schemeCode: string): string {
    const schemeMap: Record<string, string> = {
      '120503': 'HDFC Top 100 Fund-Direct Plan-Growth',
      '119551': 'SBI Small Cap Fund-Direct Plan-Growth',
      '118989': 'Axis Bluechip Fund-Direct Plan-Growth'
    };
    return schemeMap[schemeCode] || `Scheme ${schemeCode}`;
  }

  private generateMockCapitalGains() {
    return {
      shortTerm: [
        {
          schemeName: 'HDFC Top 100 Fund',
          purchaseDate: '2024-08-15',
          saleDate: '2024-11-20',
          purchaseValue: 25000,
          saleValue: 28500,
          gain: 3500,
          taxRate: 15
        }
      ],
      longTerm: [
        {
          schemeName: 'SBI Small Cap Fund',
          purchaseDate: '2022-06-10',
          saleDate: '2024-10-15',
          purchaseValue: 50000,
          saleValue: 72000,
          gain: 22000,
          taxRate: 10
        }
      ]
    };
  }
}

export const statementDataService = new StatementDataService();

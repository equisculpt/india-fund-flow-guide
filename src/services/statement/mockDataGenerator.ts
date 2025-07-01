
import { format, subMonths, subYears, addDays } from 'date-fns';
import { StatementData } from './types';

export class MockDataGenerator {
  static generateMockUserInfo(clientCode: string) {
    return {
      name: 'Rajesh Kumar',
      clientCode,
      panMasked: 'ABCDE****F',
      email: 'rajesh.kumar@email.com',
      mobile: '+91-98765*****',
      sipBreweryId: 'SB' + clientCode.slice(-6)
    };
  }

  static generateMockHoldings() {
    return [
      {
        schemeCode: '120503',
        schemeName: 'SBI Small Cap Fund - Direct Plan - Growth',
        folioNumber: 'SB12345678',
        units: 245.863,
        averageNav: 185.45,
        currentNav: 198.73,
        marketValue: 48856,
        investedValue: 45600,
        pnl: 3256,
        pnlPercentage: 7.14,
        lastTransactionDate: format(subMonths(new Date(), 1), 'yyyy-MM-dd'),
        sipStatus: 'ACTIVE' as const,
        sipAmount: 2000,
        nextSIPDate: format(addDays(new Date(), 15), 'yyyy-MM-dd')
      },
      {
        schemeCode: '120305',
        schemeName: 'HDFC Top 100 Fund - Direct Plan - Growth',
        folioNumber: 'HD87654321',
        units: 156.234,
        averageNav: 892.15,
        currentNav: 945.67,
        marketValue: 147789,
        investedValue: 139400,
        pnl: 8389,
        pnlPercentage: 6.02,
        lastTransactionDate: format(subMonths(new Date(), 2), 'yyyy-MM-dd'),
        sipStatus: 'ACTIVE' as const,
        sipAmount: 3000,
        nextSIPDate: format(addDays(new Date(), 10), 'yyyy-MM-dd')
      },
      {
        schemeCode: '120102',
        schemeName: 'Axis Bluechip Fund - Direct Plan - Growth',
        folioNumber: 'AX11223344',
        units: 89.456,
        averageNav: 567.89,
        currentNav: 612.45,
        marketValue: 54789,
        investedValue: 50800,
        pnl: 3989,
        pnlPercentage: 7.85,
        lastTransactionDate: format(subMonths(new Date(), 3), 'yyyy-MM-dd'),
        sipStatus: 'PAUSED' as const,
        sipAmount: 1500
      }
    ];
  }

  static generateMockTransactions() {
    return [
      {
        orderNumber: 'ORD123456789',
        transactionDate: format(subMonths(new Date(), 1), 'yyyy-MM-dd'),
        schemeCode: '120503',
        schemeName: 'SBI Small Cap Fund - Direct Plan - Growth',
        transactionType: 'SIP' as const,
        amount: 2000,
        units: 10.067,
        nav: 198.67,
        folioNumber: 'SB12345678',
        settlementDate: format(subMonths(new Date(), 1), 'yyyy-MM-dd')
      },
      {
        orderNumber: 'ORD987654321',
        transactionDate: format(subMonths(new Date(), 2), 'yyyy-MM-dd'),
        schemeCode: '120305',
        schemeName: 'HDFC Top 100 Fund - Direct Plan - Growth',
        transactionType: 'SIP' as const,
        amount: 3000,
        units: 3.173,
        nav: 945.23,
        folioNumber: 'HD87654321',
        settlementDate: format(subMonths(new Date(), 2), 'yyyy-MM-dd')
      }
    ];
  }

  static generateMockPortfolio() {
    return {
      totalInvested: 235800,
      currentValue: 251434,
      totalReturns: 15634,
      returnsPercentage: 6.63,
      xirr: 14.25,
      activeSIPs: 2,
      completedSIPs: 0
    };
  }

  static generateMockSIPs() {
    return [
      {
        sipId: 'SIP001',
        schemeCode: '120503',
        schemeName: 'SBI Small Cap Fund - Direct Plan - Growth',
        sipAmount: 2000,
        frequency: 'Monthly',
        startDate: format(subYears(new Date(), 1), 'yyyy-MM-dd'),
        status: 'ACTIVE' as const,
        nextDueDate: format(addDays(new Date(), 15), 'yyyy-MM-dd'),
        totalInstallments: 12,
        completedInstallments: 12,
        totalInvested: 24000,
        currentValue: 26500,
        returns: 2500
      },
      {
        sipId: 'SIP002',
        schemeCode: '120305',
        schemeName: 'HDFC Top 100 Fund - Direct Plan - Growth',
        sipAmount: 3000,
        frequency: 'Monthly',
        startDate: format(subMonths(new Date(), 8), 'yyyy-MM-dd'),
        status: 'ACTIVE' as const,
        nextDueDate: format(addDays(new Date(), 10), 'yyyy-MM-dd'),
        totalInstallments: 12,
        completedInstallments: 8,
        totalInvested: 24000,
        currentValue: 25800,
        returns: 1800
      }
    ];
  }

  static generateMockCapitalGains() {
    return {
      shortTerm: [
        {
          schemeName: 'HDFC Top 100 Fund-Direct Plan-Growth',
          purchaseDate: format(subMonths(new Date(), 8), 'yyyy-MM-dd'),
          saleDate: format(subMonths(new Date(), 2), 'yyyy-MM-dd'),
          purchaseValue: 25000,
          saleValue: 28500,
          gain: 3500,
          taxRate: 15
        }
      ],
      longTerm: [
        {
          schemeName: 'Axis Bluechip Fund-Direct Plan-Growth',
          purchaseDate: format(subYears(new Date(), 2), 'yyyy-MM-dd'),
          saleDate: format(subMonths(new Date(), 3), 'yyyy-MM-dd'),
          purchaseValue: 50000,
          saleValue: 68000,
          gain: 18000,
          taxRate: 10
        }
      ]
    };
  }

  static generateMockRewards() {
    return {
      totalEarned: 2850,
      referralBonus: 1200,
      loyaltyPoints: 450,
      cashback: 1200,
      recentTransactions: [
        {
          date: format(subMonths(new Date(), 1), 'yyyy-MM-dd'),
          type: 'SIP Streak Bonus',
          amount: 250,
          description: '12-month SIP completion bonus'
        },
        {
          date: format(subMonths(new Date(), 2), 'yyyy-MM-dd'),
          type: 'Referral Reward',
          amount: 500,
          description: 'Friend joined via your referral'
        }
      ]
    };
  }

  static generateCompleteStatementData(clientCode: string): StatementData {
    return {
      userInfo: this.generateMockUserInfo(clientCode),
      portfolio: this.generateMockPortfolio(),
      holdings: this.generateMockHoldings(),
      transactions: this.generateMockTransactions(),
      capitalGains: this.generateMockCapitalGains(),
      sips: this.generateMockSIPs(),
      rewards: this.generateMockRewards()
    };
  }
}


import { StatementData, UserInfo, Portfolio, Holding, Transaction, CapitalGains, SIP, Rewards } from './types';

export class MockDataGenerator {
  static generateCompleteStatementData(clientCode: string): StatementData {
    return {
      userInfo: this.generateUserInfo(clientCode),
      portfolio: this.generatePortfolio(),
      holdings: this.generateHoldings(),
      transactions: this.generateTransactions(),
      capitalGains: this.generateCapitalGains(),
      sips: this.generateSIPs(),
      rewards: this.generateRewards()
    };
  }

  private static generateUserInfo(clientCode: string): UserInfo {
    const names = ['Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Gupta', 'Vikram Singh'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    
    return {
      name: randomName,
      clientCode: clientCode,
      panMasked: 'ABC**1234L',
      email: `${randomName.toLowerCase().replace(' ', '.')}@email.com`,
      mobile: '+91-98765-43210',
      sipBreweryId: `SB-${clientCode}`,
      isVerified: true,
      avatarUrl: '/og-image.png',
      address: '123, MG Road, Bangalore, Karnataka - 560001',
      kycStatus: 'VERIFIED',
      role: 'USER',
      segment: 'DIRECT'
    };
  }

  private static generatePortfolio(): Portfolio {
    const totalInvested = 85000;
    const currentValue = 102450;
    const totalReturns = currentValue - totalInvested;
    
    return {
      totalInvested,
      currentValue,
      totalReturns,
      returnsPercentage: (totalReturns / totalInvested) * 100,
      xirr: 14.5,
      activeSIPs: 4,
      completedSIPs: 2,
      goalName: 'Wealth Creation Goal',
      goalTarget: 1000000,
      goalAchieved: currentValue,
      lastUpdated: new Date().toISOString()
    };
  }

  private static generateHoldings(): Holding[] {
    return [
      {
        schemeCode: 'HDFC-SC-001',
        schemeName: 'HDFC Small Cap Fund - Direct Growth',
        folioNumber: 'HDG0123456',
        units: 450.234,
        averageNav: 89.45,
        currentNav: 95.20,
        marketValue: 42867,
        investedValue: 40256,
        pnl: 2611,
        pnlPercentage: 6.49,
        lastTransactionDate: '2024-06-15',
        sipStatus: 'ACTIVE',
        sipAmount: 5000,
        nextSIPDate: '2024-07-15',
        category: 'Small Cap',
        subCategory: 'Equity',
        amcName: 'HDFC Mutual Fund',
        isELSS: false,
        isLiquid: false,
        expenseRatio: 1.85
      },
      {
        schemeCode: 'SBI-LC-002',
        schemeName: 'SBI Large Cap Fund - Direct Growth',
        folioNumber: 'SBI9876543',
        units: 320.567,
        averageNav: 67.80,
        currentNav: 71.15,
        marketValue: 22798,
        investedValue: 21734,
        pnl: 1064,
        pnlPercentage: 4.90,
        lastTransactionDate: '2024-06-15',
        sipStatus: 'ACTIVE',
        sipAmount: 3000,
        nextSIPDate: '2024-07-15',
        category: 'Large Cap',
        subCategory: 'Equity',
        amcName: 'SBI Mutual Fund',
        isELSS: false,
        isLiquid: false,
        expenseRatio: 1.25
      },
      {
        schemeCode: 'AXIS-ELSS-003',
        schemeName: 'Axis Long Term Equity Fund - Direct Growth',
        folioNumber: 'AXS1122334',
        units: 280.123,
        averageNav: 45.30,
        currentNav: 48.90,
        marketValue: 13698,
        investedValue: 12686,
        pnl: 1012,
        pnlPercentage: 7.98,
        lastTransactionDate: '2024-05-10',
        sipStatus: 'ACTIVE',
        sipAmount: 2000,
        nextSIPDate: '2024-07-10',
        category: 'ELSS',
        subCategory: 'Tax Saver',
        amcName: 'Axis Mutual Fund',
        isELSS: true,
        isLiquid: false,
        lockinEndDate: '2027-05-10',
        expenseRatio: 1.75
      },
      {
        schemeCode: 'ICICI-LIQ-004',
        schemeName: 'ICICI Prudential Liquid Fund - Direct Growth',
        folioNumber: 'ICP5566778',
        units: 5234.789,
        averageNav: 4.35,
        currentNav: 4.38,
        marketValue: 22928,
        investedValue: 22771,
        pnl: 157,
        pnlPercentage: 0.69,
        lastTransactionDate: '2024-06-20',
        sipStatus: 'PAUSED',
        category: 'Liquid',
        subCategory: 'Debt',
        amcName: 'ICICI Prudential Mutual Fund',
        isELSS: false,
        isLiquid: true,
        expenseRatio: 0.25
      }
    ];
  }

  private static generateTransactions(): Transaction[] {
    return [
      {
        orderNumber: 'ORD-2024-001',
        transactionDate: '2024-06-15',
        schemeCode: 'HDFC-SC-001',
        schemeName: 'HDFC Small Cap Fund - Direct Growth',
        transactionType: 'SIP',
        amount: 5000,
        units: 52.356,
        nav: 95.50,
        folioNumber: 'HDG0123456',
        settlementDate: '2024-06-17',
        status: 'SUCCESS',
        paymentMode: 'Auto Debit',
        referenceId: 'REF-HD-001'
      },
      {
        orderNumber: 'ORD-2024-002',
        transactionDate: '2024-06-15',
        schemeCode: 'SBI-LC-002',
        schemeName: 'SBI Large Cap Fund - Direct Growth',
        transactionType: 'SIP',
        amount: 3000,
        units: 42.145,
        nav: 71.20,
        folioNumber: 'SBI9876543',
        settlementDate: '2024-06-17',
        status: 'SUCCESS',
        paymentMode: 'UPI',
        referenceId: 'REF-SBI-002'
      },
      {
        orderNumber: 'ORD-2024-003',
        transactionDate: '2024-05-20',
        schemeCode: 'ICICI-LIQ-004',
        schemeName: 'ICICI Prudential Liquid Fund - Direct Growth',
        transactionType: 'LUMPSUM',
        amount: 25000,
        units: 5712.33,
        nav: 4.38,
        folioNumber: 'ICP5566778',
        settlementDate: '2024-05-20',
        status: 'SUCCESS',
        paymentMode: 'Net Banking',
        referenceId: 'REF-ICP-003'
      }
    ];
  }

  private static generateCapitalGains(): CapitalGains {
    return {
      shortTerm: [
        {
          schemeName: 'ICICI Prudential Liquid Fund - Direct Growth',
          purchaseDate: '2023-12-15',
          saleDate: '2024-05-20',
          purchaseValue: 15000,
          saleValue: 15450,
          gain: 450,
          taxRate: 30,
          gainType: 'ShortTerm'
        }
      ],
      longTerm: [
        {
          schemeName: 'SBI Large Cap Fund - Direct Growth',
          purchaseDate: '2022-01-15',
          saleDate: '2024-03-20',
          purchaseValue: 20000,
          saleValue: 24500,
          gain: 4500,
          taxRate: 10,
          gainType: 'LongTerm'
        }
      ]
    };
  }

  private static generateSIPs(): SIP[] {
    return [
      {
        sipId: 'SIP-001',
        schemeCode: 'HDFC-SC-001',
        schemeName: 'HDFC Small Cap Fund - Direct Growth',
        sipAmount: 5000,
        frequency: 'MONTHLY',
        startDate: '2023-01-15',
        status: 'ACTIVE',
        nextDueDate: '2024-07-15',
        totalInstallments: 60,
        completedInstallments: 18,
        totalInvested: 90000,
        currentValue: 105450,
        returns: 15450,
        amcName: 'HDFC Mutual Fund',
        endDate: '2028-01-15',
        isTaxSaver: false,
        goalName: 'Wealth Creation Goal',
        sipType: 'BSE',
        mandateStatus: 'ACTIVE'
      },
      {
        sipId: 'SIP-002',
        schemeCode: 'AXIS-ELSS-003',
        schemeName: 'Axis Long Term Equity Fund - Direct Growth',
        sipAmount: 2000,
        frequency: 'MONTHLY',
        startDate: '2023-04-10',
        status: 'ACTIVE',
        nextDueDate: '2024-07-10',
        totalInstallments: 36,
        completedInstallments: 15,
        totalInvested: 30000,
        currentValue: 34200,
        returns: 4200,
        amcName: 'Axis Mutual Fund',
        endDate: '2026-04-10',
        isTaxSaver: true,
        goalName: 'Tax Saving Goal',
        sipType: 'BSE',
        mandateStatus: 'ACTIVE'
      }
    ];
  }

  private static generateRewards(): Rewards {
    return {
      totalEarned: 2450,
      referralBonus: 1200,
      loyaltyPoints: 850,
      cashback: 400,
      recentTransactions: [
        {
          date: '2024-06-15',
          type: 'Referral Bonus',
          amount: 500,
          description: 'Friend joined via your referral link'
        },
        {
          date: '2024-06-01',
          type: 'Loyalty Points',
          amount: 150,
          description: 'Monthly investment milestone achieved'
        },
        {
          date: '2024-05-20',
          type: 'Cashback',
          amount: 100,
          description: 'First-time lumpsum investment bonus'
        }
      ],
      pendingPayouts: 320,
      lastCreditedDate: '2024-06-15',
      tier: 'Gold'
    };
  }
}

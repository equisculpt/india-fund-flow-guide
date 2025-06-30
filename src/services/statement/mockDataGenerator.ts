
import { format, subMonths, subYears } from 'date-fns';

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
        },
        {
          schemeName: 'SBI Small Cap Fund-Direct Plan-Growth',
          purchaseDate: format(subMonths(new Date(), 6), 'yyyy-MM-dd'),
          saleDate: format(subMonths(new Date(), 1), 'yyyy-MM-dd'),
          purchaseValue: 15000,
          saleValue: 16800,
          gain: 1800,
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
        },
        {
          date: format(subMonths(new Date(), 3), 'yyyy-MM-dd'),
          type: 'Cashback',
          amount: 150,
          description: 'Investment milestone reward'
        }
      ]
    };
  }
}

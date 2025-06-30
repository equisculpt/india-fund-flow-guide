
import { format, subMonths } from 'date-fns';

export class MockDataGenerator {
  static generateMockCapitalGains() {
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

  static generateMockRewards() {
    return {
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
  }

  static generateMockUserInfo(clientCode: string) {
    return {
      name: 'Milin R. Parekh',
      clientCode: clientCode,
      panMasked: 'ABCD****1234',
      email: 'milin@example.com',
      mobile: '+91 98765****43',
      sipBreweryId: `SB${clientCode}`
    };
  }
}

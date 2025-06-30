
import { format, subMonths, subYears } from 'date-fns';

// Statement data types that match BSE STAR MF API format
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
    status: 'ACTIVE' | 'PAUSED' | 'STOPPED' | 'PENDING';
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

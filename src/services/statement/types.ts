
export interface UserInfo {
  name: string;
  clientCode: string;
  panMasked: string;
  email: string;
  mobile: string;
  sipBreweryId: string;
}

export interface Portfolio {
  totalInvested: number;
  currentValue: number;
  totalReturns: number;
  returnsPercentage: number;
  xirr: number;
  activeSIPs: number;
  completedSIPs: number;
}

export interface Holding {
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
  sipStatus: 'ACTIVE' | 'PAUSED' | 'STOPPED';
  sipAmount?: number;
  nextSIPDate?: string;
}

export interface Transaction {
  orderNumber: string;
  transactionDate: string;
  schemeCode: string;
  schemeName: string;
  transactionType: 'SIP' | 'LUMPSUM' | 'REDEEM' | 'SWITCH';
  amount: number;
  units: number;
  nav: number;
  folioNumber: string;
  settlementDate: string;
}

export interface CapitalGain {
  schemeName: string;
  purchaseDate: string;
  saleDate: string;
  purchaseValue: number;
  saleValue: number;
  gain: number;
  taxRate: number;
}

export interface CapitalGains {
  shortTerm: CapitalGain[];
  longTerm: CapitalGain[];
}

export interface SIP {
  sipId: string;
  schemeCode: string;
  schemeName: string;
  sipAmount: number;
  frequency: string;
  startDate: string;
  status: 'ACTIVE' | 'PAUSED' | 'STOPPED';
  nextDueDate?: string;
  totalInstallments: number;
  completedInstallments: number;
  totalInvested: number;
  currentValue: number;
  returns: number;
}

export interface RewardTransaction {
  date: string;
  type: string;
  amount: number;
  description: string;
}

export interface Rewards {
  totalEarned: number;
  referralBonus: number;
  loyaltyPoints: number;
  cashback: number;
  recentTransactions: RewardTransaction[];
}

export interface StatementData {
  userInfo: UserInfo;
  portfolio: Portfolio;
  holdings: Holding[];
  transactions: Transaction[];
  capitalGains: CapitalGains;
  sips: SIP[];
  rewards: Rewards;
}

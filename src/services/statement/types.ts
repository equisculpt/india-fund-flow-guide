
export interface UserInfo {
  name: string;
  clientCode: string;
  panMasked: string;
  email: string;
  mobile: string;
  sipBreweryId: string;
  isVerified?: boolean;
  avatarUrl?: string;
  address?: string;
  kycStatus?: 'VERIFIED' | 'PENDING' | 'FAILED';
  role?: 'USER' | 'AGENT' | 'ADMIN';
  segment?: 'DIRECT' | 'REGULAR' | 'IFA_CLIENT';
}

export interface Portfolio {
  totalInvested: number;
  currentValue: number;
  totalReturns: number;
  returnsPercentage: number;
  xirr: number;
  activeSIPs: number;
  completedSIPs: number;
  goalName?: string;
  goalTarget?: number;
  goalAchieved?: number;
  lastUpdated?: string;
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
  category?: string;
  subCategory?: string;
  amcName?: string;
  isELSS?: boolean;
  isLiquid?: boolean;
  lockinEndDate?: string;
  expenseRatio?: number;
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
  status?: 'SUCCESS' | 'FAILED' | 'PENDING';
  paymentMode?: string;
  referenceId?: string;
}

export interface CapitalGain {
  schemeName: string;
  purchaseDate: string;
  saleDate: string;
  purchaseValue: number;
  saleValue: number;
  gain: number;
  taxRate: number;
  gainType?: 'ShortTerm' | 'LongTerm';
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
  amcName?: string;
  endDate?: string;
  isTaxSaver?: boolean;
  goalName?: string;
  sipType?: 'ONLINE' | 'OFFLINE' | 'ECS' | 'BSE';
  mandateStatus?: string;
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
  pendingPayouts?: number;
  lastCreditedDate?: string;
  tier?: string;
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

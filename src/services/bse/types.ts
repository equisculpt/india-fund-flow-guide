
export interface BSEOrderResponse {
  status: 'success' | 'error';
  orderNumber: string;
  clientCode: string;
  schemeCode: string;
  orderAmount: number;
  orderDate: string;
  folioNumber?: string;
  units?: number;
  nav?: number;
  errorCode?: string;
  errorMessage?: string;
}

export interface BSEHoldingsResponse {
  status: 'success' | 'error';
  clientCode: string;
  holdings: {
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
  }[];
}

export interface BSESIPResponse {
  status: 'success' | 'error';
  sipId: string;
  clientCode: string;
  schemeCode: string;
  sipAmount: number;
  sipFrequency: 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  sipDate: number;
  startDate: string;
  endDate?: string;
  mandateId: string;
  sipStatus: 'ACTIVE' | 'PAUSED' | 'STOPPED' | 'PENDING';
  nextDueDate?: string;
}

export interface BSETransactionResponse {
  status: 'success' | 'error';
  transactions: {
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
  }[];
}

export interface InvestmentData {
  schemeCode: string;
  amount: number;
  clientCode: string;
  investmentType: 'LUMPSUM' | 'SIP';
  sipFrequency?: 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  sipDate?: number;
}

export interface SIPData {
  schemeCode: string;
  amount: number;
  clientCode: string;
  frequency: 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  sipDate: number;
  mandateId: string;
}

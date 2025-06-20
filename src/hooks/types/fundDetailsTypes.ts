
export interface FundData {
  schemeCode: string;
  schemeName: string;
  category: string;
  fundHouse: string;
  nav: number;
  navDate: string;
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  xirr1Y: number;
  xirr3Y: number;
  xirr5Y: number;
  expenseRatio: number;
  aum: number;
  minSipAmount: number;
  volatility: number;
  amc: string;
}

export interface UseFundDetailsReturn {
  fundData: FundData | null;
  latestNAV: any;
  historicalData: any[];
  navError: string;
  aiAnalysis: any;
  aiLoading: boolean;
  aiError: string;
  isLoading: boolean;
}


export interface FundData {
  schemeCode: string;
  schemeName: string;
  amc: string;
  category: string;
  nav: number;
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  xirr1Y?: number;
  xirr3Y?: number;
  xirr5Y?: number;
  aum: number;
  expenseRatio: number;
  volatility: number;
  minSipAmount: number;
  navDate?: string;
}

export interface NAVResponse {
  nav: number;
  date: string;
  actualSchemeName: string;
  fundHouse: string;
}

export interface TopFund {
  schemeCode: string;
  name: string;
}

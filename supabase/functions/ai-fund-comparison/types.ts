
export interface FundData {
  schemeCode: string;
  schemeName: string;
  category: string;
  fundHouse: string;
  nav: number;
  navDate: string;
  returns1M?: number;
  returns2M?: number;
  returns3M?: number;
  returns6M?: number;
  returns1Y?: number;
  returns2Y?: number;
  returns3Y?: number;
  returns4Y?: number;
  returns5Y?: number;
  expenseRatio?: number;
  aum?: number;
  sharpeRatio?: number;
  beta?: number;
  alpha?: number;
  volatility?: number;
  fundManagerTenure?: number;
  fundManagerExperience?: string;
}

export interface FundAnalysisData {
  name: string;
  category: string;
  fundHouse: string;
  currentNAV: number;
  navDate: string;
  performance: {
    oneMonth: number;
    twoMonth: number;
    threeMonth: number;
    sixMonth: number;
    oneYear: number;
    twoYear: number;
    threeYear: number;
    fourYear: number;
    fiveYear: number;
  };
  financialMetrics: {
    expenseRatio: number;
    aum: number;
    sharpeRatio: number;
    beta: number;
    alpha: number;
    volatility: number;
  };
  fundManager: {
    tenure: number;
    experience: string;
  };
}

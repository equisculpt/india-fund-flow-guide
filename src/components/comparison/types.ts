
export interface FundWithDetails {
  schemeCode: string;
  schemeName: string;
  category?: string;
  fundHouse?: string;
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

export interface EnhancedComparisonResult {
  bestFund: string;
  bestScore: number;
  analysis: any[];
  reasoning: string;
  marketRecommendation: string;
  marketTiming: {
    currentPhase: string;
    allocation: any;
    confidence: number;
    nextReview: string;
  };
  isStableResult: boolean;
  validUntil: string;
  aiAnalysis?: any;
  categoryComparison?: any;
  keyInsights?: string[];
}

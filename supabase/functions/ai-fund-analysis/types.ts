
export interface FundData {
  schemeName: string;
  category: string;
  expenseRatio: number;
  aum: number;
  volatility?: number;
  returns1Y?: number;
  returns3Y?: number;
  returns5Y?: number;
  xirr1Y?: number;
  xirr3Y?: number;
  xirr5Y?: number;
}

export interface AnalysisResult {
  aiScore: number;
  recommendation: string;
  confidence: number;
  reasoning: string;
  riskLevel: string;
  strengths: string[];
  concerns: string[];
  performanceRank: number;
  analysis: {
    performanceScore: number;
    volatilityScore: number;
    expenseScore: number;
    fundManagerScore: number;
    portfolioQualityScore: number;
  };
}

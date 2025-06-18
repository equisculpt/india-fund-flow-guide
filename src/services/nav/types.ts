
export interface AdvancedNAVAnalysis {
  schemeCode: string;
  schemeName: string;
  amcName: string;
  category: string;
  subCategory: string;
  nav: number;
  date: string;
  trendScore: number;
  confidence: number;
  historical3MonthAverage: number;
  historical3MonthData: Array<{ date: string; nav: number }>;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  volatilityScore: number;
  sharpeRatio: number;
  performanceRank: number;
  totalSchemes: number;
}

export interface ExtendedNAVHistory {
  nav_date: string;
  nav_value: number;
  scheme_code: string;
}

export interface SIPCalculationResult {
  total_invested: number;
  final_value: number;
  absolute_return: number;
  irr_percentage: number;
}

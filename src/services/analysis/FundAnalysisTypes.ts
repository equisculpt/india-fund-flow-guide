
export interface FundAnalysisResult {
  schemeCode: string;
  schemeName: string;
  category: string;
  nav: number;
  navDate: string;
  fundHouse: string;
  aiScore: number;
  performanceScore: number;
  volatilityScore: number;
  expenseScore: number;
  overallRank: number;
}

export interface CategoryTopFunds {
  category: string;
  funds: FundAnalysisResult[];
  lastUpdated: string;
}

export const FUND_CATEGORIES = [
  'Large Cap',
  'Mid Cap', 
  'Small Cap',
  'Multi Cap',
  'Flexi Cap',
  'ELSS',
  'Debt',
  'Hybrid',
  'Index',
  'Sectoral/Thematic'
] as const;

export type FundCategory = typeof FUND_CATEGORIES[number];

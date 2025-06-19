
export interface ParsedPortfolioData {
  scheme_name: string;
  scheme_code?: string;
  holdings: Array<{
    security: string;
    isin?: string;
    sector?: string;
    value_pct: number;
    market_value?: number;
  }>;
  total_securities: number;
  nav?: number;
  aum?: number;
}

export interface ProcessingResult {
  file: string;
  success: boolean;
  portfolios?: number;
  errors?: number;
  error?: string;
}

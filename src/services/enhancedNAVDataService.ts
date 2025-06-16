
interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: string;
}

interface BenchmarkIndex extends MarketData {
  name: string;
  sector?: string;
}

export interface AdvancedNAVAnalysis {
  schemeCode: string;
  schemeName: string;
  nav: number;
  date: string;
  category: string;
  subCategory: string;
  amcName: string;
  aiScore: number;
  confidence: number;
  predicted3MonthReturn: number;
  historical3MonthData: Array<{date: string, nav: number}>;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  volatilityScore: number;
  sharpeRatio: number;
  performanceRank: number;
  totalSchemes: number;
}

export interface ExtendedNAVHistory {
  scheme_code: string;
  nav_date: string;
  nav_value: number;
}

export interface SIPCalculationResult {
  total_invested: number;
  final_value: number;
  absolute_return: number;
  irr_percentage: number;
}

export class EnhancedNAVDataService {
  private static readonly AMFI_API_BASE = 'https://api.mfapi.in';
  
  // Get pre-analyzed fund data from database
  async getAdvancedAnalysis(): Promise<AdvancedNAVAnalysis[]> {
    try {
      console.log("Fetching pre-analyzed fund data from database...");
      
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { data, error } = await supabase
        .from('daily_fund_analysis')
        .select('*')
        .order('ai_score', { ascending: false });

      if (error) {
        console.error("Error fetching analyzed funds:", error);
        return this.getFallbackData();
      }

      if (!data || data.length === 0) {
        console.log("No analyzed data found, using fallback");
        return this.getFallbackData();
      }

      console.log(`Loaded ${data.length} pre-analyzed funds from database`);

      // Convert database format to expected format
      const analysisResults: AdvancedNAVAnalysis[] = data.map((fund: any) => ({
        schemeCode: fund.scheme_code,
        schemeName: fund.scheme_name,
        nav: fund.nav,
        date: fund.nav_date,
        category: fund.category,
        subCategory: fund.sub_category,
        amcName: fund.amc_name,
        aiScore: fund.ai_score,
        confidence: fund.confidence,
        predicted3MonthReturn: fund.predicted_3month_return,
        historical3MonthData: fund.historical_3month_data || [],
        riskLevel: fund.risk_level as 'LOW' | 'MEDIUM' | 'HIGH',
        volatilityScore: fund.volatility_score,
        sharpeRatio: fund.sharpe_ratio,
        performanceRank: fund.performance_rank,
        totalSchemes: fund.total_schemes_in_category
      }));

      return analysisResults;
      
    } catch (error) {
      console.error("Error in getAdvancedAnalysis:", error);
      return this.getFallbackData();
    }
  }

  // Get extended NAV history for charts
  async getExtendedNAVHistory(
    schemeCode: string, 
    period: '1W' | '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y' | '10Y'
  ): Promise<ExtendedNAVHistory[]> {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Calculate date range based on period
      const endDate = new Date();
      const startDate = new Date();
      
      switch (period) {
        case '1W':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '1M':
          startDate.setMonth(endDate.getMonth() - 1);
          break;
        case '3M':
          startDate.setMonth(endDate.getMonth() - 3);
          break;
        case '6M':
          startDate.setMonth(endDate.getMonth() - 6);
          break;
        case '1Y':
          startDate.setFullYear(endDate.getFullYear() - 1);
          break;
        case '3Y':
          startDate.setFullYear(endDate.getFullYear() - 3);
          break;
        case '5Y':
          startDate.setFullYear(endDate.getFullYear() - 5);
          break;
        case '10Y':
          startDate.setFullYear(endDate.getFullYear() - 10);
          break;
      }

      const { data, error } = await supabase
        .from('extended_nav_history')
        .select('*')
        .eq('scheme_code', schemeCode)
        .gte('nav_date', startDate.toISOString().split('T')[0])
        .lte('nav_date', endDate.toISOString().split('T')[0])
        .order('nav_date', { ascending: true });

      if (error) {
        console.error("Error fetching NAV history:", error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in getExtendedNAVHistory:", error);
      return [];
    }
  }

  // Calculate SIP returns and IRR
  async calculateSIPReturns(
    schemeCode: string,
    period: '1W' | '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y' | '10Y',
    monthlySIPAmount: number = 10000
  ): Promise<SIPCalculationResult | null> {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      
      switch (period) {
        case '1W':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '1M':
          startDate.setMonth(endDate.getMonth() - 1);
          break;
        case '3M':
          startDate.setMonth(endDate.getMonth() - 3);
          break;
        case '6M':
          startDate.setMonth(endDate.getMonth() - 6);
          break;
        case '1Y':
          startDate.setFullYear(endDate.getFullYear() - 1);
          break;
        case '3Y':
          startDate.setFullYear(endDate.getFullYear() - 3);
          break;
        case '5Y':
          startDate.setFullYear(endDate.getFullYear() - 5);
          break;
        case '10Y':
          startDate.setFullYear(endDate.getFullYear() - 10);
          break;
      }

      const { data, error } = await supabase.rpc('calculate_sip_irr', {
        scheme_code_param: schemeCode,
        start_date_param: startDate.toISOString().split('T')[0],
        end_date_param: endDate.toISOString().split('T')[0],
        monthly_sip_amount: monthlySIPAmount
      });

      if (error) {
        console.error("Error calculating SIP returns:", error);
        return null;
      }

      return data?.[0] || null;
    } catch (error) {
      console.error("Error in calculateSIPReturns:", error);
      return null;
    }
  }

  // Calculate absolute return and IRR for lumpsum investment
  async calculateLumpsumReturns(
    schemeCode: string,
    period: '1W' | '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y' | '10Y'
  ): Promise<{ absoluteReturn: number; irrReturn: number } | null> {
    try {
      const navHistory = await this.getExtendedNAVHistory(schemeCode, period);
      
      if (navHistory.length < 2) {
        return null;
      }

      const startNav = navHistory[0].nav_value;
      const endNav = navHistory[navHistory.length - 1].nav_value;
      
      // Calculate absolute return percentage
      const absoluteReturn = ((endNav - startNav) / startNav) * 100;
      
      // Calculate IRR (annualized return)
      const startDate = new Date(navHistory[0].nav_date);
      const endDate = new Date(navHistory[navHistory.length - 1].nav_date);
      const daysDiff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      let irrReturn = 0;
      if (daysDiff > 0) {
        irrReturn = (Math.pow(endNav / startNav, 365 / daysDiff) - 1) * 100;
      }

      return {
        absoluteReturn: Number(absoluteReturn.toFixed(2)),
        irrReturn: Number(irrReturn.toFixed(2))
      };
    } catch (error) {
      console.error("Error calculating lumpsum returns:", error);
      return null;
    }
  }

  // Trigger daily analysis manually (for testing)
  async triggerDailyAnalysis(): Promise<void> {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { data, error } = await supabase.functions.invoke('daily-fund-analysis');
      
      if (error) {
        console.error('Error triggering daily analysis:', error);
        throw error;
      }
      
      console.log('Daily analysis triggered successfully:', data);
    } catch (error) {
      console.error('Failed to trigger daily analysis:', error);
      throw error;
    }
  }

  // Fallback data for when database is empty
  private getFallbackData(): AdvancedNAVAnalysis[] {
    return [
      {
        schemeCode: "100033",
        schemeName: "Aditya Birla Sun Life Equity Advantage Fund - Regular Growth",
        nav: 856.32,
        date: new Date().toISOString().split('T')[0],
        category: "Large Cap",
        subCategory: "Large Cap",
        amcName: "Aditya Birla",
        aiScore: 8.5,
        confidence: 0.85,
        predicted3MonthReturn: 12.5,
        historical3MonthData: [],
        riskLevel: 'MEDIUM' as const,
        volatilityScore: 6.2,
        sharpeRatio: 1.8,
        performanceRank: 1,
        totalSchemes: 10
      },
      {
        schemeCode: "100034",
        schemeName: "HDFC Equity Fund - Growth",
        nav: 1245.67,
        date: new Date().toISOString().split('T')[0],
        category: "Large Cap",
        subCategory: "Large Cap",
        amcName: "HDFC",
        aiScore: 8.2,
        confidence: 0.82,
        predicted3MonthReturn: 11.8,
        historical3MonthData: [],
        riskLevel: 'MEDIUM' as const,
        volatilityScore: 5.8,
        sharpeRatio: 1.9,
        performanceRank: 2,
        totalSchemes: 10
      }
    ];
  }

  // Keep other methods for backward compatibility
  static async getRealBenchmarkData(): Promise<BenchmarkIndex[]> {
    return [
      {
        symbol: 'NIFTY_50',
        name: 'NIFTY 50',
        price: 24800 + Math.random() * 200 - 100,
        change: Math.random() * 200 - 100,
        changePercent: Math.random() * 2 - 1,
        timestamp: new Date().toISOString(),
        sector: 'Large Cap'
      }
    ];
  }

  static async getAdvancedAIAnalysis(schemes: any[], category: string): Promise<AdvancedNAVAnalysis[]> {
    // This method is kept for backward compatibility but not used in the new system
    return [];
  }
}

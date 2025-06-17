
import { supabase } from "@/integrations/supabase/client";

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

export class EnhancedNAVDataService {
  private supabase = supabase;

  // Scheme code corrections mapping - fixes known incorrect mappings
  private schemeCodeCorrections: Record<string, string> = {
    // SBI Small Cap Fund corrections
    '120601': '125497', // Correct the wrong scheme code for SBI Small Cap Fund
    // Add other corrections as needed
  };

  constructor() {
    console.log('Enhanced NAV Data Service initialized');
  }

  async getAdvancedAnalysis(): Promise<AdvancedNAVAnalysis[]> {
    try {
      console.log('🔍 ENHANCED NAV SERVICE - Fetching advanced analysis from database...');
      
      const { data: analysisData, error } = await this.supabase
        .from('daily_fund_analysis')
        .select('*')
        .order('analysis_date', { ascending: false })
        .limit(1000);

      if (error) {
        console.error('Database fetch error:', error);
        throw new Error(`Failed to fetch analysis data: ${error.message}`);
      }

      if (!analysisData || analysisData.length === 0) {
        console.log('No analysis data found in database');
        return [];
      }

      console.log(`📊 ENHANCED NAV SERVICE - Found ${analysisData.length} analysis records`);

      // Convert database records to AdvancedNAVAnalysis format with scheme code corrections
      const convertedData: AdvancedNAVAnalysis[] = analysisData.map((record, index) => {
        let correctedSchemeCode = record.scheme_code;
        
        // Apply scheme code corrections
        if (this.schemeCodeCorrections[record.scheme_code]) {
          const originalCode = record.scheme_code;
          correctedSchemeCode = this.schemeCodeCorrections[record.scheme_code];
          console.log(`🔧 SCHEME CODE CORRECTION [${index}] - Fixed: ${originalCode} → ${correctedSchemeCode} for ${record.scheme_name}`);
        }

        // Enhanced logging for SBI Small Cap Fund specifically
        if (record.scheme_name?.includes('SBI Small Cap')) {
          console.log(`🔍 SBI SMALL CAP PROCESSING [${index}]:`, {
            originalSchemeCode: record.scheme_code,
            correctedSchemeCode: correctedSchemeCode,
            schemeName: record.scheme_name,
            amcName: record.amc_name,
            wasCorrection: this.schemeCodeCorrections[record.scheme_code] ? true : false
          });
        }

        return {
          schemeCode: correctedSchemeCode, // Use corrected scheme code
          schemeName: record.scheme_name,
          amcName: record.amc_name,
          category: record.category,
          subCategory: record.sub_category,
          nav: Number(record.nav),
          date: record.nav_date,
          trendScore: Number(record.ai_score || 0),
          confidence: Number(record.confidence || 0),
          historical3MonthAverage: Number(record.predicted_3month_return || 0),
          historical3MonthData: this.parseHistoricalData(record.historical_3month_data),
          riskLevel: record.risk_level as 'LOW' | 'MEDIUM' | 'HIGH',
          volatilityScore: Number(record.volatility_score || 0),
          sharpeRatio: Number(record.sharpe_ratio || 0),
          performanceRank: Number(record.performance_rank || 0),
          totalSchemes: Number(record.total_schemes_in_category || 0)
        };
      });

      // Final verification logging for SBI Small Cap Fund
      const sbiSmallCapFunds = convertedData.filter(fund => fund.schemeName?.includes('SBI Small Cap'));
      sbiSmallCapFunds.forEach((fund, index) => {
        console.log(`✅ FINAL SBI SMALL CAP VERIFICATION [${index}]:`, {
          schemeCode: fund.schemeCode,
          schemeName: fund.schemeName,
          amcName: fund.amcName,
          isCorrectCode: fund.schemeCode === '125497'
        });
        
        if (fund.schemeCode !== '125497') {
          console.error(`🚨 STILL WRONG! SBI Small Cap Fund still has incorrect scheme code: ${fund.schemeCode}, should be 125497`);
        }
      });

      console.log(`✅ ENHANCED NAV SERVICE - Successfully converted ${convertedData.length} analysis records`);
      return convertedData;

    } catch (error) {
      console.error('Enhanced NAV Service error:', error);
      throw new Error(`Enhanced analysis fetch failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getExtendedNAVHistory(schemeCode: string, period: string): Promise<ExtendedNAVHistory[]> {
    try {
      console.log(`Fetching extended NAV history for scheme: ${schemeCode}, period: ${period}`);
      
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
        default:
          startDate.setFullYear(endDate.getFullYear() - 1);
      }

      // Try to fetch from database first
      const { data, error } = await this.supabase
        .from('nav_history')
        .select('nav_date, nav_value, scheme_code')
        .eq('scheme_code', schemeCode)
        .gte('nav_date', startDate.toISOString().split('T')[0])
        .lte('nav_date', endDate.toISOString().split('T')[0])
        .order('nav_date', { ascending: true });

      if (error) {
        console.error('Error fetching NAV history:', error);
        return this.generateMockNAVHistory(schemeCode, period);
      }

      if (!data || data.length === 0) {
        console.log('No NAV history found in database, generating mock data');
        return this.generateMockNAVHistory(schemeCode, period);
      }

      return data as ExtendedNAVHistory[];
    } catch (error) {
      console.error('Error in getExtendedNAVHistory:', error);
      return this.generateMockNAVHistory(schemeCode, period);
    }
  }

  async calculateSIPReturns(schemeCode: string, period: string, monthlyAmount: number): Promise<SIPCalculationResult | null> {
    try {
      const navHistory = await this.getExtendedNAVHistory(schemeCode, period);
      
      if (navHistory.length < 2) {
        return null;
      }

      // Calculate number of months based on period
      let months = 12;
      switch (period) {
        case '1W':
          months = 0.25;
          break;
        case '1M':
          months = 1;
          break;
        case '3M':
          months = 3;
          break;
        case '6M':
          months = 6;
          break;
        case '1Y':
          months = 12;
          break;
        case '3Y':
          months = 36;
          break;
        case '5Y':
          months = 60;
          break;
        case '10Y':
          months = 120;
          break;
      }

      const totalInvested = monthlyAmount * Math.floor(months);
      const currentNAV = navHistory[navHistory.length - 1].nav_value;
      const startNAV = navHistory[0].nav_value;
      
      // Simple calculation for demonstration
      const totalUnits = totalInvested / ((startNAV + currentNAV) / 2);
      const finalValue = totalUnits * currentNAV;
      const absoluteReturn = finalValue - totalInvested;
      
      // Calculate IRR (simplified)
      const totalReturn = (finalValue - totalInvested) / totalInvested;
      const irrPercentage = (totalReturn / (months / 12)) * 100;

      return {
        total_invested: totalInvested,
        final_value: finalValue,
        absolute_return: absoluteReturn,
        irr_percentage: irrPercentage
      };
    } catch (error) {
      console.error('Error calculating SIP returns:', error);
      return null;
    }
  }

  async calculateLumpsumReturns(schemeCode: string, period: string): Promise<{ absoluteReturn: number; irrReturn: number } | null> {
    try {
      const navHistory = await this.getExtendedNAVHistory(schemeCode, period);
      
      if (navHistory.length < 2) {
        return null;
      }

      const startNAV = navHistory[0].nav_value;
      const endNAV = navHistory[navHistory.length - 1].nav_value;
      
      const absoluteReturn = ((endNAV - startNAV) / startNAV) * 100;
      
      // Calculate annualized return
      const days = navHistory.length;
      const years = days / 365;
      const irrReturn = years > 0 ? Math.pow((endNAV / startNAV), (1 / years)) - 1 : 0;
      
      return {
        absoluteReturn,
        irrReturn: irrReturn * 100
      };
    } catch (error) {
      console.error('Error calculating lumpsum returns:', error);
      return null;
    }
  }

  private generateMockNAVHistory(schemeCode: string, period: string): ExtendedNAVHistory[] {
    const data: ExtendedNAVHistory[] = [];
    const endDate = new Date();
    let days = 365;

    switch (period) {
      case '1W': days = 7; break;
      case '1M': days = 30; break;
      case '3M': days = 90; break;
      case '6M': days = 180; break;
      case '1Y': days = 365; break;
      case '3Y': days = 1095; break;
      case '5Y': days = 1825; break;
      case '10Y': days = 3650; break;
    }

    // Generate mock NAV values with some realistic fluctuation
    const baseNAV = 100 + (parseInt(schemeCode) % 100);
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(endDate);
      date.setDate(date.getDate() - i);
      
      // Add some realistic market movement
      const volatility = 0.02;
      const trend = (days - i) * 0.0001;
      const randomFactor = (Math.random() - 0.5) * volatility;
      const navValue = baseNAV + (baseNAV * (trend + randomFactor));
      
      data.push({
        nav_date: date.toISOString().split('T')[0],
        nav_value: Number(navValue.toFixed(4)),
        scheme_code: schemeCode
      });
    }

    return data;
  }

  private parseHistoricalData(data: any): Array<{ date: string; nav: number }> {
    try {
      if (!data) {
        console.warn('No historical data provided. Returning empty array.');
        return [];
      }
  
      // Check if data is already in the correct format
      if (Array.isArray(data) && data.every(item => typeof item === 'object' && item !== null && 'date' in item && 'nav' in item)) {
        return data as Array<{ date: string; nav: number }>;
      }
  
      // Attempt to parse the data as JSON if it's a string
      let parsedData;
      if (typeof data === 'string') {
        try {
          parsedData = JSON.parse(data);
        } catch (parseError) {
          console.error('Error parsing historical data JSON:', parseError);
          return [];
        }
      } else {
        parsedData = data;
      }
  
      // Check if the parsed data is an array
      if (!Array.isArray(parsedData)) {
        console.error('Historical data is not an array after parsing.');
        return [];
      }
  
      // Map the parsed data to the expected format
      const historicalData = parsedData.map((item: any) => {
        if (typeof item === 'object' && item !== null && 'date' in item && 'nav' in item) {
          return {
            date: item.date,
            nav: Number(item.nav)
          };
        } else {
          console.warn('Invalid historical data item:', item);
          return null;
        }
      }).filter((item: any) => item !== null); // Remove invalid items
  
      return historicalData as Array<{ date: string; nav: number }>;
    } catch (error) {
      console.error('Error parsing historical data:', error);
      return [];
    }
  }

  async triggerDailyAnalysis(): Promise<any> {
    try {
      console.log('Triggering daily analysis function...');
      
      const { data, error } = await this.supabase.functions.invoke('daily-fund-analysis');
      
      if (error) {
        console.error('Function invocation error:', error);
        throw new Error(`Failed to trigger daily analysis: ${error.message}`);
      }
      
      console.log('Daily analysis triggered successfully:', data);
      return data;
    } catch (error) {
      console.error('Error triggering daily analysis:', error);
      throw error;
    }
  }
}

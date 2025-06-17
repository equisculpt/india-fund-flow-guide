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

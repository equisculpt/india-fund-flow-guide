
import { supabase } from "@/integrations/supabase/client";
import { AdvancedNAVAnalysis } from './types';
import { SchemeCodeCorrections } from './schemeCodeCorrections';
import { DataParsingUtils } from './dataParsingUtils';

export class AdvancedAnalysisService {
  static async getAdvancedAnalysis(): Promise<AdvancedNAVAnalysis[]> {
    try {
      console.log('🔍 ENHANCED NAV SERVICE - Fetching advanced analysis from database...');
      
      const { data: analysisData, error } = await supabase
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
        if (SchemeCodeCorrections.hasCorrection(record.scheme_code)) {
          const originalCode = record.scheme_code;
          correctedSchemeCode = SchemeCodeCorrections.correctSchemeCode(record.scheme_code);
          SchemeCodeCorrections.logCorrection(originalCode, correctedSchemeCode, record.scheme_name, index);
        }

        // Enhanced logging for SBI Small Cap Fund specifically
        if (record.scheme_name?.includes('SBI Small Cap')) {
          console.log(`🔍 SBI SMALL CAP PROCESSING [${index}]:`, {
            originalSchemeCode: record.scheme_code,
            correctedSchemeCode: correctedSchemeCode,
            schemeName: record.scheme_name,
            amcName: record.amc_name,
            wasCorrection: SchemeCodeCorrections.hasCorrection(record.scheme_code)
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
          historical3MonthData: DataParsingUtils.parseHistoricalData(record.historical_3month_data),
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
        SchemeCodeCorrections.verifySBICorrection(fund, index);
      });

      console.log(`✅ ENHANCED NAV SERVICE - Successfully converted ${convertedData.length} analysis records`);
      return convertedData;

    } catch (error) {
      console.error('Enhanced NAV Service error:', error);
      throw new Error(`Enhanced analysis fetch failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async triggerDailyAnalysis(): Promise<any> {
    try {
      console.log('Triggering daily analysis function...');
      
      const { data, error } = await supabase.functions.invoke('daily-fund-analysis');
      
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

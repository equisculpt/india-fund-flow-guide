
import { supabase } from "@/integrations/supabase/client";
import { AdvancedNAVAnalysis, ExtendedNAVHistory, SIPCalculationResult } from './nav/types';
import { NAVHistoryService } from './nav/navHistoryService';
import { SIPCalculationService } from './nav/sipCalculationService';
import { AdvancedAnalysisService } from './nav/advancedAnalysisService';

export type { AdvancedNAVAnalysis, ExtendedNAVHistory, SIPCalculationResult };

export class EnhancedNAVDataService {
  private supabase = supabase;

  constructor() {
    console.log('Enhanced NAV Data Service initialized');
  }

  async getAdvancedAnalysis(): Promise<AdvancedNAVAnalysis[]> {
    return AdvancedAnalysisService.getAdvancedAnalysis();
  }

  async getExtendedNAVHistory(schemeCode: string, period: string): Promise<ExtendedNAVHistory[]> {
    return NAVHistoryService.getExtendedNAVHistory(schemeCode, period);
  }

  async calculateSIPReturns(schemeCode: string, period: string, monthlyAmount: number): Promise<SIPCalculationResult | null> {
    return SIPCalculationService.calculateSIPReturns(schemeCode, period, monthlyAmount);
  }

  async calculateLumpsumReturns(schemeCode: string, period: string): Promise<{ absoluteReturn: number; irrReturn: number } | null> {
    return SIPCalculationService.calculateLumpsumReturns(schemeCode, period);
  }

  async triggerDailyAnalysis(): Promise<any> {
    return AdvancedAnalysisService.triggerDailyAnalysis();
  }
}

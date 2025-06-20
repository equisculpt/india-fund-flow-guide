
import { supabase } from '@/integrations/supabase/client';
import { FundData } from '@/hooks/types/fundDetailsTypes';
import { TranslationService } from './translationService';

export class AIAnalysisService {
  static async performFundAnalysis(fundData: FundData, targetLanguage: string = 'en'): Promise<{
    analysis: any;
    loading: boolean;
    error: string;
  }> {
    console.log('AIAnalysisService: Starting AI analysis for language:', targetLanguage);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-fund-analysis', {
        body: { 
          fundData,
          targetLanguage 
        }
      });

      if (error) {
        throw new Error(`AI Analysis failed: ${error.message}`);
      }

      let analysis = data.success ? data.analysis : data.fallbackAnalysis;

      // Translate the analysis if needed
      if (targetLanguage !== 'en' && analysis) {
        analysis = await this.translateAnalysis(analysis, targetLanguage);
      }

      console.log('AIAnalysisService: AI analysis completed:', analysis);
      
      return {
        analysis,
        loading: false,
        error: data.success ? '' : 'AI analysis partially failed, showing fallback assessment'
      };
    } catch (error) {
      console.error('AIAnalysisService: AI analysis error:', error);
      
      // Fallback analysis
      let fallbackAnalysis = {
        aiScore: 6.5,
        recommendation: 'HOLD',
        confidence: 60,
        reasoning: 'AI analysis service temporarily unavailable. Manual review recommended.',
        riskLevel: 'Moderate',
        strengths: ['Available for investment'],
        concerns: ['Analysis service unavailable'],
        performanceRank: 50,
        analysis: {
          performanceScore: 6.5,
          volatilityScore: 6.0,
          expenseScore: 7.0,
          fundManagerScore: 6.5,
          portfolioQualityScore: 6.5
        }
      };

      // Translate fallback if needed
      if (targetLanguage !== 'en') {
        fallbackAnalysis = await this.translateAnalysis(fallbackAnalysis, targetLanguage);
      }
      
      return {
        analysis: fallbackAnalysis,
        loading: false,
        error: 'AI analysis unavailable'
      };
    }
  }

  private static async translateAnalysis(analysis: any, targetLanguage: string): Promise<any> {
    try {
      const translatedAnalysis = { ...analysis };

      // Translate key text fields
      if (analysis.reasoning) {
        translatedAnalysis.reasoning = await TranslationService.translateContent(analysis.reasoning, targetLanguage);
      }

      if (analysis.strengths && Array.isArray(analysis.strengths)) {
        translatedAnalysis.strengths = await Promise.all(
          analysis.strengths.map((strength: string) => 
            TranslationService.translateContent(strength, targetLanguage)
          )
        );
      }

      if (analysis.concerns && Array.isArray(analysis.concerns)) {
        translatedAnalysis.concerns = await Promise.all(
          analysis.concerns.map((concern: string) => 
            TranslationService.translateContent(concern, targetLanguage)
          )
        );
      }

      if (analysis.riskLevel) {
        translatedAnalysis.riskLevel = await TranslationService.translateContent(analysis.riskLevel, targetLanguage);
      }

      return translatedAnalysis;
    } catch (error) {
      console.error('Translation error in AI analysis:', error);
      return analysis; // Return original if translation fails
    }
  }
}

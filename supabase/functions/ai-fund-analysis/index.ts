
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { FundData, AnalysisResult } from './types.ts';
import { 
  calculatePerformanceScore, 
  calculateVolatilityScore, 
  calculateExpenseScore, 
  calculatePortfolioQualityScore 
} from './scoring-engine.ts';
import { 
  getComplianceCategory, 
  calculateConfidence, 
  generateReasoning, 
  determineRiskLevel, 
  identifyStrengths, 
  identifyConcerns, 
  calculatePerformanceRank 
} from './analysis-engine.ts';
import { generateFallbackAnalysis } from './fallback-analysis.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { fundData } = await req.json();
    
    console.log('AI Fund Analysis: Processing fund:', fundData.schemeName);
    
    // Enhanced analysis logic using real performance data
    const performanceScore = calculatePerformanceScore(fundData);
    const volatilityScore = calculateVolatilityScore(fundData);
    const expenseScore = calculateExpenseScore(fundData.expenseRatio);
    const fundManagerScore = 7.0; // Default for now
    const portfolioQualityScore = calculatePortfolioQualityScore(fundData);
    
    const overallScore = (
      performanceScore * 0.3 + 
      volatilityScore * 0.2 + 
      expenseScore * 0.2 + 
      fundManagerScore * 0.15 + 
      portfolioQualityScore * 0.15
    );
    
    const analysis = getComplianceCategory(overallScore);
    const confidence = calculateConfidence(fundData);
    const reasoning = generateReasoning(fundData, overallScore, analysis);
    
    const analysisResult: AnalysisResult = {
      aiScore: Math.round(overallScore * 10) / 10,
      recommendation: analysis,
      confidence: confidence,
      reasoning: reasoning,
      riskLevel: determineRiskLevel(fundData),
      strengths: identifyStrengths(fundData),
      concerns: identifyConcerns(fundData),
      performanceRank: calculatePerformanceRank(fundData),
      analysis: {
        performanceScore,
        volatilityScore,
        expenseScore,
        fundManagerScore,
        portfolioQualityScore
      }
    };
    
    console.log('AI Fund Analysis: Generated analysis:', analysisResult);
    
    return new Response(
      JSON.stringify({ success: true, analysis: analysisResult }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('AI Fund Analysis Error:', error);
    
    // Fallback analysis
    const fallbackAnalysis = generateFallbackAnalysis();
    
    return new Response(
      JSON.stringify({ success: false, fallbackAnalysis }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

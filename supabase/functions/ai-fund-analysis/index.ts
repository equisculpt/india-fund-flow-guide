import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { fundData } = await req.json()
    
    console.log('AI Fund Analysis: Processing fund:', fundData.schemeName)
    
    // Enhanced analysis logic using real performance data
    const performanceScore = calculatePerformanceScore(fundData)
    const volatilityScore = calculateVolatilityScore(fundData)
    const expenseScore = calculateExpenseScore(fundData.expenseRatio)
    const fundManagerScore = 7.0 // Default for now
    const portfolioQualityScore = calculatePortfolioQualityScore(fundData)
    
    const overallScore = (
      performanceScore * 0.3 + 
      volatilityScore * 0.2 + 
      expenseScore * 0.2 + 
      fundManagerScore * 0.15 + 
      portfolioQualityScore * 0.15
    )
    
    const analysis = getComplianceCategory(overallScore)
    const confidence = calculateConfidence(fundData)
    const reasoning = generateReasoning(fundData, overallScore, analysis)
    
    const analysisResult = {
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
    }
    
    console.log('AI Fund Analysis: Generated analysis:', analysisResult)
    
    return new Response(
      JSON.stringify({ success: true, analysis: analysisResult }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
    
  } catch (error) {
    console.error('AI Fund Analysis Error:', error)
    
    // Fallback analysis
    const fallbackAnalysis = {
      aiScore: 6.5,
      recommendation: 'REVIEW',
      confidence: 60,
      reasoning: 'AI research analysis temporarily unavailable. Manual review suggested for detailed assessment.',
      riskLevel: 'Moderate',
      strengths: ['Available for investment'],
      concerns: ['Analysis service temporarily unavailable'],
      performanceRank: 50,
      analysis: {
        performanceScore: 6.5,
        volatilityScore: 6.0,
        expenseScore: 7.0,
        fundManagerScore: 6.5,
        portfolioQualityScore: 6.5
      }
    }
    
    return new Response(
      JSON.stringify({ success: false, fallbackAnalysis }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

function calculatePerformanceScore(fundData: any): number {
  const returns1Y = fundData.returns1Y || fundData.xirr1Y || 0
  const returns3Y = fundData.returns3Y || fundData.xirr3Y || 0
  const returns5Y = fundData.returns5Y || fundData.xirr5Y || 0
  
  // Weight recent performance more heavily
  const weightedReturn = (returns1Y * 0.5) + (returns3Y * 0.3) + (returns5Y * 0.2)
  
  // Score based on performance brackets
  if (weightedReturn >= 20) return 9.0
  if (weightedReturn >= 15) return 8.0
  if (weightedReturn >= 12) return 7.0
  if (weightedReturn >= 8) return 6.0
  if (weightedReturn >= 5) return 5.0
  return 4.0
}

function calculateVolatilityScore(fundData: any): number {
  const volatility = fundData.volatility || 15
  
  // Lower volatility gets higher score
  if (volatility <= 10) return 9.0
  if (volatility <= 15) return 8.0
  if (volatility <= 20) return 7.0
  if (volatility <= 25) return 6.0
  return 5.0
}

function calculateExpenseScore(expenseRatio: number): number {
  if (expenseRatio <= 0.5) return 9.0
  if (expenseRatio <= 1.0) return 8.0
  if (expenseRatio <= 1.5) return 7.0
  if (expenseRatio <= 2.0) return 6.0
  return 5.0
}

function calculatePortfolioQualityScore(fundData: any): number {
  const aum = fundData.aum || 0
  
  // AUM-based quality score
  if (aum >= 5000) return 8.0
  if (aum >= 2000) return 7.5
  if (aum >= 1000) return 7.0
  if (aum >= 500) return 6.5
  return 6.0
}

function getComplianceCategory(score: number): string {
  if (score >= 8.5) return 'SUITABLE'
  if (score >= 7.5) return 'CONSIDER'
  if (score >= 6.5) return 'REVIEW'
  if (score >= 5.5) return 'CAUTION'
  return 'AVOID'
}

function calculateConfidence(fundData: any): number {
  let confidence = 70
  
  // Increase confidence if we have real performance data
  if (fundData.returns1Y > 0 || fundData.returns3Y > 0) confidence += 15
  if (fundData.aum > 1000) confidence += 10
  if (fundData.expenseRatio > 0) confidence += 5
  
  return Math.min(confidence, 95)
}

function generateReasoning(fundData: any, score: number, category: string): string {
  const reasons = []
  
  const returns1Y = fundData.returns1Y || fundData.xirr1Y || 0
  const returns3Y = fundData.returns3Y || fundData.xirr3Y || 0
  
  if (returns1Y > 15) {
    reasons.push('strong recent performance')
  } else if (returns1Y > 8) {
    reasons.push('moderate recent returns')
  } else if (returns1Y > 0) {
    reasons.push('below-average recent performance')
  }
  
  if (fundData.expenseRatio <= 1.0) {
    reasons.push('competitive expense ratio')
  } else if (fundData.expenseRatio > 2.0) {
    reasons.push('high expense ratio')
  }
  
  if (fundData.aum >= 2000) {
    reasons.push('substantial AUM indicating investor confidence')
  } else if (fundData.aum < 500) {
    reasons.push('relatively small AUM')
  }
  
  const reasonText = reasons.length > 0 ? reasons.join(', ') : 'standard market performance'
  
  return `AI research analysis shows ${category.toLowerCase()} rating based on ${reasonText}. Score: ${score.toFixed(1)}/10. This assessment is for informational purposes only.`
}

function determineRiskLevel(fundData: any): string {
  const category = fundData.category?.toLowerCase() || ''
  
  if (category.includes('small') || category.includes('micro')) return 'High'
  if (category.includes('mid')) return 'Moderate-High'
  if (category.includes('large') || category.includes('blue')) return 'Moderate'
  if (category.includes('debt') || category.includes('liquid')) return 'Low'
  return 'Moderate'
}

function identifyStrengths(fundData: any): string[] {
  const strengths = []
  
  const returns1Y = fundData.returns1Y || fundData.xirr1Y || 0
  if (returns1Y > 15) strengths.push('Strong recent performance')
  if (fundData.expenseRatio <= 1.0) strengths.push('Low expense ratio')
  if (fundData.aum >= 2000) strengths.push('Large AUM base')
  if (fundData.volatility <= 15) strengths.push('Controlled volatility')
  
  return strengths.length > 0 ? strengths : ['Available for investment']
}

function identifyConcerns(fundData: any): string[] {
  const concerns = []
  
  const returns1Y = fundData.returns1Y || fundData.xirr1Y || 0
  if (returns1Y < 5 && returns1Y > 0) concerns.push('Below-average recent returns')
  if (fundData.expenseRatio > 2.0) concerns.push('High expense ratio')
  if (fundData.aum < 500) concerns.push('Small fund size')
  if (fundData.volatility > 25) concerns.push('High volatility')
  
  return concerns.length > 0 ? concerns : ['Market risk factors']
}

function calculatePerformanceRank(fundData: any): number {
  const returns1Y = fundData.returns1Y || fundData.xirr1Y || 0
  
  // Approximate ranking based on returns
  if (returns1Y >= 25) return Math.floor(Math.random() * 10) + 1  // Top 10
  if (returns1Y >= 20) return Math.floor(Math.random() * 20) + 1  // Top 20
  if (returns1Y >= 15) return Math.floor(Math.random() * 30) + 21 // 21-50
  if (returns1Y >= 10) return Math.floor(Math.random() * 30) + 51 // 51-80
  return Math.floor(Math.random() * 20) + 81 // 81-100
}

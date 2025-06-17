
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fundData } = await req.json();
    
    console.log('AI Fund Analysis: Processing fund with Gemini:', fundData.schemeCode, fundData.schemeName);

    const prompt = `Analyze this mutual fund and provide a comprehensive investment analysis:

Fund Details:
- Name: ${fundData.schemeName}
- Category: ${fundData.category}
- Current NAV: ₹${fundData.nav}
- Fund House: ${fundData.fundHouse}
- 1Y Returns: ${fundData.returns1Y || 'N/A'}%
- 3Y Returns: ${fundData.returns3Y || 'N/A'}%
- 5Y Returns: ${fundData.returns5Y || 'N/A'}%
- Expense Ratio: ${fundData.expenseRatio || 'N/A'}%
- AUM: ₹${fundData.aum || 'N/A'} Cr
- Min SIP: ₹${fundData.minSipAmount || 'N/A'}

You are an expert mutual fund analyst with 20+ years of experience in Indian markets. Analyze funds based on performance, risk, expense ratios, fund house reputation, and market conditions. Be objective and provide actionable insights. Consider the fund category's typical characteristics when scoring.

Please provide your analysis in the following JSON format only (no additional text):
{
  "aiScore": number (1-10 scale),
  "recommendation": "STRONG BUY" | "BUY" | "HOLD" | "SELL" | "STRONG SELL",
  "confidence": number (percentage),
  "reasoning": "string (detailed reasoning for the recommendation)",
  "riskLevel": "Low" | "Moderate" | "High",
  "strengths": ["strength1", "strength2", "strength3"],
  "concerns": ["concern1", "concern2"],
  "performanceRank": number (1-100),
  "analysis": {
    "performanceScore": number (1-10),
    "volatilityScore": number (1-10),
    "expenseScore": number (1-10),
    "fundManagerScore": number (1-10),
    "portfolioQualityScore": number (1-10)
  }
}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1500,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    console.log('AI Fund Analysis: Raw Gemini response:', aiResponse);

    // Parse the JSON response from AI
    let analysisResult;
    try {
      // Extract JSON from the response (in case AI adds extra text)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid JSON found in Gemini response');
      }
    } catch (parseError) {
      console.error('AI Fund Analysis: JSON parse error:', parseError);
      // Fallback to a structured response if parsing fails
      analysisResult = {
        aiScore: 7.0,
        recommendation: 'HOLD',
        confidence: 75,
        reasoning: 'Gemini AI analysis temporarily unavailable. Please try again.',
        riskLevel: 'Moderate',
        strengths: ['Established fund house', 'Regular dividend track record'],
        concerns: ['Market volatility', 'Economic uncertainty'],
        performanceRank: 50,
        analysis: {
          performanceScore: 7.0,
          volatilityScore: 6.0,
          expenseScore: 7.5,
          fundManagerScore: 7.0,
          portfolioQualityScore: 7.0
        }
      };
    }

    console.log('AI Fund Analysis: Parsed result:', analysisResult);

    return new Response(JSON.stringify({ 
      success: true, 
      analysis: analysisResult 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('AI Fund Analysis: Error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      fallbackAnalysis: {
        aiScore: 6.5,
        recommendation: 'HOLD',
        confidence: 60,
        reasoning: 'Unable to complete Gemini AI analysis. This is a fallback assessment.',
        riskLevel: 'Moderate',
        strengths: ['Fund available for analysis'],
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
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

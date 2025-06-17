
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    
    console.log('AI Fund Analysis: Processing fund:', fundData.schemeCode, fundData.schemeName);

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

Please provide:
1. AI Score (1-10 scale)
2. Investment Recommendation (STRONG BUY/BUY/HOLD/SELL/STRONG SELL)
3. Confidence Level (percentage)
4. Detailed reasoning for the recommendation
5. Risk assessment
6. Key strengths (3-4 points)
7. Areas of concern (2-3 points)
8. Performance rank estimate (1-100)

Format your response as valid JSON with the following structure:
{
  "aiScore": number,
  "recommendation": "string",
  "confidence": number,
  "reasoning": "string",
  "riskLevel": "Low/Moderate/High",
  "strengths": ["strength1", "strength2", "strength3"],
  "concerns": ["concern1", "concern2"],
  "performanceRank": number,
  "analysis": {
    "performanceScore": number,
    "volatilityScore": number,
    "expenseScore": number,
    "fundManagerScore": number,
    "portfolioQualityScore": number
  }
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert mutual fund analyst with 20+ years of experience in Indian markets. Analyze funds based on performance, risk, expense ratios, fund house reputation, and market conditions. Be objective and provide actionable insights. Consider the fund category's typical characteristics when scoring.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI Fund Analysis: Raw AI response:', aiResponse);

    // Parse the JSON response from AI
    let analysisResult;
    try {
      // Extract JSON from the response (in case AI adds extra text)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid JSON found in AI response');
      }
    } catch (parseError) {
      console.error('AI Fund Analysis: JSON parse error:', parseError);
      // Fallback to a structured response if parsing fails
      analysisResult = {
        aiScore: 7.0,
        recommendation: 'HOLD',
        confidence: 75,
        reasoning: 'AI analysis temporarily unavailable. Please try again.',
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
        reasoning: 'Unable to complete AI analysis. This is a fallback assessment.',
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

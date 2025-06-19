
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { FundData } from './types.ts';
import { transformFundData } from './data-transformer.ts';
import { callGeminiAPI, parseAIResponse } from './gemini-service.ts';
import { generateFallbackAnalysis } from './fallback-analysis.ts';

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
    const { funds } = await req.json();
    
    if (!funds || funds.length < 2) {
      throw new Error('At least 2 funds are required for comparison');
    }

    console.log('AI Fund Comparison: Starting analysis for', funds.length, 'funds');

    // Prepare comprehensive fund data for AI analysis
    const fundAnalysisData = transformFundData(funds);

    let parsedAnalysis;
    
    try {
      // Call Gemini API for analysis
      const aiResponse = await callGeminiAPI(fundAnalysisData, geminiApiKey!);
      console.log('Raw AI Response:', aiResponse);
      
      // Parse the AI response
      parsedAnalysis = parseAIResponse(aiResponse);
      
    } catch (error) {
      console.error('AI analysis failed, using fallback:', error);
      // Use fallback analysis if AI fails
      parsedAnalysis = generateFallbackAnalysis(funds);
    }

    console.log('AI Fund Comparison: Analysis completed successfully');

    return new Response(JSON.stringify({
      success: true,
      analysis: parsedAnalysis,
      fundsAnalyzed: funds.length,
      timestamp: new Date().toISOString(),
      disclaimer: "This AI research is for informational purposes only. We are AMFI registered distributors and may earn commission on investments."
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in AI fund comparison:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      fallbackMessage: 'AI research service temporarily unavailable. Please try again later.',
      disclaimer: "We are AMFI registered mutual fund distributors. This research is for informational purposes only."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

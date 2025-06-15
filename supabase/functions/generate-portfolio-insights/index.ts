
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId } = await req.json();
    
    if (!userId) {
      throw new Error('User ID is required');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user's portfolio data
    const { data: analytics } = await supabase
      .from('portfolio_analytics')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);

    const { data: investments } = await supabase
      .from('investments')
      .select(`
        *,
        mutual_funds(scheme_name, category, risk_level, returns_1y)
      `)
      .eq('user_id', userId)
      .eq('status', 'active');

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, user_type')
      .eq('id', userId)
      .single();

    if (!analytics?.[0] || !investments || !profile) {
      throw new Error('Insufficient data for analysis');
    }

    const portfolioData = analytics[0];
    
    // Prepare context for AI analysis
    const portfolioContext = {
      userName: profile.full_name,
      portfolioValue: portfolioData.portfolio_value,
      totalReturns: portfolioData.total_returns,
      returnPercentage: portfolioData.return_percentage,
      peerPercentile: portfolioData.peer_percentile,
      riskScore: portfolioData.risk_score,
      volatility: portfolioData.volatility,
      benchmarkComparison: portfolioData.benchmark_comparison,
      investmentCount: investments.length,
      categories: investments.map(inv => inv.mutual_funds?.category).filter(Boolean),
      totalInvested: investments.reduce((sum, inv) => sum + (inv.total_invested || 0), 0)
    };

    // Generate AI insights using OpenAI
    const prompt = `
You are a financial advisor AI analyzing a client's portfolio. Generate personalized insights based on this data:

Portfolio Overview:
- Client: ${portfolioContext.userName}
- Portfolio Value: ₹${portfolioContext.portfolioValue.toLocaleString()}
- Total Returns: ₹${portfolioContext.totalReturns.toLocaleString()} (${portfolioContext.returnPercentage}%)
- Peer Ranking: ${portfolioContext.peerPercentile}th percentile
- Risk Score: ${portfolioContext.riskScore}/10
- Volatility: ${portfolioContext.volatility}%
- vs Benchmark: ${portfolioContext.benchmarkComparison}%
- Number of Investments: ${portfolioContext.investmentCount}
- Investment Categories: ${portfolioContext.categories.join(', ')}

Generate 3-4 specific, actionable insights focusing on:
1. Performance compared to peers
2. Risk assessment and recommendations
3. Portfolio diversification suggestions
4. Market opportunities or concerns

Keep insights concise, personalized, and actionable. Format as JSON with title, message, priority (low/medium/high), and insight_type.
`;

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
            content: 'You are an expert financial advisor specializing in Indian mutual funds and SIP investments. Generate practical, actionable insights.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const aiData = await response.json();
    const aiInsights = aiData.choices[0].message.content;

    // Parse AI response (assuming it returns valid JSON)
    let insights;
    try {
      insights = JSON.parse(aiInsights);
    } catch {
      // Fallback if AI doesn't return valid JSON
      insights = [{
        title: "Portfolio Analysis Complete",
        message: aiInsights,
        priority: "medium",
        insight_type: "ai_analysis"
      }];
    }

    // Store insights in database
    const insightsToInsert = Array.isArray(insights) ? insights : [insights];
    
    for (const insight of insightsToInsert) {
      await supabase
        .from('ai_portfolio_insights')
        .insert({
          user_id: userId,
          insight_type: insight.insight_type || 'ai_analysis',
          title: insight.title,
          message: insight.message,
          priority: insight.priority || 'medium',
          action_required: insight.priority === 'high',
          data_points: portfolioContext,
        });
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        insights: insightsToInsert,
        message: 'AI insights generated successfully' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-portfolio-insights:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

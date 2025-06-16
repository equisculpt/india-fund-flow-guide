
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting monthly portfolio scraping process...');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Call the advanced AMFI portfolio scraper
    const scrapeResponse = await supabase.functions.invoke('scrape-amfi-portfolio-advanced', {
      body: { 
        trigger: 'monthly_cron',
        date: new Date().toISOString().split('T')[0]
      }
    });

    if (scrapeResponse.error) {
      throw new Error(`Portfolio scraping failed: ${scrapeResponse.error.message}`);
    }

    console.log('Monthly portfolio scraping completed successfully');

    // Generate insights from new portfolio data
    console.log('Generating portfolio insights...');
    
    const insightsResponse = await supabase.functions.invoke('generate-portfolio-insights', {
      body: { 
        trigger: 'monthly_portfolio_update',
        date: new Date().toISOString().split('T')[0]
      }
    });

    if (insightsResponse.error) {
      console.warn('Portfolio insights generation failed:', insightsResponse.error.message);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Monthly portfolio scraping and insights generation completed',
        scrape_result: scrapeResponse.data,
        insights_result: insightsResponse.data
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in monthly portfolio scraping:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to complete monthly portfolio scraping', details: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

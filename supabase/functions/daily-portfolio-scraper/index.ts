
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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting daily portfolio scraping job...');

    // Get list of active mutual funds that need portfolio updates
    const { data: activeFunds, error: fundsError } = await supabase
      .from('mutual_funds')
      .select('scheme_code, scheme_name')
      .eq('is_active', true)
      .limit(50); // Process in batches to avoid timeouts

    if (fundsError) {
      throw new Error(`Failed to fetch active funds: ${fundsError.message}`);
    }

    let successCount = 0;
    let failureCount = 0;
    const results = [];

    // Process each fund with rate limiting
    for (const fund of activeFunds || []) {
      try {
        console.log(`Processing ${fund.scheme_name} (${fund.scheme_code})`);

        // Call the advanced scraping function
        const response = await fetch('https://pvtrwvvcgkppjlbyvflv.supabase.co/functions/v1/scrape-amfi-portfolio-advanced', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseServiceKey}`
          },
          body: JSON.stringify({ 
            schemeCode: fund.scheme_code,
            forceRefresh: true 
          })
        });

        const result = await response.json();
        
        if (result.success) {
          successCount++;
          results.push({
            scheme_code: fund.scheme_code,
            status: 'success',
            message: 'Portfolio data updated successfully'
          });
        } else {
          failureCount++;
          results.push({
            scheme_code: fund.scheme_code,
            status: 'failed',
            message: result.error || 'Unknown error'
          });
        }

        // Rate limiting: 3 second delay between requests
        await new Promise(resolve => setTimeout(resolve, 3000));

      } catch (error) {
        failureCount++;
        console.error(`Failed to process ${fund.scheme_code}:`, error);
        results.push({
          scheme_code: fund.scheme_code,
          status: 'failed',
          message: error.message
        });
      }
    }

    // Log the batch processing results
    await supabase.from('amfi_scrape_logs').insert({
      scheme_code: 'BATCH_JOB',
      status: 'completed',
      error_message: null,
      attempt_time: new Date().toISOString(),
      additional_data: {
        total_processed: activeFunds?.length || 0,
        success_count: successCount,
        failure_count: failureCount,
        results: results
      }
    });

    console.log(`Daily scraping completed. Success: ${successCount}, Failures: ${failureCount}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Daily portfolio scraping completed',
        summary: {
          total_processed: activeFunds?.length || 0,
          success_count: successCount,
          failure_count: failureCount
        },
        results: results
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in daily portfolio scraping:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: `Daily scraping failed: ${error.message}` 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

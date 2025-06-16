
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Setting up portfolio scraping cron jobs...');

    // Schedule daily portfolio scraping at 2:00 AM IST (20:30 UTC)
    const portfolioCronSql = `
      SELECT cron.schedule(
        'daily-portfolio-scraping',
        '30 20 * * *', -- 20:30 UTC = 02:00 IST
        $$
        SELECT
          net.http_post(
              url:='https://pvtrwvvcgkppjlbyvflv.supabase.co/functions/v1/daily-portfolio-scraper',
              headers:='{"Content-Type": "application/json", "Authorization": "Bearer ${supabaseServiceKey}"}'::jsonb,
              body:='{"scheduled": true, "time": "daily_2am_ist"}'::jsonb
          ) as request_id;
        $$
      );
    `;

    const { data: cronData, error: cronError } = await supabase.rpc('execute_sql', {
      query: portfolioCronSql
    });

    if (cronError) {
      console.error('Error scheduling portfolio cron job:', cronError);
      throw cronError;
    }

    console.log('Portfolio cron job scheduled successfully:', cronData);

    // Also set up a weekly deep scraping job for Sundays at 1:00 AM IST
    const weeklyCronSql = `
      SELECT cron.schedule(
        'weekly-deep-portfolio-scraping',
        '30 19 * * 0', -- 19:30 UTC on Sundays = 01:00 IST on Mondays
        $$
        SELECT
          net.http_post(
              url:='https://pvtrwvvcgkppjlbyvflv.supabase.co/functions/v1/daily-portfolio-scraper',
              headers:='{"Content-Type": "application/json", "Authorization": "Bearer ${supabaseServiceKey}"}'::jsonb,
              body:='{"scheduled": true, "time": "weekly_deep_scrape", "forceRefresh": true}'::jsonb
          ) as request_id;
        $$
      );
    `;

    const { data: weeklyCronData, error: weeklyCronError } = await supabase.rpc('execute_sql', {
      query: weeklyCronSql
    });

    if (weeklyCronError) {
      console.log('Weekly cron job warning (may already exist):', weeklyCronError);
    } else {
      console.log('Weekly deep scraping job scheduled:', weeklyCronData);
    }

    // List current portfolio-related cron jobs
    const { data: cronJobs, error: listError } = await supabase.rpc('execute_sql', {
      query: 'SELECT * FROM cron.job WHERE jobname LIKE \'%portfolio%\';'
    });

    if (!listError) {
      console.log('Current portfolio cron jobs:', cronJobs);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Portfolio scraping cron jobs set up successfully',
        scheduled_jobs: {
          daily: 'daily-portfolio-scraping at 02:00 IST',
          weekly: 'weekly-deep-portfolio-scraping at 01:00 IST on Sundays'
        },
        cronJobs: cronJobs || []
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error setting up portfolio cron jobs:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to set up portfolio scraping cron jobs'
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});

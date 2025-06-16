
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Setting up cron jobs for daily NAV analysis and monthly portfolio scraping...');

    // Schedule the daily fund analysis job to run at midnight IST (18:30 UTC)
    // This accounts for IST being UTC+5:30
    const dailyAnalysisCronSql = `
      SELECT cron.schedule(
        'daily-fund-analysis-midnight-ist',
        '30 18 * * *', -- 18:30 UTC = 00:00 IST (midnight)
        $$
        SELECT
          net.http_post(
              url:='https://pvtrwvvcgkppjlbyvflv.supabase.co/functions/v1/daily-fund-analysis',
              headers:='{"Content-Type": "application/json", "Authorization": "Bearer ${supabaseServiceKey}"}'::jsonb,
              body:='{"scheduled": true, "time": "midnight_ist", "type": "daily_nav_update"}'::jsonb
          ) as request_id;
        $$
      );
    `;

    const { data: dailyCronData, error: dailyCronError } = await supabase.rpc('execute_sql', {
      query: dailyAnalysisCronSql
    });

    if (dailyCronError) {
      console.error('Error scheduling daily cron job:', dailyCronError);
      throw dailyCronError;
    }

    console.log('Daily fund analysis cron job scheduled successfully:', dailyCronData);

    // Schedule monthly portfolio scraping on the 1st of every month at 2:00 AM IST (20:30 UTC)
    const monthlyPortfolioCronSql = `
      SELECT cron.schedule(
        'monthly-portfolio-scraping',
        '30 20 1 * *', -- 20:30 UTC on 1st of every month = 02:00 IST
        $$
        SELECT
          net.http_post(
              url:='https://pvtrwvvcgkppjlbyvflv.supabase.co/functions/v1/monthly-portfolio-scraper',
              headers:='{"Content-Type": "application/json", "Authorization": "Bearer ${supabaseServiceKey}"}'::jsonb,
              body:='{"scheduled": true, "time": "monthly_2am_ist", "type": "monthly_portfolio_update"}'::jsonb
          ) as request_id;
        $$
      );
    `;

    const { data: monthlyCronData, error: monthlyCronError } = await supabase.rpc('execute_sql', {
      query: monthlyPortfolioCronSql
    });

    if (monthlyCronError) {
      console.error('Error scheduling monthly portfolio cron job:', monthlyCronError);
      throw monthlyCronError;
    }

    console.log('Monthly portfolio cron job scheduled successfully:', monthlyCronData);

    // Remove any old daily/weekly portfolio scraping jobs that are no longer needed
    const removeOldCronSql = `
      SELECT cron.unschedule('daily-portfolio-scraping');
      SELECT cron.unschedule('weekly-deep-portfolio-scraping');
      SELECT cron.unschedule('daily-fund-analysis-backup-ist');
    `;

    const { data: removeData, error: removeError } = await supabase.rpc('execute_sql', {
      query: removeOldCronSql
    });

    if (!removeError) {
      console.log('Removed old portfolio scraping cron jobs:', removeData);
    } else {
      console.log('No old cron jobs to remove or error removing them:', removeError);
    }

    // List all existing cron jobs to verify
    const { data: cronJobs, error: listError } = await supabase.rpc('execute_sql', {
      query: 'SELECT * FROM cron.job WHERE jobname LIKE \'%fund%\' OR jobname LIKE \'%portfolio%\';'
    });

    if (!listError) {
      console.log('Current cron jobs:', cronJobs);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Cron jobs set up successfully',
        scheduled_jobs: {
          daily: 'daily-fund-analysis-midnight-ist for NAV updates at midnight IST',
          monthly: 'monthly-portfolio-scraping on 1st of every month at 02:00 IST'
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
    console.error('Error setting up cron jobs:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to set up cron jobs for daily NAV and monthly portfolio updates'
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

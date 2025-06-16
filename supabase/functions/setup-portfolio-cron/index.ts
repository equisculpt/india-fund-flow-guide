
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

    console.log('Setting up monthly portfolio scraping cron job...');

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
              body:='{"scheduled": true, "time": "monthly_2am_ist"}'::jsonb
          ) as request_id;
        $$
      );
    `;

    const { data: cronData, error: cronError } = await supabase.rpc('execute_sql', {
      query: monthlyPortfolioCronSql
    });

    if (cronError) {
      console.error('Error scheduling monthly portfolio cron job:', cronError);
      throw cronError;
    }

    console.log('Monthly portfolio cron job scheduled successfully:', cronData);

    // Remove any existing daily portfolio scraping jobs
    const removeOldCronSql = `
      SELECT cron.unschedule('daily-portfolio-scraping');
      SELECT cron.unschedule('weekly-deep-portfolio-scraping');
    `;

    const { data: removeData, error: removeError } = await supabase.rpc('execute_sql', {
      query: removeOldCronSql
    });

    if (!removeError) {
      console.log('Removed old daily/weekly cron jobs:', removeData);
    } else {
      console.log('No old cron jobs to remove or error removing them:', removeError);
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
        message: 'Monthly portfolio scraping cron job set up successfully',
        scheduled_jobs: {
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
    console.error('Error setting up monthly portfolio cron job:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to set up monthly portfolio scraping cron job'
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


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

    // Enable required extensions
    console.log('Enabling pg_cron and pg_net extensions...');
    
    const { error: cronError } = await supabase.rpc('enable_pg_cron');
    if (cronError) {
      console.log('pg_cron extension already enabled or error:', cronError);
    }

    const { error: netError } = await supabase.rpc('enable_pg_net');
    if (netError) {
      console.log('pg_net extension already enabled or error:', netError);
    }

    // Schedule the daily fund analysis job to run at midnight IST (18:30 UTC)
    // This accounts for IST being UTC+5:30
    console.log('Setting up cron job for daily fund analysis...');
    
    const cronJobSql = `
      SELECT cron.schedule(
        'daily-fund-analysis-midnight-ist',
        '30 18 * * *', -- 18:30 UTC = 00:00 IST (midnight)
        $$
        SELECT
          net.http_post(
              url:='https://pvtrwvvcgkppjlbyvflv.supabase.co/functions/v1/daily-fund-analysis',
              headers:='{"Content-Type": "application/json", "Authorization": "Bearer ${supabaseServiceKey}"}'::jsonb,
              body:='{"scheduled": true, "time": "midnight_ist"}'::jsonb
          ) as request_id;
        $$
      );
    `;

    const { data: cronData, error: cronScheduleError } = await supabase.rpc('execute_sql', {
      query: cronJobSql
    });

    if (cronScheduleError) {
      console.error('Error scheduling cron job:', cronScheduleError);
      throw cronScheduleError;
    }

    console.log('Cron job scheduled successfully:', cronData);

    // Also set up a backup job for 12:30 AM IST (19:00 UTC) in case midnight fails
    const backupCronJobSql = `
      SELECT cron.schedule(
        'daily-fund-analysis-backup-ist',
        '0 19 * * *', -- 19:00 UTC = 00:30 IST
        $$
        SELECT
          net.http_post(
              url:='https://pvtrwvvcgkppjlbyvflv.supabase.co/functions/v1/daily-fund-analysis',
              headers:='{"Content-Type": "application/json", "Authorization": "Bearer ${supabaseServiceKey}"}'::jsonb,
              body:='{"scheduled": true, "time": "backup_midnight_ist"}'::jsonb
          ) as request_id;
        $$
      );
    `;

    const { data: backupCronData, error: backupCronError } = await supabase.rpc('execute_sql', {
      query: backupCronJobSql
    });

    if (backupCronError) {
      console.log('Backup cron job error (may already exist):', backupCronError);
    } else {
      console.log('Backup cron job scheduled:', backupCronData);
    }

    // List all existing cron jobs to verify
    const { data: cronJobs, error: listError } = await supabase.rpc('execute_sql', {
      query: 'SELECT * FROM cron.job WHERE jobname LIKE \'%fund-analysis%\';'
    });

    if (!listError) {
      console.log('Current fund analysis cron jobs:', cronJobs);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Cron jobs set up successfully for daily fund analysis at midnight IST',
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
    console.error('Error setting up cron job:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to set up cron job for daily fund analysis'
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

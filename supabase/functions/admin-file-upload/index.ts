
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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { 
      user_id, 
      filename, 
      original_filename, 
      file_type, 
      file_size, 
      file_path, 
      upload_purpose, 
      is_processed,
      admin_session_token 
    } = await req.json()

    // Verify admin session
    const { data: sessionData, error: sessionError } = await supabaseClient
      .from('admin_sessions')
      .select(`
        admin_user_id,
        expires_at,
        admin_users!admin_sessions_admin_user_id_fkey (
          id,
          email,
          is_active
        )
      `)
      .eq('session_token', admin_session_token)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (sessionError || !sessionData || !sessionData.admin_users.is_active) {
      throw new Error('Invalid admin session')
    }

    // Insert file record using service role (bypasses RLS)
    const { data, error } = await supabaseClient
      .from('uploaded_files')
      .insert({
        user_id,
        filename,
        original_filename,
        file_type,
        file_size,
        file_path,
        upload_purpose,
        is_processed
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in admin file upload:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

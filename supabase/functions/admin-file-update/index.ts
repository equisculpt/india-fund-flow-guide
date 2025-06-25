
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
    // Create service role client for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const { file_id, extracted_content, admin_session_token } = await req.json()

    console.log('Admin file update request:', { 
      file_id, 
      admin_session_token: admin_session_token ? 'present' : 'missing' 
    })

    // Verify admin session using service role client
    const { data: sessionData, error: sessionError } = await supabaseAdmin
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

    console.log('Session validation result:', { sessionData, sessionError })

    if (sessionError || !sessionData || !sessionData.admin_users.is_active) {
      console.error('Invalid admin session:', sessionError)
      throw new Error('Invalid admin session')
    }

    // Update file record using service role (bypasses all RLS)
    const { data, error } = await supabaseAdmin
      .from('uploaded_files')
      .update({ 
        extracted_content,
        is_processed: true 
      })
      .eq('id', file_id)
      .select()
      .single()

    console.log('File update result:', { data, error })

    if (error) {
      console.error('Database update error:', error)
      throw new Error(`Database error: ${error.message}`)
    }

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in admin file update:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

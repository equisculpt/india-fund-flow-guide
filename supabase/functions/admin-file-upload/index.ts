
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

    const formData = await req.formData()
    const file = formData.get('file') as File
    const originalFilename = formData.get('original_filename') as string
    const fileType = formData.get('file_type') as string
    const fileSize = parseInt(formData.get('file_size') as string)
    const uploadPurpose = formData.get('upload_purpose') as string
    const adminSessionToken = formData.get('admin_session_token') as string

    console.log('Admin file upload request:', { 
      originalFilename, 
      fileType,
      fileSize,
      uploadPurpose,
      adminSessionToken: adminSessionToken ? 'present' : 'missing' 
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
      .eq('session_token', adminSessionToken)
      .gt('expires_at', new Date().toISOString())
      .single()

    console.log('Session validation result:', { sessionData, sessionError })

    if (sessionError || !sessionData || !sessionData.admin_users.is_active) {
      console.error('Invalid admin session:', sessionError)
      throw new Error('Invalid admin session')
    }

    const adminUserId = sessionData.admin_user_id
    const fileName = `${adminUserId}/${Date.now()}_${originalFilename}`

    // Upload file to storage using service role (bypasses RLS)
    const { data: storageData, error: storageError } = await supabaseAdmin.storage
      .from('chat-uploads')
      .upload(fileName, file)

    console.log('Storage upload result:', { storageData, storageError })

    if (storageError) {
      console.error('Storage upload error:', storageError)
      throw new Error(`Storage upload failed: ${storageError.message}`)
    }

    // Insert file record using service role (bypasses all RLS)
    const { data: dbData, error: dbError } = await supabaseAdmin
      .from('uploaded_files')
      .insert({
        user_id: adminUserId,
        filename: fileName,
        original_filename: originalFilename,
        file_type: fileType,
        file_size: fileSize,
        file_path: storageData.path,
        upload_purpose: uploadPurpose || 'blog',
        is_processed: false
      })
      .select()
      .single()

    console.log('File insert result:', { dbData, dbError })

    if (dbError) {
      console.error('Database insert error:', dbError)
      throw new Error(`Database error: ${dbError.message}`)
    }

    return new Response(
      JSON.stringify(dbData),
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


-- First, let's check and update the RLS policies for uploaded_files table
-- We need to allow admin users to bypass RLS or create admin-specific policies

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Users can view their own files" ON public.uploaded_files;
DROP POLICY IF EXISTS "Users can upload their own files" ON public.uploaded_files;
DROP POLICY IF EXISTS "Users can update their own files" ON public.uploaded_files;
DROP POLICY IF EXISTS "Users can delete their own files" ON public.uploaded_files;

-- Create new policies that work for both regular users and admin users
CREATE POLICY "Users can view their own files or admin can view all" 
  ON public.uploaded_files 
  FOR SELECT 
  USING (
    auth.uid() = user_id 
    OR 
    EXISTS (
      SELECT 1 FROM public.admin_sessions 
      WHERE session_token = current_setting('request.headers', true)::json->>'x-admin-token'
      AND expires_at > NOW()
    )
  );

CREATE POLICY "Users can upload their own files or admin can upload" 
  ON public.uploaded_files 
  FOR INSERT 
  WITH CHECK (
    auth.uid() = user_id 
    OR 
    EXISTS (
      SELECT 1 FROM public.admin_sessions 
      WHERE session_token = current_setting('request.headers', true)::json->>'x-admin-token'
      AND expires_at > NOW()
    )
  );

CREATE POLICY "Users can update their own files or admin can update" 
  ON public.uploaded_files 
  FOR UPDATE 
  USING (
    auth.uid() = user_id 
    OR 
    EXISTS (
      SELECT 1 FROM public.admin_sessions 
      WHERE session_token = current_setting('request.headers', true)::json->>'x-admin-token'
      AND expires_at > NOW()
    )
  );

CREATE POLICY "Users can delete their own files or admin can delete" 
  ON public.uploaded_files 
  FOR DELETE 
  USING (
    auth.uid() = user_id 
    OR 
    EXISTS (
      SELECT 1 FROM public.admin_sessions 
      WHERE session_token = current_setting('request.headers', true)::json->>'x-admin-token'
      AND expires_at > NOW()
    )
  );


-- Create the chat-uploads bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('chat-uploads', 'chat-uploads', false)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies that work for both regular users and admin users
DROP POLICY IF EXISTS "Users can upload their own files" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own files" ON storage.objects;

-- Allow authenticated users to upload to their own folder
CREATE POLICY "Authenticated users can upload files"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'chat-uploads' 
    AND auth.uid() IS NOT NULL
    AND (auth.uid()::text = (storage.foldername(name))[1] OR auth.uid()::text = ANY(string_to_array(name, '/')))
  );

-- Allow users to view their own files
CREATE POLICY "Users can view their own files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'chat-uploads' 
    AND auth.uid() IS NOT NULL
    AND (auth.uid()::text = (storage.foldername(name))[1] OR auth.uid()::text = ANY(string_to_array(name, '/')))
  );

-- Allow users to delete their own files
CREATE POLICY "Users can delete their own files"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'chat-uploads' 
    AND auth.uid() IS NOT NULL
    AND (auth.uid()::text = (storage.foldername(name))[1] OR auth.uid()::text = ANY(string_to_array(name, '/')))
  );


-- Create table to store uploaded files for chat/blog creation
CREATE TABLE public.uploaded_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_path TEXT NOT NULL,
  extracted_content TEXT,
  upload_purpose TEXT DEFAULT 'chat', -- 'chat', 'blog', 'analysis'
  is_processed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies
ALTER TABLE public.uploaded_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own files" 
  ON public.uploaded_files 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upload their own files" 
  ON public.uploaded_files 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own files" 
  ON public.uploaded_files 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own files" 
  ON public.uploaded_files 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create storage bucket for uploaded files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('chat-uploads', 'chat-uploads', false);

-- Create storage policies
CREATE POLICY "Users can upload their own files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'chat-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'chat-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own files"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'chat-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

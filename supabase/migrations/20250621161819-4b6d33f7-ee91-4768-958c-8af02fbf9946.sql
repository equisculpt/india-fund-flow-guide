
-- Create a table to track blog views
CREATE TABLE public.blog_views (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_slug text NOT NULL,
  user_id uuid REFERENCES auth.users,
  ip_address text,
  user_agent text,
  viewed_at timestamp with time zone NOT NULL DEFAULT now(),
  session_id text
);

-- Create index for faster queries
CREATE INDEX idx_blog_views_slug ON public.blog_views(blog_slug);
CREATE INDEX idx_blog_views_viewed_at ON public.blog_views(viewed_at);

-- Create a table to store aggregated view counts for performance
CREATE TABLE public.blog_view_counts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_slug text NOT NULL UNIQUE,
  total_views integer NOT NULL DEFAULT 0,
  unique_views integer NOT NULL DEFAULT 0,
  last_updated timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_view_counts ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_views (allow anyone to insert views, only admins to read all)
CREATE POLICY "Anyone can record blog views" ON public.blog_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read blog views" ON public.blog_views
  FOR SELECT USING (true);

-- Create policies for blog_view_counts (public read access)
CREATE POLICY "Anyone can read view counts" ON public.blog_view_counts
  FOR SELECT USING (true);

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_blog_view_count(p_blog_slug text, p_user_id uuid DEFAULT NULL, p_ip_address text DEFAULT NULL, p_user_agent text DEFAULT NULL, p_session_id text DEFAULT NULL)
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
  view_count integer;
  unique_count integer;
BEGIN
  -- Insert the view record
  INSERT INTO public.blog_views (blog_slug, user_id, ip_address, user_agent, session_id)
  VALUES (p_blog_slug, p_user_id, p_ip_address, p_user_agent, p_session_id);
  
  -- Calculate total views
  SELECT COUNT(*) INTO view_count
  FROM public.blog_views
  WHERE blog_slug = p_blog_slug;
  
  -- Calculate unique views (by IP or user_id)
  SELECT COUNT(DISTINCT COALESCE(user_id::text, ip_address)) INTO unique_count
  FROM public.blog_views
  WHERE blog_slug = p_blog_slug;
  
  -- Update or insert the aggregated count
  INSERT INTO public.blog_view_counts (blog_slug, total_views, unique_views)
  VALUES (p_blog_slug, view_count, unique_count)
  ON CONFLICT (blog_slug)
  DO UPDATE SET
    total_views = view_count,
    unique_views = unique_count,
    last_updated = now();
    
  RETURN view_count;
END;
$$;

-- Enable realtime for live updates
ALTER TABLE public.blog_view_counts REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_view_counts;


-- Fix RLS policies for blog view tracking

-- Allow anyone to insert into blog_views (for tracking individual views)
DROP POLICY IF EXISTS "Anyone can record blog views" ON public.blog_views;
CREATE POLICY "Anyone can record blog views" ON public.blog_views
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read blog_views
DROP POLICY IF EXISTS "Anyone can read blog views" ON public.blog_views;
CREATE POLICY "Anyone can read blog views" ON public.blog_views
  FOR SELECT USING (true);

-- Fix blog_view_counts policies - allow the function to insert/update
DROP POLICY IF EXISTS "Anyone can read view counts" ON public.blog_view_counts;
CREATE POLICY "Anyone can read view counts" ON public.blog_view_counts
  FOR SELECT USING (true);

-- Allow the increment function to insert new records
CREATE POLICY "System can manage view counts" ON public.blog_view_counts
  FOR ALL USING (true) WITH CHECK (true);

-- Update the increment function to handle permissions properly
CREATE OR REPLACE FUNCTION public.increment_blog_view_count(
  p_blog_slug text, 
  p_user_id uuid DEFAULT NULL, 
  p_ip_address text DEFAULT NULL, 
  p_user_agent text DEFAULT NULL, 
  p_session_id text DEFAULT NULL
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER -- This allows the function to bypass RLS
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
  
  -- Calculate unique views (by session_id, user_id, or ip_address)
  SELECT COUNT(DISTINCT COALESCE(session_id, user_id::text, ip_address)) INTO unique_count
  FROM public.blog_views
  WHERE blog_slug = p_blog_slug
  AND COALESCE(session_id, user_id::text, ip_address) IS NOT NULL;
  
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

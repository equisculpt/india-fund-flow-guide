
-- Add moderation fields to blog_posts table one by one
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS moderation_status VARCHAR(20) DEFAULT 'pending' CHECK (moderation_status IN ('pending', 'approved', 'rejected', 'edited'));

ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS admin_notes TEXT;

ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS edited_by_admin BOOLEAN DEFAULT false;

ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS admin_edited_content TEXT;

ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS admin_edited_title TEXT;

ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS moderated_by UUID REFERENCES auth.users(id);

ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS moderated_at TIMESTAMP WITH TIME ZONE;

-- Update RLS policies for blog_posts to only show approved posts to public
DROP POLICY IF EXISTS "Anyone can view published posts" ON public.blog_posts;

CREATE POLICY "Anyone can view approved published posts" ON public.blog_posts
  FOR SELECT USING (status = 'published' AND moderation_status = 'approved');

-- Allow admins to see all posts
CREATE POLICY "Admins can view all posts" ON public.blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.user_type = 'admin'
    )
  );

-- Add moderation fields to blog_comments table
ALTER TABLE public.blog_comments 
ADD COLUMN IF NOT EXISTS moderation_status VARCHAR(20) DEFAULT 'pending' CHECK (moderation_status IN ('pending', 'approved', 'rejected'));

ALTER TABLE public.blog_comments 
ADD COLUMN IF NOT EXISTS moderated_by UUID REFERENCES auth.users(id);

ALTER TABLE public.blog_comments 
ADD COLUMN IF NOT EXISTS moderated_at TIMESTAMP WITH TIME ZONE;

-- Update RLS policies for comments
DROP POLICY IF EXISTS "Anyone can view comments" ON public.blog_comments;

CREATE POLICY "Anyone can view approved comments" ON public.blog_comments
  FOR SELECT USING (moderation_status = 'approved');

-- Allow admins to see all comments
CREATE POLICY "Admins can view all comments" ON public.blog_comments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.user_type = 'admin'
    )
  );

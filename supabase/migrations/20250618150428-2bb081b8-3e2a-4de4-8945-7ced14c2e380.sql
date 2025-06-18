
-- Create community questions table
CREATE TABLE public.community_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) DEFAULT 'general',
  expert_only BOOLEAN DEFAULT false,
  is_answered BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  upvotes_count INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'closed', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create community answers table
CREATE TABLE public.community_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID REFERENCES public.community_questions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_expert_answer BOOLEAN DEFAULT false,
  is_accepted BOOLEAN DEFAULT false,
  upvotes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  category VARCHAR(50) DEFAULT 'general',
  tags TEXT[],
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  views_count INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog comments table
CREATE TABLE public.blog_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES public.blog_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user roles for experts
CREATE TABLE public.user_expert_status (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  is_expert BOOLEAN DEFAULT false,
  expertise_areas TEXT[],
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.community_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_expert_status ENABLE ROW LEVEL SECURITY;

-- RLS Policies for community_questions
CREATE POLICY "Anyone can view published questions" ON public.community_questions
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create questions" ON public.community_questions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own questions" ON public.community_questions
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for community_answers
CREATE POLICY "Anyone can view answers" ON public.community_answers
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create answers" ON public.community_answers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own answers" ON public.community_answers
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for blog_posts
CREATE POLICY "Anyone can view published posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authors can view own posts" ON public.blog_posts
  FOR SELECT USING (auth.uid() = author_id);

CREATE POLICY "Authenticated users can create posts" ON public.blog_posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own posts" ON public.blog_posts
  FOR UPDATE USING (auth.uid() = author_id);

-- RLS Policies for blog_comments
CREATE POLICY "Anyone can view comments" ON public.blog_comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create comments" ON public.blog_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments" ON public.blog_comments
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for user_expert_status
CREATE POLICY "Anyone can view expert status" ON public.user_expert_status
  FOR SELECT USING (true);

CREATE POLICY "Users can view own expert status" ON public.user_expert_status
  FOR SELECT USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_community_questions_user_id ON public.community_questions(user_id);
CREATE INDEX idx_community_questions_created_at ON public.community_questions(created_at DESC);
CREATE INDEX idx_community_questions_expert_only ON public.community_questions(expert_only);

CREATE INDEX idx_community_answers_question_id ON public.community_answers(question_id);
CREATE INDEX idx_community_answers_user_id ON public.community_answers(user_id);

CREATE INDEX idx_blog_posts_author_id ON public.blog_posts(author_id);
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

CREATE INDEX idx_blog_comments_post_id ON public.blog_comments(post_id);
CREATE INDEX idx_blog_comments_user_id ON public.blog_comments(user_id);

-- Function to update question answered status
CREATE OR REPLACE FUNCTION update_question_answered_status()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.community_questions 
  SET is_answered = true, updated_at = NOW()
  WHERE id = NEW.question_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update question status when answer is added
CREATE TRIGGER trigger_update_question_answered
  AFTER INSERT ON public.community_answers
  FOR EACH ROW
  EXECUTE FUNCTION update_question_answered_status();

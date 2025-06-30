
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Question {
  id: string;
  title: string;
  content: string;
  category: string;
  expert_only: boolean;
  is_answered: boolean;
  status: string;
  created_at: string;
  user_id: string;
  profiles?: {
    full_name: string;
  } | null;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: string;
  category: string;
  views_count: number;
  created_at: string;
  published_at: string;
  author_id: string;
  profiles?: {
    full_name: string;
  } | null;
}

export const useCommunityData = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [newQuestionsCount, setNewQuestionsCount] = useState(0);
  const [pendingBlogsCount, setPendingBlogsCount] = useState(0);

  const fetchCommunityData = async () => {
    try {
      // Fetch recent questions with manual join
      const { data: questionsData, error: questionsError } = await supabase
        .from('community_questions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (questionsError) throw questionsError;

      // Fetch profiles for questions
      const questionIds = questionsData?.map(q => q.user_id) || [];
      const { data: questionProfiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', questionIds);

      // Fetch recent blog posts with manual join
      const { data: blogsData, error: blogsError } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (blogsError) throw blogsError;

      // Fetch profiles for blogs
      const blogAuthorIds = blogsData?.map(b => b.author_id) || [];
      const { data: blogProfiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', blogAuthorIds);

      // Combine data with profiles
      const questionsWithProfiles = (questionsData || []).map(question => ({
        ...question,
        profiles: questionProfiles?.find(p => p.id === question.user_id) || null
      }));

      const blogsWithProfiles = (blogsData || []).map(blog => ({
        ...blog,
        profiles: blogProfiles?.find(p => p.id === blog.author_id) || null
      }));

      setQuestions(questionsWithProfiles);
      setBlogs(blogsWithProfiles);

      // Count new/unanswered questions
      const unansweredCount = questionsWithProfiles.filter(q => !q.is_answered).length;
      setNewQuestionsCount(unansweredCount);

      // Count pending blogs
      const { count: pendingCount } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true })
        .eq('moderation_status', 'pending');

      setPendingBlogsCount(pendingCount || 0);
    } catch (error) {
      console.error('Error fetching community data:', error);
      toast.error('Failed to load community data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunityData();
    
    // Set up real-time subscriptions for notifications
    const questionsSubscription = supabase
      .channel('questions')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'community_questions' }, () => {
        fetchCommunityData();
      })
      .subscribe();

    const blogsSubscription = supabase
      .channel('blogs')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'blog_posts' }, () => {
        fetchCommunityData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(questionsSubscription);
      supabase.removeChannel(blogsSubscription);
    };
  }, []);

  return {
    questions,
    blogs,
    loading,
    newQuestionsCount,
    pendingBlogsCount,
    fetchCommunityData
  };
};

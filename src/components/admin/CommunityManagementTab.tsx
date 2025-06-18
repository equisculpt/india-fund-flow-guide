
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from 'sonner';
import BlogModerationTab from './BlogModerationTab';
import CommunityNotifications from './community/CommunityNotifications';
import CommunityTabNavigation from './community/CommunityTabNavigation';
import QuestionsTab from './community/QuestionsTab';
import RecentBlogsTab from './community/RecentBlogsTab';

interface Question {
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

interface BlogPost {
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

const CommunityManagementTab = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [newQuestionsCount, setNewQuestionsCount] = useState(0);
  const [pendingBlogsCount, setPendingBlogsCount] = useState(0);
  const [activeTab, setActiveTab] = useState('questions');

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

  const handleAnswerQuestion = async (questionId: string) => {
    window.open(`/community/question/${questionId}`, '_blank');
  };

  const handlePublishBlog = async (blogId: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          status: 'published', 
          published_at: new Date().toISOString(),
          moderation_status: 'approved'
        })
        .eq('id', blogId);

      if (error) throw error;

      toast.success('Blog post published successfully!');
      fetchCommunityData();
    } catch (error) {
      console.error('Error publishing blog:', error);
      toast.error('Failed to publish blog post');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Loading community data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CommunityNotifications 
        newQuestionsCount={newQuestionsCount}
        pendingBlogsCount={pendingBlogsCount}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <CommunityTabNavigation 
          newQuestionsCount={newQuestionsCount}
          pendingBlogsCount={pendingBlogsCount}
        />

        <TabsContent value="questions" className="space-y-4">
          <QuestionsTab 
            questions={questions}
            onAnswerQuestion={handleAnswerQuestion}
          />
        </TabsContent>

        <TabsContent value="blogs" className="space-y-4">
          <RecentBlogsTab 
            blogs={blogs}
            onPublishBlog={handlePublishBlog}
          />
        </TabsContent>

        <TabsContent value="moderation" className="space-y-4">
          <BlogModerationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityManagementTab;


import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useCommunityActions = (fetchCommunityData: () => Promise<void>) => {
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

  return {
    handleAnswerQuestion,
    handlePublishBlog
  };
};

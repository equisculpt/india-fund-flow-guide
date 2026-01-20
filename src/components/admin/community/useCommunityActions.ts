
import { toast } from 'sonner';

export const useCommunityActions = (fetchCommunityData: () => Promise<void>) => {
  const handleAnswerQuestion = async (questionId: string) => {
    window.open(`/community/question/${questionId}`, '_blank');
  };

  const handlePublishBlog = async (blogId: string) => {
    // Mock publish for prototype
    toast.success('Blog post published successfully!');
    fetchCommunityData();
  };

  return {
    handleAnswerQuestion,
    handlePublishBlog
  };
};

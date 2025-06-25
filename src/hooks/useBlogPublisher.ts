
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BlogData {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  slug: string;
}

export const useBlogPublisher = () => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  const publishBlog = async (blogData: BlogData) => {
    setIsPublishing(true);
    setPublishError(null);

    try {
      console.log('Publishing blog:', blogData.title);

      const { data, error } = await supabase.functions.invoke('publish-blog', {
        body: {
          blog: blogData,
          sourceFiles: ['comprehensive-analysis']
        }
      });

      if (error) {
        console.error('Blog publishing error:', error);
        throw new Error(error.message || 'Failed to publish blog');
      }

      console.log('Blog published successfully:', data);
      return data;

    } catch (error) {
      console.error('Error in blog publishing:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to publish blog';
      setPublishError(errorMessage);
      throw error;
    } finally {
      setIsPublishing(false);
    }
  };

  return {
    publishBlog,
    isPublishing,
    publishError
  };
};

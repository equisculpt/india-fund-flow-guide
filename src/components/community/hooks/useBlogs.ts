
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BlogPost } from '../types/blogTypes';

export const useBlogs = (category: string) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .eq('moderation_status', 'approved')
        .order('published_at', { ascending: false });

      if (category !== 'all') {
        query = query.eq('category', category);
      }

      const { data: blogsData, error } = await query;

      if (error) {
        console.error('Error fetching blogs:', error);
        // For now, just set empty array and don't fetch profiles due to RLS issues
        setBlogs([]);
        return;
      }

      // Skip profile fetching due to RLS policy issues
      // Just use the blog data without profile information
      const blogsWithoutProfiles = (blogsData || []).map(blog => ({
        ...blog,
        profiles: null
      }));

      setBlogs(blogsWithoutProfiles);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [category]);

  return { blogs, loading };
};

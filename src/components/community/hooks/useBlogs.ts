
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

      if (error) throw error;

      // Fetch profiles separately
      const authorIds = blogsData?.map(b => b.author_id) || [];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', authorIds);

      // Combine data with profiles
      const blogsWithProfiles = (blogsData || []).map(blog => ({
        ...blog,
        profiles: profiles?.find(p => p.id === blog.author_id) || null
      }));

      setBlogs(blogsWithProfiles);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [category]);

  return { blogs, loading };
};

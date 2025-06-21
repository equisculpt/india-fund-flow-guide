
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BlogViewCount {
  total_views: number;
  unique_views: number;
  last_updated: string;
}

export const useBlogViews = (blogSlug: string) => {
  const [viewCount, setViewCount] = useState<BlogViewCount | null>(null);
  const [loading, setLoading] = useState(true);

  // Track a view when the hook is used
  const trackView = async () => {
    try {
      const sessionId = sessionStorage.getItem('session_id') || crypto.randomUUID();
      sessionStorage.setItem('session_id', sessionId);

      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase.rpc('increment_blog_view_count', {
        p_blog_slug: blogSlug,
        p_user_id: user?.id || null,
        p_ip_address: null, // Will be handled by server
        p_user_agent: navigator.userAgent,
        p_session_id: sessionId
      });
    } catch (error) {
      console.error('Error tracking blog view:', error);
    }
  };

  // Fetch current view count
  const fetchViewCount = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_view_counts')
        .select('total_views, unique_views, last_updated')
        .eq('blog_slug', blogSlug)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching view count:', error);
        return;
      }

      if (data) {
        setViewCount(data);
      } else {
        setViewCount({ total_views: 0, unique_views: 0, last_updated: new Date().toISOString() });
      }
    } catch (error) {
      console.error('Error fetching view count:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchViewCount();
    trackView();

    // Set up real-time subscription for live updates
    const channel = supabase
      .channel('blog-views')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blog_view_counts',
          filter: `blog_slug=eq.${blogSlug}`
        },
        (payload) => {
          if (payload.new) {
            setViewCount(payload.new as BlogViewCount);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [blogSlug]);

  return { viewCount, loading };
};

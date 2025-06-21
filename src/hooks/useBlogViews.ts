
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BlogViewCount {
  total_views: number;
  unique_views: number;
  last_updated: string;
}

export const useBlogViews = (blogSlug: string) => {
  const [viewCount, setViewCount] = useState<BlogViewCount | null>(null);
  const [loading, setLoading] = useState(true);
  const channelRef = useRef<any>(null);
  const hasTrackedView = useRef(false);

  // Track a view when the hook is used
  const trackView = async () => {
    if (hasTrackedView.current) return;
    
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
      
      hasTrackedView.current = true;
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
    // Clean up any existing channel first
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    fetchViewCount();
    trackView();

    // Create a new channel with a unique name
    const channelName = `blog-views-${blogSlug}-${Date.now()}`;
    channelRef.current = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blog_view_counts',
          filter: `blog_slug=eq.${blogSlug}`
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          if (payload.new) {
            setViewCount(payload.new as BlogViewCount);
          }
        }
      )
      .subscribe();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [blogSlug]);

  return { viewCount, loading };
};


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
      // Generate or get session ID
      let sessionId = sessionStorage.getItem('blog_session_id');
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem('blog_session_id', sessionId);
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.rpc('increment_blog_view_count', {
        p_blog_slug: blogSlug,
        p_user_id: user?.id || null,
        p_ip_address: null, // Server will handle this
        p_user_agent: navigator.userAgent,
        p_session_id: sessionId
      });
      
      if (error) {
        console.error('Error tracking blog view:', error);
      } else {
        console.log('Blog view tracked successfully for:', blogSlug);
        hasTrackedView.current = true;
      }
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
        console.log('View count fetched for', blogSlug, ':', data);
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
    console.log('Setting up blog views for:', blogSlug);
    
    // Clean up any existing channel first
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    fetchViewCount();
    
    // Track view after a short delay to ensure page is loaded
    const trackTimer = setTimeout(() => {
      trackView();
    }, 1000);

    // Create a new channel with a unique name for real-time updates
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
          console.log('Real-time view count update:', payload);
          if (payload.new) {
            setViewCount(payload.new as BlogViewCount);
          }
        }
      )
      .subscribe();

    return () => {
      clearTimeout(trackTimer);
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [blogSlug]);

  return { viewCount, loading };
};

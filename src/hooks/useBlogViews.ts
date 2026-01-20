
import { useState, useEffect, useRef } from 'react';

interface BlogViewCount {
  total_views: number;
  unique_views: number;
  last_updated: string;
}

// Mock blog view counts for prototype
const mockBlogViewCounts: Record<string, BlogViewCount> = {};

export const useBlogViews = (blogSlug: string) => {
  const [viewCount, setViewCount] = useState<BlogViewCount | null>(null);
  const [loading, setLoading] = useState(true);
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

      // Update mock view count
      if (!mockBlogViewCounts[blogSlug]) {
        mockBlogViewCounts[blogSlug] = {
          total_views: 0,
          unique_views: 0,
          last_updated: new Date().toISOString()
        };
      }

      mockBlogViewCounts[blogSlug].total_views += 1;
      mockBlogViewCounts[blogSlug].unique_views += 1;
      mockBlogViewCounts[blogSlug].last_updated = new Date().toISOString();

      console.log('Blog view tracked successfully for:', blogSlug);
      hasTrackedView.current = true;
      setViewCount({ ...mockBlogViewCounts[blogSlug] });
    } catch (error) {
      console.error('Error tracking blog view:', error);
    }
  };

  // Fetch current view count
  const fetchViewCount = async () => {
    try {
      const data = mockBlogViewCounts[blogSlug];

      if (data) {
        setViewCount(data);
        console.log('View count fetched for', blogSlug, ':', data);
      } else {
        // Generate random mock view count for existing blogs
        const mockData: BlogViewCount = {
          total_views: Math.floor(Math.random() * 1000) + 50,
          unique_views: Math.floor(Math.random() * 500) + 30,
          last_updated: new Date().toISOString()
        };
        mockBlogViewCounts[blogSlug] = mockData;
        setViewCount(mockData);
      }
    } catch (error) {
      console.error('Error fetching view count:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Setting up blog views for:', blogSlug);

    fetchViewCount();
    
    // Track view after a short delay to ensure page is loaded
    const trackTimer = setTimeout(() => {
      trackView();
    }, 1000);

    return () => {
      clearTimeout(trackTimer);
    };
  }, [blogSlug]);

  return { viewCount, loading };
};

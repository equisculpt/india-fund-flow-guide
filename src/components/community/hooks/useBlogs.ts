
import { useState, useEffect } from 'react';
import { mockBlogPosts, mockProfiles } from '@/services/mockDatabase';
import { BlogPost } from '../types/blogTypes';

export const useBlogs = (category: string) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    let filteredBlogs = mockBlogPosts.filter(b => 
      b.status === 'published' && b.moderation_status === 'approved'
    );

    if (category !== 'all') {
      filteredBlogs = filteredBlogs.filter(b => b.category === category);
    }

    const blogsWithProfiles: BlogPost[] = filteredBlogs.map(blog => {
      const profile = mockProfiles.find(p => p.id === blog.author_id);
      return {
        id: blog.id,
        title: blog.title,
        content: blog.content,
        excerpt: blog.content.substring(0, 150) + '...',
        category: blog.category,
        featured_image_url: '',
        author_id: blog.author_id,
        tags: blog.tags,
        moderation_status: blog.moderation_status,
        views_count: 250,
        published_at: blog.published_at || '',
        created_at: blog.created_at,
        edited_by_admin: false,
        admin_edited_title: null,
        admin_edited_content: null,
        profiles: profile ? { full_name: profile.full_name } : null
      };
    });

    setBlogs(blogsWithProfiles);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, [category]);

  return { blogs, loading };
};

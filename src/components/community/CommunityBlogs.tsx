
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image_url: string;
  category: string;
  tags: string[];
  views_count: number;
  published_at: string;
  created_at: string;
  profiles: {
    full_name: string;
  } | null;
}

const CommunityBlogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>('all');
  const navigate = useNavigate();

  const categories = [
    { value: 'all', label: 'All Posts' },
    { value: 'market-analysis', label: 'Market Analysis' },
    { value: 'investment-tips', label: 'Investment Tips' },
    { value: 'fund-reviews', label: 'Fund Reviews' },
    { value: 'news', label: 'News & Updates' },
    { value: 'beginner-guide', label: 'Beginner Guide' }
  ];

  const fetchBlogs = async () => {
    try {
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          profiles(full_name)
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      setBlogs(data || []);
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

  const handleBlogClick = (blogId: string) => {
    navigate(`/community/blog/${blogId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Loading blog posts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={category === cat.value ? 'default' : 'outline'}
            onClick={() => setCategory(cat.value)}
            size="sm"
          >
            {cat.label}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">No blog posts found for this category.</p>
          </div>
        ) : (
          blogs.map((blog) => (
            <Card 
              key={blog.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleBlogClick(blog.id)}
            >
              {blog.featured_image_url && (
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img 
                    src={blog.featured_image_url} 
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">{blog.category}</Badge>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {blog.views_count}
                  </span>
                </div>
                <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {blog.excerpt || blog.content.substring(0, 120) + '...'}
                </p>
                
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3" />
                    <span>{blog.profiles?.full_name || 'Anonymous'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(blog.published_at).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-3 flex items-center gap-2"
                >
                  Read More <ArrowRight className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityBlogs;

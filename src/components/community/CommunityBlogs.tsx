
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, User, ArrowRight, Edit, BookOpen } from 'lucide-react';
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
  author_id: string;
  moderation_status: string;
  edited_by_admin: boolean;
  admin_edited_title: string | null;
  admin_edited_content: string | null;
  profiles?: {
    full_name: string;
  } | null;
}

interface StaticBlog {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  route: string;
  published_at: string;
  author: string;
  featured_image_url?: string;
}

const CommunityBlogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>('all');
  const navigate = useNavigate();

  // Static blogs data
  const staticBlogs: StaticBlog[] = [
    {
      id: 'static-what-are-mutual-funds',
      title: 'What Are Mutual Funds: Complete Guide for Beginners',
      excerpt: 'A comprehensive guide to understanding mutual funds, how they work, and why they are perfect for beginner investors in India.',
      category: 'beginner-guide',
      tags: ['mutual funds', 'beginner guide', 'investing basics'],
      route: '/blog/what-are-mutual-funds-complete-guide',
      published_at: '2025-06-19',
      author: 'SIP Brewery Team',
      featured_image_url: '/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png'
    },
    {
      id: 'static-how-mutual-funds-work',
      title: 'How Mutual Funds Work: Detailed Explanation with Examples',
      excerpt: 'Learn the complete working mechanism of mutual funds with real-world examples, NAV calculation, and investment process.',
      category: 'investment-tips',
      tags: ['mutual funds', 'NAV', 'investment process'],
      route: '/blog/how-mutual-funds-work-detailed-explanation',
      published_at: '2025-06-19',
      author: 'SIP Brewery Team',
      featured_image_url: '/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png'
    },
    {
      id: 'static-fund-managers-money',
      title: 'How Fund Managers Make Money from Mutual Funds',
      excerpt: 'Understand the fee structure of mutual funds, how fund managers earn, and what it means for your returns.',
      category: 'fund-reviews',
      tags: ['fund managers', 'fees', 'expense ratio'],
      route: '/blog/how-fund-managers-make-money-mutual-funds',
      published_at: '2025-06-19',
      author: 'SIP Brewery Team',
      featured_image_url: '/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png'
    },
    {
      id: 'static-mutual-fund-benefits',
      title: 'Benefits of Mutual Funds for Individual Investors: Complete Guide',
      excerpt: 'Discover why mutual funds are the preferred investment choice for millions of Indian investors with detailed benefits analysis.',
      category: 'investment-tips',
      tags: ['benefits', 'advantages', 'individual investors'],
      route: '/blog/mutual-funds-benefits-individual-investors',
      published_at: '2025-06-19',
      author: 'SIP Brewery Team',
      featured_image_url: '/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png'
    }
  ];

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

  const handleBlogClick = (blogId: string) => {
    navigate(`/community/blog/${blogId}`);
  };

  const handleStaticBlogClick = (route: string) => {
    navigate(route);
  };

  // Filter static blogs based on category
  const filteredStaticBlogs = category === 'all' ? staticBlogs : staticBlogs.filter(blog => blog.category === category);

  // Combine and sort all blogs
  const allBlogs = [
    ...filteredStaticBlogs.map(blog => ({ ...blog, type: 'static' as const })),
    ...blogs.map(blog => ({ ...blog, type: 'dynamic' as const }))
  ].sort((a, b) => {
    const dateA = new Date(a.published_at || (a.type === 'dynamic' ? a.created_at : a.published_at));
    const dateB = new Date(b.published_at || (b.type === 'dynamic' ? b.created_at : b.published_at));
    return dateB.getTime() - dateA.getTime();
  });

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
        {allBlogs.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">No blog posts found for this category.</p>
          </div>
        ) : (
          allBlogs.map((blog) => (
            <Card 
              key={blog.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => blog.type === 'static' ? handleStaticBlogClick((blog as any).route) : handleBlogClick(blog.id)}
            >
              {(blog.featured_image_url || (blog as any).featured_image_url) && (
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img 
                    src={blog.featured_image_url || (blog as any).featured_image_url} 
                    alt={blog.type === 'static' ? blog.title : ((blog as any).admin_edited_title || blog.title)}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{blog.category}</Badge>
                    {blog.type === 'static' && (
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                        <BookOpen className="h-3 w-3 mr-1" />
                        Editorial
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {blog.type === 'static' ? '1.2k' : (blog as any).views_count}
                  </span>
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {blog.type === 'static' ? blog.title : ((blog as any).admin_edited_title || blog.title)}
                  {blog.type === 'dynamic' && (blog as any).edited_by_admin && (
                    <span className="ml-2 inline-flex items-center">
                      <Edit className="h-3 w-3 text-blue-500" />
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {blog.type === 'static' 
                    ? blog.excerpt 
                    : (blog.excerpt || ((blog as any).admin_edited_content || (blog as any).content).substring(0, 120) + '...')
                  }
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
                    <span>
                      {blog.type === 'static' 
                        ? (blog as any).author 
                        : ((blog as any).profiles?.full_name || 'Anonymous')
                      }
                    </span>
                    {blog.type === 'dynamic' && (blog as any).edited_by_admin && (
                      <Badge variant="outline" className="text-xs bg-blue-50">
                        Edited by SIPBrewery
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(blog.published_at || (blog.type === 'dynamic' ? (blog as any).created_at : blog.published_at)).toLocaleDateString()}
                    </span>
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

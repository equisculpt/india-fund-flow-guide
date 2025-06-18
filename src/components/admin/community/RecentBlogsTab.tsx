
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: string;
  category: string;
  views_count: number;
  created_at: string;
  published_at: string;
  author_id: string;
  profiles?: {
    full_name: string;
  } | null;
}

interface RecentBlogsTabProps {
  blogs: BlogPost[];
  onPublishBlog: (blogId: string) => void;
}

const RecentBlogsTab = ({ blogs, onPublishBlog }: RecentBlogsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Blog Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{blog.title}</h4>
                <div className="flex gap-2">
                  <Badge 
                    variant={blog.status === 'published' ? 'default' : 'secondary'}
                  >
                    {blog.status}
                  </Badge>
                  <Badge variant="outline">{blog.category}</Badge>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {blog.content.substring(0, 150)}...
              </p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>By {blog.profiles?.full_name || 'Anonymous'}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {blog.views_count} views
                  </span>
                  <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(`/community/blog/${blog.id}`, '_blank')}
                  >
                    View
                  </Button>
                  {blog.status === 'draft' && (
                    <Button 
                      size="sm" 
                      onClick={() => onPublishBlog(blog.id)}
                    >
                      Publish
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBlogsTab;

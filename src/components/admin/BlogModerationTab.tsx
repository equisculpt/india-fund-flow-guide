import React, { useState, useEffect } from 'react';
import { mockDb, mockBlogPosts, mockProfiles, BlogPost } from '@/services/mockDatabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Check, Edit, X, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';

interface BlogPostWithAuthor extends BlogPost {
  author_name?: string;
  views_count?: number;
}

const BlogModerationTab = () => {
  const [blogs, setBlogs] = useState<BlogPostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [moderationTab, setModerationTab] = useState<'pending' | 'approved' | 'rejected' | 'edited'>('pending');
  const [selectedBlog, setSelectedBlog] = useState<BlogPostWithAuthor | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  const fetchBlogs = async () => {
    try {
      let filteredBlogs = mockBlogPosts.filter(blog => {
        if (moderationTab === 'edited') {
          return false; // No edited blogs in mock data
        }
        return blog.moderation_status === moderationTab;
      });

      const blogsWithAuthor: BlogPostWithAuthor[] = filteredBlogs.map(blog => {
        const author = mockProfiles.find(p => p.id === blog.author_id);
        return {
          ...blog,
          author_name: author?.full_name || 'Anonymous',
          views_count: Math.floor(Math.random() * 1000)
        };
      });

      setBlogs(blogsWithAuthor);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [moderationTab]);

  const handleApprove = async (blogId: string) => {
    try {
      await mockDb.update('blog_posts', blogId, {
        moderation_status: 'approved',
        status: 'published',
        published_at: new Date().toISOString()
      });

      toast.success('Blog post approved and published!');
      fetchBlogs();
    } catch (error) {
      console.error('Error approving blog:', error);
      toast.error('Failed to approve blog post');
    }
  };

  const handleReject = async (blogId: string) => {
    try {
      await mockDb.update('blog_posts', blogId, {
        moderation_status: 'rejected',
        admin_notes: adminNotes
      });

      toast.success('Blog post rejected');
      setAdminNotes('');
      fetchBlogs();
    } catch (error) {
      console.error('Error rejecting blog:', error);
      toast.error('Failed to reject blog post');
    }
  };

  const openEditDialog = (blog: BlogPostWithAuthor) => {
    setSelectedBlog(blog);
    setEditedTitle(blog.title);
    setEditedContent(blog.content);
    setAdminNotes('');
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedBlog) return;

    try {
      await mockDb.update('blog_posts', selectedBlog.id, {
        title: editedTitle,
        content: editedContent,
        moderation_status: 'approved',
        published_at: new Date().toISOString()
      });

      toast.success('Blog post edited and published successfully');
      setIsEditDialogOpen(false);
      fetchBlogs();
    } catch (error) {
      console.error('Error editing blog:', error);
      toast.error('Failed to save edited blog post');
    }
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
      <Tabs value={moderationTab} onValueChange={(v) => setModerationTab(v as any)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            Pending Review
          </TabsTrigger>
          <TabsTrigger value="edited" className="flex items-center gap-2">
            Edited
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            Approved
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center gap-2">
            Rejected
          </TabsTrigger>
        </TabsList>

        {['pending', 'edited', 'approved', 'rejected'].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {tab === 'pending' && 'Blogs Pending Review'}
                  {tab === 'edited' && 'Edited Blogs'}
                  {tab === 'approved' && 'Approved Blogs'}
                  {tab === 'rejected' && 'Rejected Blogs'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No blog posts found in this category
                    </div>
                  ) : (
                    blogs.map((blog) => (
                      <div key={blog.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{blog.title}</h4>
                          <div className="flex gap-2">
                            <Badge 
                              variant={tab === 'approved' ? 'default' : tab === 'rejected' ? 'destructive' : 'secondary'}
                            >
                              {blog.moderation_status}
                            </Badge>
                            <Badge variant="outline">{blog.category}</Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {blog.content.substring(0, 150)}...
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>By {blog.author_name}</span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {blog.views_count} views
                            </span>
                            <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            {tab === 'pending' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => openEditDialog(blog)}
                                >
                                  <Edit className="h-4 w-4 mr-1" /> Edit
                                </Button>
                                <Button 
                                  size="sm" 
                                  onClick={() => handleApprove(blog.id)}
                                  className="bg-green-500 hover:bg-green-600"
                                >
                                  <Check className="h-4 w-4 mr-1" /> Approve
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => handleReject(blog.id)}
                                >
                                  <X className="h-4 w-4 mr-1" /> Reject
                                </Button>
                              </>
                            )}

                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.open(`/community/blog/${blog.id}`, '_blank')}
                            >
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={editedTitle} 
                onChange={(e) => setEditedTitle(e.target.value)} 
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                value={editedContent} 
                onChange={(e) => setEditedContent(e.target.value)} 
                className="w-full min-h-[300px]"
              />
            </div>
            <div>
              <Label htmlFor="notes">Admin Notes (visible to author)</Label>
              <Textarea 
                id="notes" 
                value={adminNotes} 
                onChange={(e) => setAdminNotes(e.target.value)} 
                className="w-full"
                placeholder="Explain why you edited this post (optional)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save & Publish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogModerationTab;

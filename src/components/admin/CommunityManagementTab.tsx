
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, BookOpen, AlertCircle, CheckCircle, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface Question {
  id: string;
  title: string;
  content: string;
  category: string;
  expert_only: boolean;
  is_answered: boolean;
  status: string;
  created_at: string;
  profiles: {
    full_name: string;
  };
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: string;
  category: string;
  views_count: number;
  created_at: string;
  published_at: string;
  profiles: {
    full_name: string;
  };
}

const CommunityManagementTab = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [newQuestionsCount, setNewQuestionsCount] = useState(0);
  const [draftBlogsCount, setDraftBlogsCount] = useState(0);

  const fetchCommunityData = async () => {
    try {
      // Fetch recent questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('community_questions')
        .select(`
          *,
          profiles!community_questions_user_id_fkey(full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (questionsError) throw questionsError;

      // Fetch recent blog posts
      const { data: blogsData, error: blogsError } = await supabase
        .from('blog_posts')
        .select(`
          *,
          profiles!blog_posts_author_id_fkey(full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (blogsError) throw blogsError;

      setQuestions(questionsData || []);
      setBlogs(blogsData || []);

      // Count new/unanswered questions
      const unansweredCount = (questionsData || []).filter(q => !q.is_answered).length;
      setNewQuestionsCount(unansweredCount);

      // Count draft blogs
      const draftCount = (blogsData || []).filter(b => b.status === 'draft').length;
      setDraftBlogsCount(draftCount);
    } catch (error) {
      console.error('Error fetching community data:', error);
      toast.error('Failed to load community data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunityData();
    
    // Set up real-time subscriptions for notifications
    const questionsSubscription = supabase
      .channel('questions')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'community_questions' }, () => {
        fetchCommunityData();
      })
      .subscribe();

    const blogsSubscription = supabase
      .channel('blogs')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'blog_posts' }, () => {
        fetchCommunityData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(questionsSubscription);
      supabase.removeChannel(blogsSubscription);
    };
  }, []);

  const handleAnswerQuestion = async (questionId: string) => {
    // This would open a modal or navigate to answer page
    window.open(`/community/question/${questionId}`, '_blank');
  };

  const handlePublishBlog = async (blogId: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          status: 'published', 
          published_at: new Date().toISOString() 
        })
        .eq('id', blogId);

      if (error) throw error;

      toast.success('Blog post published successfully!');
      fetchCommunityData();
    } catch (error) {
      console.error('Error publishing blog:', error);
      toast.error('Failed to publish blog post');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Loading community data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notifications */}
      {(newQuestionsCount > 0 || draftBlogsCount > 0) && (
        <div className="grid md:grid-cols-2 gap-4">
          {newQuestionsCount > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-orange-800">
                    {newQuestionsCount} unanswered question{newQuestionsCount > 1 ? 's' : ''}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
          
          {draftBlogsCount > 0 && (
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800">
                    {draftBlogsCount} draft blog{draftBlogsCount > 1 ? 's' : ''} pending
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="questions" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Questions Management
            {newQuestionsCount > 0 && (
              <Badge variant="destructive" className="ml-1">
                {newQuestionsCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="blogs" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Blog Management
            {draftBlogsCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {draftBlogsCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {questions.map((question) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{question.title}</h4>
                      <div className="flex gap-2">
                        {!question.is_answered && (
                          <Badge variant="destructive">Unanswered</Badge>
                        )}
                        {question.expert_only && (
                          <Badge variant="outline">Expert Only</Badge>
                        )}
                        <Badge variant="secondary">{question.category}</Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {question.content}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        By {question.profiles?.full_name || 'Anonymous'} • {new Date(question.created_at).toLocaleDateString()}
                      </span>
                      <Button 
                        size="sm" 
                        onClick={() => handleAnswerQuestion(question.id)}
                        variant={question.is_answered ? "outline" : "default"}
                      >
                        {question.is_answered ? 'View' : 'Answer'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blogs" className="space-y-4">
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
                            onClick={() => handlePublishBlog(blog.id)}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityManagementTab;

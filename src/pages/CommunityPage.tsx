
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, BookOpen, Plus, Users } from 'lucide-react';
import Layout from '@/components/Layout';
import CommunityQuestions from '@/components/community/CommunityQuestions';
import CommunityBlogs from '@/components/community/CommunityBlogs';
import AskQuestionModal from '@/components/community/AskQuestionModal';
import CreateBlogModal from '@/components/community/CreateBlogModal';
import EnhancedLoginModal from '@/components/EnhancedLoginModal';
import { useSupabaseAuthContext } from '@/contexts/SupabaseAuthContext';

const CommunityPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSupabaseAuthContext();
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [showCreateBlog, setShowCreateBlog] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check if we should default to blogs tab (when coming from blog pages)
  const defaultTab = location.state?.tab || 'questions';
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  const handleAskQuestion = () => {
    if (user) {
      setShowAskQuestion(true);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">SIP Brewery Community</h1>
              <p className="text-xl text-gray-600">
                Ask questions, get expert answers, and stay updated with daily investment insights
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Expert Community</h3>
                <p className="text-gray-600">Get answers from verified investment experts</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <MessageSquare className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ask Questions</h3>
                <p className="text-gray-600">Get personalized advice for your investment queries</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Daily Insights</h3>
                <p className="text-gray-600">Read fresh investment content and market updates</p>
              </div>
            </div>

            {/* Sub-headers */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-center mb-6">Community Sections</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                    Discussion
                  </h3>
                  <p className="text-gray-600">
                    Join the conversation, ask questions, and get expert answers from our community of investment professionals.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                    Blogs
                  </h3>
                  <p className="text-gray-600">
                    Read the latest investment insights, market analysis, and educational content from our research team.
                  </p>
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="questions" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Q&A Community
                </TabsTrigger>
                <TabsTrigger value="blogs" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Investment Blogs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="questions" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Community Questions</h2>
                  <Button 
                    onClick={handleAskQuestion}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Ask Question
                  </Button>
                </div>
                <CommunityQuestions />
              </TabsContent>

              <TabsContent value="blogs" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Investment Blogs</h2>
                  {user && (
                    <Button 
                      onClick={() => setShowCreateBlog(true)}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Write Blog
                    </Button>
                  )}
                </div>
                <CommunityBlogs />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <AskQuestionModal 
          isOpen={showAskQuestion} 
          onClose={() => setShowAskQuestion(false)} 
        />
        
        <CreateBlogModal 
          isOpen={showCreateBlog} 
          onClose={() => setShowCreateBlog(false)} 
        />

        <EnhancedLoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />
      </div>
    </Layout>
  );
};

export default CommunityPage;

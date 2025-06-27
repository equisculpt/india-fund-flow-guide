
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CommunityQuestions from '@/components/community/CommunityQuestions';
import CommunityBlogs from '@/components/community/CommunityBlogs';
import { useLocation } from 'react-router-dom';

const CommunityPage = () => {
  const location = useLocation();
  const initialTab = location.state?.tab || 'questions';
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <>
      <Helmet>
        <title>Investment Community | Blogs & Q&A | SIP Brewery</title>
        <meta name="description" content="Join SIP Brewery's investment community. Read expert blogs, ask questions, and learn from fellow investors about mutual funds and SIP strategies." />
        <meta name="keywords" content="investment community, mutual fund blogs, investment Q&A, SIP strategies, financial education" />
      </Helmet>
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Investment Community
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Connect with fellow investors, read expert insights, and expand your financial knowledge
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="blogs">Blogs</TabsTrigger>
              </TabsList>

              <TabsContent value="questions" className="mt-0">
                <CommunityQuestions />
              </TabsContent>

              <TabsContent value="blogs" className="mt-0">
                <CommunityBlogs />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CommunityPage;

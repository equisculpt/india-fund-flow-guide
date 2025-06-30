
import React, { useState } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import BlogModerationTab from './BlogModerationTab';
import CommunityNotifications from './community/CommunityNotifications';
import CommunityTabNavigation from './community/CommunityTabNavigation';
import QuestionsTab from './community/QuestionsTab';
import RecentBlogsTab from './community/RecentBlogsTab';
import CommunityLoadingState from './community/CommunityLoadingState';
import { useCommunityData } from './community/useCommunityData';
import { useCommunityActions } from './community/useCommunityActions';

const CommunityManagementTab = () => {
  const [activeTab, setActiveTab] = useState('questions');
  const {
    questions,
    blogs,
    loading,
    newQuestionsCount,
    pendingBlogsCount,
    fetchCommunityData
  } = useCommunityData();

  const { handleAnswerQuestion, handlePublishBlog } = useCommunityActions(fetchCommunityData);

  if (loading) {
    return <CommunityLoadingState />;
  }

  return (
    <div className="space-y-6">
      <CommunityNotifications 
        newQuestionsCount={newQuestionsCount}
        pendingBlogsCount={pendingBlogsCount}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <CommunityTabNavigation 
          newQuestionsCount={newQuestionsCount}
          pendingBlogsCount={pendingBlogsCount}
        />

        <TabsContent value="questions" className="space-y-4">
          <QuestionsTab 
            questions={questions}
            onAnswerQuestion={handleAnswerQuestion}
          />
        </TabsContent>

        <TabsContent value="blogs" className="space-y-4">
          <RecentBlogsTab 
            blogs={blogs}
            onPublishBlog={handlePublishBlog}
          />
        </TabsContent>

        <TabsContent value="moderation" className="space-y-4">
          <BlogModerationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityManagementTab;

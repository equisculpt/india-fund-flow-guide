
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import RealTimePortfolioTracker from '@/components/realtime/RealTimePortfolioTracker';
import GoalBasedPlanning from '@/components/goals/GoalBasedPlanning';
import SmartSIPManager from '@/components/sip/SmartSIPManager';
import PersonalizedRecommendations from '@/components/recommendations/PersonalizedRecommendations';

const AdvancedFeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Advanced Investment Features</h1>
          <p className="text-gray-600">AI-powered tools for smart investing</p>
        </div>

        <Tabs defaultValue="realtime" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="realtime">Real-Time Tracking</TabsTrigger>
            <TabsTrigger value="goals">Goal Planning</TabsTrigger>
            <TabsTrigger value="sip">Smart SIP</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="realtime">
            <RealTimePortfolioTracker />
          </TabsContent>

          <TabsContent value="goals">
            <GoalBasedPlanning />
          </TabsContent>

          <TabsContent value="sip">
            <SmartSIPManager />
          </TabsContent>

          <TabsContent value="recommendations">
            <PersonalizedRecommendations />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedFeaturesPage;

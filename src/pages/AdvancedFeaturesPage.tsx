
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import RealTimePortfolioTracker from '@/components/realtime/RealTimePortfolioTracker';
import GoalBasedPlanning from '@/components/goals/GoalBasedPlanning';
import SmartSIPManager from '@/components/sip/SmartSIPManager';
import PersonalizedRecommendations from '@/components/recommendations/PersonalizedRecommendations';
import TaxOptimizationEngine from '@/components/tax/TaxOptimizationEngine';
import AssetAllocationRebalancer from '@/components/rebalancing/AssetAllocationRebalancer';
import MarketTimingAlerts from '@/components/alerts/MarketTimingAlerts';
import PerformanceAttributionAnalysis from '@/components/analytics/PerformanceAttributionAnalysis';
import PushNotificationManager from '@/components/notifications/PushNotificationManager';
import VoiceAssistant from '@/components/voice/VoiceAssistant';
import AgentClientManager from '@/components/agent/AgentClientManager';

const AdvancedFeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Advanced Investment Features</h1>
          <p className="text-gray-600">AI-powered tools for smart investing and portfolio management</p>
        </div>

        <Tabs defaultValue="realtime" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-11">
            <TabsTrigger value="realtime">Real-Time</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="sip">Smart SIP</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
            <TabsTrigger value="tax">Tax Optimization</TabsTrigger>
            <TabsTrigger value="rebalancing">Rebalancing</TabsTrigger>
            <TabsTrigger value="alerts">Market Alerts</TabsTrigger>
            <TabsTrigger value="analytics">Performance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="voice">Voice Assistant</TabsTrigger>
            <TabsTrigger value="agent">Agent Portal</TabsTrigger>
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

          <TabsContent value="tax">
            <TaxOptimizationEngine />
          </TabsContent>

          <TabsContent value="rebalancing">
            <AssetAllocationRebalancer />
          </TabsContent>

          <TabsContent value="alerts">
            <MarketTimingAlerts />
          </TabsContent>

          <TabsContent value="analytics">
            <PerformanceAttributionAnalysis />
          </TabsContent>

          <TabsContent value="notifications">
            <PushNotificationManager />
          </TabsContent>

          <TabsContent value="voice">
            <VoiceAssistant />
          </TabsContent>

          <TabsContent value="agent">
            <AgentClientManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedFeaturesPage;

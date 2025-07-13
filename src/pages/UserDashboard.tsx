
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PortfolioAnalyticsDashboard from '@/components/dashboard/PortfolioAnalyticsDashboard';
import IRRCalculator from '@/components/dashboard/IRRCalculator';
import StatementGenerator from '@/components/dashboard/StatementGenerator';
import AIInsightsManager from '@/components/dashboard/AIInsightsManager';
import KYCGuard from '@/components/KYCGuard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingUp, TrendingDown, Calculator, FileText, Brain } from 'lucide-react';
import { analyticsService } from '@/services/api/analyticsService';
import { toast } from 'sonner';

const UserDashboard = () => {
  const handleGenerateStatement = async (type: string, params: any) => {
    toast.info(`Generating ${type} statement...`);
    
    // Here you would typically call an API to generate the PDF
    // For now, we'll simulate the process
    setTimeout(() => {
      toast.success(`${type} statement generated successfully!`);
    }, 2000);
  };

  return (
    <KYCGuard requireKYC={true}>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Investment Dashboard</h1>
            <p className="text-gray-600">Complete portfolio analytics and statement management</p>
          </div>

          <Tabs defaultValue="analytics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="analytics">Portfolio Analytics</TabsTrigger>
              <TabsTrigger value="calculations">IRR/XIRR Calculator</TabsTrigger>
              <TabsTrigger value="statements">Generate Statements</TabsTrigger>
              <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="analytics">
              <PortfolioAnalyticsDashboard />
            </TabsContent>

            <TabsContent value="calculations">
              <IRRCalculator />
            </TabsContent>

            <TabsContent value="statements">
              <StatementGenerator onGenerateStatement={handleGenerateStatement} />
            </TabsContent>

            <TabsContent value="ai-insights">
              <AIInsightsManager />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </KYCGuard>
  );
};

export default UserDashboard;

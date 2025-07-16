
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
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold bg-gradient-hero bg-clip-text text-transparent" style={{ 
              filter: 'drop-shadow(0 0 15px hsl(var(--secondary-glow) / 0.6))',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              Investment Dashboard
            </h1>
            <p className="text-foreground/80 leading-relaxed" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
              Complete portfolio analytics and statement management
            </p>
          </div>

          <Tabs defaultValue="analytics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gradient-glass backdrop-blur-xl border border-primary/20 shadow-glass">
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Portfolio Analytics</TabsTrigger>
              <TabsTrigger value="calculations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">IRR/XIRR Calculator</TabsTrigger>
              <TabsTrigger value="statements" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Generate Statements</TabsTrigger>
              <TabsTrigger value="ai-insights" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">AI Insights</TabsTrigger>
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

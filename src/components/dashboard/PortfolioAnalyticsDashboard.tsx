
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { ReportButtons } from '@/components/shared/ReportButtons';
import { usePortfolioAnalytics, useAIInsights, useCalculatePortfolioAnalytics } from '@/hooks/usePortfolioAnalytics';
import { format } from 'date-fns';

const PortfolioAnalyticsDashboard = () => {
  const { data: analytics, isLoading: analyticsLoading } = usePortfolioAnalytics();
  const { data: aiInsights, isLoading: insightsLoading } = useAIInsights();
  const { mutate: calculateAnalytics, isPending: isCalculating } = useCalculatePortfolioAnalytics();

  const latestAnalytics = analytics?.[0];

  const handleRefreshAnalytics = () => {
    calculateAnalytics();
  };

  if (analyticsLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Portfolio Analytics Dashboard</h2>
        <Button onClick={handleRefreshAnalytics} disabled={isCalculating}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isCalculating ? 'animate-spin' : ''}`} />
          Refresh Analytics
        </Button>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{latestAnalytics?.portfolio_value?.toLocaleString() || '0'}</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{latestAnalytics?.return_percentage?.toFixed(2) || '0'}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Returns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ₹{latestAnalytics?.total_returns?.toLocaleString() || '0'}
            </div>
            <div className="text-sm text-gray-500">Absolute Returns</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestAnalytics?.risk_score?.toFixed(1) || '0'}/10</div>
            <div className="text-sm text-gray-500">Portfolio Risk</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Peer Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestAnalytics?.peer_percentile || '0'}%</div>
            <div className="text-sm text-gray-500">Better than peers</div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🤖 AI Portfolio Analysis
            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
              Cached - Refreshes Quarterly
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {insightsLoading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ) : aiInsights && aiInsights.length > 0 ? (
            <div className="space-y-4">
              {aiInsights.slice(0, 3).map((insight) => (
                <div 
                  key={insight.id} 
                  className={`p-4 rounded-lg border-l-4 ${
                    insight.priority === 'high' ? 'border-red-500 bg-red-50' :
                    insight.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                    'border-blue-500 bg-blue-50'
                  }`}
                >
                  <h4 className="font-semibold">{insight.title}</h4>
                  <p className="text-sm text-gray-700 mt-1">{insight.message}</p>
                  <div className="text-xs text-gray-500 mt-2">
                    {format(new Date(insight.created_at), 'MMM dd, yyyy')}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">AI analysis will be generated automatically. Check back later.</p>
          )}
        </CardContent>
      </Card>

      {/* Advanced Analytics */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Sharpe Ratio</span>
              <span className="font-semibold">{latestAnalytics?.sharpe_ratio?.toFixed(2) || '0'}</span>
            </div>
            <div className="flex justify-between">
              <span>Volatility</span>
              <span className="font-semibold">{latestAnalytics?.volatility?.toFixed(2) || '0'}%</span>
            </div>
            <div className="flex justify-between">
              <span>Benchmark Comparison</span>
              <span className={`font-semibold ${
                (latestAnalytics?.benchmark_comparison || 0) > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {(latestAnalytics?.benchmark_comparison || 0) > 0 ? '+' : ''}
                {latestAnalytics?.benchmark_comparison?.toFixed(2) || '0'}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">📊 Tax Saving Statement</h4>
                <ReportButtons reportName="tax-comprehensive" category="tax" variant="compact" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">💰 SIP Statement</h4>
                <ReportButtons reportName="sip-comprehensive" category="sip" variant="compact" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">📈 Portfolio Report</h4>
                <ReportButtons reportName="portfolio-comprehensive" category="portfolio" variant="compact" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">📋 Transaction Statement</h4>
                <ReportButtons reportName="transaction-comprehensive" category="transaction" variant="compact" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioAnalyticsDashboard;

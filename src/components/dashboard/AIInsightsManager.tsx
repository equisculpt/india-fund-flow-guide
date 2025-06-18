
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Brain, TrendingUp, AlertTriangle, Info } from 'lucide-react';
import { useAIInsights, useGenerateAIInsights, useMarkInsightAsRead } from '@/hooks/usePortfolioAnalytics';
import { format } from 'date-fns';

const AIInsightsManager = () => {
  const { data: insights, isLoading } = useAIInsights();
  const { mutate: generateInsights, isPending: isGenerating } = useGenerateAIInsights();
  const { mutate: markAsRead } = useMarkInsightAsRead();

  const handleGenerateInsights = () => {
    generateInsights();
  };

  const handleMarkAsRead = (insightId: string) => {
    markAsRead(insightId);
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'high':
        return <TrendingUp className="h-4 w-4 text-orange-600" />;
      case 'medium':
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Portfolio Insights
              <Badge variant="secondary">Auto-refreshes Quarterly</Badge>
            </CardTitle>
            <Button 
              onClick={handleGenerateInsights} 
              disabled={isGenerating}
              variant="outline"
              size="sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
              Generate New Insights
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {insights && insights.length > 0 ? (
            <div className="space-y-4">
              {insights.map((insight) => (
                <Card 
                  key={insight.id} 
                  className={`${insight.is_read ? 'opacity-75' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getPriorityIcon(insight.priority)}
                          <h4 className="font-semibold">{insight.title}</h4>
                          <Badge 
                            variant="secondary" 
                            className={getPriorityColor(insight.priority)}
                          >
                            {insight.priority}
                          </Badge>
                          {insight.action_required && (
                            <Badge variant="destructive">Action Required</Badge>
                          )}
                        </div>
                        <p className="text-gray-700 mb-2">{insight.message}</p>
                        <div className="text-xs text-gray-500">
                          {format(new Date(insight.created_at), 'MMM dd, yyyy HH:mm')}
                        </div>
                      </div>
                      {!insight.is_read && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleMarkAsRead(insight.id)}
                        >
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No AI insights available yet.</p>
              <p className="text-sm text-gray-400 mb-4">
                AI insights are generated automatically every quarter based on your portfolio performance.
              </p>
              <Button onClick={handleGenerateInsights} disabled={isGenerating}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                Generate First Insights
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsightsManager;

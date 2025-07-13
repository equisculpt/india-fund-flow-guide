import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb, RefreshCw } from 'lucide-react';
import { aiService } from '@/services/api/aiService';
import { socialService } from '@/services/api/socialService';

const AIInsightsDashboard = () => {
  const { data: portfolioInsights, isLoading: insightsLoading, refetch: refetchInsights } = useQuery({
    queryKey: ['portfolioInsights'],
    queryFn: () => aiService.getPortfolioInsights()
  });

  const { data: marketTrends, isLoading: trendsLoading } = useQuery({
    queryKey: ['marketTrends'],
    queryFn: () => aiService.getMarketTrends()
  });

  const { data: recommendations, isLoading: recsLoading } = useQuery({
    queryKey: ['recommendations'],
    queryFn: () => aiService.getPersonalizedRecommendations()
  });

  const { data: socialSentiment } = useQuery({
    queryKey: ['socialSentiment'],
    queryFn: () => socialService.getMarketSentiment()
  });

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <TrendingUp className="h-4 w-4 text-yellow-500" />;
      default: return <Lightbulb className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">🤖 AI Investment Insights</h2>
        <Button onClick={() => refetchInsights()} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Insights
        </Button>
      </div>

      {/* Portfolio AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Analysis & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          {insightsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {Array.isArray(portfolioInsights) ? portfolioInsights.map((insight: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    {getPriorityIcon(insight.priority)}
                    <div className="flex-1">
                      <h4 className="font-semibold">{insight.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{insight.message}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant={insight.priority === 'high' ? 'destructive' : 'secondary'}>
                          {insight.priority} priority
                        </Badge>
                        <Badge variant="outline">{insight.category}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )) : null}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Market Trends & Sentiment */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>📈 Market Trends</CardTitle>
          </CardHeader>
          <CardContent>
            {trendsLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {marketTrends?.slice(0, 5).map((trend: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="font-medium">{trend.sector}</span>
                    <div className="flex items-center gap-2">
                      {trend.sentiment === 'positive' ? 
                        <TrendingUp className="h-4 w-4 text-green-500" /> : 
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      }
                      <span className={trend.sentiment === 'positive' ? 'text-green-600' : 'text-red-600'}>
                        {trend.change}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>💬 Social Sentiment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {socialSentiment?.overallScore || 75}%
                </div>
                <p className="text-sm text-gray-600">Overall Market Sentiment</p>
              </div>
              <div className="space-y-2">
                {socialSentiment?.topTopics?.map((topic: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{topic.name}</span>
                    <span className="font-medium">{topic.sentiment}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personalized Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 Personalized Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          {recsLoading ? (
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2].map(i => (
                <div key={i} className="animate-pulse p-4 border rounded">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {recommendations?.map((rec: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-semibold">{rec.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <Badge variant="outline">{rec.type}</Badge>
                    <span className="text-sm text-blue-600 font-medium">
                      {rec.expectedReturn}% expected return
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsightsDashboard;
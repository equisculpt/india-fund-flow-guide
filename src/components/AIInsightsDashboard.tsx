
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  AlertTriangle, 
  CheckCircle,
  Brain,
  BarChart3
} from 'lucide-react';
import { 
  usePortfolioAnalytics, 
  useAIInsights, 
  usePeerComparisons,
  useMarkInsightAsRead,
  useCalculatePortfolioAnalytics,
  useGenerateAIInsights
} from '@/hooks/usePortfolioAnalytics';
import { useToast } from '@/hooks/use-toast';

const AIInsightsDashboard = () => {
  const { data: analytics, isLoading: analyticsLoading } = usePortfolioAnalytics();
  const { data: insights, isLoading: insightsLoading } = useAIInsights();
  const { data: peerComparisons } = usePeerComparisons();
  const markAsRead = useMarkInsightAsRead();
  const calculateAnalytics = useCalculatePortfolioAnalytics();
  const generateInsights = useGenerateAIInsights();
  const { toast } = useToast();

  const latestAnalytics = analytics?.[0];
  const unreadInsights = insights?.filter(insight => !insight.is_read) || [];
  const latestPeerComparison = peerComparisons?.[0];

  const handleMarkAsRead = (insightId: string) => {
    markAsRead.mutate(insightId, {
      onSuccess: () => {
        toast({
          title: "Insight marked as read",
          description: "This insight has been marked as read.",
        });
      },
    });
  };

  const handleRefreshAnalytics = () => {
    calculateAnalytics.mutate(undefined, {
      onSuccess: () => {
        generateInsights.mutate(undefined, {
          onSuccess: () => {
            toast({
              title: "Analytics Updated",
              description: "Your portfolio analytics and insights have been refreshed.",
            });
          },
        });
      },
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getPerformanceIcon = (percentile: number) => {
    return percentile > 50 ? 
      <TrendingUp className="h-4 w-4 text-green-500" /> : 
      <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  if (analyticsLoading || insightsLoading) {
    return (
      <div className="space-y-4">
        <div className="h-48 bg-gray-100 rounded-lg animate-pulse" />
        <div className="h-32 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">AI Portfolio Insights</h2>
        </div>
        <Button 
          onClick={handleRefreshAnalytics}
          disabled={calculateAnalytics.isPending}
          variant="outline"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          {calculateAnalytics.isPending ? 'Updating...' : 'Refresh Analytics'}
        </Button>
      </div>

      {/* Performance Overview */}
      {latestAnalytics && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getPerformanceIcon(latestAnalytics.peer_percentile)}
              <span>Portfolio Performance Overview</span>
            </CardTitle>
            <CardDescription>
              Real-time analysis of your investment performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Portfolio Value</p>
                <p className="text-2xl font-bold">₹{latestAnalytics.portfolio_value.toLocaleString()}</p>
                <p className={`text-sm ${latestAnalytics.total_returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {latestAnalytics.total_returns >= 0 ? '+' : ''}₹{latestAnalytics.total_returns.toLocaleString()} 
                  ({latestAnalytics.return_percentage.toFixed(2)}%)
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Peer Ranking</p>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold">{latestAnalytics.peer_percentile}th</span>
                  <span className="text-sm text-gray-600">percentile</span>
                </div>
                <Progress value={latestAnalytics.peer_percentile} className="w-full" />
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">Risk Score</p>
                <p className="text-2xl font-bold">{latestAnalytics.risk_score}/10</p>
                <p className="text-sm text-gray-600">
                  Volatility: {latestAnalytics.volatility.toFixed(2)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Peer Comparison */}
      {latestPeerComparison && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Peer Comparison</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Your Rank</p>
                <p className="text-xl font-bold">#{latestPeerComparison.user_rank}</p>
                <p className="text-xs text-gray-500">out of {latestPeerComparison.total_peers}</p>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Your Returns</p>
                <p className="text-xl font-bold">{latestPeerComparison.user_returns.toFixed(2)}%</p>
              </div>
              
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">Peer Average</p>
                <p className="text-xl font-bold">{latestPeerComparison.peer_average_returns.toFixed(2)}%</p>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Top 10%</p>
                <p className="text-xl font-bold">{latestPeerComparison.top_10_percent_returns.toFixed(2)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Insights */}
      <Tabs defaultValue="unread" className="w-full">
        <TabsList>
          <TabsTrigger value="unread">
            Unread Insights ({unreadInsights.length})
          </TabsTrigger>
          <TabsTrigger value="all">All Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="unread" className="space-y-4">
          {unreadInsights.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600">You're all caught up! No new insights.</p>
              </CardContent>
            </Card>
          ) : (
            unreadInsights.map((insight) => (
              <Alert key={insight.id} className="relative">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="flex items-center justify-between">
                  <span>{insight.title}</span>
                  <Badge variant={getPriorityColor(insight.priority)}>
                    {insight.priority}
                  </Badge>
                </AlertTitle>
                <AlertDescription className="mt-2">
                  {insight.message}
                </AlertDescription>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {new Date(insight.created_at).toLocaleDateString()}
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleMarkAsRead(insight.id)}
                  >
                    Mark as Read
                  </Button>
                </div>
              </Alert>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="all" className="space-y-4">
          {insights?.map((insight) => (
            <Card key={insight.id} className={insight.is_read ? 'opacity-60' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                  <span>{insight.title}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getPriorityColor(insight.priority)}>
                      {insight.priority}
                    </Badge>
                    {insight.action_required && (
                      <Badge variant="outline">Action Required</Badge>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{insight.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(insight.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIInsightsDashboard;


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Target, 
  Zap, 
  BarChart3, 
  PieChart, 
  Activity, 
  Shield, 
  DollarSign, 
  Calendar, 
  Settings,
  RefreshCw,
  Eye,
  Download,
  Star,
  Lightbulb,
  ArrowRight,
  Info,
  Clock,
  Users
} from 'lucide-react';
import { TEST_USER_DATA } from '@/services/testData';

const AIPortfolioInsights = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedInsight, setSelectedInsight] = useState(null);

  // Mock AI insights data
  const aiInsights = {
    overallScore: 8.2,
    riskScore: 6.5,
    diversificationScore: 7.8,
    performanceScore: 8.7,
    
    keyInsights: [
      {
        id: 1,
        type: 'opportunity',
        priority: 'high',
        title: 'Portfolio Rebalancing Opportunity',
        description: 'Your large-cap exposure is 15% higher than optimal. Consider reducing allocation to maintain balanced risk.',
        impact: 'Could improve portfolio stability and reduce volatility by 12%',
        action: 'Rebalance portfolio allocation',
        confidence: 85,
        category: 'allocation'
      },
      {
        id: 2,
        type: 'risk',
        priority: 'medium',
        title: 'Sector Concentration Risk',
        description: 'High concentration in technology sector (28% of portfolio). Market downturn could impact returns.',
        impact: 'Potential 8-12% impact during sector correction',
        action: 'Diversify across sectors',
        confidence: 78,
        category: 'risk'
      },
      {
        id: 3,
        type: 'performance',
        priority: 'high',
        title: 'Outperforming Benchmark',
        description: 'Your portfolio has outperformed Nifty 50 by 3.2% over the last 12 months.',
        impact: 'Generating alpha of ₹15,600 on current investment',
        action: 'Continue current strategy',
        confidence: 92,
        category: 'performance'
      },
      {
        id: 4,
        type: 'opportunity',
        priority: 'low',
        title: 'Tax Saving Opportunity',
        description: 'You can save additional ₹15,000 in taxes by investing in ELSS funds.',
        impact: 'Potential tax savings of ₹4,500 (30% bracket)',
        action: 'Invest in ELSS funds',
        confidence: 95,
        category: 'tax'
      }
    ],

    recommendations: [
      {
        id: 1,
        type: 'fund_suggestion',
        title: 'Add Small Cap Exposure',
        description: 'Consider adding Axis Small Cap Fund for better diversification',
        expectedReturn: 14.5,
        riskLevel: 'High',
        investmentAmount: 25000,
        rationale: 'Small cap funds can provide higher growth potential and complete your portfolio diversification',
        priority: 'medium'
      },
      {
        id: 2,
        type: 'rebalancing',
        title: 'Reduce Large Cap Allocation',
        description: 'Consider reducing HDFC Top 100 Fund allocation by 20%',
        currentAllocation: 60,
        suggestedAllocation: 48,
        rationale: 'Current large cap allocation is above optimal range for your risk profile',
        priority: 'high'
      },
      {
        id: 3,
        type: 'sip_optimization',
        title: 'Increase SIP Amount',
        description: 'Consider increasing monthly SIP by ₹2,000 to reach your goals faster',
        currentSIP: 5000,
        suggestedSIP: 7000,
        goalAcceleration: '8 months faster',
        rationale: 'Based on your income growth and expense patterns',
        priority: 'medium'
      }
    ],

    marketInsights: [
      {
        id: 1,
        title: 'Market Timing Analysis',
        description: 'Current market conditions favor large-cap investing',
        sentiment: 'bullish',
        confidence: 72,
        timeframe: 'Next 6 months',
        impact: 'positive'
      },
      {
        id: 2,
        title: 'Sector Rotation Alert',
        description: 'Financial sector showing strong momentum',
        sentiment: 'neutral',
        confidence: 68,
        timeframe: 'Next 3 months',
        impact: 'neutral'
      },
      {
        id: 3,
        title: 'Volatility Forecast',
        description: 'Expected market volatility: 18-22% over next quarter',
        sentiment: 'bearish',
        confidence: 81,
        timeframe: 'Next 3 months',
        impact: 'negative'
      }
    ],

    portfolioHealth: {
      diversification: 78,
      costEfficiency: 85,
      taxEfficiency: 72,
      riskAlignment: 82,
      goalAlignment: 88
    }
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'risk': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'performance': return <BarChart3 className="h-5 w-5 text-blue-600" />;
      default: return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'bullish': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'bearish': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleRefreshInsights = async () => {
    setIsAnalyzing(true);
    console.log('AI Portfolio Analysis: Refreshing insights');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    setLastUpdated(new Date());
    setIsAnalyzing(false);
  };

  const handleImplementRecommendation = (recommendation) => {
    console.log('AI Portfolio Analysis: Implementing recommendation', recommendation.id);
    // Placeholder for implementation logic
  };

  const handleViewDetailedAnalysis = (insight) => {
    console.log('AI Portfolio Analysis: View detailed analysis', insight.id);
    setSelectedInsight(insight);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Brain className="h-8 w-8 text-purple-600" />
            AI Portfolio Insights
          </h2>
          <p className="text-gray-600 mt-1">Powered by advanced AI analysis of your portfolio</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefreshInsights}
            disabled={isAnalyzing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
            {isAnalyzing ? 'Analyzing...' : 'Refresh Analysis'}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* AI Score Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">AI Portfolio Score</p>
                <p className="text-3xl font-bold text-purple-900">{aiInsights.overallScore}/10</p>
              </div>
              <Brain className="h-10 w-10 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Risk Score</p>
                <p className="text-3xl font-bold text-blue-900">{aiInsights.riskScore}/10</p>
              </div>
              <Shield className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Performance Score</p>
                <p className="text-3xl font-bold text-green-900">{aiInsights.performanceScore}/10</p>
              </div>
              <TrendingUp className="h-10 w-10 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 font-medium">Diversification</p>
                <p className="text-3xl font-bold text-orange-900">{aiInsights.diversificationScore}/10</p>
              </div>
              <PieChart className="h-10 w-10 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="insights">Key Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="market">Market Analysis</TabsTrigger>
          <TabsTrigger value="health">Portfolio Health</TabsTrigger>
          <TabsTrigger value="settings">AI Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="insights">
          <div className="space-y-4">
            {aiInsights.keyInsights.map((insight) => (
              <Card key={insight.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {getInsightIcon(insight.type)}
                        <h3 className="font-semibold text-lg">{insight.title}</h3>
                        <Badge className={getPriorityColor(insight.priority)}>
                          {insight.priority} priority
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-2">{insight.description}</p>
                      <p className="text-sm text-green-700 bg-green-50 p-2 rounded-lg mb-3">
                        <strong>Impact:</strong> {insight.impact}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">AI Confidence:</span>
                          <Progress value={insight.confidence} className="w-20" />
                          <span className="text-sm font-medium">{insight.confidence}%</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {insight.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetailedAnalysis(insight)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm">
                        {insight.action}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="space-y-4">
            {aiInsights.recommendations.map((rec) => (
              <Card key={rec.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Lightbulb className="h-5 w-5 text-yellow-600" />
                        <h3 className="font-semibold text-lg">{rec.title}</h3>
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority} priority
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-3">{rec.description}</p>
                      <p className="text-sm text-blue-700 bg-blue-50 p-2 rounded-lg mb-3">
                        <strong>Rationale:</strong> {rec.rationale}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        {rec.expectedReturn && (
                          <div>
                            <span className="text-gray-600">Expected Return:</span>
                            <div className="font-medium text-green-600">{rec.expectedReturn}%</div>
                          </div>
                        )}
                        {rec.investmentAmount && (
                          <div>
                            <span className="text-gray-600">Investment:</span>
                            <div className="font-medium">₹{rec.investmentAmount.toLocaleString()}</div>
                          </div>
                        )}
                        {rec.goalAcceleration && (
                          <div>
                            <span className="text-gray-600">Goal Impact:</span>
                            <div className="font-medium text-green-600">{rec.goalAcceleration}</div>
                          </div>
                        )}
                        {rec.riskLevel && (
                          <div>
                            <span className="text-gray-600">Risk Level:</span>
                            <div className="font-medium">{rec.riskLevel}</div>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button onClick={() => handleImplementRecommendation(rec)}>
                      Implement
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="market">
          <div className="space-y-4">
            {aiInsights.marketInsights.map((insight) => (
              <Card key={insight.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {getSentimentIcon(insight.sentiment)}
                        <h3 className="font-semibold text-lg">{insight.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {insight.timeframe}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-3">{insight.description}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Confidence:</span>
                          <Progress value={insight.confidence} className="w-20" />
                          <span className="text-sm font-medium">{insight.confidence}%</span>
                        </div>
                        <Badge 
                          className={
                            insight.impact === 'positive' ? 'bg-green-100 text-green-800' :
                            insight.impact === 'negative' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }
                        >
                          {insight.impact} impact
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="health">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Portfolio Health Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(aiInsights.portfolioHealth).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-sm font-bold">{value}%</span>
                      </div>
                      <Progress value={value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Peer Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">Top 15%</div>
                    <div className="text-sm text-green-700">Better than 85% of peers</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Your Returns</span>
                      <span className="font-bold text-green-600">+18.7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Peer Average</span>
                      <span className="font-medium">+12.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Top 10% Average</span>
                      <span className="font-medium text-blue-600">+21.2%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                AI Analysis Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Analysis Frequency</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="frequency" value="daily" />
                      <span>Daily Analysis</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="frequency" value="weekly" defaultChecked />
                      <span>Weekly Analysis (Recommended)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="frequency" value="monthly" />
                      <span>Monthly Analysis</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Alert Preferences</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span>High Priority Insights</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span>Rebalancing Opportunities</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>Market Timing Alerts</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span>Performance Benchmarking</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Risk Tolerance</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="risk" value="conservative" />
                      <span>Conservative</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="risk" value="moderate" defaultChecked />
                      <span>Moderate</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="risk" value="aggressive" />
                      <span>Aggressive</span>
                    </label>
                  </div>
                </div>

                <Button className="w-full">
                  Save AI Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Last Updated Info */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Last updated: {lastUpdated.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>Powered by SIP Brewery AI Engine v2.0</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPortfolioInsights;

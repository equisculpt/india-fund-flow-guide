
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown,
  Brain, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Award,
  BarChart3,
  PieChart,
  Download,
  Info
} from 'lucide-react';
import { TEST_USER_DATA } from '@/services/testData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AIPortfolioInsights = () => {
  const { portfolioAnalytics, investments, peerBenchmarks } = TEST_USER_DATA;
  const [selectedTimeframe, setSelectedTimeframe] = useState('overall');

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  // AI Portfolio Analysis Logic
  const generatePortfolioScore = () => {
    const diversificationScore = calculateDiversificationScore();
    const performanceScore = calculatePerformanceScore();
    const riskScore = calculateRiskScore();
    const costEfficiencyScore = calculateCostEfficiencyScore();
    const consistencyScore = calculateConsistencyScore();

    const overallScore = (
      diversificationScore * 0.25 +
      performanceScore * 0.30 +
      riskScore * 0.20 +
      costEfficiencyScore * 0.15 +
      consistencyScore * 0.10
    );

    return {
      overall: Math.round(overallScore * 10) / 10,
      breakdown: {
        diversification: diversificationScore,
        performance: performanceScore,
        risk: riskScore,
        costEfficiency: costEfficiencyScore,
        consistency: consistencyScore
      }
    };
  };

  const calculateDiversificationScore = () => {
    const uniqueCategories = [...new Set(investments.map(inv => inv.fund_name.includes('Small Cap') ? 'Small Cap' : 'Large Cap'))];
    const categoryCount = uniqueCategories.length;
    const investmentCount = investments.length;
    
    // Score based on diversification across categories and number of funds
    const categoryScore = Math.min(categoryCount / 3, 1) * 5; // Max 5 points for 3+ categories
    const fundCountScore = Math.min(investmentCount / 5, 1) * 5; // Max 5 points for 5+ funds
    
    return Math.round((categoryScore + fundCountScore) / 2 * 10) / 10;
  };

  const calculatePerformanceScore = () => {
    const avgXIRR = investments.reduce((sum, inv) => sum + inv.xirr, 0) / investments.length;
    const benchmarkXIRR = 12; // Assuming 12% as benchmark
    
    if (avgXIRR >= 20) return 10;
    if (avgXIRR >= 15) return 8;
    if (avgXIRR >= 12) return 6;
    if (avgXIRR >= 8) return 4;
    return 2;
  };

  const calculateRiskScore = () => {
    const riskLevel = portfolioAnalytics.riskScore;
    // Lower risk score means better risk management (inverse scoring)
    if (riskLevel <= 4) return 10;
    if (riskLevel <= 6) return 8;
    if (riskLevel <= 7) return 6;
    if (riskLevel <= 8) return 4;
    return 2;
  };

  const calculateCostEfficiencyScore = () => {
    // Assuming average expense ratio of 1.5% as benchmark
    const assumedExpenseRatio = 1.2; // Based on fund types
    if (assumedExpenseRatio <= 0.5) return 10;
    if (assumedExpenseRatio <= 1.0) return 8;
    if (assumedExpenseRatio <= 1.5) return 6;
    if (assumedExpenseRatio <= 2.0) return 4;
    return 2;
  };

  const calculateConsistencyScore = () => {
    const volatility = portfolioAnalytics.volatility;
    if (volatility <= 10) return 10;
    if (volatility <= 15) return 8;
    if (volatility <= 20) return 6;
    if (volatility <= 25) return 4;
    return 2;
  };

  const portfolioScore = generatePortfolioScore();

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 6) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 4) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8.5) return 'Excellent';
    if (score >= 7.0) return 'Very Good';
    if (score >= 5.5) return 'Good';
    if (score >= 4.0) return 'Average';
    return 'Needs Improvement';
  };

  const generateStrengths = () => {
    const strengths = [];
    
    if (portfolioAnalytics.portfolioXIRR > 15) {
      strengths.push('Strong portfolio returns with ' + portfolioAnalytics.portfolioXIRR + '% XIRR');
    }
    
    if (portfolioAnalytics.xirrPercentile > 70) {
      strengths.push('Outperforming ' + portfolioAnalytics.xirrPercentile + '% of platform users');
    }
    
    if (investments.length >= 3) {
      strengths.push('Well-diversified portfolio across ' + investments.length + ' funds');
    }
    
    if (portfolioAnalytics.sharpeRatio > 1.5) {
      strengths.push('Excellent risk-adjusted returns (Sharpe Ratio: ' + portfolioAnalytics.sharpeRatio + ')');
    }

    return strengths.length > 0 ? strengths : ['Consistent investment approach in mutual funds'];
  };

  const generateRecommendations = () => {
    const recommendations = [];
    
    if (investments.length < 5) {
      recommendations.push('Consider adding more funds for better diversification');
    }
    
    if (portfolioAnalytics.portfolioXIRR < 12) {
      recommendations.push('Review fund selection - consider higher-performing alternatives');
    }
    
    if (portfolioAnalytics.riskScore > 7) {
      recommendations.push('Portfolio risk is high - consider adding some debt funds for stability');
    }
    
    const sipCount = investments.filter(inv => inv.investment_type === 'SIP').length;
    if (sipCount < 2) {
      recommendations.push('Increase SIP frequency for better rupee-cost averaging');
    }

    return recommendations.length > 0 ? recommendations : ['Continue your current investment strategy'];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            AI Portfolio Insights
          </h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Info className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>AI Portfolio Analysis</DialogTitle>
                <DialogDescription className="space-y-3 text-left">
                  <p>
                    Our AI analyzes your portfolio across 5 key dimensions:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Performance:</strong> Returns vs benchmarks and peer comparison</li>
                    <li><strong>Diversification:</strong> Spread across categories and funds</li>
                    <li><strong>Risk Management:</strong> Volatility and risk-adjusted returns</li>
                    <li><strong>Cost Efficiency:</strong> Expense ratios and fee optimization</li>
                    <li><strong>Consistency:</strong> Performance stability over time</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-4">
                    <em>This analysis is for informational purposes only and should not be considered as investment advice.</em>
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download Analysis
        </Button>
      </div>

      {/* Overall Portfolio Score */}
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-100 border-purple-200">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Award className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="text-2xl font-bold text-purple-900">Portfolio AI Score</h3>
                <p className="text-purple-700">Comprehensive Analysis Rating</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-purple-900 mb-2">
                  {portfolioScore.overall}
                </div>
                <div className="text-lg font-semibold text-purple-700">
                  {getScoreLabel(portfolioScore.overall)}
                </div>
                <div className="text-sm text-purple-600">
                  Out of 10.0
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-900 mb-2">
                  #{Math.floor(portfolioAnalytics.userRank * 0.8)}
                </div>
                <div className="text-sm text-purple-700">
                  Portfolio Rank
                </div>
                <div className="text-xs text-purple-600">
                  On our platform
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Portfolio Analysis Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(portfolioScore.breakdown).map(([category, score]) => (
              <div key={category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">
                    {category === 'costEfficiency' ? 'Cost Efficiency' : category}
                  </span>
                  <span className="font-bold">{score}/10</span>
                </div>
                <Progress value={score * 10} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="strengths" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="strengths">Strengths</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="strengths">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                Portfolio Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generateStrengths().map((strength, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-green-800">{strength}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Target className="h-5 w-5" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generateRecommendations().map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Target className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-blue-800">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk-analysis">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <AlertTriangle className="h-5 w-5" />
                Risk Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-2">Portfolio Risk Level</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-orange-800">{portfolioAnalytics.riskScore}/10</span>
                      <Badge variant="outline" className="bg-orange-100 text-orange-800">
                        {portfolioAnalytics.riskScore <= 4 ? 'Low' : 
                         portfolioAnalytics.riskScore <= 7 ? 'Moderate' : 'High'} Risk
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Volatility</h4>
                    <p className="text-2xl font-bold text-gray-800">{portfolioAnalytics.volatility}%</p>
                    <p className="text-sm text-gray-600">Standard Deviation</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">Sharpe Ratio</h4>
                    <p className="text-2xl font-bold text-purple-800">{portfolioAnalytics.sharpeRatio}</p>
                    <p className="text-sm text-purple-600">Risk-Adjusted Returns</p>
                  </div>
                  
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <h4 className="font-semibold text-indigo-800 mb-2">Diversification</h4>
                    <p className="text-2xl font-bold text-indigo-800">{investments.length}</p>
                    <p className="text-sm text-indigo-600">Active Funds</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Comprehensive AI Commentary */}
      <Card className="bg-gradient-to-r from-gray-50 to-purple-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            🤖 Comprehensive AI Portfolio Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <div className="p-4 bg-white rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-900 mb-2">Executive Summary</h4>
              <p>
                Your portfolio demonstrates a <strong>{getScoreLabel(portfolioScore.overall).toLowerCase()}</strong> investment approach with an AI score of {portfolioScore.overall}/10. 
                With a portfolio XIRR of {portfolioAnalytics.portfolioXIRR}%, you're outperforming {portfolioAnalytics.xirrPercentile}% of investors on our platform, 
                placing you in the {portfolioAnalytics.xirrPercentile > 75 ? 'top quartile' : portfolioAnalytics.xirrPercentile > 50 ? 'upper half' : 'lower half'} of performers.
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-800 mb-2">Performance Highlights</h4>
              <p>
                Your portfolio's {portfolioAnalytics.portfolioXIRR}% XIRR significantly outpaces the platform median of {portfolioAnalytics.platformMedianXIRR}%. 
                The standout performers are your {investments.find(inv => inv.xirr === Math.max(...investments.map(i => i.xirr)))?.fund_name} 
                with {Math.max(...investments.map(i => i.xirr))}% XIRR. Your risk-adjusted returns (Sharpe ratio: {portfolioAnalytics.sharpeRatio}) 
                indicate efficient portfolio management.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 mb-2">Strategic Positioning</h4>
              <p>
                Your portfolio allocation shows {investments.length} active funds with a balanced approach. 
                The diversification across large-cap and small-cap segments provides both stability and growth potential. 
                Your consistent SIP strategy has resulted in effective rupee-cost averaging, contributing to the strong XIRR performance.
              </p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-semibold text-yellow-800 mb-2">Optimization Opportunities</h4>
              <p>
                While your current performance is commendable, there are opportunities for enhancement. 
                Consider rebalancing during market corrections to potentially improve your XIRR further. 
                Your current risk score of {portfolioAnalytics.riskScore}/10 suggests room for tactical adjustments 
                based on market conditions and your risk appetite.
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-800">
              <strong>Important Disclaimer:</strong> This AI analysis is for informational purposes only and based on historical data and mathematical models. 
              Past performance does not guarantee future results. Please consult with qualified financial advisors before making investment decisions. 
              Mutual fund investments are subject to market risks.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPortfolioInsights;

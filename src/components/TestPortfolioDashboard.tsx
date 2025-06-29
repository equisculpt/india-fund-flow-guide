import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Eye, EyeOff, Download, Plus, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TEST_USER_DATA } from '@/services/testData';
import { useNavigate } from 'react-router-dom';
import XIRRAnalytics from './XIRRAnalytics';
import AIPortfolioInsights from './AIPortfolioInsights';

const TestPortfolioDashboard = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const navigate = useNavigate();
  
  const { portfolioAnalytics, investments } = TEST_USER_DATA;

  const performanceData = [
    { month: 'Jan', value: 25000 },
    { month: 'Feb', value: 32000 },
    { month: 'Mar', value: 45000 },
    { month: 'Apr', value: 52000 },
    { month: 'May', value: 68000 },
    { month: 'Jun', value: 75000 },
    { month: 'Jul', value: 85000 },
    { month: 'Aug', value: 92000 },
    { month: 'Sep', value: 98000 },
    { month: 'Oct', value: 102450 }
  ];

  const allocationData = [
    { name: 'Large Cap', value: 60100, color: '#3B82F6' },
    { name: 'Small Cap', value: 42350, color: '#10B981' }
  ];

  const formatCurrency = (amount: number) => {
    if (hideBalance) return "₹****";
    return `₹${amount.toLocaleString()}`;
  };

  const handleInvestMore = () => {
    navigate('/explore');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Portfolio Overview</h2>
          <p className="text-gray-600 mt-1">Welcome back, {TEST_USER_DATA.profile.full_name}!</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setHideBalance(!hideBalance)}>
            {hideBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Portfolio Summary - Enhanced with XIRR */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Current Value</p>
                <p className="text-3xl font-bold text-blue-900">{formatCurrency(portfolioAnalytics.totalValue)}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div>
              <p className="text-sm text-green-700 font-medium">Total Invested</p>
              <p className="text-2xl font-bold text-green-900">{formatCurrency(portfolioAnalytics.totalInvested)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-6">
            <div>
              <p className="text-sm text-emerald-700 font-medium">Total Gains</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-emerald-900">
                  {formatCurrency(portfolioAnalytics.totalGains)}
                </p>
                <span className="text-sm text-emerald-700 bg-emerald-200 px-2 py-1 rounded-full">
                  +{portfolioAnalytics.gainPercentage}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div>
              <p className="text-sm text-purple-700 font-medium">Portfolio XIRR</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-purple-900">
                  {portfolioAnalytics.portfolioXIRR}%
                </p>
                <span className="text-sm text-purple-700 flex items-center bg-purple-200 px-2 py-1 rounded-full">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  p.a.
                </span>
              </div>
              <div className="text-xs text-purple-600 mt-1">Annualized Return</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div>
              <p className="text-sm text-yellow-700 font-medium">XIRR Percentile</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-yellow-900">
                  {portfolioAnalytics.xirrPercentile}th
                </p>
                <span className="text-sm text-yellow-700 bg-yellow-200 px-2 py-1 rounded-full">
                  Top {100 - portfolioAnalytics.xirrPercentile}%
                </span>
              </div>
              <div className="text-xs text-yellow-600 mt-1">Better than peers</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white cursor-pointer hover:from-blue-700 hover:to-indigo-700 transition-all duration-300" onClick={handleInvestMore}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Start New SIP</h3>
                <p className="text-blue-100">Explore 3000+ mutual funds</p>
              </div>
              <ArrowRight className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Goal-based Investing</h3>
                <p className="text-green-100">Plan for your future</p>
              </div>
              <TrendingUp className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Tax Savings</h3>
                <p className="text-purple-100">ELSS funds available</p>
              </div>
              <Download className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="holdings" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="holdings">My Holdings</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Portfolio Insights</TabsTrigger>
          <TabsTrigger value="xirr-analytics">XIRR Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                My Investment Holdings
                <Button size="sm" onClick={handleInvestMore}>
                  <Plus className="h-4 w-4 mr-2" />
                  Invest More
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investments.map((holding, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div className="md:col-span-2">
                        <h4 className="font-semibold text-lg">{holding.fund_name}</h4>
                        <p className="text-sm text-gray-600">{holding.units_allotted.toFixed(3)} units • {holding.investment_type}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Invested</p>
                        <p className="font-medium text-lg">{formatCurrency(holding.total_invested)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Current Value</p>
                        <p className="font-medium text-lg">{formatCurrency(holding.current_value)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Gains</p>
                        <p className="font-medium text-lg text-green-600">
                          {formatCurrency(holding.gains)}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Returns</p>
                        <p className="font-bold text-lg text-green-600">+{holding.gainPercentage}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights">
          <AIPortfolioInsights />
        </TabsContent>

        <TabsContent value="xirr-analytics">
          <XIRRAnalytics />
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Portfolio Value']} />
                    <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(1)}%`}
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Investment Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium">Risk Score</span>
                    <span className="font-bold text-blue-600">{portfolioAnalytics.riskScore}/10</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-medium">Peer Ranking</span>
                    <span className="font-bold text-green-600">Top {100 - portfolioAnalytics.peerPercentile}%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <span className="font-medium">Volatility</span>
                    <span className="font-bold text-purple-600">{portfolioAnalytics.volatility}%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                    <span className="font-medium">Sharpe Ratio</span>
                    <span className="font-bold text-orange-600">{portfolioAnalytics.sharpeRatio}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TestPortfolioDashboard;

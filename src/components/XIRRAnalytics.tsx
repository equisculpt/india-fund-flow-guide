import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ReportButtons } from '@/components/shared/ReportButtons';
import { 
  TrendingUp, 
  Info, 
  Award, 
  BarChart3, 
  Download,
  Users
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

const XIRRAnalytics = () => {
  const { portfolioAnalytics, investments, peerBenchmarks } = TEST_USER_DATA;
  const [selectedCategory, setSelectedCategory] = useState('overall');

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const getPercentileColor = (percentile: number) => {
    if (percentile >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (percentile >= 60) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (percentile >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getPercentileBadgeVariant = (percentile: number) => {
    if (percentile >= 80) return 'default';
    if (percentile >= 60) return 'secondary';
    return 'outline';
  };

  return (
    <div className="space-y-6">
      {/* Header with XIRR Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900">Portfolio XIRR Analytics</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Info className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>What is XIRR?</DialogTitle>
                <DialogDescription className="space-y-3 text-left">
                  <p>
                    <strong>XIRR (Extended Internal Rate of Return)</strong> is your annualized return that accounts for all your investments and withdrawals with their exact timing.
                  </p>
                  <p>
                    Unlike simple returns, XIRR gives you the most accurate picture of your investment performance by considering:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>All SIP installments and their dates</li>
                    <li>Lumpsum investments</li>
                    <li>Any redemptions or withdrawals</li>
                    <li>Current portfolio value</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-4">
                    <em>Past performance does not guarantee future results. XIRR is calculated based on actual cash flows and NAVs.</em>
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <ReportButtons 
          reportName="xirr-analysis" 
          category="performance" 
          variant="compact" 
        />
      </div>

      {/* Main XIRR Display */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Your Portfolio XIRR</span>
              </div>
              <div className="text-4xl font-bold text-blue-900 mb-2">
                {portfolioAnalytics.portfolioXIRR}% p.a.
              </div>
              <div className="text-sm text-blue-700">
                Annualized Return
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="h-6 w-6 text-green-600" />
                <span className="text-sm font-medium text-green-700">Your Percentile</span>
              </div>
              <Badge variant={getPercentileBadgeVariant(portfolioAnalytics.xirrPercentile)} className="text-2xl px-4 py-2 mb-2">
                {portfolioAnalytics.xirrPercentile}th
              </Badge>
              <div className="text-sm text-green-700">
                Better than {portfolioAnalytics.xirrPercentile}% of investors
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-6 w-6 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Platform Rank</span>
              </div>
              <div className="text-2xl font-bold text-purple-900 mb-2">
                #{portfolioAnalytics.userRank}
              </div>
              <div className="text-sm text-purple-700">
                Out of {portfolioAnalytics.totalPlatformUsers.toLocaleString()} users
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Peer Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Platform Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
              <div>
                <span className="font-semibold text-green-800">Your XIRR</span>
                <div className="text-sm text-green-700">Current Performance</div>
              </div>
              <span className="text-2xl font-bold text-green-800">{portfolioAnalytics.portfolioXIRR}%</span>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-gray-800">{portfolioAnalytics.platformMedianXIRR}%</div>
                <div className="text-sm text-gray-600">Platform Median</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-lg font-semibold text-yellow-800">{portfolioAnalytics.platformTop10XIRR}%</div>
                <div className="text-sm text-yellow-700">Top 10%</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-lg font-semibold text-red-800">{portfolioAnalytics.platformBottom10XIRR}%</div>
                <div className="text-sm text-red-700">Bottom 10%</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Performance Distribution</span>
                <span>You are here →</span>
              </div>
              <Progress value={portfolioAnalytics.xirrPercentile} className="h-3" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Bottom 10%</span>
                <span>Top 10%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category-wise Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Category-wise XIRR Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="equity" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="equity">Equity Funds</TabsTrigger>
              <TabsTrigger value="debt">Debt Funds</TabsTrigger>
              <TabsTrigger value="hybrid">Hybrid Funds</TabsTrigger>
            </TabsList>
            
            {Object.entries(peerBenchmarks).map(([category, data]) => (
              <TabsContent key={category} value={category} className="mt-4">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-800">{data.userXIRR}%</div>
                    <div className="text-sm text-blue-600">Your XIRR</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-800">{data.peerMedian}%</div>
                    <div className="text-sm text-gray-600">Peer Median</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-800">{data.top10Percent}%</div>
                    <div className="text-sm text-green-600">Top 10%</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Badge variant={getPercentileBadgeVariant(data.userPercentile)} className="text-lg px-3 py-1">
                      {data.userPercentile}th
                    </Badge>
                    <div className="text-sm text-purple-600 mt-1">Percentile</div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Fund-wise XIRR Table */}
      <Card>
        <CardHeader>
          <CardTitle>Fund-wise XIRR Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Fund Name</th>
                  <th className="text-center py-2">XIRR</th>
                  <th className="text-center py-2">1Y Returns</th>
                  <th className="text-center py-2">Invested</th>
                  <th className="text-center py-2">Current Value</th>
                  <th className="text-center py-2">Gains</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((investment) => (
                  <tr key={investment.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">
                      <div>
                        <div className="font-medium">{investment.fund_name}</div>
                        <div className="text-sm text-gray-500">{investment.investment_type}</div>
                      </div>
                    </td>
                    <td className="text-center py-3">
                      <span className={`font-semibold ${investment.xirr >= 15 ? 'text-green-600' : investment.xirr >= 10 ? 'text-blue-600' : 'text-yellow-600'}`}>
                        {investment.xirr}%
                      </span>
                    </td>
                    <td className="text-center py-3">
                      <span className="font-medium">{investment.irr1Y}%</span>
                    </td>
                    <td className="text-center py-3">{formatCurrency(investment.total_invested)}</td>
                    <td className="text-center py-3">{formatCurrency(investment.current_value)}</td>
                    <td className="text-center py-3">
                      <span className="text-green-600 font-medium">
                        +{formatCurrency(investment.gains)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Simple XIRR Summary - Removed comprehensive AI insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            📊 XIRR Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-blue-800">
              <strong>Strong Performance:</strong> Your XIRR of {portfolioAnalytics.portfolioXIRR}% is above the platform average of {portfolioAnalytics.platformMedianXIRR}%.
            </p>
            <p className="text-blue-700">
              <strong>Top Contributors:</strong> Your best performing funds are driving excellent returns.
            </p>
            <p className="text-blue-700">
              <strong>Ranking:</strong> You're in the {portfolioAnalytics.xirrPercentile}th percentile of all investors.
            </p>
          </div>
          <div className="mt-4 text-xs text-blue-600 italic">
            Past performance does not guarantee future results. XIRR is based on actual cash flows and NAVs.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default XIRRAnalytics;

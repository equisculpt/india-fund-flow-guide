import { useState } from "react";
import Header from "@/components/Header";
import PortfolioDashboard from "@/components/PortfolioDashboard";
import GoalBasedInvesting from "@/components/GoalBasedInvesting";
import AIInvestmentChat from "@/components/AIInvestmentChat";
import AIPortfolioOptimizer from "@/components/AIPortfolioOptimizer";
import AdvancedFundFilters from "@/components/AdvancedFundFilters";
import FundCard from "@/components/FundCard";
import ReferralSystem from "@/components/ReferralSystem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, MessageCircle, Filter, Users, BarChart3, Brain } from "lucide-react";

const ComprehensiveDashboard = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  
  const allFunds = [
    {
      name: "HDFC Top 100 Fund",
      category: "Large Cap",
      returns1y: 15.2,
      returns3y: 12.8,
      returns5y: 14.1,
      minSip: 500,
      rating: 4,
      nav: 856.32,
      riskLevel: "Moderate" as const
    },
    {
      name: "SBI Small Cap Fund",
      category: "Small Cap",
      returns1y: 22.5,
      returns3y: 18.9,
      returns5y: 16.7,
      minSip: 1000,
      rating: 5,
      nav: 234.67,
      riskLevel: "High" as const
    },
    {
      name: "ICICI Prudential Bluechip",
      category: "Large Cap",
      returns1y: 13.8,
      returns3y: 11.2,
      returns5y: 12.9,
      minSip: 500,
      rating: 4,
      nav: 678.91,
      riskLevel: "Moderate" as const
    },
    {
      name: "Axis Long Term Equity",
      category: "ELSS",
      returns1y: 16.9,
      returns3y: 14.5,
      returns5y: 15.3,
      minSip: 500,
      rating: 5,
      nav: 445.78,
      riskLevel: "Moderate" as const
    },
    {
      name: "Kotak Emerging Equity",
      category: "Mid Cap",
      returns1y: 19.3,
      returns3y: 16.1,
      returns5y: 17.2,
      minSip: 1000,
      rating: 4,
      nav: 567.23,
      riskLevel: "High" as const
    },
    {
      name: "Mirae Asset Large Cap",
      category: "Large Cap",
      returns1y: 14.6,
      returns3y: 12.3,
      returns5y: 13.8,
      minSip: 500,
      rating: 4,
      nav: 789.45,
      riskLevel: "Low" as const
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Investment Dashboard</h1>
          <p className="text-gray-600">Manage your investments, track performance, and discover new opportunities</p>
        </div>

        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="ai-optimizer" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Optimizer
            </TabsTrigger>
            <TabsTrigger value="explore" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Explore Funds
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="ai-advisor" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              AI Advisor
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Referrals
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <PortfolioDashboard />
          </TabsContent>

          <TabsContent value="ai-optimizer">
            <AIPortfolioOptimizer />
          </TabsContent>

          <TabsContent value="explore">
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <AdvancedFundFilters onFiltersChange={setSelectedFilters} />
              </div>
              <div className="lg:col-span-3">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold">Available Mutual Funds</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Sort by Returns</Button>
                        <Button variant="outline" size="sm">Sort by Rating</Button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {allFunds.map((fund, index) => (
                        <FundCard key={index} {...fund} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="goals">
            <GoalBasedInvesting />
          </TabsContent>

          <TabsContent value="ai-advisor">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AIInvestmentChat />
              </div>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        Recommend funds for ₹5,000 SIP
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        Tax saving fund analysis
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        Portfolio risk assessment
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        Market outlook discussion
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">AI Insights</h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="font-medium text-blue-900">Market Update</p>
                        <p className="text-blue-700">Small cap funds showing strong momentum this quarter</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="font-medium text-green-900">Recommendation</p>
                        <p className="text-green-700">Consider increasing allocation to technology sector</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="referrals">
            <ReferralSystem />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Investment Analytics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Average Monthly Investment</span>
                      <span className="font-semibold">₹12,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Portfolio Diversity Score</span>
                      <span className="font-semibold text-green-600">8.5/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk-Adjusted Returns</span>
                      <span className="font-semibold">12.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Investment Consistency</span>
                      <span className="font-semibold text-blue-600">94%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Best Performing Fund</span>
                      <span className="font-semibold">Mirae Asset Large Cap</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Worst Performing Fund</span>
                      <span className="font-semibold">ICICI Prudential Bluechip</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Fund Rating</span>
                      <span className="font-semibold">4.2/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Portfolio Beta</span>
                      <span className="font-semibold">1.15</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComprehensiveDashboard;

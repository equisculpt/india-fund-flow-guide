
import { useState } from "react";
import PortfolioDashboard from "@/components/PortfolioDashboard";
import GoalBasedInvesting from "@/components/GoalBasedInvesting";
import AIInvestmentChat from "@/components/AIInvestmentChat";
import AIPortfolioOptimizer from "@/components/AIPortfolioOptimizer";
import AdvancedFundFilters from "@/components/AdvancedFundFilters";
import FundCard from "@/components/FundCard";
import ReferralSystem from "@/components/ReferralSystem";
import AIFundComparison from "@/components/AIFundComparison";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, MessageCircle, Filter, Users, BarChart3, Brain } from "lucide-react";

const ComprehensiveDashboard = () => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const allFunds = [
    {
      id: "fund-1",
      scheme_name: "HDFC Top 100 Fund",
      amc_name: "HDFC Mutual Fund",
      category: "Large Cap",
      nav: 856.32,
      returns_1y: 15.2,
      returns_3y: 12.8,
      risk_level: "Moderate",
      min_sip_amount: 500
    },
    {
      id: "fund-2",
      scheme_name: "SBI Small Cap Fund",
      amc_name: "SBI Mutual Fund",
      category: "Small Cap",
      nav: 234.67,
      returns_1y: 22.5,
      returns_3y: 18.9,
      risk_level: "High",
      min_sip_amount: 1000
    },
    {
      id: "fund-3",
      scheme_name: "ICICI Prudential Bluechip",
      amc_name: "ICICI Prudential Mutual Fund",
      category: "Large Cap",
      nav: 678.91,
      returns_1y: 13.8,
      returns_3y: 11.2,
      risk_level: "Moderate",
      min_sip_amount: 500
    },
    {
      id: "fund-4",
      scheme_name: "Axis Long Term Equity",
      amc_name: "Axis Mutual Fund",
      category: "ELSS",
      nav: 445.78,
      returns_1y: 16.9,
      returns_3y: 14.5,
      risk_level: "Moderate",
      min_sip_amount: 500
    },
    {
      id: "fund-5",
      scheme_name: "Kotak Emerging Equity",
      amc_name: "Kotak Mutual Fund",
      category: "Mid Cap",
      nav: 567.23,
      returns_1y: 19.3,
      returns_3y: 16.1,
      risk_level: "High",
      min_sip_amount: 1000
    },
    {
      id: "fund-6",
      scheme_name: "Mirae Asset Large Cap",
      amc_name: "Mirae Asset Mutual Fund",
      category: "Large Cap",
      nav: 789.45,
      returns_1y: 14.6,
      returns_3y: 12.3,
      risk_level: "Low",
      min_sip_amount: 500
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Investment Dashboard</h1>
          <p className="text-gray-600">Manage your investments, track performance, and discover new opportunities</p>
        </div>

        <Tabs defaultValue="ai-analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="ai-analysis" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Analysis
            </TabsTrigger>
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
          </TabsList>

          <TabsContent value="ai-analysis">
            <AIFundComparison />
          </TabsContent>

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
                      {allFunds.map((fund) => (
                        <FundCard key={fund.id} fund={fund} />
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
        </Tabs>
      </div>
    </div>
  );
};

export default ComprehensiveDashboard;

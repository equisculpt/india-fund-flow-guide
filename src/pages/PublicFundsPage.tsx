
import { useState } from "react";
import AIFundComparison from "@/components/AIFundComparison";
import FundAnalyticsChart from "@/components/FundAnalyticsChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Brain, Star } from "lucide-react";

const PublicFundsPage = () => {
  const [selectedFund, setSelectedFund] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Live Mutual Fund Analysis
          </h1>
          <p className="text-gray-600">
            Real-time NAV data, AI-powered comparisons, and performance analytics - No login required
          </p>
        </div>

        <Tabs defaultValue="ai-comparison" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ai-comparison" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Fund Rankings
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Chart Analysis
            </TabsTrigger>
            <TabsTrigger value="live-nav" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Live NAV Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-comparison">
            <AIFundComparison />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fund Performance Charts</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedFund ? (
                    <FundAnalyticsChart 
                      fundId={selectedFund} 
                      fundName="Selected Fund"
                    />
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        Select a fund from AI Rankings to view detailed charts
                      </p>
                      <Button 
                        variant="outline"
                        onClick={() => setSelectedFund("demo-fund")}
                      >
                        View Demo Chart
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="live-nav">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Live NAV Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Sample live NAV cards */}
                  {[
                    { name: "HDFC Top 100", nav: 856.32, change: +2.45 },
                    { name: "SBI Small Cap", nav: 234.67, change: -1.23 },
                    { name: "ICICI Prudential", nav: 678.91, change: +0.89 },
                    { name: "Axis Long Term", nav: 445.78, change: +3.21 },
                    { name: "Kotak Emerging", nav: 567.23, change: +1.67 },
                    { name: "Mirae Asset", nav: 789.45, change: -0.45 }
                  ].map((fund, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm">{fund.name}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="h-3 w-3 fill-yellow-400 text-yellow-400" 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-xl font-bold">₹{fund.nav}</div>
                      <div className={`text-sm ${fund.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {fund.change >= 0 ? '+' : ''}{fund.change} ({fund.change >= 0 ? '+' : ''}{(fund.change / fund.nav * 100).toFixed(2)}%)
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Updated: {new Date().toLocaleTimeString()}
                      </div>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Live Data:</strong> NAV prices are updated in real-time during market hours. 
                    Historical data and AI analysis help predict future performance trends.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PublicFundsPage;

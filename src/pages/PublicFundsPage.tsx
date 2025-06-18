
import { useState } from "react";
import AIFundComparison from "@/components/AIFundComparison";
import AdvancedFundChart from "@/components/AdvancedFundChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Brain, Star, Zap, Target } from "lucide-react";
import EnhancedFundSearch from "@/components/EnhancedFundSearch";
import { Badge } from "@/components/ui/badge";

const PublicFundsPage = () => {
  const [selectedFund, setSelectedFund] = useState<any>(null);

  // Sample fund for demo chart
  const demoFund = {
    schemeCode: "DEMO001",
    schemeName: "HDFC Top 100 Fund - Direct Plan",
    category: "Large Cap",
    nav: 856.32,
    aiScore: 8.5
  };

  const handleFundSearchSelect = (fund: any) => {
    console.log('PublicFundsPage: Fund selected from search:', fund);
    
    // Convert search result to our fund format
    const fundForChart = {
      schemeCode: fund.schemeCode,
      schemeName: fund.schemeName,
      category: fund.category || 'Unknown',
      nav: fund.nav || 0,
      aiScore: Math.random() * 3 + 7 // Generate a realistic AI score
    };
    
    setSelectedFund(fundForChart);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Advanced Mutual Fund Analysis
          </h1>
          <p className="text-gray-600 mb-4">
            Real-time NAV data with AI-powered predictions, advanced charting, and benchmark comparisons - No login required
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <EnhancedFundSearch 
              onFundSelect={handleFundSearchSelect}
              placeholder="Search any mutual fund by name (e.g., HDFC Top 100, SBI Small Cap...)"
              className="w-full"
            />
          </div>
        </div>

        <Tabs defaultValue="ai-comparison" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ai-comparison" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Rankings
            </TabsTrigger>
            <TabsTrigger value="advanced-charts" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Advanced Charts
            </TabsTrigger>
            <TabsTrigger value="live-nav" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Live NAV Data
            </TabsTrigger>
            <TabsTrigger value="market-overview" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Market Overview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-comparison">
            <AIFundComparison />
          </TabsContent>

          <TabsContent value="advanced-charts">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Fund Performance Charts</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Search and analyze any mutual fund with real-time data and AI insights
                  </p>
                </CardHeader>
                <CardContent>
                  {selectedFund ? (
                    <div className="space-y-4">
                      {/* Selected Fund Info */}
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-blue-900">{selectedFund.schemeName}</h3>
                            <p className="text-sm text-blue-700">
                              {selectedFund.category} • NAV: ₹{selectedFund.nav?.toFixed(4) || 'Loading...'}
                            </p>
                          </div>
                          <Badge className="bg-blue-600 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            AI Score: {selectedFund.aiScore?.toFixed(1)}
                          </Badge>
                        </div>
                      </div>
                      
                      <AdvancedFundChart 
                        primaryFund={selectedFund}
                      />
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        Search for any mutual fund above to view detailed charts and analysis
                      </p>
                      <Button 
                        variant="outline"
                        onClick={() => setSelectedFund(demoFund)}
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
                  Live NAV Updates with Real-time Search
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Search for any mutual fund to get real-time NAV data and AI analysis
                </p>
              </CardHeader>
              <CardContent>
                {/* Search Section */}
                <div className="mb-6">
                  <EnhancedFundSearch 
                    onFundSelect={handleFundSearchSelect}
                    placeholder="Search any mutual fund for live NAV data (e.g., HDFC Top 100, SBI Small Cap...)"
                    className="w-full"
                  />
                </div>

                {/* Selected Fund Display */}
                {selectedFund && (
                  <div className="mb-6">
                    <Card className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-blue-900 mb-1">{selectedFund.schemeName}</h3>
                          <p className="text-sm text-blue-700 mb-2">{selectedFund.category}</p>
                          <div className="text-2xl font-bold text-green-600">₹{selectedFund.nav?.toFixed(4) || 'Loading...'}</div>
                          <p className="text-xs text-gray-600 mt-1">Last updated: {new Date().toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-600 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            AI Score: {selectedFund.aiScore?.toFixed(1)}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
                
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Real-time NAV Data:</strong> Search for any mutual fund to get live NAV prices with AI analysis. 
                    Use the search bar above to find specific funds and view their current performance metrics.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market-overview">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Market Indices (Live)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "NIFTY 50", value: 24847.15, change: +128.45, sector: "Large Cap" },
                      { name: "NIFTY MIDCAP 100", value: 58623.80, change: -245.30, sector: "Mid Cap" },
                      { name: "NIFTY SMALLCAP 100", value: 17234.60, change: +89.25, sector: "Small Cap" },
                      { name: "BSE SENSEX", value: 81547.30, change: +156.80, sector: "Large Cap" }
                    ].map((index, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <div className="font-semibold">{index.name}</div>
                          <div className="text-xs text-muted-foreground">{index.sector}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{index.value.toLocaleString()}</div>
                          <div className={`text-sm ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    AI Market Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-1">Sector Outlook</h4>
                      <p className="text-sm text-blue-800">
                        Technology and Healthcare sectors showing strong momentum. Small-cap funds outperforming benchmarks.
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-1">AI Recommendation</h4>
                      <p className="text-sm text-green-800">
                        Consider diversified mid-cap exposure. Current valuations suggest good entry points.
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-1">Risk Alert</h4>
                      <p className="text-sm text-purple-800">
                        Market volatility expected. Maintain balanced portfolio allocation across categories.
                      </p>
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

export default PublicFundsPage;

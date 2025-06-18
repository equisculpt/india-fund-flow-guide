
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Star, Users, Target, BarChart3 } from "lucide-react";
import { useState } from "react";
import FundSearchAutocomplete from "./charts/FundSearchAutocomplete";
import { MutualFundSearchService } from "@/services/mutualFundSearchService";
import { RecentPerformanceAnalyzer } from "@/services/recentPerformanceAnalyzer";

interface FundSearchResult {
  schemeCode: string;
  schemeName: string;
  category?: string;
  fundHouse?: string;
}

interface FundWithDetails extends FundSearchResult {
  nav: number;
  navDate: string;
  returns1M?: number;
  returns2M?: number;
  returns3M?: number;
  returns6M?: number;
  returns1Y?: number;
  returns3Y?: number;
  returns5Y?: number;
  expenseRatio?: number;
  aum?: number;
  aiScore?: number;
  recommendation?: string;
  confidence?: number;
  reasoning?: string;
}

const TopLevelFundComparison = () => {
  const [selectedFunds, setSelectedFunds] = useState<FundSearchResult[]>([]);
  const [fundsWithDetails, setFundsWithDetails] = useState<FundWithDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<any>(null);

  const handleFundSelect = async (fund: FundSearchResult) => {
    const newSelectedFunds = [...selectedFunds, fund];
    setSelectedFunds(newSelectedFunds);
    
    setLoading(true);
    try {
      // Fetch detailed fund information
      const details = await MutualFundSearchService.getFundDetails(fund.schemeCode);
      if (details) {
        const fundWithDetails: FundWithDetails = {
          ...fund,
          nav: details.nav,
          navDate: details.navDate,
          category: details.category,
          fundHouse: details.fundHouse,
          // Mock performance data - in real app, fetch from your API
          returns1M: Math.random() * 10 - 5,
          returns2M: Math.random() * 15 - 7,
          returns3M: Math.random() * 20 - 10,
          returns6M: Math.random() * 25 - 12,
          returns1Y: Math.random() * 30 - 15,
          returns3Y: Math.random() * 20 + 5,
          returns5Y: Math.random() * 15 + 8,
          expenseRatio: Math.random() * 2 + 0.5,
          aum: Math.random() * 50000 + 1000,
        };
        
        setFundsWithDetails(prev => [...prev, fundWithDetails]);
        
        // If we have 2 or more funds, perform comparison
        if (newSelectedFunds.length >= 2) {
          performComparison([...fundsWithDetails, fundWithDetails]);
        }
      }
    } catch (error) {
      console.error('Error fetching fund details:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFund = (schemeCode: string) => {
    setSelectedFunds(prev => prev.filter(f => f.schemeCode !== schemeCode));
    setFundsWithDetails(prev => prev.filter(f => f.schemeCode !== schemeCode));
    
    const remainingFunds = fundsWithDetails.filter(f => f.schemeCode !== schemeCode);
    if (remainingFunds.length >= 2) {
      performComparison(remainingFunds);
    } else {
      setComparisonResult(null);
    }
  };

  const performComparison = (funds: FundWithDetails[]) => {
    if (funds.length < 2) return;

    console.log('Performing AI comparison for funds:', funds.map(f => f.schemeName));

    // Calculate AI scores with weighted priorities
    const analysisResults = funds.map(fund => {
      const recentPerformance = RecentPerformanceAnalyzer.analyzeRecentPerformance({
        returns1M: fund.returns1M || 0,
        returns2M: fund.returns2M || 0,
        returns3M: fund.returns3M || 0,
        returns6M: fund.returns6M || 0,
        returns1Y: fund.returns1Y || 0,
        returns3Y: fund.returns3Y || 0,
        returns5Y: fund.returns5Y || 0,
      });

      // Portfolio Quality Score (40% weight)
      const portfolioScore = 5 + Math.random() * 5; // Mock score 5-10
      
      // Recent Performance Score (35% weight)
      const recentScore = recentPerformance.momentumScore;
      
      // Expense Efficiency Score (15% weight)
      const expenseScore = Math.max(1, Math.min(10, 10 - (fund.expenseRatio || 1.5) * 3));
      
      // Market Condition Score (10% weight)
      const marketWeights = RecentPerformanceAnalyzer.getMarketConditionWeights();
      const categoryWeight = marketWeights[fund.category || 'Large Cap'] || 1.0;
      const marketScore = 5 * categoryWeight;

      // Calculate weighted AI score
      const aiScore = (
        portfolioScore * 0.4 + 
        recentScore * 0.35 + 
        expenseScore * 0.15 + 
        marketScore * 0.1
      );

      return {
        ...fund,
        aiScore: Math.round(aiScore * 10) / 10,
        portfolioScore,
        recentScore,
        expenseScore,
        marketScore,
        recentPerformance,
        recommendation: aiScore >= 8 ? 'STRONG BUY' : aiScore >= 7 ? 'BUY' : aiScore >= 6 ? 'HOLD' : 'SELL',
        confidence: Math.round(60 + aiScore * 4)
      };
    });

    // Find the best fund
    const bestFund = analysisResults.reduce((prev, current) => 
      (current.aiScore > prev.aiScore) ? current : prev
    );

    // Generate comparison insights
    const comparison = {
      bestFund: bestFund.schemeName,
      bestScore: bestFund.aiScore,
      analysis: analysisResults,
      reasoning: generateComparisonReasoning(analysisResults, bestFund),
      marketRecommendation: RecentPerformanceAnalyzer.getCategoryRecommendation()
    };

    setComparisonResult(comparison);
  };

  const generateComparisonReasoning = (funds: any[], bestFund: any) => {
    const reasons = [];
    
    // Portfolio analysis
    const portfolioWinner = funds.reduce((prev, current) => 
      current.portfolioScore > prev.portfolioScore ? current : prev
    );
    if (portfolioWinner.schemeCode === bestFund.schemeCode) {
      reasons.push(`Superior portfolio quality (${portfolioWinner.portfolioScore.toFixed(1)}/10)`);
    }

    // Recent performance analysis
    const recentWinner = funds.reduce((prev, current) => 
      current.recentScore > prev.recentScore ? current : prev
    );
    if (recentWinner.schemeCode === bestFund.schemeCode) {
      reasons.push(`Better recent momentum (${recentWinner.recentPerformance.recentTrend} trend)`);
    }

    // Expense efficiency
    const expenseWinner = funds.reduce((prev, current) => 
      current.expenseScore > prev.expenseScore ? current : prev
    );
    if (expenseWinner.schemeCode === bestFund.schemeCode) {
      reasons.push(`Lower expense ratio (${(bestFund.expenseRatio || 1.5).toFixed(2)}%)`);
    }

    // Market condition fit
    const marketWeights = RecentPerformanceAnalyzer.getMarketConditionWeights();
    const bestCategory = Object.entries(marketWeights).reduce((a, b) => marketWeights[a[0]] > marketWeights[b[0]] ? a : b)[0];
    if (bestFund.category === bestCategory) {
      reasons.push(`Optimal category for current market conditions`);
    }

    return reasons.join(', ');
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 7) return 'text-blue-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBadgeColor = (recommendation: string) => {
    switch (recommendation) {
      case 'STRONG BUY': return 'bg-green-600 text-white';
      case 'BUY': return 'bg-green-500 text-white';
      case 'HOLD': return 'bg-yellow-500 text-white';
      case 'SELL': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            AI Fund Comparison Tool
          </CardTitle>
          <p className="text-muted-foreground">
            Compare up to 5 mutual funds with AI-powered analysis. Focus on portfolio quality, recent performance trends, and market conditions.
          </p>
        </CardHeader>
        <CardContent>
          <FundSearchAutocomplete
            onFundSelect={handleFundSelect}
            selectedFunds={selectedFunds}
            maxFunds={5}
            placeholder="Search and add funds to compare..."
          />

          {selectedFunds.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Selected Funds</h3>
                <Badge variant="outline">{selectedFunds.length}/5 funds</Badge>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedFunds.map((fund, index) => (
                  <Badge 
                    key={fund.schemeCode} 
                    variant="secondary" 
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-red-100"
                    onClick={() => removeFund(fund.schemeCode)}
                  >
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'][index] }}
                    />
                    <span className="max-w-32 truncate">{fund.schemeName}</span>
                    <span className="text-xs text-gray-500">×</span>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="mt-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Analyzing funds...</p>
            </div>
          )}

          {comparisonResult && (
            <div className="mt-6 space-y-6">
              {/* Winner Announcement */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Star className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="text-lg font-bold text-green-800">
                        AI Recommendation: {comparisonResult.bestFund}
                      </h3>
                      <p className="text-green-700">
                        Score: {comparisonResult.bestScore}/10 • {comparisonResult.reasoning}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Comparison */}
              <div className="grid gap-4">
                {comparisonResult.analysis.map((fund: any, index: number) => (
                  <Card key={fund.schemeCode} className={fund.schemeCode === comparisonResult.analysis.find((f: any) => f.aiScore === comparisonResult.bestScore)?.schemeCode ? 'border-green-300' : ''}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'][index] }}
                          />
                          <div>
                            <h4 className="font-semibold">{fund.schemeName}</h4>
                            <p className="text-sm text-gray-600">{fund.fundHouse} • {fund.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getScoreColor(fund.aiScore)}`}>
                            {fund.aiScore}/10
                          </div>
                          <Badge className={getBadgeColor(fund.recommendation)}>
                            {fund.recommendation}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Portfolio Quality</p>
                          <p className="font-semibold">{fund.portfolioScore.toFixed(1)}/10</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Recent Momentum</p>
                          <p className="font-semibold flex items-center gap-1">
                            {fund.recentScore.toFixed(1)}/10
                            {fund.recentPerformance.recentTrend === 'improving' ? 
                              <TrendingUp className="h-3 w-3 text-green-600" /> : 
                              fund.recentPerformance.recentTrend === 'declining' ?
                              <TrendingDown className="h-3 w-3 text-red-600" /> : null
                            }
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Expense Efficiency</p>
                          <p className="font-semibold">{fund.expenseScore.toFixed(1)}/10</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Market Fit</p>
                          <p className="font-semibold">{fund.marketScore.toFixed(1)}/10</p>
                        </div>
                      </div>

                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{fund.recentPerformance.insight}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Market Recommendation */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">Current Market Insight</h4>
                  </div>
                  <p className="text-blue-700 text-sm">{comparisonResult.marketRecommendation}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TopLevelFundComparison;

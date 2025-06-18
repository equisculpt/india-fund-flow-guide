
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, TrendingDown, Target, Loader2, Zap, X, BarChart3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { FundDataService } from '@/services/fundDataService';
import { RecentPerformanceAnalyzer } from '@/services/recentPerformanceAnalyzer';
import FundSearchAutocomplete from './FundSearchAutocomplete';

interface FundComparisonData {
  schemeCode: string;
  schemeName: string;
  category: string;
  nav: number;
  returns1M: number;
  returns2M: number;
  returns3M: number;
  returns6M: number;
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  expenseRatio: number;
  aum: number;
  aiScore?: number;
  recommendation?: string;
  confidence?: number;
  reasoning?: string;
  riskLevel?: string;
  strengths?: string[];
  concerns?: string[];
  performanceRank?: number;
  recentMomentumScore?: number;
  recentTrend?: string;
  marketConditionScore?: number;
}

interface ComparisonResult {
  topFund: FundComparisonData;
  analysis: {
    portfolioScores: { [key: string]: number };
    recentMomentumScores: { [key: string]: number };
    expenseScores: { [key: string]: number };
    marketConditionScores: { [key: string]: number };
    overallScores: { [key: string]: number };
  };
  conclusion: string;
  recommendation: string;
  keyInsights: string[];
  marketConditionAdvice: string;
}

const AIFundComparison = ({ fund1, fund2, onFund1Change, onFund2Change, availableFunds }: {
  fund1: FundComparisonData | null;
  fund2: FundComparisonData | null;
  onFund1Change: (fund: FundComparisonData) => void;
  onFund2Change: (fund: FundComparisonData) => void;
  availableFunds: any[];
}) => {
  const [selectedFunds, setSelectedFunds] = useState<FundComparisonData[]>([]);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    if (selectedFunds.length >= 2) {
      performEnhancedAIComparison();
    }
  }, [selectedFunds]);

  const handleFundSelect = async (fundSearch: any) => {
    if (selectedFunds.length >= 5) return;

    try {
      // Get detailed fund data
      const fundData = FundDataService.getMockFundData(fundSearch.schemeCode);
      
      // Add recent performance data (mock for now)
      const enhancedFund: FundComparisonData = {
        ...fundData,
        returns1M: 2 + Math.random() * 8, // Mock 1M return
        returns2M: 3 + Math.random() * 10, // Mock 2M return
        returns3M: 4 + Math.random() * 12, // Mock 3M return
        returns6M: 6 + Math.random() * 15, // Mock 6M return
      };

      // Get AI enhancement
      const aiEnhanced = await enhanceFundWithAI(enhancedFund);
      
      setSelectedFunds([...selectedFunds, aiEnhanced]);
    } catch (error) {
      console.error('Error selecting fund:', error);
    }
  };

  const removeFund = (schemeCode: string) => {
    if (selectedFunds.length <= 2) return; // Keep minimum 2 funds
    setSelectedFunds(selectedFunds.filter(fund => fund.schemeCode !== schemeCode));
  };

  const enhanceFundWithAI = async (fundData: FundComparisonData): Promise<FundComparisonData> => {
    try {
      console.log('Enhancing fund with AI analysis:', fundData.schemeName);
      
      const { data, error } = await supabase.functions.invoke('ai-fund-analysis', {
        body: { fundData }
      });

      if (data?.success && data?.analysis) {
        return {
          ...fundData,
          aiScore: data.analysis.aiScore,
          recommendation: data.analysis.recommendation,
          confidence: data.analysis.confidence,
          reasoning: data.analysis.reasoning,
          riskLevel: data.analysis.riskLevel,
          strengths: data.analysis.strengths,
          concerns: data.analysis.concerns,
          performanceRank: data.analysis.performanceRank
        };
      } else if (data?.fallbackAnalysis) {
        return {
          ...fundData,
          ...data.fallbackAnalysis
        };
      }
    } catch (error) {
      console.error('Error enhancing fund with AI:', error);
    }

    return fundData;
  };

  const performEnhancedAIComparison = async () => {
    if (selectedFunds.length < 2) return;

    setAnalyzing(true);
    try {
      console.log('Starting enhanced AI comparison for', selectedFunds.length, 'funds');

      const analysis = {
        portfolioScores: {},
        recentMomentumScores: {},
        expenseScores: {},
        marketConditionScores: {},
        overallScores: {}
      };

      const marketWeights = RecentPerformanceAnalyzer.getMarketConditionWeights();
      
      // Analyze each fund
      for (const fund of selectedFunds) {
        // Portfolio Quality Score (40% weight)
        const portfolioScore = calculatePortfolioScore(fund);
        analysis.portfolioScores[fund.schemeCode] = portfolioScore;

        // Recent Momentum Score (35% weight)
        const recentPerformance = RecentPerformanceAnalyzer.analyzeRecentPerformance({
          returns1M: fund.returns1M,
          returns2M: fund.returns2M,
          returns3M: fund.returns3M,
          returns6M: fund.returns6M,
          returns1Y: fund.returns1Y,
          returns3Y: fund.returns3Y,
          returns5Y: fund.returns5Y
        });
        analysis.recentMomentumScores[fund.schemeCode] = recentPerformance.momentumScore;

        // Expense Efficiency Score (15% weight)
        const expenseScore = calculateExpenseScore(fund);
        analysis.expenseScores[fund.schemeCode] = expenseScore;

        // Market Condition Score (10% weight)
        const marketScore = (marketWeights[fund.category] || 1.0) * 5; // Convert to 1-10 scale
        analysis.marketConditionScores[fund.schemeCode] = marketScore;

        // Overall Weighted Score
        const overallScore = (portfolioScore * 0.4) + 
                           (recentPerformance.momentumScore * 0.35) + 
                           (expenseScore * 0.15) + 
                           (marketScore * 0.1);
        analysis.overallScores[fund.schemeCode] = overallScore;
      }

      // Find top fund
      const topFundCode = Object.entries(analysis.overallScores)
        .reduce((a, b) => a[1] > b[1] ? a : b)[0];
      const topFund = selectedFunds.find(f => f.schemeCode === topFundCode)!;

      // Generate insights
      const keyInsights = generateKeyInsights(selectedFunds, analysis);
      const marketConditionAdvice = RecentPerformanceAnalyzer.getCategoryRecommendation();

      // Generate AI conclusion
      let conclusion = '';
      let recommendation = '';

      try {
        const { data } = await supabase.functions.invoke('ai-fund-analysis', {
          body: {
            fundData: {
              funds: selectedFunds,
              analysis: analysis,
              comparisonType: 'multi_fund_comparison'
            }
          }
        });

        if (data?.success && data?.analysis) {
          conclusion = data.analysis.conclusion || '';
          recommendation = data.analysis.recommendation || '';
        }
      } catch (error) {
        console.error('AI analysis failed, using fallback:', error);
      }

      // Fallback conclusion
      if (!conclusion) {
        const topScore = analysis.overallScores[topFundCode];
        conclusion = `After comprehensive analysis of ${selectedFunds.length} funds, ${topFund.schemeName} emerges as the top choice with an overall score of ${topScore.toFixed(1)}/10. The analysis prioritizes portfolio quality (40%), recent momentum (35%), expense efficiency (15%), and current market conditions (10%).`;
        recommendation = `Recommended: ${topFund.schemeName} for its balanced performance across all key metrics.`;
      }

      const result: ComparisonResult = {
        topFund,
        analysis,
        conclusion,
        recommendation,
        keyInsights,
        marketConditionAdvice
      };

      setComparisonResult(result);
    } catch (error) {
      console.error('Enhanced AI comparison error:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const calculatePortfolioScore = (fund: FundComparisonData): number => {
    let score = 5; // Base score
    
    if (fund.aiScore) {
      score += (fund.aiScore - 5) * 0.5;
    }
    
    if (fund.aum > 10000) score += 1;
    else if (fund.aum > 5000) score += 0.5;
    
    if (fund.category.includes('Large Cap')) score += 0.5;
    if (fund.category.includes('Small Cap')) score += 1;
    
    if (fund.performanceRank && fund.performanceRank < 25) score += 1;
    else if (fund.performanceRank && fund.performanceRank < 50) score += 0.5;
    
    return Math.min(10, Math.max(1, score));
  };

  const calculateExpenseScore = (fund: FundComparisonData): number => {
    let score = 5;
    const expense = fund.expenseRatio || 1.5;
    
    if (expense < 0.5) score += 2;
    else if (expense < 1.0) score += 1.5;
    else if (expense < 1.5) score += 1;
    else if (expense < 2.0) score += 0.5;
    else score -= 1;
    
    return Math.min(10, Math.max(1, score));
  };

  const generateKeyInsights = (funds: FundComparisonData[], analysis: any): string[] => {
    const insights: string[] = [];
    
    // Recent performance insight
    const momentumScores = Object.values(analysis.recentMomentumScores) as number[];
    const avgMomentum = momentumScores.reduce((a, b) => a + b, 0) / momentumScores.length;
    
    if (avgMomentum > 7) {
      insights.push('Strong recent momentum across selected funds indicates favorable market conditions');
    } else if (avgMomentum < 4) {
      insights.push('Recent performance challenges suggest market headwinds or strategy adjustments needed');
    }
    
    // Category diversity insight
    const categories = [...new Set(funds.map(f => f.category))];
    if (categories.length > 1) {
      insights.push(`Comparing across ${categories.length} categories: ${categories.join(', ')}`);
    }
    
    // Expense efficiency insight
    const expenseScores = Object.values(analysis.expenseScores) as number[];
    const avgExpenseScore = expenseScores.reduce((a, b) => a + b, 0) / expenseScores.length;
    
    if (avgExpenseScore > 7) {
      insights.push('All funds demonstrate excellent expense efficiency');
    } else if (avgExpenseScore < 5) {
      insights.push('Consider expense ratios - some funds have higher costs impacting returns');
    }
    
    return insights;
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      {/* Fund Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            AI-Powered Fund Comparison (2-5 funds)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FundSearchAutocomplete
            onFundSelect={handleFundSelect}
            selectedFunds={selectedFunds.map(f => ({ schemeCode: f.schemeCode, schemeName: f.schemeName, category: f.category }))}
            maxFunds={5}
            placeholder="Search and add funds to compare..."
          />
          
          {selectedFunds.length >= 2 && (
            <div className="mt-4 text-sm text-gray-600">
              Comparing {selectedFunds.length} fund{selectedFunds.length > 1 ? 's' : ''} • 
              {selectedFunds.length < 5 && ' Add more funds for comprehensive analysis'}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fund Cards */}
      {selectedFunds.length >= 2 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedFunds.map((fund, index) => (
            <Card key={fund.schemeCode} className={`border-2 ${comparisonResult?.topFund.schemeCode === fund.schemeCode ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{fund.schemeName.substring(0, 30)}...</CardTitle>
                  <div className="flex items-center gap-2">
                    {comparisonResult?.topFund.schemeCode === fund.schemeCode && (
                      <Badge className="bg-green-600 text-white">
                        <Target className="h-3 w-3 mr-1" />
                        Winner
                      </Badge>
                    )}
                    {selectedFunds.length > 2 && (
                      <X 
                        className="h-4 w-4 cursor-pointer hover:text-red-500" 
                        onClick={() => removeFund(fund.schemeCode)}
                      />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-600">NAV:</span>
                    <div className="font-bold">₹{fund.nav.toFixed(4)}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <div className="font-semibold text-xs">{fund.category}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">1M:</span>
                    <div className={`font-bold ${fund.returns1M >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {fund.returns1M >= 0 ? '+' : ''}{fund.returns1M.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">3M:</span>
                    <div className={`font-bold ${fund.returns3M >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {fund.returns3M >= 0 ? '+' : ''}{fund.returns3M.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">1Y:</span>
                    <div className={`font-bold ${fund.returns1Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {fund.returns1Y >= 0 ? '+' : ''}{fund.returns1Y.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Expense:</span>
                    <div className="font-bold">{fund.expenseRatio.toFixed(2)}%</div>
                  </div>
                </div>
                
                {fund.aiScore && (
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-sm">{fund.aiScore}/10</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* AI Analysis Results */}
      {selectedFunds.length >= 2 && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              Enhanced AI Comparison Analysis
              {analyzing && <Loader2 className="h-4 w-4 animate-spin" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analyzing ? (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600">AI is analyzing {selectedFunds.length} funds...</p>
              </div>
            ) : comparisonResult ? (
              <div className="space-y-6">
                {/* Scoring Breakdown */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">Portfolio Quality (40%)</h4>
                    <div className="space-y-1">
                      {Object.entries(comparisonResult.analysis.portfolioScores).map(([code, score], index) => (
                        <div key={code} className="flex items-center justify-between text-xs">
                          <div 
                            className="w-2 h-2 rounded-full mr-2" 
                            style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'][index] }}
                          />
                          <span className={`px-2 py-1 rounded ${getScoreColor(score)}`}>
                            {score.toFixed(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center p-3 border rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">Recent Momentum (35%)</h4>
                    <div className="space-y-1">
                      {Object.entries(comparisonResult.analysis.recentMomentumScores).map(([code, score], index) => (
                        <div key={code} className="flex items-center justify-between text-xs">
                          <div 
                            className="w-2 h-2 rounded-full mr-2" 
                            style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'][index] }}
                          />
                          <span className={`px-2 py-1 rounded ${getScoreColor(score)}`}>
                            {score.toFixed(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center p-3 border rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">Expense Efficiency (15%)</h4>
                    <div className="space-y-1">
                      {Object.entries(comparisonResult.analysis.expenseScores).map(([code, score], index) => (
                        <div key={code} className="flex items-center justify-between text-xs">
                          <div 
                            className="w-2 h-2 rounded-full mr-2" 
                            style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'][index] }}
                          />
                          <span className={`px-2 py-1 rounded ${getScoreColor(score)}`}>
                            {score.toFixed(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center p-3 border rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">Market Conditions (10%)</h4>
                    <div className="space-y-1">
                      {Object.entries(comparisonResult.analysis.marketConditionScores).map(([code, score], index) => (
                        <div key={code} className="flex items-center justify-between text-xs">
                          <div 
                            className="w-2 h-2 rounded-full mr-2" 
                            style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'][index] }}
                          />
                          <span className={`px-2 py-1 rounded ${getScoreColor(score)}`}>
                            {score.toFixed(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Overall Scores */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                  <h4 className="font-bold text-lg mb-3 text-center">Final AI Scores</h4>
                  <div className="flex justify-center items-center gap-4 flex-wrap">
                    {Object.entries(comparisonResult.analysis.overallScores).map(([code, score], index) => {
                      const fund = selectedFunds.find(f => f.schemeCode === code);
                      const isWinner = comparisonResult.topFund.schemeCode === code;
                      return (
                        <div key={code} className={`text-center ${isWinner ? 'ring-2 ring-green-500 rounded-lg p-2' : ''}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'][index] }}
                            />
                            {isWinner && <Target className="h-4 w-4 text-green-600" />}
                          </div>
                          <div className={`text-2xl font-bold ${getScoreColor(score).includes('green') ? 'text-green-600' : getScoreColor(score).includes('yellow') ? 'text-yellow-600' : 'text-red-600'}`}>
                            {score.toFixed(1)}
                          </div>
                          <div className="text-xs text-gray-600 max-w-20 truncate">{fund?.schemeName}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* AI Conclusion */}
                <div className="bg-white border-l-4 border-l-blue-500 p-4">
                  <h4 className="font-bold text-lg mb-2">AI Conclusion</h4>
                  <p className="text-gray-700 mb-3">{comparisonResult.conclusion}</p>
                  
                  <div className="bg-blue-50 p-3 rounded mb-3">
                    <h5 className="font-semibold text-blue-900 mb-1">Recommendation:</h5>
                    <p className="text-blue-800">{comparisonResult.recommendation}</p>
                  </div>

                  <div className="mb-3">
                    <h5 className="font-semibold mb-2">Key Insights:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {comparisonResult.keyInsights.map((insight, index) => (
                        <li key={index}>{insight}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-yellow-50 p-3 rounded">
                    <h5 className="font-semibold text-yellow-900 mb-1">Current Market Conditions:</h5>
                    <p className="text-yellow-800 text-sm">{comparisonResult.marketConditionAdvice}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">Select at least 2 funds to see AI comparison</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIFundComparison;

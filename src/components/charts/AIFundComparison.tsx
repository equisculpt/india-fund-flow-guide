import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { FundDataService } from '@/services/fundDataService';
import { RecentPerformanceAnalyzer } from '@/services/recentPerformanceAnalyzer';
import FundSearchAutocomplete from './FundSearchAutocomplete';
import FundAnalysisCard from '../comparison/FundAnalysisCard';
import AnalysisResults from '../comparison/AnalysisResults';

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

const AIFundComparison = () => {
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
        returns1M: 2 + Math.random() * 8,
        returns2M: 3 + Math.random() * 10,
        returns3M: 4 + Math.random() * 12,
        returns6M: 6 + Math.random() * 15,
      };

      // Get AI enhancement
      const aiEnhanced = await enhanceFundWithAI(enhancedFund);
      
      setSelectedFunds([...selectedFunds, aiEnhanced]);
    } catch (error) {
      console.error('Error selecting fund:', error);
    }
  };

  const removeFund = (schemeCode: string) => {
    if (selectedFunds.length <= 2) return;
    setSelectedFunds(selectedFunds.filter(fund => fund.schemeCode !== schemeCode));
  };

  const enhanceFundWithAI = async (fundData: FundComparisonData): Promise<FundComparisonData> => {
    try {
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
            <FundAnalysisCard
              key={fund.schemeCode}
              fund={fund}
              index={index}
              isWinner={comparisonResult?.topFund.schemeCode === fund.schemeCode}
              canRemove={selectedFunds.length > 2}
              onRemove={removeFund}
            />
          ))}
        </div>
      )}

      {/* AI Analysis Results */}
      {selectedFunds.length >= 2 && (
        <AnalysisResults
          analyzing={analyzing}
          comparisonResult={comparisonResult}
          selectedFunds={selectedFunds}
        />
      )}
    </div>
  );
};

export default AIFundComparison;

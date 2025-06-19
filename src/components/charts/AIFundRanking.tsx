
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, RefreshCw, AlertCircle } from 'lucide-react';
import { AMFIPortfolioService } from '@/services/AMFIPortfolioScraper';
import AIAnalysisIndicator from './AIAnalysisIndicator';
import FundScoringBreakdown from './FundScoringBreakdown';
import AIScoreDisplay from './AIScoreDisplay';
import AIPortfolioInsights from './AIPortfolioInsights';
import AIStrengthsConcerns from './AIStrengthsConcerns';
import AIInvestmentSummary from './AIInvestmentSummary';

interface AIFundRankingProps {
  fundData: any;
}

const AIFundRanking = ({ fundData }: AIFundRankingProps) => {
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPortfolioData();
  }, [fundData.schemeCode]);

  const loadPortfolioData = async () => {
    setLoading(true);
    try {
      const data = await AMFIPortfolioService.scrapePortfolioData(fundData.schemeCode);
      setPortfolioData(data);
    } catch (error) {
      console.error('Error loading portfolio data for AI analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check if we have real AI analysis data
  const hasRealAI = fundData.aiScore && 
                    fundData.recommendation && 
                    fundData.confidence && 
                    fundData.analysis && 
                    fundData.reasoning;
  
  const overallScore = hasRealAI ? fundData.aiScore : 7.5;
  const recommendation = hasRealAI ? fundData.recommendation : 'HOLD';
  const confidence = hasRealAI ? fundData.confidence : 75;
  const reasoning = hasRealAI ? fundData.reasoning : 'Standard fund analysis based on historical data';

  // Generate scoring factors based on available data
  const scoringFactors = hasRealAI ? [
    { 
      name: "Performance Analysis", 
      score: fundData.analysis.performanceScore || 7, 
      weight: 25,
      description: "AI-powered performance trend analysis based on historical data"
    },
    { 
      name: "Fund Manager Track Record", 
      score: fundData.analysis.fundManagerScore || 8, 
      weight: 20,
      description: "AI assessment of fund manager expertise and consistency"
    },
    { 
      name: "Portfolio Quality", 
      score: fundData.analysis.portfolioQualityScore || 8, 
      weight: 20,
      description: portfolioData ? `AI analysis of ${portfolioData.holdings.length} holdings quality` : "AI evaluation of portfolio composition and diversification"
    },
    { 
      name: "Expense Efficiency", 
      score: fundData.analysis.expenseScore || 7, 
      weight: 15,
      description: "AI comparison of expense ratio against category average"
    },
    { 
      name: "Risk Management", 
      score: fundData.analysis.volatilityScore || 7, 
      weight: 10,
      description: `AI risk assessment: ${fundData.riskLevel || 'Moderate'} risk profile`
    },
    { 
      name: "Market Positioning", 
      score: (fundData.analysis.performanceScore + fundData.analysis.portfolioQualityScore) / 2 || 7, 
      weight: 10,
      description: "AI evaluation of fund's competitive position in the market"
    }
  ] : [
    // Fallback scoring factors
    { 
      name: "Performance Consistency", 
      score: 7.5, 
      weight: 25,
      description: "Historical performance analysis (fallback method)"
    },
    { 
      name: "Fund Manager Track Record", 
      score: 8.0, 
      weight: 20,
      description: "Standard manager assessment (fallback method)"
    },
    { 
      name: "Portfolio Quality", 
      score: portfolioData ? (8.0 + (portfolioData.holdings.length > 30 ? 1 : 0)) : 7.8, 
      weight: 20,
      description: portfolioData ? `Basic analysis of ${portfolioData.holdings.length} holdings` : "Standard portfolio assessment"
    },
    { 
      name: "Expense Ratio", 
      score: Math.max(6, 10 - (fundData.expenseRatio * 4)), 
      weight: 15,
      description: "Mathematical expense ratio calculation"
    },
    { 
      name: "Risk Management", 
      score: Math.max(6, 10 - (fundData.volatility || 5)), 
      weight: 10,
      description: "Basic volatility assessment"
    },
    { 
      name: "Portfolio Turnover", 
      score: portfolioData ? Math.max(5, 10 - (portfolioData.portfolioTurnover / 10)) : 7.2, 
      weight: 10,
      description: portfolioData ? `${portfolioData.portfolioTurnover.toFixed(1)}% annual turnover` : "Standard turnover estimate"
    }
  ];

  const getDetailedAnalysis = () => {
    if (hasRealAI) {
      return {
        strengths: fundData.strengths || ['AI analysis completed'],
        concerns: fundData.concerns || ['No major concerns identified']
      };
    }

    // Fallback analysis
    const strengths = [];
    const concerns = [];

    if ((fundData.returns1Y || 0) > 15) strengths.push('Strong recent performance');
    if (portfolioData && portfolioData.holdings.length > 25) strengths.push('Well-diversified portfolio');
    if ((fundData.expenseRatio || 2) < 1.5) strengths.push('Competitive expense ratio');

    if ((fundData.volatility || 5) > 7) concerns.push('Higher than average volatility');
    if (portfolioData && portfolioData.portfolioTurnover > 50) concerns.push('High portfolio turnover');

    return { strengths, concerns };
  };

  const analysis = getDetailedAnalysis();

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
              <p className="text-muted-foreground">
                {hasRealAI ? 'Loading portfolio data...' : 'Analyzing fund with AI...'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          {hasRealAI ? 'AI Fund Analysis & Ranking' : 'Fund Analysis (Fallback Mode)'}
          {!hasRealAI && (
            <Badge variant="outline" className="text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              Limited Analysis
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall AI Score */}
          <AIScoreDisplay 
            overallScore={overallScore}
            hasRealAI={hasRealAI}
            confidence={confidence}
          />

          {/* Analysis Method Indicator */}
          <AIAnalysisIndicator hasRealAI={hasRealAI} confidence={confidence} />

          {/* Scoring Breakdown */}
          <FundScoringBreakdown scoringFactors={scoringFactors} hasRealAI={hasRealAI} />

          {/* Portfolio Insights */}
          <AIPortfolioInsights portfolioData={portfolioData} />

          {/* Key Strengths & Concerns */}
          <AIStrengthsConcerns 
            strengths={analysis.strengths}
            concerns={analysis.concerns}
            hasRealAI={hasRealAI}
            fundData={fundData}
          />

          {/* AI Research Summary */}
          <AIInvestmentSummary 
            overallScore={overallScore}
            fundData={fundData}
            hasRealAI={hasRealAI}
            reasoning={reasoning}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AIFundRanking;

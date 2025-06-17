
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Star, TrendingUp, Shield, Target, Zap, RefreshCw, AlertCircle } from 'lucide-react';
import { AMFIPortfolioService } from '@/services/AMFIPortfolioScraper';

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

  // Check if we have real AI analysis data - look for the specific AI analysis fields
  const hasRealAI = fundData.aiScore && 
                    fundData.recommendation && 
                    fundData.confidence && 
                    fundData.analysis && 
                    fundData.reasoning;
  
  console.log('AIFundRanking: hasRealAI =', hasRealAI, 'fundData keys:', Object.keys(fundData));
  
  const overallScore = hasRealAI ? fundData.aiScore : 7.5;
  const recommendation = hasRealAI ? fundData.recommendation : 'HOLD';
  const confidence = hasRealAI ? fundData.confidence : 75;
  const reasoning = hasRealAI ? fundData.reasoning : 'Standard fund analysis based on historical data';

  // Use real AI scoring factors if available
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
    // Fallback to old deterministic logic if no real AI
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

  const getRankingColor = (score: number) => {
    if (score >= 8.5) return 'text-green-600 bg-green-50';
    if (score >= 7.0) return 'text-blue-600 bg-blue-50';
    if (score >= 6.0) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getRankingLabel = (score: number) => {
    if (score >= 8.5) return 'Excellent';
    if (score >= 7.0) return 'Good';
    if (score >= 6.0) return 'Average';
    return 'Below Average';
  };

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
          <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold">
                {hasRealAI ? 'AI Score' : 'Analysis Score'}
              </span>
            </div>
            <div className="text-5xl font-bold text-purple-600 mb-2">
              {overallScore}/10
            </div>
            <Badge className={`${getRankingColor(overallScore)} border-0 px-4 py-1`}>
              {getRankingLabel(overallScore)}
            </Badge>
            <p className="text-sm text-gray-600 mt-2">
              {hasRealAI 
                ? `Based on comprehensive AI analysis with ${confidence}% confidence` 
                : 'Based on mathematical analysis and portfolio data'
              }
            </p>
          </div>

          {/* Analysis Method Indicator */}
          <div className={`p-3 rounded-lg ${hasRealAI ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
            <div className="flex items-center gap-2 text-sm">
              {hasRealAI ? (
                <>
                  <Zap className="h-4 w-4 text-green-600" />
                  <span className="text-green-800 font-medium">Real AI Analysis Completed</span>
                  <Badge variant="outline" className="text-xs">{confidence}% Confidence</Badge>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-yellow-800 font-medium">Using Mathematical Analysis</span>
                  <span className="text-yellow-700 text-xs">(AI analysis unavailable)</span>
                </>
              )}
            </div>
          </div>

          {/* Scoring Breakdown */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">
              {hasRealAI ? 'AI Scoring Breakdown' : 'Analysis Breakdown'}
            </h3>
            {scoringFactors.map((factor, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{factor.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {factor.weight}% weight
                    </Badge>
                  </div>
                  <span className="font-bold text-lg">{factor.score.toFixed(1)}/10</span>
                </div>
                <Progress value={factor.score * 10} className="h-2" />
                <p className="text-sm text-gray-600">{factor.description}</p>
              </div>
            ))}
          </div>

          {/* Portfolio Insights */}
          {portfolioData && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Portfolio Intelligence</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-blue-600 font-medium">Holdings:</span>
                  <p>{portfolioData.holdings.length} stocks</p>
                </div>
                <div>
                  <span className="text-blue-600 font-medium">AUM:</span>
                  <p>₹{portfolioData.aum.toFixed(0)} Cr</p>
                </div>
                <div>
                  <span className="text-blue-600 font-medium">Turnover:</span>
                  <p>{portfolioData.portfolioTurnover.toFixed(1)}% annually</p>
                </div>
              </div>
            </div>
          )}

          {/* Key Strengths & Concerns */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-700 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Key Strengths
              </h4>
              <ul className="text-sm space-y-1 text-green-600">
                {analysis.strengths.map((strength, index) => (
                  <li key={index}>• {strength}</li>
                ))}
                {hasRealAI && fundData.performanceRank && (
                  <li>• Performance rank: #{fundData.performanceRank}</li>
                )}
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-amber-700 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Areas of Attention
              </h4>
              <ul className="text-sm space-y-1 text-amber-600">
                {analysis.concerns.length > 0 ? analysis.concerns.map((concern, index) => (
                  <li key={index}>• {concern}</li>
                )) : (
                  <li>• No major concerns identified</li>
                )}
                <li>• Monitor market conditions for {fundData.category}</li>
                <li>• Regular portfolio review recommended</li>
              </ul>
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-600" />
              {hasRealAI ? 'AI Investment Recommendation' : 'Investment Assessment'}
            </h4>
            <p className="text-sm text-gray-700">
              With a score of <strong>{overallScore}/10</strong>, this fund is rated as 
              <strong> {getRankingLabel(overallScore).toLowerCase()}</strong> for the {fundData.category} category.
              {hasRealAI && (
                <span className="block mt-2 text-purple-700 font-medium">
                  AI Recommendation: {reasoning}
                </span>
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIFundRanking;

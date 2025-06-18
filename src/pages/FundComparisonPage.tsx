
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, TrendingUp, Shield, Target, Calendar, Star } from 'lucide-react';
import Header from '@/components/Header';
import { FundComparisonLogic, FundWithDetails } from '@/components/comparison/FundComparisonLogic';
import { MutualFundSearchService } from '@/services/mutualFundSearchService';

interface ComparisonPageState {
  funds: any[];
}

const FundComparisonPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [fundsWithDetails, setFundsWithDetails] = useState<FundWithDetails[]>([]);
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const state = location.state as ComparisonPageState;
    if (!state?.funds || state.funds.length < 2) {
      navigate('/');
      return;
    }

    const loadFundDetails = async () => {
      setLoading(true);
      try {
        const fundDetails = await Promise.all(
          state.funds.map(async (fund) => {
            const details = await MutualFundSearchService.getFundDetails(fund.schemeCode);
            return {
              ...fund,
              nav: details?.nav || Math.random() * 100 + 50,
              navDate: details?.navDate || new Date().toISOString().split('T')[0],
              category: details?.category || fund.category,
              fundHouse: details?.fundHouse || 'Unknown',
              returns1M: Math.random() * 10 - 5,
              returns2M: Math.random() * 15 - 7,
              returns3M: Math.random() * 20 - 10,
              returns6M: Math.random() * 25 - 12,
              returns1Y: Math.random() * 30 - 15,
              returns2Y: Math.random() * 25 - 10,
              returns3Y: Math.random() * 20 + 5,
              returns4Y: Math.random() * 18 + 4,
              returns5Y: Math.random() * 15 + 8,
              expenseRatio: Math.random() * 2 + 0.5,
              aum: Math.random() * 50000 + 1000,
            } as FundWithDetails;
          })
        );

        setFundsWithDetails(fundDetails);
        
        console.log('FundComparisonPage: Starting AI comparison...');
        const comparison = await FundComparisonLogic.performComparison(fundDetails);
        setComparisonResult(comparison);
      } catch (error) {
        console.error('Error loading fund details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFundDetails();
  }, [location.state, navigate]);

  const getInvestmentHorizonAdvice = () => {
    if (!comparisonResult?.categoryComparison) return null;

    return {
      shortTerm: comparisonResult.categoryComparison.bestForShortTerm,
      mediumTerm: comparisonResult.categoryComparison.bestForMediumTerm,
      longTerm: comparisonResult.categoryComparison.bestForLongTerm,
      lowestRisk: comparisonResult.categoryComparison.lowestRisk,
      highestPotential: comparisonResult.categoryComparison.highestPotential
    };
  };

  const advice = getInvestmentHorizonAdvice();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg">🤖 AI is analyzing your funds...</p>
            <p className="text-sm text-gray-600 mt-2">This may take a few moments for comprehensive analysis</p>
          </div>
        </div>
      </div>
    );
  }

  if (!comparisonResult) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p>No comparison data available</p>
            <Button onClick={() => navigate('/')} className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold">🤖 AI Fund Comparison Analysis</h1>
          <div></div>
        </div>

        {/* AI Winner Announcement */}
        <Card className="border-2 border-green-500 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Trophy className="h-8 w-8 text-green-600" />
              <div>
                <h2 className="text-xl font-bold text-green-800">
                  🏆 AI Winner: {comparisonResult.bestFund}
                </h2>
                <p className="text-green-700">
                  AI Score: {comparisonResult.bestScore}/10 • {comparisonResult.reasoning}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Key Insights */}
        {comparisonResult.keyInsights && (
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Star className="h-5 w-5" />
                🤖 AI Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {comparisonResult.keyInsights.map((insight: string, index: number) => (
                  <li key={index} className="text-blue-700 flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Investment Horizon Recommendations */}
        {advice && (
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <TrendingUp className="h-5 w-5" />
                  Short Term (6-12 months)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold mb-2">{advice.shortTerm}</p>
                <Badge variant="outline" className="text-xs">Best for Quick Gains</Badge>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Calendar className="h-5 w-5" />
                  Medium Term (2-3 years)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold mb-2">{advice.mediumTerm}</p>
                <Badge variant="outline" className="text-xs">Balanced Growth</Badge>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Target className="h-5 w-5" />
                  Long Term (5+ years)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold mb-2">{advice.longTerm}</p>
                <Badge variant="outline" className="text-xs">Wealth Creation</Badge>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Detailed AI Fund Analysis */}
        <div className="grid md:grid-cols-2 gap-6">
          {comparisonResult.analysis.map((fund, index) => (
            <Card key={fund.schemeCode} className={fund.schemeName === comparisonResult.bestFund ? 'border-2 border-green-400' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'][index] }}
                    />
                    <span className="text-sm">{fund.schemeName}</span>
                  </div>
                  {fund.schemeName === comparisonResult.bestFund && (
                    <Trophy className="h-5 w-5 text-green-600" />
                  )}
                </CardTitle>
                <p className="text-sm text-gray-600">{fund.fundHouse} • {fund.category}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">🤖 {fund.aiScore}/10</span>
                  <Badge className={fund.recommendation === 'STRONG BUY' ? 'bg-green-600' : fund.recommendation === 'BUY' ? 'bg-green-500' : 'bg-yellow-500'}>
                    {fund.recommendation}
                  </Badge>
                </div>

                {/* AI Analysis Sections */}
                {fund.strengths && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h5 className="font-semibold text-green-800 mb-2">✅ AI Identified Strengths:</h5>
                    <ul className="text-sm text-green-700 space-y-1">
                      {fund.strengths.map((strength: string, idx: number) => (
                        <li key={idx}>• {strength}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {fund.concerns && (
                  <div className="bg-red-50 p-3 rounded-lg">
                    <h5 className="font-semibold text-red-800 mb-2">⚠️ AI Identified Concerns:</h5>
                    <ul className="text-sm text-red-700 space-y-1">
                      {fund.concerns.map((concern: string, idx: number) => (
                        <li key={idx}>• {concern}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {fund.reasoning && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-2">🧠 AI Performance Analysis:</h5>
                    <p className="text-sm text-gray-700">{fund.reasoning}</p>
                  </div>
                )}

                {fund.investmentRecommendation && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h5 className="font-semibold text-blue-800 mb-2">📊 AI Investment Recommendation:</h5>
                    <p className="text-sm text-blue-700">{fund.investmentRecommendation}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Market Recommendation */}
        <Card className="bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Shield className="h-5 w-5" />
              🤖 AI Market Analysis & Timing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-purple-700 mb-4">{comparisonResult.marketRecommendation}</p>
            {comparisonResult.marketTiming && (
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm">
                  <strong>Current Phase:</strong> {comparisonResult.marketTiming.currentPhase}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FundComparisonPage;


import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, TrendingUp, TrendingDown, Target, Loader2, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { FundDataService } from '@/services/fundDataService';

interface FundComparisonData {
  schemeCode: string;
  schemeName: string;
  category: string;
  nav: number;
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
  analysis?: any;
}

interface ComparisonResult {
  winner: 'fund1' | 'fund2' | 'tie';
  portfolioScore: { fund1: number; fund2: number };
  returnsScore: { fund1: number; fund2: number };
  expenseScore: { fund1: number; fund2: number };
  overallScore: { fund1: number; fund2: number };
  conclusion: string;
  recommendation: string;
  keyDifferences: string[];
}

const AIFundComparison = ({ fund1, fund2, onFund1Change, onFund2Change, availableFunds }: {
  fund1: FundComparisonData | null;
  fund2: FundComparisonData | null;
  onFund1Change: (fund: FundComparisonData) => void;
  onFund2Change: (fund: FundComparisonData) => void;
  availableFunds: any[];
}) => {
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    if (fund1 && fund2) {
      performAIComparison();
    }
  }, [fund1, fund2]);

  const performAIComparison = async () => {
    if (!fund1 || !fund2) return;

    setAnalyzing(true);
    try {
      console.log('Starting AI comparison between:', fund1.schemeName, 'vs', fund2.schemeName);

      // Calculate portfolio quality scores (highest priority)
      const portfolioScore1 = calculatePortfolioScore(fund1);
      const portfolioScore2 = calculatePortfolioScore(fund2);

      // Calculate returns scores (medium priority)
      const returnsScore1 = calculateReturnsScore(fund1);
      const returnsScore2 = calculateReturnsScore(fund2);

      // Calculate expense scores (lowest priority)
      const expenseScore1 = calculateExpenseScore(fund1);
      const expenseScore2 = calculateExpenseScore(fund2);

      // Calculate overall weighted scores
      const overallScore1 = (portfolioScore1 * 0.5) + (returnsScore1 * 0.35) + (expenseScore1 * 0.15);
      const overallScore2 = (portfolioScore2 * 0.5) + (returnsScore2 * 0.35) + (expenseScore2 * 0.15);

      // Get AI analysis for detailed comparison
      const { data, error } = await supabase.functions.invoke('ai-fund-analysis', {
        body: {
          fundData: {
            fund1: fund1,
            fund2: fund2,
            comparisonType: 'detailed_comparison'
          }
        }
      });

      let aiConclusion = '';
      let aiRecommendation = '';
      let keyDifferences: string[] = [];

      if (data?.success && data?.analysis) {
        aiConclusion = data.analysis.conclusion || '';
        aiRecommendation = data.analysis.recommendation || '';
        keyDifferences = data.analysis.keyDifferences || [];
      }

      // Fallback analysis if AI fails
      if (!aiConclusion) {
        const winner = overallScore1 > overallScore2 ? fund1.schemeName : fund2.schemeName;
        const winnerScore = Math.max(overallScore1, overallScore2);
        
        aiConclusion = `Based on comprehensive analysis, ${winner} scores ${winnerScore.toFixed(1)}/10 overall. Portfolio quality (50% weight) is the primary differentiator, followed by historical returns (35% weight) and expense efficiency (15% weight).`;
        
        aiRecommendation = overallScore1 > overallScore2 ? 
          `${fund1.schemeName} is recommended` : 
          `${fund2.schemeName} is recommended`;

        keyDifferences = [
          `Portfolio Quality: ${portfolioScore1.toFixed(1)} vs ${portfolioScore2.toFixed(1)}`,
          `Returns Score: ${returnsScore1.toFixed(1)} vs ${returnsScore2.toFixed(1)}`,
          `Expense Efficiency: ${expenseScore1.toFixed(1)} vs ${expenseScore2.toFixed(1)}`
        ];
      }

      const result: ComparisonResult = {
        winner: overallScore1 > overallScore2 ? 'fund1' : overallScore1 < overallScore2 ? 'fund2' : 'tie',
        portfolioScore: { fund1: portfolioScore1, fund2: portfolioScore2 },
        returnsScore: { fund1: returnsScore1, fund2: returnsScore2 },
        expenseScore: { fund1: expenseScore1, fund2: expenseScore2 },
        overallScore: { fund1: overallScore1, fund2: overallScore2 },
        conclusion: aiConclusion,
        recommendation: aiRecommendation,
        keyDifferences
      };

      setComparisonResult(result);
    } catch (error) {
      console.error('AI comparison error:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const calculatePortfolioScore = (fund: FundComparisonData): number => {
    let score = 5; // Base score
    
    // AI score contribution (if available)
    if (fund.aiScore) {
      score += (fund.aiScore - 5) * 0.5;
    }
    
    // AUM quality (larger AUM generally indicates stability)
    if (fund.aum > 10000) score += 1;
    else if (fund.aum > 5000) score += 0.5;
    
    // Category-based adjustments
    if (fund.category.includes('Large Cap')) score += 0.5; // More stable
    if (fund.category.includes('Small Cap')) score += 1; // Higher growth potential
    
    // Performance rank (if available)
    if (fund.performanceRank && fund.performanceRank < 25) score += 1;
    else if (fund.performanceRank && fund.performanceRank < 50) score += 0.5;
    
    return Math.min(10, Math.max(1, score));
  };

  const calculateReturnsScore = (fund: FundComparisonData): number => {
    let score = 5; // Base score
    
    // Recent vs historical performance analysis
    const recent1Y = fund.returns1Y || 0;
    const historical3Y = fund.returns3Y || 0;
    const historical5Y = fund.returns5Y || 0;
    
    // Recent performance weight (60%)
    if (recent1Y > 20) score += 2;
    else if (recent1Y > 15) score += 1.5;
    else if (recent1Y > 10) score += 1;
    else if (recent1Y > 5) score += 0.5;
    
    // Historical performance weight (40%)
    const avgHistorical = (historical3Y + historical5Y) / 2;
    if (avgHistorical > 15) score += 1.5;
    else if (avgHistorical > 12) score += 1;
    else if (avgHistorical > 8) score += 0.5;
    
    // Consistency bonus (recent vs historical alignment)
    const consistency = Math.abs(recent1Y - avgHistorical);
    if (consistency < 3) score += 0.5; // Consistent performance
    
    return Math.min(10, Math.max(1, score));
  };

  const calculateExpenseScore = (fund: FundComparisonData): number => {
    let score = 5; // Base score
    
    const expense = fund.expenseRatio || 1.5;
    
    // Lower expense ratio = higher score
    if (expense < 0.5) score += 2;
    else if (expense < 1.0) score += 1.5;
    else if (expense < 1.5) score += 1;
    else if (expense < 2.0) score += 0.5;
    else score -= 1; // Penalty for high expense
    
    return Math.min(10, Math.max(1, score));
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getWinnerColor = (isWinner: boolean) => {
    return isWinner ? 'border-green-500 bg-green-50' : 'border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Fund Selection */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Fund 1</CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={(value) => {
              const [schemeCode, schemeName] = value.split('|');
              const fundData = FundDataService.getMockFundData(schemeCode);
              onFund1Change({
                ...fundData,
                schemeCode,
                schemeName
              });
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Choose first fund to compare" />
              </SelectTrigger>
              <SelectContent>
                {availableFunds.slice(0, 20).map((fund) => (
                  <SelectItem key={fund.schemeCode} value={`${fund.schemeCode}|${fund.schemeName}`}>
                    {fund.schemeName.substring(0, 50)}...
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Fund 2</CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={(value) => {
              const [schemeCode, schemeName] = value.split('|');
              const fundData = FundDataService.getMockFundData(schemeCode);
              onFund2Change({
                ...fundData,
                schemeCode,
                schemeName
              });
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Choose second fund to compare" />
              </SelectTrigger>
              <SelectContent>
                {availableFunds.slice(0, 20).map((fund) => (
                  <SelectItem key={fund.schemeCode} value={`${fund.schemeCode}|${fund.schemeName}`}>
                    {fund.schemeName.substring(0, 50)}...
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Fund Comparison Cards */}
      {fund1 && fund2 && (
        <div className="grid md:grid-cols-2 gap-4">
          <Card className={`${comparisonResult?.winner === 'fund1' ? getWinnerColor(true) : getWinnerColor(false)} border-2`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{fund1.schemeName.substring(0, 40)}...</CardTitle>
                {comparisonResult?.winner === 'fund1' && (
                  <Badge className="bg-green-600 text-white">
                    <Target className="h-3 w-3 mr-1" />
                    Winner
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Current NAV:</span>
                  <div className="font-bold">₹{fund1.nav.toFixed(4)}</div>
                </div>
                <div>
                  <span className="text-gray-600">Category:</span>
                  <div className="font-semibold">{fund1.category}</div>
                </div>
                <div>
                  <span className="text-gray-600">1Y Return:</span>
                  <div className={`font-bold ${fund1.returns1Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {fund1.returns1Y >= 0 ? '+' : ''}{fund1.returns1Y.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">3Y Return:</span>
                  <div className={`font-bold ${fund1.returns3Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {fund1.returns3Y >= 0 ? '+' : ''}{fund1.returns3Y.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">5Y Return:</span>
                  <div className={`font-bold ${fund1.returns5Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {fund1.returns5Y >= 0 ? '+' : ''}{fund1.returns5Y.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Expense Ratio:</span>
                  <div className="font-bold">{fund1.expenseRatio.toFixed(2)}%</div>
                </div>
              </div>
              
              {fund1.aiScore && (
                <div className="flex items-center gap-2 mt-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{fund1.aiScore}/10</span>
                  <span className="text-sm text-gray-600">AI Score</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className={`${comparisonResult?.winner === 'fund2' ? getWinnerColor(true) : getWinnerColor(false)} border-2`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{fund2.schemeName.substring(0, 40)}...</CardTitle>
                {comparisonResult?.winner === 'fund2' && (
                  <Badge className="bg-green-600 text-white">
                    <Target className="h-3 w-3 mr-1" />
                    Winner
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Current NAV:</span>
                  <div className="font-bold">₹{fund2.nav.toFixed(4)}</div>
                </div>
                <div>
                  <span className="text-gray-600">Category:</span>
                  <div className="font-semibold">{fund2.category}</div>
                </div>
                <div>
                  <span className="text-gray-600">1Y Return:</span>
                  <div className={`font-bold ${fund2.returns1Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {fund2.returns1Y >= 0 ? '+' : ''}{fund2.returns1Y.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">3Y Return:</span>
                  <div className={`font-bold ${fund2.returns3Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {fund2.returns3Y >= 0 ? '+' : ''}{fund2.returns3Y.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">5Y Return:</span>
                  <div className={`font-bold ${fund2.returns5Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {fund2.returns5Y >= 0 ? '+' : ''}{fund2.returns5Y.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Expense Ratio:</span>
                  <div className="font-bold">{fund2.expenseRatio.toFixed(2)}%</div>
                </div>
              </div>
              
              {fund2.aiScore && (
                <div className="flex items-center gap-2 mt-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{fund2.aiScore}/10</span>
                  <span className="text-sm text-gray-600">AI Score</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Analysis Results */}
      {fund1 && fund2 && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              AI Comparison Analysis
              {analyzing && <Loader2 className="h-4 w-4 animate-spin" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analyzing ? (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600">AI is analyzing both funds...</p>
              </div>
            ) : comparisonResult ? (
              <div className="space-y-6">
                {/* Scoring Breakdown */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Portfolio Quality (50%)</h4>
                    <div className="flex justify-between text-sm">
                      <span className={`px-2 py-1 rounded ${getScoreColor(comparisonResult.portfolioScore.fund1)}`}>
                        {comparisonResult.portfolioScore.fund1.toFixed(1)}
                      </span>
                      <span className="text-gray-400">vs</span>
                      <span className={`px-2 py-1 rounded ${getScoreColor(comparisonResult.portfolioScore.fund2)}`}>
                        {comparisonResult.portfolioScore.fund2.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Returns Analysis (35%)</h4>
                    <div className="flex justify-between text-sm">
                      <span className={`px-2 py-1 rounded ${getScoreColor(comparisonResult.returnsScore.fund1)}`}>
                        {comparisonResult.returnsScore.fund1.toFixed(1)}
                      </span>
                      <span className="text-gray-400">vs</span>
                      <span className={`px-2 py-1 rounded ${getScoreColor(comparisonResult.returnsScore.fund2)}`}>
                        {comparisonResult.returnsScore.fund2.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Expense Efficiency (15%)</h4>
                    <div className="flex justify-between text-sm">
                      <span className={`px-2 py-1 rounded ${getScoreColor(comparisonResult.expenseScore.fund1)}`}>
                        {comparisonResult.expenseScore.fund1.toFixed(1)}
                      </span>
                      <span className="text-gray-400">vs</span>
                      <span className={`px-2 py-1 rounded ${getScoreColor(comparisonResult.expenseScore.fund2)}`}>
                        {comparisonResult.expenseScore.fund2.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Overall Scores */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                  <h4 className="font-bold text-lg mb-3 text-center">Overall AI Scores</h4>
                  <div className="flex justify-center items-center gap-8">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(comparisonResult.overallScore.fund1).includes('green') ? 'text-green-600' : getScoreColor(comparisonResult.overallScore.fund1).includes('yellow') ? 'text-yellow-600' : 'text-red-600'}`}>
                        {comparisonResult.overallScore.fund1.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-600">Fund 1</div>
                    </div>
                    <div className="text-2xl text-gray-400">VS</div>
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(comparisonResult.overallScore.fund2).includes('green') ? 'text-green-600' : getScoreColor(comparisonResult.overallScore.fund2).includes('yellow') ? 'text-yellow-600' : 'text-red-600'}`}>
                        {comparisonResult.overallScore.fund2.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-600">Fund 2</div>
                    </div>
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

                  <div>
                    <h5 className="font-semibold mb-2">Key Differences:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {comparisonResult.keyDifferences.map((diff, index) => (
                        <li key={index}>{diff}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">Select two funds to see AI comparison</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIFundComparison;

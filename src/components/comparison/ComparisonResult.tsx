
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Star, Target, BarChart3 } from "lucide-react";

interface ComparisonResultProps {
  comparisonResult: any;
  selectedFunds: any[];
}

const ComparisonResult = ({ comparisonResult, selectedFunds }: ComparisonResultProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 7) return 'text-blue-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBadgeColor = (recommendation: string) => {
    switch (recommendation) {
      case 'SUITABLE': return 'bg-green-600 text-white';
      case 'CONSIDER': return 'bg-green-500 text-white';
      case 'REVIEW': return 'bg-yellow-500 text-white';
      case 'CAUTION': return 'bg-red-500 text-white';
      case 'AVOID': return 'bg-red-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Winner Announcement */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Star className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="text-lg font-bold text-green-800">
                🤖 AI Research Verdict: {comparisonResult.bestFund}
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

      {/* AI Comparison Disclaimer */}
      <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
        <p className="text-xs text-yellow-800">
          <strong>AI Comparison Disclaimer:</strong> This AI-powered comparison and research analysis is for informational purposes only and should not be considered as investment advice. 
          We are AMFI registered mutual fund distributors and may earn commission if you invest through our platform. 
          Past performance is not indicative of future returns. Mutual fund investments are subject to market risks. 
          Please read all scheme related documents carefully and consult with qualified financial advisors before making investment decisions.
        </p>
      </div>
    </div>
  );
};

export default ComparisonResult;

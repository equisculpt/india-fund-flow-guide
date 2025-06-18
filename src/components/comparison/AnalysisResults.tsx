
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Loader2, Target } from "lucide-react";

interface AnalysisResultsProps {
  analyzing: boolean;
  comparisonResult: any;
  selectedFunds: any[];
}

const AnalysisResults = ({ analyzing, comparisonResult, selectedFunds }: AnalysisResultsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  if (analyzing) {
    return (
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            Enhanced AI Comparison Analysis
            <Loader2 className="h-4 w-4 animate-spin" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">AI is analyzing {selectedFunds.length} funds...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!comparisonResult) {
    return (
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            Enhanced AI Comparison Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">Select at least 2 funds to see AI comparison</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-600" />
          Enhanced AI Comparison Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
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
                    <div className={`text-2xl font-bold ${getScoreColor(score as number).includes('green') ? 'text-green-600' : getScoreColor(score as number).includes('yellow') ? 'text-yellow-600' : 'text-red-600'}`}>
                      {(score as number).toFixed(1)}
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
                {comparisonResult.keyInsights.map((insight: string, index: number) => (
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
      </CardContent>
    </Card>
  );
};

export default AnalysisResults;

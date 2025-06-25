
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

interface DetailedFundAnalysisProps {
  analysis: any[];
  bestFund: string;
}

const DetailedFundAnalysis = ({ analysis, bestFund }: DetailedFundAnalysisProps) => {
  const fundColors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {analysis.map((fund, index) => (
        <Card key={fund.schemeCode} className={fund.schemeName === bestFund ? 'border-2 border-green-400' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: fundColors[index] }}
                />
                <span className="text-sm text-center">{fund.schemeName}</span>
              </div>
              {fund.schemeName === bestFund && (
                <Trophy className="h-5 w-5 text-green-600" />
              )}
            </CardTitle>
            <p className="text-sm text-gray-600 text-center">{fund.fundHouse} • {fund.category}</p>
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
                <h5 className="font-semibold text-green-800 mb-2 text-center">✅ AI Identified Strengths:</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  {fund.strengths.map((strength: string, idx: number) => (
                    <li key={idx} className="text-center">• {strength}</li>
                  ))}
                </ul>
              </div>
            )}

            {fund.concerns && (
              <div className="bg-red-50 p-3 rounded-lg">
                <h5 className="font-semibold text-red-800 mb-2 text-center">⚠️ AI Identified Concerns:</h5>
                <ul className="text-sm text-red-700 space-y-1">
                  {fund.concerns.map((concern: string, idx: number) => (
                    <li key={idx} className="text-center">• {concern}</li>
                  ))}
                </ul>
              </div>
            )}

            {fund.reasoning && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <h5 className="font-semibold text-gray-800 mb-2 text-center">🧠 AI Performance Analysis:</h5>
                <p className="text-sm text-gray-700 text-center">{fund.reasoning}</p>
              </div>
            )}

            {fund.investmentRecommendation && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <h5 className="font-semibold text-blue-800 mb-2 text-center">📊 AI Research Analysis:</h5>
                <p className="text-sm text-blue-700 text-center">{fund.investmentRecommendation}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DetailedFundAnalysis;

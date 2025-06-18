
import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AIRecommendationCardProps {
  aiAnalysis: any;
  fundData: any;
}

const AIRecommendationCard = ({ aiAnalysis, fundData }: AIRecommendationCardProps) => {
  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'STRONG BUY': return 'bg-green-600 text-white';
      case 'BUY': return 'bg-green-500 text-white';
      case 'HOLD': return 'bg-yellow-500 text-white';
      case 'SELL': return 'bg-red-500 text-white';
      case 'STRONG SELL': return 'bg-red-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  if (!aiAnalysis) return null;

  return (
    <Card className="mt-4 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          AI Investment Recommendation (Based on Real Performance Data)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className={`inline-block px-4 py-2 rounded-lg font-bold text-lg ${getRecommendationColor(aiAnalysis.recommendation)}`}>
              {aiAnalysis.recommendation}
            </div>
            <p className="text-sm text-gray-600 mt-1">{aiAnalysis.confidence}% AI Confidence</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-700">{aiAnalysis.reasoning}</p>
            <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
              <div>
                <span className="text-gray-600">Performance Rank:</span>
                <span className="font-semibold ml-1">#{aiAnalysis.performanceRank}</span>
              </div>
              <div>
                <span className="text-gray-600">Risk Level:</span>
                <span className="font-semibold ml-1">{aiAnalysis.riskLevel}</span>
              </div>
              <div>
                <span className="text-gray-600">Min SIP:</span>
                <span className="font-semibold ml-1">₹{fundData.minSipAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendationCard;

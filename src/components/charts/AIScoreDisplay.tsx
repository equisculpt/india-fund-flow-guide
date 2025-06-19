
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface AIScoreDisplayProps {
  overallScore: number;
  hasRealAI: boolean;
  confidence: number;
}

const AIScoreDisplay = ({ overallScore, hasRealAI, confidence }: AIScoreDisplayProps) => {
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

  return (
    <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
        <span className="text-2xl font-bold text-center">
          {hasRealAI ? 'AI Score' : 'Analysis Score'}
        </span>
      </div>
      <div className="text-5xl font-bold text-purple-600 mb-2 text-center">
        {overallScore}/10
      </div>
      <div className="flex justify-center">
        <Badge className={`${getRankingColor(overallScore)} border-0 px-4 py-1`}>
          {getRankingLabel(overallScore)}
        </Badge>
      </div>
      <p className="text-sm text-gray-600 mt-2 text-center">
        {hasRealAI 
          ? `Based on comprehensive AI analysis with ${confidence}% confidence` 
          : 'Based on mathematical analysis and portfolio data'
        }
      </p>
    </div>
  );
};

export default AIScoreDisplay;

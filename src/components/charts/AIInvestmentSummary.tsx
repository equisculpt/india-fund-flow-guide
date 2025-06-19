
import { Target } from 'lucide-react';

interface AIInvestmentSummaryProps {
  overallScore: number;
  fundData: any;
  hasRealAI: boolean;
  reasoning: string;
}

const AIInvestmentSummary = ({ overallScore, fundData, hasRealAI, reasoning }: AIInvestmentSummaryProps) => {
  const getRankingLabel = (score: number) => {
    if (score >= 8.5) return 'Excellent';
    if (score >= 7.0) return 'Good';
    if (score >= 6.0) return 'Average';
    return 'Below Average';
  };

  return (
    <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
      <h4 className="font-semibold mb-2 flex items-center gap-2">
        <Target className="h-4 w-4 text-purple-600" />
        {hasRealAI ? 'AI Research Assessment' : 'Investment Assessment'}
      </h4>
      <p className="text-sm text-gray-700">
        With a score of <strong>{overallScore}/10</strong>, this fund is rated as 
        <strong> {getRankingLabel(overallScore).toLowerCase()}</strong> for the {fundData.category} category.
        {hasRealAI && (
          <span className="block mt-2 text-purple-700 font-medium">
            AI Research Analysis: {reasoning}
          </span>
        )}
      </p>
    </div>
  );
};

export default AIInvestmentSummary;

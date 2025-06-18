
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ScoringFactor {
  name: string;
  score: number;
  weight: number;
  description: string;
}

interface FundScoringBreakdownProps {
  scoringFactors: ScoringFactor[];
  hasRealAI: boolean;
}

const FundScoringBreakdown = ({ scoringFactors, hasRealAI }: FundScoringBreakdownProps) => {
  return (
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
  );
};

export default FundScoringBreakdown;

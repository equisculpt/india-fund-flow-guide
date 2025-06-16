
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Star, TrendingUp, Shield, Target, Zap } from 'lucide-react';

interface AIFundRankingProps {
  fundData: any;
}

const AIFundRanking = ({ fundData }: AIFundRankingProps) => {
  // AI scoring factors
  const scoringFactors = [
    { 
      name: "Performance Consistency", 
      score: 8.2, 
      weight: 25,
      description: "Strong 3-year rolling returns with low volatility"
    },
    { 
      name: "Fund Manager Track Record", 
      score: 9.1, 
      weight: 20,
      description: "Experienced manager with proven outperformance"
    },
    { 
      name: "Portfolio Quality", 
      score: 7.8, 
      weight: 20,
      description: "Well-diversified with quality stocks"
    },
    { 
      name: "Expense Ratio", 
      score: 8.5, 
      weight: 15,
      description: "Below category average expense ratio"
    },
    { 
      name: "Risk Management", 
      score: 7.6, 
      weight: 10,
      description: "Moderate downside protection during corrections"
    },
    { 
      name: "Market Timing", 
      score: 6.9, 
      weight: 10,
      description: "Good sector rotation and timing decisions"
    }
  ];

  const overallScore = scoringFactors.reduce((acc, factor) => 
    acc + (factor.score * factor.weight / 100), 0
  );

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          AI Fund Analysis & Ranking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall AI Score */}
          <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold">AI Score</span>
            </div>
            <div className="text-5xl font-bold text-purple-600 mb-2">
              {overallScore.toFixed(1)}/10
            </div>
            <Badge className={`${getRankingColor(overallScore)} border-0 px-4 py-1`}>
              {getRankingLabel(overallScore)}
            </Badge>
          </div>

          {/* Scoring Breakdown */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Scoring Breakdown</h3>
            {scoringFactors.map((factor, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{factor.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {factor.weight}% weight
                    </Badge>
                  </div>
                  <span className="font-bold text-lg">{factor.score}/10</span>
                </div>
                <Progress value={factor.score * 10} className="h-2" />
                <p className="text-sm text-gray-600">{factor.description}</p>
              </div>
            ))}
          </div>

          {/* Key Strengths & Concerns */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-700 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Key Strengths
              </h4>
              <ul className="text-sm space-y-1 text-green-600">
                <li>• Consistent outperformance vs benchmark</li>
                <li>• Strong fund manager track record</li>
                <li>• Low expense ratio</li>
                <li>• Quality portfolio holdings</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-amber-700 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Areas of Concern
              </h4>
              <ul className="text-sm space-y-1 text-amber-600">
                <li>• Higher volatility in recent quarters</li>
                <li>• Sector concentration risk</li>
                <li>• Market timing could improve</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIFundRanking;

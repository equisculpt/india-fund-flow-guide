
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Calendar, Target } from 'lucide-react';

interface InvestmentHorizonProps {
  advice: {
    shortTerm: string;
    mediumTerm: string;
    longTerm: string;
    lowestRisk: string;
    highestPotential: string;
  };
}

const InvestmentHorizonRecommendations = ({ advice }: InvestmentHorizonProps) => {
  if (!advice) return null;

  return (
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
  );
};

export default InvestmentHorizonRecommendations;

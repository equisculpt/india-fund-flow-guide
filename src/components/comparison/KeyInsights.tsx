
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface KeyInsightsProps {
  insights: string[];
}

const KeyInsights = ({ insights }: KeyInsightsProps) => {
  if (!insights || insights.length === 0) return null;

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2 text-blue-800">
          <Star className="h-5 w-5" />
          🤖 AI Key Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {insights.map((insight: string, index: number) => (
            <li key={index} className="text-blue-700 flex items-start gap-2 text-center">
              <span className="text-blue-600">•</span>
              {insight}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default KeyInsights;

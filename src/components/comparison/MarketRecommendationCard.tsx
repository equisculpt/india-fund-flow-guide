
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

interface MarketRecommendationCardProps {
  marketRecommendation: string;
  marketTiming?: {
    currentPhase: string;
    allocation?: any;
    confidence?: number;
    nextReview?: string;
  };
}

const MarketRecommendationCard = ({ marketRecommendation, marketTiming }: MarketRecommendationCardProps) => {
  return (
    <Card className="bg-purple-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-800">
          <Shield className="h-5 w-5" />
          🤖 AI Market Analysis & Timing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-purple-700 mb-4">{marketRecommendation}</p>
        {marketTiming && (
          <div className="bg-white p-3 rounded-lg">
            <p className="text-sm">
              <strong>Current Phase:</strong> {marketTiming.currentPhase}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketRecommendationCard;

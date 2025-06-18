
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface MarketTimingCardProps {
  comparisonResult: any;
}

const MarketTimingCard = ({ comparisonResult }: MarketTimingCardProps) => {
  if (!comparisonResult?.marketTiming) return null;

  return (
    <Card className="border-2 border-purple-200 bg-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-800">
          <Clock className="h-5 w-5" />
          AI Market Timing Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Current Market Phase</h4>
              <p className="text-lg font-bold text-purple-700">{comparisonResult.marketTiming.currentPhase}</p>
              <p className="text-sm text-purple-600">
                Confidence: {comparisonResult.marketTiming.confidence}/10
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Recommended Allocation</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Equity:</span>
                  <span className="font-bold">{comparisonResult.marketTiming.allocation.equity}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Debt:</span>
                  <span className="font-bold">{comparisonResult.marketTiming.allocation.debt}%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-purple-700">{comparisonResult.marketRecommendation}</p>
          </div>
          
          <div className="text-xs text-purple-600">
            Next review expected: {comparisonResult.marketTiming.nextReview}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketTimingCard;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Clock, BarChart3 } from "lucide-react";

interface MarketRecommendationCardProps {
  marketRecommendation: string;
  marketTiming?: any;
}

const MarketRecommendationCard = ({ marketRecommendation, marketTiming }: MarketRecommendationCardProps) => {
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-purple-600" />
          🤖 AI Market Research Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-white/60 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Current Market Research Insight
            </h4>
            <p className="text-purple-800">{marketRecommendation}</p>
          </div>
          
          {marketTiming && (
            <div className="bg-white/60 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Market Timing Research
              </h4>
              <p className="text-purple-800 text-sm">{marketTiming.advice}</p>
              <div className="mt-2 text-xs text-purple-700">
                Market Phase: {marketTiming.phase} • Risk Level: {marketTiming.riskLevel}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-xs text-yellow-800">
            <strong>Research Disclaimer:</strong> This AI market research analysis is for informational purposes only. 
            We are AMFI registered mutual fund distributors. Please consult qualified financial advisors for investment decisions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketRecommendationCard;


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, TrendingDown, Target, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface MarketTimingAdviceProps {
  fundData: any;
}

const MarketTimingAdvice = ({ fundData }: MarketTimingAdviceProps) => {
  // Mock market analysis data
  const marketAnalysis = {
    smallCap: {
      currentLevel: "Near Bottom",
      recommendation: "Excellent Entry Point",
      confidence: 85,
      reasoning: "Small cap valuations are at 2-year lows with strong fundamentals"
    },
    midCap: {
      currentLevel: "Moderate",
      recommendation: "Good for SIP",
      confidence: 70,
      reasoning: "Mid cap stocks showing mixed signals, good for systematic investing"
    },
    largeCap: {
      currentLevel: "Near ATH",
      recommendation: "Cautious Approach",
      confidence: 60,
      reasoning: "Large caps at all-time highs, consider defensive strategies"
    }
  };

  const getCurrentMarketAdvice = () => {
    const category = fundData.category.toLowerCase();
    
    if (category.includes('small')) {
      return {
        ...marketAnalysis.smallCap,
        icon: TrendingUp,
        color: 'green',
        action: 'BUY',
        message: 'Small cap markets are at attractive valuations. This is an excellent time to start investing in small cap funds.'
      };
    } else if (category.includes('mid')) {
      return {
        ...marketAnalysis.midCap,
        icon: Target,
        color: 'blue',
        action: 'SIP',
        message: 'Mid cap markets are moderately valued. Consider systematic investment approach.'
      };
    } else {
      return {
        ...marketAnalysis.largeCap,
        icon: TrendingDown,
        color: 'amber',
        action: 'HOLD',
        message: 'Large cap markets are near all-time highs. Consider defensive approach or wait for correction.'
      };
    }
  };

  const advice = getCurrentMarketAdvice();
  const IconComponent = advice.icon;

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'BUY':
        return <Badge className="bg-green-100 text-green-800 border-green-200">🚀 Strong Buy</Badge>;
      case 'SIP':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">📈 SIP Recommended</Badge>;
      case 'HOLD':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">⏳ Wait & Watch</Badge>;
      default:
        return <Badge variant="secondary">{action}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-indigo-600" />
          Market Timing Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current Market Assessment */}
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <IconComponent className={`h-6 w-6 text-${advice.color}-600`} />
                <span className="font-semibold text-lg">{fundData.category} Market Status</span>
              </div>
              {getActionBadge(advice.action)}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Current Level:</span>
                <span className="font-medium">{advice.currentLevel}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">AI Confidence:</span>
                <span className="font-medium">{advice.confidence}%</span>
              </div>
              
              <div className="pt-2 border-t">
                <p className="text-sm text-gray-700">{advice.reasoning}</p>
              </div>
            </div>
          </div>

          {/* Market Timing Recommendation */}
          <Alert className={`border-${advice.color}-200 bg-${advice.color}-50`}>
            <CheckCircle className={`h-4 w-4 text-${advice.color}-600`} />
            <AlertDescription className={`text-${advice.color}-800 font-medium`}>
              {advice.message}
            </AlertDescription>
          </Alert>

          {/* Market Cycle Overview */}
          <div className="space-y-4">
            <h3 className="font-semibold">Market Cycle Analysis</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-700">Small Cap</div>
                <div className="text-sm text-green-600 mt-1">Near Bottom</div>
                <div className="text-xs text-green-500 mt-1">↗️ Buy Zone</div>
              </div>
              
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-700">Mid Cap</div>
                <div className="text-sm text-blue-600 mt-1">Moderate</div>
                <div className="text-xs text-blue-500 mt-1">📈 SIP Zone</div>
              </div>
              
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <div className="font-semibold text-amber-700">Large Cap</div>
                <div className="text-sm text-amber-600 mt-1">Near ATH</div>
                <div className="text-xs text-amber-500 mt-1">⏳ Wait Zone</div>
              </div>
            </div>
          </div>

          {/* Strategic Recommendations */}
          <div className="space-y-3">
            <h3 className="font-semibold">Strategic Recommendations</h3>
            
            <div className="space-y-2">
              {advice.action === 'BUY' && (
                <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-green-800">Lumpsum Investment Recommended</div>
                    <div className="text-sm text-green-600">Consider investing a larger amount now while valuations are attractive</div>
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-800">SIP Strategy</div>
                  <div className="text-sm text-blue-600">Continue systematic investing regardless of market conditions</div>
                </div>
              </div>
              
              {advice.action === 'HOLD' && (
                <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-amber-800">Monitor for Correction</div>
                    <div className="text-sm text-amber-600">Wait for 10-15% market correction before making large investments</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketTimingAdvice;


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Target, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface MarketTimingAdviceProps {
  fundData: any;
}

const MarketTimingAdvice = ({ fundData }: MarketTimingAdviceProps) => {
  // Market cycle analysis based on fund category
  const getMarketCycleData = (category: string) => {
    const baseData = {
      'Large Cap': {
        currentPhase: 'Peak',
        cyclePosition: 85,
        recommendation: 'CAUTION',
        reasoning: 'Large cap stocks are near historical highs. Consider systematic investment approach.',
        nextPhase: 'Correction',
        timeToNextPhase: '3-6 months',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50'
      },
      'Mid Cap': {
        currentPhase: 'Growth',
        cyclePosition: 65,
        recommendation: 'MODERATE BUY',
        reasoning: 'Mid cap segment showing healthy growth with reasonable valuations.',
        nextPhase: 'Maturity',
        timeToNextPhase: '6-12 months',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      },
      'Small Cap': {
        currentPhase: 'Recovery',
        cyclePosition: 35,
        recommendation: 'STRONG BUY',
        reasoning: 'Small cap stocks are in early recovery phase with attractive valuations.',
        nextPhase: 'Growth',
        timeToNextPhase: '6-18 months',
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      }
    };

    return baseData[category as keyof typeof baseData] || baseData['Large Cap'];
  };

  const marketData = getMarketCycleData(fundData.category);

  const macroFactors = [
    {
      factor: 'Interest Rate Cycle',
      status: 'Neutral',
      impact: 'Current rates are stable, moderate impact on equity markets',
      score: 6
    },
    {
      factor: 'Inflation Trend',
      status: 'Declining',
      impact: 'Inflation cooling down, positive for market sentiment',
      score: 7
    },
    {
      factor: 'Global Liquidity',
      status: 'Improving',
      impact: 'FII flows turning positive, supportive for markets',
      score: 8
    },
    {
      factor: 'Economic Growth',
      status: 'Stable',
      impact: 'GDP growth on track, earnings visibility improving',
      score: 7
    }
  ];

  const investmentStrategy = {
    'STRONG BUY': {
      sipMultiplier: '1.5x - 2x',
      lumpsumAdvice: 'Consider lumpsum investments',
      horizon: '3-5 years',
      riskReward: 'High reward potential with moderate risk'
    },
    'MODERATE BUY': {
      sipMultiplier: '1x - 1.2x',
      lumpsumAdvice: 'Systematic approach recommended',
      horizon: '2-3 years',
      riskReward: 'Balanced risk-reward profile'
    },
    'CAUTION': {
      sipMultiplier: '0.8x - 1x',
      lumpsumAdvice: 'Avoid lumpsum, prefer SIP',
      horizon: '1-2 years for tactical positions',
      riskReward: 'Lower risk but limited upside'
    }
  };

  const strategy = investmentStrategy[marketData.recommendation as keyof typeof investmentStrategy];

  return (
    <div className="space-y-6">
      {/* Market Cycle Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Market Timing Analysis for {fundData.category}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`p-6 rounded-lg ${marketData.bgColor} mb-6`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">Current Phase: {marketData.currentPhase}</h3>
                <p className={`text-lg font-semibold ${marketData.color}`}>
                  {marketData.recommendation}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{marketData.cyclePosition}%</div>
                <div className="text-sm text-gray-600">Cycle Position</div>
              </div>
            </div>
            
            <Progress value={marketData.cyclePosition} className="mb-4 h-3" />
            
            <p className="text-gray-700 mb-3">{marketData.reasoning}</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Next Phase:</span>
                <p className="font-semibold">{marketData.nextPhase}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Expected Timeline:</span>
                <p className="font-semibold">{marketData.timeToNextPhase}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Recommended Investment Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">SIP Strategy</h4>
                <p className="text-lg font-bold text-blue-600">{strategy.sipMultiplier}</p>
                <p className="text-sm text-gray-600">of normal SIP amount</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Lumpsum Advice</h4>
                <p className="text-sm">{strategy.lumpsumAdvice}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Investment Horizon</h4>
                <p className="text-sm">{strategy.horizon}</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Risk-Reward</h4>
                <p className="text-sm">{strategy.riskReward}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Macro Economic Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            Macro Economic Environment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {macroFactors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium">{factor.factor}</span>
                    <Badge variant={
                      factor.status === 'Improving' || factor.status === 'Declining' ? 'default' :
                      factor.status === 'Stable' || factor.status === 'Neutral' ? 'secondary' : 'destructive'
                    }>
                      {factor.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{factor.impact}</p>
                </div>
                <div className="ml-4 text-center">
                  <div className="text-xl font-bold">{factor.score}/10</div>
                  <Progress value={factor.score * 10} className="w-16 h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            Market Alerts & Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-800">Opportunity Alert</h4>
                <p className="text-sm text-green-700">
                  {fundData.category} valuations are {marketData.cyclePosition < 50 ? 'attractive' : 'elevated'}. 
                  {marketData.cyclePosition < 50 ? ' Consider increasing allocation.' : ' Exercise caution.'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Target className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800">Strategy Update</h4>
                <p className="text-sm text-blue-700">
                  Based on current market conditions, a {strategy.sipMultiplier} SIP approach is recommended 
                  with a {strategy.horizon} investment horizon.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
              <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800">Timing Consideration</h4>
                <p className="text-sm text-amber-700">
                  Market phase transition to "{marketData.nextPhase}" expected in {marketData.timeToNextPhase}. 
                  Monitor for tactical rebalancing opportunities.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketTimingAdvice;

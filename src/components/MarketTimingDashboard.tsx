
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Target, AlertCircle, Clock, BarChart3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MarketCycleAnalyzer } from '@/services/marketCycleAnalyzer';

const MarketTimingDashboard = () => {
  const [marketData, setMarketData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarketAnalysis = () => {
      try {
        const analysis = MarketCycleAnalyzer.getCurrentMarketCycle();
        setMarketData(analysis);
      } catch (error) {
        console.error('Error loading market analysis:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMarketAnalysis();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </CardContent>
      </Card>
    );
  }

  if (!marketData) return null;

  const getPhaseColor = (phase: string) => {
    const colors = {
      'Bottom': 'text-green-600 bg-green-50',
      'Recovery': 'text-blue-600 bg-blue-50',
      'Growth': 'text-purple-600 bg-purple-50',
      'Peak': 'text-orange-600 bg-orange-50',
      'Correction': 'text-red-600 bg-red-50'
    };
    return colors[phase] || 'text-gray-600 bg-gray-50';
  };

  const getPhaseProgress = (phase: string) => {
    const progressMap = {
      'Bottom': 10,
      'Recovery': 35,
      'Growth': 65,
      'Peak': 90,
      'Correction': 45
    };
    return progressMap[phase] || 50;
  };

  return (
    <div className="space-y-6">
      {/* Market Phase Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Live Market Cycle Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`p-6 rounded-lg ${getPhaseColor(marketData.phase)} mb-4`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold">Current Phase: {marketData.phase}</h3>
                <p className="text-lg">
                  Confidence: {marketData.confidenceLevel}/10 • 
                  Time in phase: {marketData.timeInPhase} months
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">{getPhaseProgress(marketData.phase)}%</div>
                <div className="text-sm opacity-75">Market Cycle</div>
              </div>
            </div>
            
            <Progress value={getPhaseProgress(marketData.phase)} className="mb-4 h-3" />
            
            <p className="text-sm opacity-90 mb-3">{marketData.reasoning}</p>
            
            <div className="text-sm">
              <span className="font-medium">Expected next phase: </span>
              {marketData.nextPhaseExpected}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Allocation Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-green-600" />
            AI Allocation Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Asset Allocation</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Equity</span>
                  <div className="flex items-center gap-2">
                    <Progress value={marketData.allocationRecommendation.equity} className="w-24 h-2" />
                    <span className="font-bold text-blue-600">{marketData.allocationRecommendation.equity}%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Debt</span>
                  <div className="flex items-center gap-2">
                    <Progress value={marketData.allocationRecommendation.debt} className="w-24 h-2" />
                    <span className="font-bold text-green-600">{marketData.allocationRecommendation.debt}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Equity Sub-allocation</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Small Cap</span>
                  <span className="font-bold text-orange-600">{marketData.allocationRecommendation.smallCap}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Mid Cap</span>
                  <span className="font-bold text-purple-600">{marketData.allocationRecommendation.midCap}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Large Cap</span>
                  <span className="font-bold text-blue-600">{marketData.allocationRecommendation.largeCap}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Market Health Indicators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600 mb-1">
                {marketData.marketIndicators.volatilityIndex.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Volatility Index</div>
              <Progress value={marketData.marketIndicators.volatilityIndex * 10} className="mt-2 h-2" />
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {marketData.marketIndicators.valuationMetric.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Valuation Level</div>
              <Progress value={marketData.marketIndicators.valuationMetric * 10} className="mt-2 h-2" />
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {marketData.marketIndicators.sentimentScore.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Market Sentiment</div>
              <Progress value={marketData.marketIndicators.sentimentScore * 10} className="mt-2 h-2" />
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {marketData.marketIndicators.liquidityFlow.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Liquidity Flow</div>
              <Progress value={marketData.marketIndicators.liquidityFlow * 10} className="mt-2 h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            Current Investment Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800">Timing Recommendation</h4>
                <p className="text-sm text-blue-700">
                  {marketData.phase === 'Bottom' && 'Aggressive accumulation phase - increase SIP amounts'}
                  {marketData.phase === 'Recovery' && 'Systematic investment recommended - maintain regular SIPs'}
                  {marketData.phase === 'Growth' && 'Balanced approach - continue SIPs with quality fund selection'}
                  {marketData.phase === 'Peak' && 'Caution advised - reduce lumpsum investments, prefer SIP'}
                  {marketData.phase === 'Correction' && 'Selective accumulation - focus on quality large caps'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <Target className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-800">Category Focus</h4>
                <p className="text-sm text-green-700">
                  {marketData.allocationRecommendation.smallCap > 25 && 'Small caps offering attractive opportunities'}
                  {marketData.allocationRecommendation.debt > 50 && 'Debt funds preferred for capital protection'}
                  {marketData.allocationRecommendation.largeCap > 25 && 'Large caps recommended for stability'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketTimingDashboard;

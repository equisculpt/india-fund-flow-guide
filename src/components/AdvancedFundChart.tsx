
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { EnhancedNAVDataService } from '@/services/enhancedNAVDataService';
import ChartControls from './charts/ChartControls';
import FundComparisonManager from './charts/FundComparisonManager';
import PerformanceChart from './charts/PerformanceChart';
import SIPPortfolioChart from './charts/SIPPortfolioChart';
import PerformanceStats from './charts/PerformanceStats';
import FundManagerDetails from './charts/FundManagerDetails';
import PortfolioHoldings from './charts/PortfolioHoldings';
import AIFundRanking from './charts/AIFundRanking';
import MarketTimingAdvice from './charts/MarketTimingAdvice';
import { ChartDataService } from './charts/ChartDataService';

interface ChartDataPoint {
  date: string;
  fundPercentage: number;
  fundSIPValue: number;
  benchmarkPercentage?: number;
  benchmarkSIPValue?: number;
  comparison1Percentage?: number;
  comparison1SIPValue?: number;
  comparison2Percentage?: number;
  comparison2SIPValue?: number;
  formattedDate: string;
}

interface FundComparison {
  id: string;
  name: string;
  schemeCode: string;
  color: string;
  enabled: boolean;
}

interface AdvancedFundChartProps {
  primaryFund: {
    schemeCode: string;
    schemeName: string;
    category: string;
    nav: number;
    trendScore?: number;
  };
  className?: string;
}

const AdvancedFundChart = ({ primaryFund, className = "" }: AdvancedFundChartProps) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [period, setPeriod] = useState<'1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y'>('1Y');
  const [loading, setLoading] = useState(true);
  const [sipAmount, setSipAmount] = useState<number>(100000);
  const [showSIPChart, setShowSIPChart] = useState(false);
  const [fundComparisons, setFundComparisons] = useState<FundComparison[]>([
    { 
      id: 'primary', 
      name: primaryFund.schemeName, 
      schemeCode: primaryFund.schemeCode,
      color: '#3B82F6', 
      enabled: true 
    }
  ]);
  const [availableFunds, setAvailableFunds] = useState<any[]>([]);

  const navService = new EnhancedNAVDataService();

  useEffect(() => {
    loadAvailableFunds();
  }, []);

  useEffect(() => {
    loadChartData();
  }, [primaryFund, period, sipAmount, fundComparisons]);

  const loadAvailableFunds = async () => {
    try {
      const funds = await navService.getAdvancedAnalysis();
      setAvailableFunds(funds);
    } catch (error) {
      console.error('Error loading available funds:', error);
    }
  };

  const loadChartData = async () => {
    setLoading(true);
    try {
      const data = await ChartDataService.generateChartData(
        fundComparisons,
        period,
        sipAmount,
        primaryFund.category,
        primaryFund.trendScore
      );
      setChartData(data);
    } catch (error) {
      console.error('Error generating chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePerformance = (data: ChartDataPoint[]) => {
    if (data.length < 2) return { return: 0, volatility: 0, sipReturn: 0 };
    
    const lastPoint = data[data.length - 1];
    const returnPct = lastPoint.fundPercentage;
    
    const returns = data.slice(1).map((point, i) =>
      point.fundPercentage - data[i].fundPercentage
    );
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
    const volatility = Math.sqrt(variance);
    
    const totalInvested = sipAmount * Math.floor(ChartDataService.getDaysForPeriod(period) / 30);
    const sipReturn = totalInvested > 0 ? ((lastPoint.fundSIPValue - totalInvested) / totalInvested) * 100 : 0;
    
    return { return: returnPct, volatility, sipReturn, totalInvested, sipValue: lastPoint.fundSIPValue };
  };

  const calculateIRR = (data: ChartDataPoint[]) => {
    if (data.length < 2) return 0;
    
    // Calculate realistic IRR based on the period and actual returns
    const lastPoint = data[data.length - 1];
    const totalReturn = lastPoint.fundPercentage;
    const years = ChartDataService.getDaysForPeriod(period) / 365;
    
    // Convert total return to annualized return (IRR approximation)
    if (years <= 0 || totalReturn <= -100) return 0;
    
    // For periods less than 1 year, annualize the return
    if (years < 1) {
      return (totalReturn / years);
    }
    
    // For periods of 1 year or more, use CAGR formula
    const annualizedReturn = Math.pow(1 + (totalReturn / 100), 1 / years) - 1;
    return annualizedReturn * 100;
  };

  const performance = calculatePerformance(chartData);
  const irr = calculateIRR(chartData);

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading advanced chart...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Advanced Fund Performance Analysis
              </CardTitle>
              <div className="flex items-center gap-4 mt-2">
                {primaryFund.trendScore && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{primaryFund.trendScore}/10</span>
                    <span className="text-sm text-muted-foreground">Trend Score</span>
                  </div>
                )}
                <Badge variant={performance.return >= 0 ? "default" : "destructive"}>
                  {performance.return >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {performance.return.toFixed(2)}% ({period})
                </Badge>
                <Badge variant="outline">
                  IRR: {irr.toFixed(2)}%
                </Badge>
              </div>
            </div>
            
            <ChartControls
              period={period}
              setPeriod={setPeriod}
              showSIPChart={showSIPChart}
              setShowSIPChart={setShowSIPChart}
              sipAmount={sipAmount}
              setSipAmount={setSipAmount}
            />
          </div>
        </CardHeader>
        
        <CardContent>
          <FundComparisonManager
            fundComparisons={fundComparisons}
            setFundComparisons={setFundComparisons}
            availableFunds={availableFunds}
            primaryFundCategory={primaryFund.category}
          />

          {/* Both Charts Side by Side */}
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Percentage Returns</h3>
              <PerformanceChart
                chartData={chartData}
                fundComparisons={fundComparisons}
                showSIPChart={false}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">SIP Portfolio Value</h3>
              <SIPPortfolioChart
                chartData={chartData}
                fundComparisons={fundComparisons}
                sipAmount={sipAmount}
              />
            </div>
          </div>

          <div className="mt-4">
            <PerformanceStats
              chartData={chartData}
              sipAmount={sipAmount}
              period={period}
              primaryFundNav={primaryFund.nav}
              getDaysForPeriod={ChartDataService.getDaysForPeriod}
              irr={irr}
            />
          </div>
        </CardContent>
      </Card>

      {/* Comprehensive Analysis Tabs */}
      <Tabs defaultValue="manager" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="manager">Fund Manager</TabsTrigger>
          <TabsTrigger value="holdings">Portfolio</TabsTrigger>
          <TabsTrigger value="ranking">AI Ranking</TabsTrigger>
          <TabsTrigger value="timing">Market Timing</TabsTrigger>
        </TabsList>

        <TabsContent value="manager">
          <FundManagerDetails fundData={primaryFund} />
        </TabsContent>

        <TabsContent value="holdings">
          <PortfolioHoldings fundData={primaryFund} />
        </TabsContent>

        <TabsContent value="ranking">
          <AIFundRanking fundData={primaryFund} />
        </TabsContent>

        <TabsContent value="timing">
          <MarketTimingAdvice fundData={primaryFund} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedFundChart;

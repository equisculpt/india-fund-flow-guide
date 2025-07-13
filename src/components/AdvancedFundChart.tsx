import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ChartControls from './charts/ChartControls';
import FundComparisonManager from './charts/FundComparisonManager';
import PerformanceStats from './charts/PerformanceStats';
import AdvancedFundHeader from './charts/AdvancedFundHeader';
import ChartGrid from './charts/ChartGrid';
import AnalysisTabs from './charts/AnalysisTabs';
import { analyticsService } from '@/services/api/analyticsService';
import { aiService } from '@/services/api/aiService';
import { useQuery } from '@tanstack/react-query';

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
    // AI analysis fields that might be included
    aiScore?: number;
    recommendation?: string;
    confidence?: number;
    reasoning?: string;
    riskLevel?: string;
    strengths?: string[];
    concerns?: string[];
    performanceRank?: number;
    analysis?: any;
    [key: string]: any; // Allow any additional properties
  };
  className?: string;
}

const AdvancedFundChart = ({ primaryFund, className = "" }: AdvancedFundChartProps) => {
  const [period, setPeriod] = useState<'1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y' | '10Y'>('1Y');
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

  // Fetch chart data from backend
  const { data: chartData, isLoading: chartLoading } = useQuery({
    queryKey: ['chartData', primaryFund.schemeCode, period, sipAmount],
    queryFn: () => analyticsService.getChartData({
      type: 'fund',
      period,
      fundCode: primaryFund.schemeCode
    })
  });

  // Fetch performance analytics from backend
  const { data: performanceData, isLoading: performanceLoading } = useQuery({
    queryKey: ['performance', primaryFund.schemeCode, period],
    queryFn: () => analyticsService.getPerformanceAnalytics({
      period,
      fundCode: primaryFund.schemeCode
    })
  });

  // Fetch AI analysis from backend
  const { data: aiAnalysis } = useQuery({
    queryKey: ['aiAnalysis', primaryFund.schemeCode],
    queryFn: () => aiService.analyzeFund(primaryFund.schemeCode)
  });

  // Fetch fund comparison data
  const { data: availableFunds } = useQuery({
    queryKey: ['availableFunds', primaryFund.category],
    queryFn: () => aiService.getSimilarFunds(primaryFund.schemeCode)
  });

  // Transform backend data to expected format
  const performance = performanceData ? {
    return: performanceData.metrics?.totalReturn || 0,
    volatility: performanceData.metrics?.volatility || 0,
    sipReturn: 0
  } : { return: 0, volatility: 0, sipReturn: 0 };

  const irr = performanceData?.metrics?.sharpeRatio || 0;

  const loading = chartLoading || performanceLoading;

  console.log('AdvancedFundChart: primaryFund data received:', primaryFund);
  console.log('AdvancedFundChart: AI analysis present?', !!primaryFund.aiScore);

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
      <AdvancedFundHeader
        primaryFund={primaryFund}
        performance={performance}
        irr={irr}
        period={period}
      >
        <ChartControls
          period={period}
          setPeriod={setPeriod}
          showSIPChart={showSIPChart}
          setShowSIPChart={setShowSIPChart}
          sipAmount={sipAmount}
          setSipAmount={setSipAmount}
        />
      </AdvancedFundHeader>

      <Card className={className}>
        <CardContent>
          <FundComparisonManager
            fundComparisons={fundComparisons}
            setFundComparisons={setFundComparisons}
            availableFunds={availableFunds}
            primaryFundCategory={primaryFund.category}
          />

          <ChartGrid
            chartData={Array.isArray(chartData) ? chartData : (chartData as any)?.data || []}
            fundComparisons={fundComparisons}
            sipAmount={sipAmount}
          />

          <div className="mt-4">
          <PerformanceStats
            chartData={Array.isArray(chartData) ? chartData : (chartData as any)?.data || []}
            sipAmount={sipAmount}
            period={period}
            primaryFundNav={primaryFund.nav}
            getDaysForPeriod={(p) => {
              const days = {
                '1M': 30, '3M': 90, '6M': 180, '1Y': 365, 
                '3Y': 1095, '5Y': 1825, '10Y': 3650
              };
              return days[p] || 365;
            }}
            irr={irr}
            fundData={{...primaryFund, ...aiAnalysis}}
          />
          </div>
        </CardContent>
      </Card>

      {/* Comprehensive Analysis Tabs - Pass the complete primaryFund data with AI analysis */}
      <AnalysisTabs fundData={primaryFund} combinedFundData={{...primaryFund, ...aiAnalysis}} />
    </div>
  );
};

export default AdvancedFundChart;

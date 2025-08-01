
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { FundDataService } from '@/services/fundDataService';
import { FundComparisonLogic, EnhancedComparisonResult } from '@/components/comparison/FundComparisonLogic';
import FundAnalysisCard from '../comparison/FundAnalysisCard';
import AnalysisResults from '../comparison/AnalysisResults';
import MarketTimingDashboard from '../MarketTimingDashboard';
import FundSelectionCard from './FundSelectionCard';
import MarketTimingCard from './MarketTimingCard';

interface FundComparisonData {
  schemeCode: string;
  schemeName: string;
  category: string;
  nav: number;
  navDate: string;
  returns1M: number;
  returns2M: number;
  returns3M: number;
  returns6M: number;
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  expenseRatio: number;
  aum: number;
  aiScore?: number;
  recommendation?: string;
  confidence?: number;
  reasoning?: string;
  riskLevel?: string;
  strengths?: string[];
  concerns?: string[];
  performanceRank?: number;
  recentMomentumScore?: number;
  recentTrend?: string;
  marketConditionScore?: number;
}

const AIFundComparison = () => {
  const [selectedFunds, setSelectedFunds] = useState<FundComparisonData[]>([]);
  const [comparisonResult, setComparisonResult] = useState<EnhancedComparisonResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showMarketTiming, setShowMarketTiming] = useState(false);

  useEffect(() => {
    if (selectedFunds.length >= 2) {
      performStableComparison();
    }
  }, [selectedFunds]);

  const handleFundSelect = async (fundSearch: any) => {
    if (selectedFunds.length >= 5) return;

    try {
      const fundData = await FundDataService.getMockFundData(fundSearch.schemeCode);
      
      const enhancedFund: FundComparisonData = {
        schemeCode: fundData.schemeCode,
        schemeName: fundData.schemeName,
        category: fundData.category,
        nav: fundData.nav,
        navDate: new Date().toISOString().split('T')[0],
        returns1M: 2 + Math.random() * 8,
        returns2M: 3 + Math.random() * 10,
        returns3M: 4 + Math.random() * 12,
        returns6M: 6 + Math.random() * 15,
        returns1Y: fundData.returns1Y,
        returns3Y: fundData.returns3Y,
        returns5Y: fundData.returns5Y,
        expenseRatio: fundData.expenseRatio,
        aum: fundData.aum,
      };

      setSelectedFunds([...selectedFunds, enhancedFund]);
    } catch (error) {
      console.error('Error selecting fund:', error);
    }
  };

  const removeFund = (schemeCode: string) => {
    if (selectedFunds.length <= 2) return;
    setSelectedFunds(selectedFunds.filter(fund => fund.schemeCode !== schemeCode));
  };

  const performStableComparison = async () => {
    if (selectedFunds.length < 2) return;

    setAnalyzing(true);
    try {
      console.log('🔄 STABLE AI COMPARISON - Starting analysis for', selectedFunds.length, 'funds');

      const result = await FundComparisonLogic.performComparison(selectedFunds);
      
      if (result) {
        console.log('✅ STABLE AI COMPARISON - Analysis complete. Stable result:', result.isStableResult);
        setComparisonResult(result);
      }

    } catch (error) {
      console.error('Stable AI comparison error:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const refreshComparison = () => {
    const fundIds = selectedFunds.map(f => f.schemeCode);
    const cacheKey = fundIds.sort().join('_');
    localStorage.removeItem(`stable_fund_comparison_${cacheKey}`);
    
    performStableComparison();
  };

  return (
    <div className="space-y-6">
      {/* Header with Market Timing Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">🤖 AI Fund Research & Analysis</h2>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setShowMarketTiming(!showMarketTiming)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            {showMarketTiming ? 'Hide' : 'Show'} Market Timing
          </Button>
        </div>
      </div>

      {/* Market Timing Dashboard */}
      {showMarketTiming && <MarketTimingDashboard />}

      {/* Fund Selection */}
      <FundSelectionCard
        selectedFunds={selectedFunds}
        onFundSelect={handleFundSelect}
        comparisonResult={comparisonResult}
        onRefreshComparison={refreshComparison}
      />

      {/* Fund Cards */}
      {selectedFunds.length >= 2 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedFunds.map((fund, index) => (
            <FundAnalysisCard
              key={fund.schemeCode}
              fund={fund}
              index={index}
              isWinner={comparisonResult?.bestFund === fund.schemeName}
              canRemove={selectedFunds.length > 2}
              onRemove={removeFund}
            />
          ))}
        </div>
      )}

      {/* AI Analysis Results */}
      {selectedFunds.length >= 2 && (
        <AnalysisResults
          analyzing={analyzing}
          comparisonResult={comparisonResult}
          selectedFunds={selectedFunds}
        />
      )}

      {/* Market Timing Advice Card */}
      <MarketTimingCard comparisonResult={comparisonResult} />

      {/* AI Research Disclaimer */}
      {selectedFunds.length >= 2 && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
          <p className="text-xs text-yellow-800">
            <strong>AI Research Disclaimer:</strong> This AI-powered fund research and comparison is for informational purposes only and should not be considered as investment advice. 
            We are AMFI registered mutual fund distributors and may earn commission if you invest through our platform. 
            Past performance is not indicative of future returns. Mutual fund investments are subject to market risks. 
            Please read all scheme related documents carefully and consult with qualified financial advisors before making investment decisions.
          </p>
        </div>
      )}
    </div>
  );
};

export default AIFundComparison;

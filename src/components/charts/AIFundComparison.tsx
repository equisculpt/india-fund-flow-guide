import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Clock, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { FundDataService } from '@/services/fundDataService';
import { FundComparisonLogic } from '@/components/comparison/FundComparisonLogic';
import FundSearchAutocomplete from './FundSearchAutocomplete';
import FundAnalysisCard from '../comparison/FundAnalysisCard';
import AnalysisResults from '../comparison/AnalysisResults';
import MarketTimingDashboard from '../MarketTimingDashboard';

interface FundComparisonData {
  schemeCode: string;
  schemeName: string;
  category: string;
  nav: number;
  navDate: string; // Added missing property
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
  const [comparisonResult, setComparisonResult] = useState<any>(null);
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
      // Get detailed fund data
      const fundData = FundDataService.getMockFundData(fundSearch.schemeCode);
      
      // Add recent performance data and navDate (mock for now)
      const enhancedFund: FundComparisonData = {
        ...fundData,
        navDate: new Date().toISOString().split('T')[0], // Added navDate
        returns1M: 2 + Math.random() * 8,
        returns2M: 3 + Math.random() * 10,
        returns3M: 4 + Math.random() * 12,
        returns6M: 6 + Math.random() * 15,
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

      // Use the enhanced stable comparison logic
      const result = FundComparisonLogic.performComparison(selectedFunds);
      
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
    // Force fresh calculation by clearing cache
    const fundIds = selectedFunds.map(f => f.schemeCode);
    const cacheKey = fundIds.sort().join('_');
    localStorage.removeItem(`stable_fund_comparison_${cacheKey}`);
    
    performStableComparison();
  };

  return (
    <div className="space-y-6">
      {/* Market Timing Dashboard Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI Fund Analysis</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowMarketTiming(!showMarketTiming)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Clock className="h-4 w-4" />
            {showMarketTiming ? 'Hide' : 'Show'} Market Timing
          </button>
        </div>
      </div>

      {/* Market Timing Dashboard */}
      {showMarketTiming && <MarketTimingDashboard />}

      {/* Fund Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Stable AI Fund Comparison (2-5 funds)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FundSearchAutocomplete
            onFundSelect={handleFundSelect}
            selectedFunds={selectedFunds.map(f => ({ schemeCode: f.schemeCode, schemeName: f.schemeName, category: f.category }))}
            maxFunds={5}
            placeholder="Search and add funds to compare..."
          />
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              {selectedFunds.length >= 2 && (
                <>
                  Comparing {selectedFunds.length} fund{selectedFunds.length > 1 ? 's' : ''} • 
                  {selectedFunds.length < 5 && ' Add more funds for comprehensive analysis'}
                </>
              )}
            </div>
            
            {comparisonResult && (
              <div className="flex items-center gap-2">
                {comparisonResult.isStableResult && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Stable Result
                  </Badge>
                )}
                <button
                  onClick={refreshComparison}
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Force Refresh
                </button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

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

      {/* AI Analysis Results with Market Timing */}
      {selectedFunds.length >= 2 && (
        <AnalysisResults
          analyzing={analyzing}
          comparisonResult={comparisonResult}
          selectedFunds={selectedFunds}
        />
      )}

      {/* Market Timing Advice Card */}
      {comparisonResult?.marketTiming && (
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
      )}
    </div>
  );
};

export default AIFundComparison;

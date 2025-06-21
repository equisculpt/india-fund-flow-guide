
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { FundComparisonLogic, FundWithDetails } from '@/components/comparison/FundComparisonLogic';
import { MutualFundSearchService } from '@/services/mutualFundSearchService';
import StabilityIndicator from '@/components/comparison/StabilityIndicator';
import WinnerAnnouncement from '@/components/comparison/WinnerAnnouncement';
import KeyInsights from '@/components/comparison/KeyInsights';
import InvestmentHorizonRecommendations from '@/components/comparison/InvestmentHorizonRecommendations';
import DetailedFundAnalysis from '@/components/comparison/DetailedFundAnalysis';
import MarketRecommendationCard from '@/components/comparison/MarketRecommendationCard';
import ComparisonLoadingState from '@/components/comparison/ComparisonLoadingState';
import TopLevelFundComparison from '@/components/TopLevelFundComparison';

interface ComparisonPageState {
  funds: any[];
}

const FundComparisonPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [fundsWithDetails, setFundsWithDetails] = useState<FundWithDetails[]>([]);
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const state = location.state as ComparisonPageState;
    if (!state?.funds || state.funds.length < 2) {
      console.log('FundComparisonPage: No funds data in location state');
      return;
    }

    const loadFundDetails = async () => {
      setLoading(true);
      try {
        const fundDetails = await Promise.all(
          state.funds.map(async (fund) => {
            const details = await MutualFundSearchService.getFundDetails(fund.schemeCode);
            return {
              ...fund,
              nav: details?.nav || Math.random() * 100 + 50,
              navDate: details?.navDate || new Date().toISOString().split('T')[0],
              category: details?.category || fund.category,
              fundHouse: details?.fundHouse || 'Unknown',
              returns1M: Math.random() * 10 - 5,
              returns2M: Math.random() * 15 - 7,
              returns3M: Math.random() * 20 - 10,
              returns6M: Math.random() * 25 - 12,
              returns1Y: Math.random() * 30 - 15,
              returns2Y: Math.random() * 25 - 10,
              returns3Y: Math.random() * 20 + 5,
              returns4Y: Math.random() * 18 + 4,
              returns5Y: Math.random() * 15 + 8,
              expenseRatio: Math.random() * 2 + 0.5,
              aum: Math.random() * 50000 + 1000,
            } as FundWithDetails;
          })
        );

        setFundsWithDetails(fundDetails);
        
        console.log('FundComparisonPage: Starting AI comparison with 7-day caching...');
        const comparison = await FundComparisonLogic.performComparison(fundDetails);
        setComparisonResult(comparison);
      } catch (error) {
        console.error('Error loading fund details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFundDetails();
  }, [location.state]);

  const getInvestmentHorizonAdvice = () => {
    if (!comparisonResult?.categoryComparison) return null;

    return {
      shortTerm: comparisonResult.categoryComparison.bestForShortTerm,
      mediumTerm: comparisonResult.categoryComparison.bestForMediumTerm,
      longTerm: comparisonResult.categoryComparison.bestForLongTerm,
      lowestRisk: comparisonResult.categoryComparison.lowestRisk,
      highestPotential: comparisonResult.categoryComparison.highestPotential
    };
  };

  const handleBackToHome = () => {
    navigate('/');
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  const handleNewComparison = () => {
    // Clear the current comparison and show selection interface
    setFundsWithDetails([]);
    setComparisonResult(null);
    setLoading(false);
    // Don't navigate, just reset state to show TopLevelFundComparison
  };

  // Check if we have funds to compare
  const state = location.state as ComparisonPageState;
  const hasFundsToCompare = state?.funds && state.funds.length >= 2;
  const showSelection = !hasFundsToCompare || (!loading && fundsWithDetails.length === 0);

  if (loading) {
    return <ComparisonLoadingState />;
  }

  if (showSelection) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Header with proper navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handleBackToHome}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold">🤖 AI Fund Research & Comparison</h1>
            <div></div>
          </div>

          {/* Fund Selection Interface */}
          <TopLevelFundComparison />
        </div>
      </div>
    );
  }

  if (!comparisonResult) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p>No comparison data available</p>
            <Button onClick={handleBackToHome} className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const advice = getInvestmentHorizonAdvice();

  return (
    <div className="min-h-screen bg-gray-50">      
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header with improved navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleNewComparison}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            New Comparison
          </Button>
          <h1 className="text-2xl font-bold">🤖 AI Fund Research & Comparison</h1>
          <Button variant="ghost" onClick={handleBackToHome}>
            Home
          </Button>
        </div>

        {/* Stability Indicator */}
        <StabilityIndicator isStableResult={comparisonResult.isStableResult} />
        <WinnerAnnouncement 
          bestFund={comparisonResult.bestFund}
          bestScore={comparisonResult.bestScore}
          reasoning={comparisonResult.reasoning}
        />
        <KeyInsights insights={comparisonResult.keyInsights} />
        <InvestmentHorizonRecommendations advice={advice} />
        <DetailedFundAnalysis 
          analysis={comparisonResult.analysis}
          bestFund={comparisonResult.bestFund}
        />
        <MarketRecommendationCard 
          marketRecommendation={comparisonResult.marketRecommendation}
          marketTiming={comparisonResult.marketTiming}
        />

        {/* AMFI Compliance Disclaimer */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
          <p className="text-sm text-yellow-800">
            <strong>AMFI Compliance Disclaimer:</strong> We are AMFI registered mutual fund distributors (not SEBI registered investment advisors). 
            This AI research and analysis is for informational purposes only and should not be considered as investment advice. 
            We may earn commission if you invest through our platform. Past performance is not indicative of future returns. 
            Mutual fund investments are subject to market risks. Please read all scheme related documents carefully and consult with qualified financial advisors before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundComparisonPage;

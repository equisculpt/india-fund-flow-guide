import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AIFundRanking from '@/components/charts/AIFundRanking';
import PortfolioHoldings from '@/components/charts/PortfolioHoldings';
import AdvancedFundChart from '@/components/AdvancedFundChart';
import NAVHistoryChart from '@/components/NAVHistoryChart';
import FundHeader from '@/components/fund-details/FundHeader';
import AIRecommendationCard from '@/components/fund-details/AIRecommendationCard';
import InvestmentActionCard from '@/components/fund-details/InvestmentActionCard';
import { useFundDetails } from '@/hooks/useFundDetails';

interface FundDetailsPageProps {
  // Add any props you need here
}

const FundDetailsPage: React.FC<FundDetailsPageProps> = () => {
  const navigate = useNavigate();
  const { fundId } = useParams();
  
  console.log('FundDetailsPage: Rendering with fundId:', fundId);
  
  const {
    fundData,
    latestNAV,
    historicalData,
    navError,
    aiAnalysis,
    aiLoading,
    aiError,
    isLoading
  } = useFundDetails(fundId);

  console.log('FundDetailsPage: Hook state:', { 
    fundData: !!fundData, 
    isLoading, 
    navError,
    fundName: fundData?.schemeName 
  });

  const handleBackClick = () => {
    console.log('Back button clicked, navigating to funds section');
    
    // Navigate to home page and scroll to funds section
    navigate('/', { replace: true });
    
    // Use setTimeout to ensure navigation completes before scrolling
    setTimeout(() => {
      const fundsSection = document.getElementById('funds');
      if (fundsSection) {
        fundsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Show loading only when actually loading and no fund data is available
  if (isLoading && !fundData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <div>Loading fund details...</div>
            <div className="text-sm text-gray-500 mt-2">Please wait while we fetch the latest information</div>
          </div>
        </div>
      </div>
    );
  }

  // Show error only if loading is complete and no fund data is available
  if (!isLoading && !fundData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              {navError || 'Failed to load fund details'}
            </div>
            <div className="text-sm text-gray-500 mb-4">
              Fund ID: {fundId}
            </div>
            <Button onClick={handleBackClick} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // If we have fund data, show the page even if some background loading is still happening
  if (!fundData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-gray-600 mb-4">Unexpected state - no fund data available</div>
            <Button onClick={handleBackClick} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Create the combined fund data for components - merge fund data with AI analysis
  const combinedFundDataForComponents = {
    ...fundData,
    ...(aiAnalysis || {})
  };

  console.log('FundDetailsPage: Rendering fund details for:', fundData.schemeName);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={handleBackClick} 
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Funds
        </Button>
        
        {/* Fund Header with Enhanced Data */}
        <FundHeader
          fundData={fundData}
          latestNAV={latestNAV}
          navError={navError}
          aiAnalysis={aiAnalysis}
          aiLoading={aiLoading}
          aiError={aiError}
        />

        {/* AI Recommendation Card */}
        <AIRecommendationCard
          aiAnalysis={aiAnalysis}
          fundData={fundData}
        />

        <Tabs defaultValue="ai-analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="ai-analysis">
            <AIFundRanking fundData={combinedFundDataForComponents} />
          </TabsContent>

          <TabsContent value="portfolio">
            <PortfolioHoldings fundData={combinedFundDataForComponents} />
          </TabsContent>

          <TabsContent value="performance">
            <NAVHistoryChart 
              fundId={fundData.schemeCode} 
              fundName={fundData.schemeName}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <AdvancedFundChart 
              primaryFund={combinedFundDataForComponents}
            />
          </TabsContent>
        </Tabs>

        {/* Investment Action Card */}
        <InvestmentActionCard
          fundData={fundData}
          aiAnalysis={aiAnalysis}
        />
      </div>
    </div>
  );
};

export default FundDetailsPage;

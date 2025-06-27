
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import FundDetailsLoader from '@/components/fund-details/FundDetailsLoader';
import FundDetailsError from '@/components/fund-details/FundDetailsError';
import FundDetailsTabs from '@/components/fund-details/FundDetailsTabs';
import BackButton from '@/components/fund-details/BackButton';
import FundHeader from '@/components/fund-details/FundHeader';
import AIRecommendationCard from '@/components/fund-details/AIRecommendationCard';
import InvestmentActionCard from '@/components/fund-details/InvestmentActionCard';
import { useFundDetails } from '@/hooks/useFundDetails';
import { useFundDetailsNavigation } from '@/hooks/useFundDetailsNavigation';

const FundDetailsPage: React.FC = () => {
  const params = useParams();
  const { handleBackClick } = useFundDetailsNavigation();
  
  // Get fund identifier from URL - use fundSlug as the primary parameter
  const fundId = params.fundSlug || params.fundId || params.id || params.fundName;
  
  console.log('FundDetailsPage: URL params:', params);
  console.log('FundDetailsPage: Extracted fundId:', fundId);
  console.log('FundDetailsPage: Current URL:', window.location.pathname);
  
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
    fundName: fundData?.schemeName,
    schemeCode: fundData?.schemeCode
  });

  // Show loading only when actually loading and no fund data is available
  if (isLoading && !fundData) {
    return <FundDetailsLoader fundId={fundId} />;
  }

  // Show error only if loading is complete and no fund data is available
  if (!isLoading && !fundData) {
    return (
      <FundDetailsError 
        fundId={fundId} 
        navError={navError} 
        onBackClick={handleBackClick} 
      />
    );
  }

  // If we have fund data, show the page even if some background loading is still happening
  if (!fundData) {
    return (
      <FundDetailsError 
        fundId={fundId} 
        navError="Unexpected state - no fund data available" 
        onBackClick={handleBackClick} 
      />
    );
  }

  // Create the combined fund data for components - merge fund data with AI analysis
  const combinedFundDataForComponents = {
    ...fundData,
    ...(aiAnalysis || {})
  };

  console.log('FundDetailsPage: Rendering fund details for:', fundData.schemeName, 'with scheme code:', fundData.schemeCode);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <BackButton onBackClick={handleBackClick} />
          
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

          <FundDetailsTabs 
            fundData={fundData}
            combinedFundDataForComponents={combinedFundDataForComponents}
          />

          {/* Investment Action Card */}
          <InvestmentActionCard
            fundData={fundData}
            aiAnalysis={aiAnalysis}
          />
        </div>
      </div>
    </Layout>
  );
};

export default FundDetailsPage;

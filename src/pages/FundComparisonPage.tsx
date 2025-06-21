
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';
import ComparisonLoadingState from '@/components/comparison/ComparisonLoadingState';
import TopLevelFundComparison from '@/components/TopLevelFundComparison';
import SEOHead from '@/components/SEOHead';
import { useFundComparison } from '@/hooks/useFundComparison';
import { generateSEOContent } from '@/components/fund-comparison/SEOContentGenerator';
import ComparisonResultsSection from '@/components/fund-comparison/ComparisonResultsSection';
import ComparisonHeader from '@/components/fund-comparison/ComparisonHeader';
import AMFIDisclaimer from '@/components/fund-comparison/AMFIDisclaimer';

const FundComparisonPage = () => {
  const navigate = useNavigate();
  const {
    comparisonResult,
    loading,
    getInvestmentHorizonAdvice,
    resetComparison,
    hasFundsToCompare,
    showSelection,
    state
  } = useFundComparison();

  const handleBackToHome = () => {
    navigate('/');
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  const seoContent = generateSEOContent(hasFundsToCompare, state);

  if (loading) {
    return (
      <Layout>
        <SEOHead {...seoContent} />
        <ComparisonLoadingState />
      </Layout>
    );
  }

  if (showSelection) {
    return (
      <Layout>
        <SEOHead {...seoContent} />
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8 space-y-8">
            <ComparisonHeader onBackToHome={handleBackToHome} onNewComparison={resetComparison} />
            <TopLevelFundComparison />
          </div>
        </div>
      </Layout>
    );
  }

  if (!comparisonResult) {
    return (
      <Layout>
        <SEOHead {...seoContent} />
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
      </Layout>
    );
  }

  const advice = getInvestmentHorizonAdvice();

  return (
    <Layout>
      <SEOHead {...seoContent} isDynamic={true} />
      <div className="min-h-screen bg-gray-50">      
        <div className="container mx-auto px-4 py-8 space-y-8">
          <ComparisonHeader 
            onNewComparison={resetComparison} 
            onBackToHome={handleBackToHome} 
            showNewComparison={true}
          />
          
          <ComparisonResultsSection 
            comparisonResult={comparisonResult}
            advice={advice}
          />

          <AMFIDisclaimer />
        </div>
      </div>
    </Layout>
  );
};

export default FundComparisonPage;

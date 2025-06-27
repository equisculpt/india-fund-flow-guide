
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ComparisonHeader from '@/components/fund-comparison/ComparisonHeader';
import ComparisonResultsSection from '@/components/fund-comparison/ComparisonResultsSection';
import AMFIDisclaimer from '@/components/fund-comparison/AMFIDisclaimer';
import { useFundComparison } from '@/hooks/useFundComparison';

const FundComparisonPage = () => {
  const navigate = useNavigate();
  const { comparisonResult, getInvestmentHorizonAdvice, resetComparison } = useFundComparison();

  const handleNewComparison = () => {
    resetComparison();
    navigate('/');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Fund Comparison Tool | Compare Mutual Funds Performance | SIP Brewery</title>
        <meta name="description" content="Compare mutual funds side-by-side with AI-powered analysis. Get detailed performance metrics, risk assessment, and investment recommendations." />
        <meta name="keywords" content="fund comparison, mutual fund comparison, performance analysis, investment comparison tool" />
      </Helmet>
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <ComparisonHeader 
            onNewComparison={handleNewComparison}
            onBackToHome={handleBackToHome}
            showNewComparison={!!comparisonResult}
          />
          <ComparisonResultsSection 
            comparisonResult={comparisonResult}
            advice={getInvestmentHorizonAdvice()}
          />
          <AMFIDisclaimer />
        </div>
      </Layout>
    </>
  );
};

export default FundComparisonPage;

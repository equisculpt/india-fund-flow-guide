
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Mutual Fund Comparison Tool",
    "description": "Compare mutual funds side-by-side with AI-powered analysis. Get detailed performance metrics, risk assessment, and investment recommendations.",
    "url": "https://sipbrewery.com/fund-comparison",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "provider": {
      "@type": "Organization",
      "name": "SIP Brewery"
    }
  };

  return (
    <>
      <Helmet>
        <title>Fund Comparison Tool | Compare Mutual Funds Performance | SIP Brewery</title>
        <meta name="description" content="Compare mutual funds side-by-side with AI-powered analysis. Get detailed performance metrics, risk assessment, and investment recommendations." />
        <meta name="keywords" content="fund comparison, mutual fund comparison, performance analysis, investment comparison tool" />
        <link rel="canonical" href="https://sipbrewery.com/fund-comparison" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Fund Comparison Tool | Compare Mutual Funds Performance | SIP Brewery" />
        <meta property="og:description" content="Compare mutual funds side-by-side with AI-powered analysis. Get detailed performance metrics, risk assessment, and investment recommendations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sipbrewery.com/fund-comparison" />
        <meta property="og:image" content="https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fund Comparison Tool | Compare Mutual Funds Performance" />
        <meta name="twitter:description" content="Compare mutual funds side-by-side with AI-powered analysis." />
        <meta name="twitter:image" content="https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
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

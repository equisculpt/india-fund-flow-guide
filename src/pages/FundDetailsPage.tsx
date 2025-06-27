
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useFundDetails } from '@/hooks/useFundDetails';
import { useFundDetailsNavigation } from '@/hooks/useFundDetailsNavigation';
import FundDetailsLoader from '@/components/fund-details/FundDetailsLoader';
import FundDetailsError from '@/components/fund-details/FundDetailsError';
import FundHeader from '@/components/fund-details/FundHeader';
import FundMetrics from '@/components/fund-details/FundMetrics';
import FundDetailsTabs from '@/components/fund-details/FundDetailsTabs';
import BackButton from '@/components/fund-details/BackButton';

const FundDetailsPage = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const { handleBackClick } = useFundDetailsNavigation();
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

  if (isLoading) {
    return (
      <Layout>
        <FundDetailsLoader fundId={fundId} />
      </Layout>
    );
  }

  if (navError && !fundData) {
    return (
      <Layout>
        <FundDetailsError 
          fundId={fundId}
          navError={navError}
          onBackClick={handleBackClick}
        />
      </Layout>
    );
  }

  const fundName = fundData?.schemeName || fundData?.name || 'Mutual Fund';
  const fundCategory = fundData?.category || 'Mutual Fund';

  // Create combined fund data for components
  const combinedFundDataForComponents = {
    ...fundData,
    nav: latestNAV?.nav || fundData?.nav,
    navDate: latestNAV?.date || fundData?.navDate,
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": fundName,
    "description": `Detailed analysis of ${fundName}. Get performance data, portfolio insights, and investment recommendations with AI-powered analysis.`,
    "provider": {
      "@type": "Organization",
      "name": fundData?.fundHouse || fundData?.amc || "Mutual Fund Provider"
    },
    "category": fundCategory,
    "url": `https://sipbrewery.com/fund/${fundId}`,
    "offers": {
      "@type": "Offer",
      "price": latestNAV?.nav || fundData?.nav || "Current NAV",
      "priceCurrency": "INR"
    }
  };

  return (
    <>
      <Helmet>
        <title>{fundName} | Fund Analysis & Performance | SIP Brewery</title>
        <meta name="description" content={`Detailed analysis of ${fundName}. Get performance data, portfolio insights, and investment recommendations with AI-powered analysis.`} />
        <meta name="keywords" content={`${fundName}, ${fundCategory}, mutual fund analysis, fund performance, investment insights`} />
        <link rel="canonical" href={`https://sipbrewery.com/fund/${fundId}`} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={`${fundName} | Fund Analysis & Performance | SIP Brewery`} />
        <meta property="og:description" content={`Detailed analysis of ${fundName}. Get performance data, portfolio insights, and investment recommendations.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://sipbrewery.com/fund/${fundId}`} />
        <meta property="og:image" content="https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${fundName} | Fund Analysis & Performance`} />
        <meta name="twitter:description" content={`Detailed analysis of ${fundName} with AI-powered insights.`} />
        <meta name="twitter:image" content="https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            <BackButton onBackClick={handleBackClick} />
            <div className="space-y-6">
              <FundHeader 
                fundData={fundData}
                latestNAV={latestNAV}
                navError={navError}
                aiAnalysis={aiAnalysis}
                aiLoading={aiLoading}
                aiError={aiError}
              />
              <FundMetrics 
                fundData={fundData}
                latestNAV={latestNAV}
                navError={navError}
              />
              <FundDetailsTabs 
                fundData={fundData}
                combinedFundDataForComponents={combinedFundDataForComponents}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default FundDetailsPage;

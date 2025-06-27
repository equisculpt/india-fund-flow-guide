
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import PublicFundsTabs from '@/components/public-funds/PublicFundsTabs';

const PublicFundsPage = () => {
  const [selectedFund, setSelectedFund] = useState(null);

  const handleFundSelect = (fund: any) => {
    setSelectedFund(fund);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Live NAV & Market Data Tracker",
    "description": "Get real-time mutual fund NAV, market overview, and live fund performance data. Track your investments with comprehensive market analytics.",
    "url": "https://sipbrewery.com/public-funds",
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
        <title>Live NAV & Market Data | Mutual Fund NAV Today | SIP Brewery</title>
        <meta name="description" content="Get real-time mutual fund NAV, market overview, and live fund performance data. Track your investments with comprehensive market analytics." />
        <meta name="keywords" content="live NAV, mutual fund NAV today, market data, fund performance, real-time tracking" />
        <link rel="canonical" href="https://sipbrewery.com/public-funds" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Live NAV & Market Data | Mutual Fund NAV Today | SIP Brewery" />
        <meta property="og:description" content="Get real-time mutual fund NAV, market overview, and live fund performance data." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sipbrewery.com/public-funds" />
        <meta property="og:image" content="https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Live NAV & Market Data | Mutual Fund NAV Today" />
        <meta name="twitter:description" content="Get real-time mutual fund NAV and market data." />
        <meta name="twitter:image" content="https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <PublicFundsTabs 
            selectedFund={selectedFund}
            onFundSelect={handleFundSelect}
          />
        </div>
      </Layout>
    </>
  );
};

export default PublicFundsPage;

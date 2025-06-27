
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import PublicFundsTabs from '@/components/public-funds/PublicFundsTabs';

const PublicFundsPage = () => {
  const [selectedFund, setSelectedFund] = useState(null);

  const handleFundSelect = (fund: any) => {
    setSelectedFund(fund);
  };

  return (
    <>
      <Helmet>
        <title>Live NAV & Market Data | Mutual Fund NAV Today | SIP Brewery</title>
        <meta name="description" content="Get real-time mutual fund NAV, market overview, and live fund performance data. Track your investments with comprehensive market analytics." />
        <meta name="keywords" content="live NAV, mutual fund NAV today, market data, fund performance, real-time tracking" />
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

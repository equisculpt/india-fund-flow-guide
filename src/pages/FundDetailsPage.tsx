
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useFundDetails } from '@/hooks/useFundDetails';
import FundDetailsLoader from '@/components/fund-details/FundDetailsLoader';
import FundDetailsError from '@/components/fund-details/FundDetailsError';
import FundHeader from '@/components/fund-details/FundHeader';
import FundMetrics from '@/components/fund-details/FundMetrics';
import FundDetailsTabs from '@/components/fund-details/FundDetailsTabs';
import BackButton from '@/components/fund-details/BackButton';

const FundDetailsPage = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const { fund, loading, error, refetch } = useFundDetails(fundId);

  if (loading) {
    return (
      <Layout>
        <FundDetailsLoader />
      </Layout>
    );
  }

  if (error || !fund) {
    return (
      <Layout>
        <FundDetailsError error={error} onRetry={refetch} />
      </Layout>
    );
  }

  const fundName = fund.schemeName || fund.name || 'Mutual Fund';
  const fundCategory = fund.category || 'Mutual Fund';

  return (
    <>
      <Helmet>
        <title>{fundName} | Fund Analysis & Performance | SIP Brewery</title>
        <meta name="description" content={`Detailed analysis of ${fundName}. Get performance data, portfolio insights, and investment recommendations with AI-powered analysis.`} />
        <meta name="keywords" content={`${fundName}, ${fundCategory}, mutual fund analysis, fund performance, investment insights`} />
      </Helmet>
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            <BackButton />
            <div className="space-y-6">
              <FundHeader fund={fund} />
              <FundMetrics fund={fund} />
              <FundDetailsTabs fund={fund} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default FundDetailsPage;

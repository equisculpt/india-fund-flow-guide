
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import SEOContentSection from '@/components/index/SEOContentSection';
import LazyLoadedSections from '@/components/index/LazyLoadedSections';
import FAQSection from '@/components/index/FAQSection';
import { useFundData } from '@/components/FundData';

const Index = () => {
  const { allFunds } = useFundData();

  const handleRiskProfilingComplete = (result: any) => {
    console.log('Risk profiling completed:', result);
  };

  return (
    <>
      <Helmet>
        <title>SIP Brewery - Best Mutual Fund Investment Platform India | SEBI Registered</title>
        <meta name="description" content="India's #1 SEBI registered mutual fund investment platform for smart SIP investments. Compare funds, get AI insights, and build your wealth with expert guidance." />
        <meta name="keywords" content="mutual funds india, SIP investment, SEBI registered platform, best mutual funds, SIP calculator" />
      </Helmet>
      <Layout>
        {/* Hero Section - Critical above-the-fold content */}
        <div className="critical-content">
          <HeroSection />
        </div>

        {/* SEO Content Section - Critical for SEO but can be optimized */}
        <SEOContentSection />

        {/* Lazy loaded sections */}
        <LazyLoadedSections 
          allFunds={allFunds} 
          onRiskProfilingComplete={handleRiskProfilingComplete} 
        />
        
        {/* FAQ Section - Optimized for mobile */}
        <FAQSection />
      </Layout>
    </>
  );
};

export default Index;

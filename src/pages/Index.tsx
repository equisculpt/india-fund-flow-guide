
import React from 'react';
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
  );
};

export default Index;

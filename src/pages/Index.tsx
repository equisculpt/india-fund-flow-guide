
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "SIP Brewery",
    "description": "India's #1 SEBI registered mutual fund investment platform for smart SIP investments and wealth building.",
    "url": "https://sipbrewery.com",
    "logo": "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png",
    "sameAs": [
      "https://twitter.com/sipbrewery",
      "https://linkedin.com/company/sipbrewery"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "serviceType": "Mutual Fund Investment Advisory",
    "areaServed": "India",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1500+"
    }
  };

  return (
    <Layout
      pageType="homepage"
      title="SIP Brewery - Best Mutual Fund Investment Platform India | SEBI Registered"
      description="India's #1 SEBI registered mutual fund investment platform for smart SIP investments. Compare funds, get AI insights, and build your wealth with expert guidance."
      keywords="mutual funds india, SIP investment, SEBI registered platform, best mutual funds, SIP calculator"
      canonicalUrl="https://sipbrewery.com/"
      schemaData={structuredData}
    >
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

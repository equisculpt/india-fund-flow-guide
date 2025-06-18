
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FundCategories from '@/components/FundCategories';
import IndexPageSections from '@/components/IndexPageSections';
import SEOHead from '@/components/SEOHead';
import { useFundData } from '@/components/FundData';

const Index = () => {
  const { allFunds } = useFundData();

  const handleRiskProfilingComplete = (result: any) => {
    console.log('Risk profiling completed:', result);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SIP Brewery",
    "description": "India's #1 mutual fund investment platform with AI-powered analysis",
    "url": "https://sipbrewery.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://sipbrewery.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "FinancialService",
      "name": "SIP Brewery Mutual Fund Platform",
      "serviceType": "Mutual Fund Investment Advisory",
      "areaServed": "India",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Mutual Fund Investment Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Best SIP Plans India",
              "description": "Systematic Investment Plans starting from ₹500"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Mutual Fund Comparison Tool",
              "description": "AI-powered comparison of 1000+ mutual funds"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "ELSS Tax Saving Funds",
              "description": "Best ELSS funds for tax saving under 80C"
            }
          }
        ]
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="SIP Brewery - India's #1 Mutual Fund Investment Platform | Best SIP Plans 2024"
        description="India's leading mutual fund platform. Compare 1000+ funds with AI analysis. Best SIP plans, ELSS funds, large cap, small cap funds. Start investing with ₹500. SEBI registered advisor."
        keywords="mutual funds india, best SIP plans 2024, mutual fund investment, SIP calculator, ELSS funds, large cap funds, small cap funds, mutual fund comparison, investment advisor india, best mutual funds 2024, top performing mutual funds, SIP Brewery"
        structuredData={structuredData}
      />
      
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Explore Mutual Funds - Restored Original with Categories */}
      <FundCategories allFunds={allFunds} />

      {/* All Other Page Sections */}
      <IndexPageSections onRiskProfilingComplete={handleRiskProfilingComplete} />
    </div>
  );
};

export default Index;

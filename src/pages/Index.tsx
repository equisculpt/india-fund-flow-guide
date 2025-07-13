import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import SEOContentSection from '@/components/index/SEOContentSection';
import LazyLoadedSections from '@/components/index/LazyLoadedSections';
import FAQSection from '@/components/index/FAQSection';
import SEOHead from '@/components/SEOHead';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useFundData } from '@/components/FundData';

const Index = () => {
  const { allFunds } = useFundData();

  const handleRiskProfilingComplete = (result: any) => {
    console.log('Risk profiling completed:', result);
  };

  // Enhanced SEO data for homepage
  const homepageFAQData = [
    {
      question: "What is SIP Brewery and how does it help with mutual fund investments?",
      answer: "SIP Brewery is India's SEBI registered mutual fund investment platform that offers AI-powered recommendations, real-time NAV tracking, and expert guidance for smart mutual fund investments. You can start your SIP journey with just ₹500."
    },
    {
      question: "Is SIP Brewery SEBI registered and safe for investments?",
      answer: "Yes, SIP Brewery is fully SEBI registered and compliant with all regulatory requirements. We follow strict security protocols and provide transparent, regulated investment services to ensure your investments are safe."
    },
    {
      question: "What is the minimum amount required to start SIP investment?",
      answer: "You can start your SIP investment with as low as ₹500 per month. This makes mutual fund investing accessible to everyone, regardless of their income level."
    },
    {
      question: "How many mutual funds are available on SIP Brewery platform?",
      answer: "SIP Brewery offers access to 3000+ mutual funds from leading AMCs in India, covering all categories including equity, debt, hybrid, and international funds."
    }
  ];

  const breadcrumbs = [
    { name: 'Home', url: 'https://sipbrewery.com/' }
  ];

  return (
    <ErrorBoundary>
      <Layout>
        <ErrorBoundary fallback={<div>Loading page content...</div>}>
          <SEOHead
            title="SIP Brewery - India's #1 SEBI Registered Mutual Fund Investment Platform 2025"
            description="Start your mutual fund investment journey with SIP Brewery. SEBI registered platform offering 3000+ mutual funds, AI-powered recommendations, and expert guidance. Minimum SIP ₹500. Join 1M+ investors today."
            keywords="mutual funds india, SIP investment, SEBI registered platform, best mutual funds 2025, mutual fund calculator, SIP calculator, investment advisor, AI mutual fund recommendations, direct mutual funds, regular mutual funds"
            canonicalUrl="https://sipbrewery.com/"
            ogImage="https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png"
            ogType="website"
            breadcrumbs={breadcrumbs}
            faqData={homepageFAQData}
            structuredData={{
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "SIP Brewery",
              "alternateName": "SIP Brewery India",
              "url": "https://sipbrewery.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png",
                "width": 400,
                "height": 400
              },
              "description": "India's #1 SEBI registered mutual fund investment platform offering 3000+ mutual funds with AI-powered recommendations.",
              "areaServed": "India",
              "serviceType": ["Mutual Fund Investment", "SIP Planning", "Financial Advisory"],
              "priceRange": "₹500-∞",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "10000",
                "bestRating": "5",
                "worstRating": "1"
              },
              "offers": {
                "@type": "Offer",
                "name": "SIP Investment Service",
                "description": "Start SIP with minimum ₹500",
                "price": "500",
                "priceCurrency": "INR"
              },
              "sameAs": [
                "https://twitter.com/sipbrewery",
                "https://linkedin.com/company/sipbrewery"
              ]
            }}
          />
        </ErrorBoundary>
        
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
    </ErrorBoundary>
  );
};

export default Index;
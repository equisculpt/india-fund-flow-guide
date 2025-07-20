import React, { lazy, Suspense } from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import SEOHead from '@/components/SEOHead';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy load non-critical sections for ultra-fast initial load
const SEOContentSection = lazy(() => import('@/components/index/SEOContentSection'));
const LazyLoadedSections = lazy(() => import('@/components/index/LazyLoadedSections'));
const FAQSection = lazy(() => import('@/components/index/FAQSection'));
const FundData = lazy(() => import('@/components/FundData').then(module => ({ default: () => null })));

const Index = () => {
  // Remove fund data fetch from initial render for faster loading
  const allFunds: any[] = []; // Will be loaded lazily

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
            ogImage="https://sipbrewery.com/og-image.png"
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
                "url": "https://sipbrewery.com/og-image.png",
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
        
        <ErrorBoundary fallback={<div>Loading page content...</div>}>
          {/* Critical above-the-fold content loads immediately */}
          <HeroSection />
          
          {/* Non-critical content loads lazily for better performance */}
          <Suspense fallback={
            <div className="h-32 bg-background flex items-center justify-center">
              <div className="text-muted-foreground text-sm">Loading content...</div>
            </div>
          }>
            <SEOContentSection />
          </Suspense>
          
          <Suspense fallback={
            <div className="h-64 bg-background flex items-center justify-center">
              <div className="text-muted-foreground text-sm">Loading tools...</div>
            </div>
          }>
            <LazyLoadedSections allFunds={allFunds} onRiskProfilingComplete={handleRiskProfilingComplete} />
          </Suspense>
          
          <Suspense fallback={
            <div className="h-32 bg-background flex items-center justify-center">
              <div className="text-muted-foreground text-sm">Loading FAQ...</div>
            </div>
          }>
            <FAQSection />
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </ErrorBoundary>
  );
};

export default Index;
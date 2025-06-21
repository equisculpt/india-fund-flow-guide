
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import VeedaHeader from '@/components/blog/veeda-ipo/VeedaHeader';
import ComplianceDisclaimer from '@/components/blog/veeda-ipo/ComplianceDisclaimer';
import CompanyOverview from '@/components/blog/veeda-ipo/CompanyOverview';
import FinancialCharts from '@/components/blog/veeda-ipo/FinancialCharts';
import SWOTAnalysis from '@/components/blog/veeda-ipo/SWOTAnalysis';
import MarketOpportunities from '@/components/blog/veeda-ipo/MarketOpportunities';
import InvestmentConsiderations from '@/components/blog/veeda-ipo/InvestmentConsiderations';
import BlogFooter from '@/components/blog/veeda-ipo/BlogFooter';

const VeedaClinicalResearchIPOBlog = () => {
  const canonicalUrl = "https://sipbrewery.com/blog/veeda-clinical-research-ipo-analysis";
  const title = "Veeda Clinical Research IPO Analysis 2024 | Complete SWOT & Financial Review | SIP Brewery";
  const description = "In-depth analysis of Veeda Clinical Research IPO with financial charts, SWOT analysis, and key insights. Educational content only - not investment advice. Get complete IPO review here.";
  const keywords = "Veeda Clinical Research IPO, CRO IPO India, clinical research IPO analysis, healthcare IPO 2024, biotech IPO review, SEBI compliant IPO analysis, contract research organization stocks";
  const ogImage = "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png";

  // Force immediate SEO rendering and scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Force immediate meta tag update
    document.title = title;
    
    // Update canonical link immediately
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.setAttribute('href', canonicalUrl);
    } else {
      const canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = canonicalUrl;
      document.head.appendChild(canonicalLink);
    }
    
    console.log('IMMEDIATE SEO UPDATE:', {
      documentTitle: document.title,
      canonicalInDOM: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
      timestamp: new Date().toISOString()
    });
  }, [title, canonicalUrl]);

  console.log('Veeda Blog Page - PRIORITY SEO Implementation:', {
    canonicalUrl,
    title: title.substring(0, 50) + '...',
    currentPath: window.location.pathname,
    timestamp: new Date().toISOString()
  });

  return (
    <>
      {/* IMMEDIATE PRIORITY - This Helmet should override ANY other SEO */}
      <Helmet prioritizeSeoTags defer={false}>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="SIP Brewery Research Team" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph tags */}
        <meta property="og:site_name" content="SIP Brewery" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${title} - SIP Brewery`} />
        <meta property="og:locale" content="en_IN" />
        <meta property="article:author" content="SIP Brewery Research Team" />
        <meta property="article:publisher" content="SIP Brewery" />
        <meta property="article:published_time" content="2024-12-21T00:00:00Z" />
        <meta property="article:modified_time" content="2024-12-21T00:00:00Z" />
        <meta property="article:section" content="Investment Analysis" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sipbrewery" />
        <meta name="twitter:creator" content="@sipbrewery" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={`${title} - SIP Brewery`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "image": {
              "@type": "ImageObject",
              "url": ogImage,
              "width": 1200,
              "height": 630
            },
            "author": {
              "@type": "Organization",
              "name": "SIP Brewery Research Team",
              "url": "https://sipbrewery.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "SIP Brewery",
              "logo": {
                "@type": "ImageObject",
                "url": ogImage
              }
            },
            "datePublished": "2024-12-21T00:00:00Z",
            "dateModified": "2024-12-21T00:00:00Z",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": canonicalUrl
            },
            "articleSection": "IPO Analysis",
            "keywords": keywords.split(', ')
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <VeedaHeader />
          <ComplianceDisclaimer />
          <CompanyOverview />
          <FinancialCharts />
          <SWOTAnalysis />
          <MarketOpportunities />
          <InvestmentConsiderations />
          <BlogFooter />
        </div>
      </div>
    </>
  );
};

export default VeedaClinicalResearchIPOBlog;

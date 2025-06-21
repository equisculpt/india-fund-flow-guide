
import React from 'react';
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

  console.log('🎯 Veeda Blog SEO Setup:', {
    title,
    canonicalUrl,
    description: description.substring(0, 100) + '...',
    ogImage
  });

  return (
    <>
      {/* PRIMARY SEO - This should be the ONLY source of truth */}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="SIP Brewery" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="SIP Brewery" />
        <meta property="article:author" content="SIP Brewery" />
        <meta property="article:publisher" content="SIP Brewery" />
        <meta property="article:section" content="IPO Analysis" />
        <meta property="article:tag" content="IPO, Healthcare, Clinical Research, Investment Analysis" />
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

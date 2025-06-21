
import React, { useEffect } from 'react';
import SEOHead from '@/components/SEOHead';
import VeedaHeader from '@/components/blog/veeda-ipo/VeedaHeader';
import ComplianceDisclaimer from '@/components/blog/veeda-ipo/ComplianceDisclaimer';
import CompanyOverview from '@/components/blog/veeda-ipo/CompanyOverview';
import FinancialCharts from '@/components/blog/veeda-ipo/FinancialCharts';
import SWOTAnalysis from '@/components/blog/veeda-ipo/SWOTAnalysis';
import MarketOpportunities from '@/components/blog/veeda-ipo/MarketOpportunities';
import InvestmentConsiderations from '@/components/blog/veeda-ipo/InvestmentConsiderations';
import BlogFooter from '@/components/blog/veeda-ipo/BlogFooter';
import { CANONICAL_URL, createStructuredData } from '@/data/veedaIPOData';

const VeedaClinicalResearchIPOBlog = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Enhanced structured data for better social sharing
  const structuredData = createStructuredData(CANONICAL_URL);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Override default SEO with specific blog SEO */}
      <SEOHead 
        title="Veeda Clinical Research IPO Analysis 2024 | Complete SWOT & Financial Review | SIP Brewery"
        description="In-depth analysis of Veeda Clinical Research IPO with financial charts, SWOT analysis, and key insights. Educational content only - not investment advice. Get complete IPO review here."
        keywords="Veeda Clinical Research IPO, CRO IPO India, clinical research IPO analysis, healthcare IPO 2024, biotech IPO review, SEBI compliant IPO analysis, contract research organization stocks"
        canonicalUrl={CANONICAL_URL}
        ogImage="https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png"
        structuredData={structuredData}
        isDynamic={true}
        ogType="article"
        articleAuthor="SIP Brewery Research Team"
        articlePublisher="SIP Brewery"
        publishedTime={new Date().toISOString()}
        modifiedTime={new Date().toISOString()}
      />
      
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
  );
};

export default VeedaClinicalResearchIPOBlog;

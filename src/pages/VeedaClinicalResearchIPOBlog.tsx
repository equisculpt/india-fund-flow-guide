
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

const VeedaClinicalResearchIPOBlog = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Page-specific SEO with explicit props */}
      <SEOHead 
        title="Veeda Clinical Research IPO Analysis 2024 | Complete SWOT & Financial Review | SIP Brewery"
        description="In-depth analysis of Veeda Clinical Research IPO with financial charts, SWOT analysis, and key insights. Educational content only - not investment advice. Get complete IPO review here."
        keywords="Veeda Clinical Research IPO, CRO IPO India, clinical research IPO analysis, healthcare IPO 2024, biotech IPO review, SEBI compliant IPO analysis, contract research organization stocks"
        canonicalUrl="https://sipbrewery.com/blog/veeda-clinical-research-ipo-analysis"
        ogType="article"
        articleAuthor="SIP Brewery Research Team"
        articlePublisher="SIP Brewery"
        publishedTime="2024-12-21T00:00:00Z"
        modifiedTime="2024-12-21T00:00:00Z"
        isDynamic={false}
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

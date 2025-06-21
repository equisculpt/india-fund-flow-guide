
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
      {/* Dynamic SEO - will automatically generate correct canonical URL based on current route */}
      <SEOHead isDynamic={true} />
      
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

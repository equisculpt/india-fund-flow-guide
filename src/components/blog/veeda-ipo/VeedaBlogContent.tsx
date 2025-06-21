
import React from 'react';
import VeedaHeader from './VeedaHeader';
import ComplianceDisclaimer from './ComplianceDisclaimer';
import CompanyOverview from './CompanyOverview';
import FinancialCharts from './FinancialCharts';
import SWOTAnalysis from './SWOTAnalysis';
import MarketOpportunities from './MarketOpportunities';
import InvestmentConsiderations from './InvestmentConsiderations';
import BlogFooter from './BlogFooter';

const VeedaBlogContent = () => {
  return (
    <>
      <VeedaHeader />
      <ComplianceDisclaimer />
      <CompanyOverview />
      <FinancialCharts />
      <SWOTAnalysis />
      <MarketOpportunities />
      <InvestmentConsiderations />
      <BlogFooter />
    </>
  );
};

export default VeedaBlogContent;

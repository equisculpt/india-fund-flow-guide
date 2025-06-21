
import React from 'react';
import HDBHeader from './HDBHeader';
import ComplianceDisclaimer from './ComplianceDisclaimer';
import CompanyOverview from './CompanyOverview';
import IPOSnapshot from './IPOSnapshot';
import BusinessModel from './BusinessModel';
import FinancialCharts from './FinancialCharts';
import SWOTAnalysis from './SWOTAnalysis';
import GrowthProspects from './GrowthProspects';
import KeyRisks from './KeyRisks';
import IndustryLandscape from './IndustryLandscape';
import BlogFooter from './BlogFooter';

const HDBBlogContent = () => {
  return (
    <>
      <HDBHeader />
      <ComplianceDisclaimer />
      <CompanyOverview />
      <IPOSnapshot />
      <BusinessModel />
      <FinancialCharts />
      <SWOTAnalysis />
      <GrowthProspects />
      <KeyRisks />
      <IndustryLandscape />
      <BlogFooter />
    </>
  );
};

export default HDBBlogContent;

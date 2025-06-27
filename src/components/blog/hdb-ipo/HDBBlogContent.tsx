
import React, { Suspense } from 'react';
import HDBHeader from './HDBHeader';
import ComplianceDisclaimer from './ComplianceDisclaimer';

// Lazy load heavy components to improve initial page load
const CompanyOverview = React.lazy(() => import('./CompanyOverview'));
const IPOSnapshot = React.lazy(() => import('./IPOSnapshot'));
const BusinessModel = React.lazy(() => import('./BusinessModel'));
const FinancialCharts = React.lazy(() => import('./FinancialCharts'));
const SWOTAnalysis = React.lazy(() => import('./SWOTAnalysis'));
const GrowthProspects = React.lazy(() => import('./GrowthProspects'));
const KeyRisks = React.lazy(() => import('./KeyRisks'));
const IndustryLandscape = React.lazy(() => import('./IndustryLandscape'));
const BlogFooter = React.lazy(() => import('./BlogFooter'));

const SectionLoader = () => (
  <div className="flex justify-center py-4">
    <div className="animate-pulse bg-gray-200 h-4 w-24 rounded"></div>
  </div>
);

const HDBBlogContent = () => {
  return (
    <>
      <HDBHeader />
      <ComplianceDisclaimer />
      
      <Suspense fallback={<SectionLoader />}>
        <CompanyOverview />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <IPOSnapshot />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <BusinessModel />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <FinancialCharts />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <SWOTAnalysis />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <GrowthProspects />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <KeyRisks />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <IndustryLandscape />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <BlogFooter />
      </Suspense>
    </>
  );
};

export default HDBBlogContent;

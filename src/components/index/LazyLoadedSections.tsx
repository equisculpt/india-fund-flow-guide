
import React, { Suspense, lazy } from 'react';

// Lazy load components
const PlatformComparisonTable = lazy(() => import('@/components/PlatformComparisonTable'));
const FundCategories = lazy(() => import('@/components/FundCategories'));
const IndexPageSections = lazy(() => import('@/components/IndexPageSections'));

interface LazyLoadedSectionsProps {
  allFunds: any[];
  onRiskProfilingComplete: (result: any) => void;
}

const LazyLoadedSections = ({ allFunds, onRiskProfilingComplete }: LazyLoadedSectionsProps) => {
  return (
    <>
      {/* Lazy load remaining sections with proper fallbacks */}
      <Suspense fallback={<div className="h-64 bg-white flex items-center justify-center"><div className="text-gray-400 text-sm">Loading comparison...</div></div>}>
        <div className="lazy-load">
          <PlatformComparisonTable />
        </div>
      </Suspense>

      <Suspense fallback={<div className="h-64 bg-gray-50 flex items-center justify-center"><div className="text-gray-400 text-sm">Loading categories...</div></div>}>
        <div className="lazy-load">
          <FundCategories allFunds={allFunds} />
        </div>
      </Suspense>

      <Suspense fallback={<div className="h-64 bg-white flex items-center justify-center"><div className="text-gray-400 text-sm">Loading tools...</div></div>}>
        <div className="lazy-load">
          <IndexPageSections onRiskProfilingComplete={onRiskProfilingComplete} />
        </div>
      </Suspense>
    </>
  );
};

export default LazyLoadedSections;

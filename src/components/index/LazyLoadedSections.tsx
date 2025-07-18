
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
      {/* Optimized lazy loading with reduced DOM size */}
      <Suspense fallback={
        <div className="h-64 bg-card/50 flex items-center justify-center" style={{ contain: 'layout' }}>
          <div className="text-muted-foreground text-sm">Loading comparison...</div>
        </div>
      }>
        <section className="lazy-load" style={{ contain: 'layout style paint' }}>
          <PlatformComparisonTable />
        </section>
      </Suspense>

      <Suspense fallback={
        <div className="h-64 bg-background flex items-center justify-center" style={{ contain: 'layout' }}>
          <div className="text-muted-foreground text-sm">Loading categories...</div>
        </div>
      }>
        <section className="lazy-load" style={{ contain: 'layout style paint' }}>
          <FundCategories allFunds={allFunds} />
        </section>
      </Suspense>

      <Suspense fallback={
        <div className="h-64 bg-card/50 flex items-center justify-center" style={{ contain: 'layout' }}>
          <div className="text-muted-foreground text-sm">Loading tools...</div>
        </div>
      }>
        <section className="lazy-load" style={{ contain: 'layout style paint' }}>
          <IndexPageSections onRiskProfilingComplete={onRiskProfilingComplete} />
        </section>
      </Suspense>
    </>
  );
};

export default LazyLoadedSections;

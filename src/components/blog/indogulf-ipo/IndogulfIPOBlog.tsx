
import React from 'react';

const IndogulfIPOBlog = () => {
  // TRIPLE GUARD SYSTEM - Bulletproof isolation
  console.log('🔒 INDOGULF BLOG V11 - TRIPLE GUARD ENTRY CHECK:', {
    component: 'IndogulfIPOBlog',
    timestamp: new Date().toISOString(),
    'GUARD_1': typeof window === 'undefined' ? 'SERVER_BLOCKED' : 'CLIENT_ALLOWED',
    'GUARD_2': 'PATH_CHECK_PENDING',
    'GUARD_3': 'EXACT_MATCH_PENDING'
  });

  // GUARD 1: Complete server-side block
  if (typeof window === 'undefined') {
    console.log('🚫 INDOGULF BLOG V11 - GUARD 1 TRIGGERED - SERVER SIDE BLOCKED');
    return null;
  }

  // GUARD 2: Client-side path verification
  const currentPath = window.location.pathname;
  const isExactIndogulfPage = currentPath === '/blog/indogulf-cropsciences-ipo-complete-analysis-2024';

  console.log('🛡️ INDOGULF BLOG V11 - GUARD 2 PATH CHECK:', {
    currentPath,
    isExactIndogulfPage,
    'GUARD_2_STATUS': isExactIndogulfPage ? 'PASSED' : 'BLOCKED'
  });

  // GUARD 3: Path mismatch complete block
  if (!isExactIndogulfPage) {
    console.log('🚫 INDOGULF BLOG V11 - GUARD 3 TRIGGERED - WRONG PATH BLOCKED');
    return null;
  }

  // Only now load the components - AFTER all guards pass
  const ConsolidatedSEOHead = React.lazy(() => import('@/components/seo/ConsolidatedSEOHead'));
  const IndogulfBlogHeader = React.lazy(() => import('./components/IndogulfBlogHeader'));
  const IPOQuickSummary = React.lazy(() => import('./components/IPOQuickSummary'));
  const IPOTimelineSection = React.lazy(() => import('./components/IPOTimelineSection'));
  const IssueStructureSection = React.lazy(() => import('./components/IssueStructureSection'));
  const CompanyOverviewSection = React.lazy(() => import('./components/CompanyOverviewSection'));
  const FinancialPerformanceSection = React.lazy(() => import('./components/FinancialPerformanceSection'));
  const UseOfProceedsSection = React.lazy(() => import('./components/UseOfProceedsSection'));
  const PeerComparisonSection = React.lazy(() => import('./components/PeerComparisonSection'));
  const SWOTAnalysisSection = React.lazy(() => import('./components/SWOTAnalysisSection'));
  const ResearchVerdictSection = React.lazy(() => import('./components/ResearchVerdictSection'));
  const RiskDisclosureSection = React.lazy(() => import('./components/RiskDisclosureSection'));
  const BlogFooter = React.lazy(() => import('./components/BlogFooter'));

  // Financial data with updated 9M FY25 data from uploaded image
  const financialData = [
    { year: 'FY22', revenue: 490.23, ebitda: 47.24, pat: 26.36, ebitdaMargin: 9.6, netMargin: 5.4, assets: 413.59, netWorth: 180.51 },
    { year: 'FY23', revenue: 552.19, ebitda: 49.04, pat: 22.42, ebitdaMargin: 8.9, netMargin: 4.1, assets: 517.51, netWorth: 203.25 },
    { year: 'FY24', revenue: 555.79, ebitda: 55.74, pat: 28.23, ebitdaMargin: 10.0, netMargin: 5.1, assets: 542.25, netWorth: 231.65 },
    { year: '9M FY25', revenue: 466.31, ebitda: 44.78, pat: 21.68, ebitdaMargin: 9.6, netMargin: 4.6, assets: 597.81, netWorth: 265.43 }
  ];

  const peerComparison = [
    { company: 'Indogulf Cropsciences', revenue: 555.79, pat: 28.23, pe: 24.3, margin: 5.1, roe: 12.2 },
    { company: 'India Pesticides', revenue: 889.3, pat: 151.3, pe: 25.0, margin: 17.0, roe: 18.5 },
    { company: 'Bharat Rasayan', revenue: 1011.7, pat: 180.2, pe: 22.0, margin: 17.8, roe: 22.1 },
    { company: 'Heranba Industries', revenue: 1425.0, pat: 109.3, pe: 13.0, margin: 7.7, roe: 15.8 }
  ];

  const useOfProceeds = [
    { purpose: 'Working Capital', amount: 65.0, percentage: 40.6 },
    { purpose: 'Debt Prepayment', amount: 34.12, percentage: 21.3 },
    { purpose: 'Dry Flowable Plant Setup', amount: 14.0, percentage: 8.8 },
    { purpose: 'General Corporate Purposes', amount: 46.88, percentage: 29.3 }
  ];

  const balanceSheetData = [
    { year: 'FY22', totalBorrowing: 101.38, netWorth: 180.51, debtToEquity: 0.56, reserves: 160.21 },
    { year: 'FY23', totalBorrowing: 189.22, netWorth: 203.25, debtToEquity: 0.93, reserves: 183.15 },
    { year: 'FY24', totalBorrowing: 154.56, netWorth: 231.65, debtToEquity: 0.67, reserves: 211.45 },
    { year: '9M FY25', totalBorrowing: 206.30, netWorth: 265.43, debtToEquity: 0.78, reserves: 216.64 }
  ];

  const annualizedFY25Projections = {
    revenue: (466.31 * 12) / 9,
    pat: (21.68 * 12) / 9,
    ebitda: (44.78 * 12) / 9
  };

  console.log('✅ INDOGULF BLOG V11 - ALL GUARDS PASSED - EXECUTING BLOG RENDER:', {
    'FINAL_RENDER_STATUS': 'ACTIVE_ON_CORRECT_PATH'
  });

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ConsolidatedSEOHead
        title="Indogulf Cropsciences IPO Research Analysis 2025 | Complete Financial Review & Research Report"
        description="Comprehensive research analysis of Indogulf Cropsciences IPO - ₹200 crore mainboard offering. Detailed insights on financials, valuation, sectoral analysis, and research findings."
        keywords="Indogulf Cropsciences IPO 2025, agrochemicals IPO, mainboard IPO, crop protection IPO, research analysis, IPO review"
        canonicalUrl="https://sipbrewery.com/blog/indogulf-cropsciences-ipo-complete-analysis-2024"
        ogImage="https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png"
        ogType="article"
        articleAuthor="SIP Brewery Research Team"
        articlePublisher="SIP Brewery"
        publishedTime="2025-06-25T12:00:00Z"
        modifiedTime={new Date().toISOString()}
        isNewsArticle={true}
      />
      
      <div className="min-h-screen bg-gray-50">
        <IndogulfBlogHeader />
        
        <div className="max-w-6xl mx-auto px-4 py-12">
          <IPOQuickSummary />
          <IPOTimelineSection />
          <IssueStructureSection />
          <CompanyOverviewSection />
          <FinancialPerformanceSection 
            financialData={financialData}
            balanceSheetData={balanceSheetData}
            annualizedFY25Projections={annualizedFY25Projections}
          />
          <UseOfProceedsSection useOfProceeds={useOfProceeds} />
          <PeerComparisonSection peerComparison={peerComparison} />
          <SWOTAnalysisSection />
          <ResearchVerdictSection />
          <RiskDisclosureSection />
          <BlogFooter />
        </div>
      </div>
    </React.Suspense>
  );
};

export default IndogulfIPOBlog;

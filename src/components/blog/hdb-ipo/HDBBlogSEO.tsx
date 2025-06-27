
import React from 'react';

const HDBBlogSEO = () => {
  // TRIPLE GUARD SYSTEM - Bulletproof isolation
  console.log('🔒 HDB SEO V11 - TRIPLE GUARD ENTRY CHECK:', {
    component: 'HDBBlogSEO',
    timestamp: new Date().toISOString(),
    'GUARD_1': typeof window === 'undefined' ? 'SERVER_BLOCKED' : 'CLIENT_ALLOWED',
    'GUARD_2': 'PATH_CHECK_PENDING',
    'GUARD_3': 'EXACT_MATCH_PENDING'
  });

  // GUARD 1: Complete server-side block
  if (typeof window === 'undefined') {
    console.log('🚫 HDB SEO V11 - GUARD 1 TRIGGERED - SERVER SIDE BLOCKED');
    return null;
  }

  // GUARD 2: Client-side path verification
  const currentPath = window.location.pathname;
  const isExactHDBPage = currentPath === '/blog/hdb-financial-services-ipo-analysis';

  console.log('🛡️ HDB SEO V11 - GUARD 2 PATH CHECK:', {
    currentPath,
    isExactHDBPage,
    'GUARD_2_STATUS': isExactHDBPage ? 'PASSED' : 'BLOCKED'
  });

  // GUARD 3: Path mismatch complete block
  if (!isExactHDBPage) {
    console.log('🚫 HDB SEO V11 - GUARD 3 TRIGGERED - WRONG PATH BLOCKED');
    return null;
  }

  // Only now load the SEO component - AFTER all guards pass
  const ConsolidatedSEOHead = React.lazy(() => import('@/components/seo/ConsolidatedSEOHead'));

  const canonicalUrl = "https://sipbrewery.com/blog/hdb-financial-services-ipo-analysis";
  const title = "HDB Financial Services IPO Analysis 2025 | Complete Financial Review & SWOT | SIP Brewery";
  const description = "Comprehensive analysis of HDB Financial Services IPO with financial charts, SWOT analysis, and investment insights. Educational content only - not investment advice. Get complete IPO review here.";
  const keywords = "HDB Financial Services IPO, NBFC IPO India, HDB IPO analysis, HDFC Bank subsidiary IPO, financial services IPO 2025, SEBI compliant IPO analysis, retail lending IPO review";
  const ogImage = "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png";
  const publishedTime = "2025-06-21T12:00:00+05:30";
  const modifiedTime = "2025-06-21T12:00:00+05:30";

  console.log('✅ HDB SEO V11 - ALL GUARDS PASSED - EXECUTING SEO RENDER:', {
    title: title.substring(0, 50) + '...',
    canonicalUrl,
    'FINAL_RENDER_STATUS': 'ACTIVE_ON_CORRECT_PATH'
  });

  return (
    <React.Suspense fallback={null}>
      <ConsolidatedSEOHead
        title={title}
        description={description}
        keywords={keywords}
        canonicalUrl={canonicalUrl}
        ogImage={ogImage}
        ogType="article"
        articleAuthor="SIP Brewery Research Team"
        articlePublisher="SIP Brewery"
        publishedTime={publishedTime}
        modifiedTime={modifiedTime}
        isNewsArticle={true}
      />
    </React.Suspense>
  );
};

export default HDBBlogSEO;

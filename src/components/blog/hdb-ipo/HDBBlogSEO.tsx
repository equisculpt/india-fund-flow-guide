
import React from 'react';

const HDBBlogSEO = () => {
  // BULLETPROOF PROTECTION: Multiple layers of guards
  console.log('🔒 HDB SEO V10 - BULLETPROOF ENTRY GUARD:', {
    component: 'HDBBlogSEO',
    timestamp: new Date().toISOString(),
    'SERVER_SIDE_CHECK': typeof window === 'undefined' ? 'BLOCKED' : 'ALLOWED',
    'CLIENT_SIDE_CHECK': typeof window !== 'undefined' ? 'PROCEEDING' : 'BLOCKED'
  });

  // GUARD 1: Server-side complete block
  if (typeof window === 'undefined') {
    console.log('🚫 HDB SEO V10 - SERVER SIDE COMPLETELY BLOCKED');
    return null;
  }

  // GUARD 2: Client-side path verification
  const currentPath = window.location.pathname;
  const isExactHDBPage = currentPath === '/blog/hdb-financial-services-ipo-analysis';

  console.log('🛡️ HDB SEO V10 - CLIENT SIDE PATH GUARD:', {
    currentPath,
    isExactHDBPage,
    'EXECUTION_STATUS': isExactHDBPage ? 'PROCEEDING_TO_SEO' : 'BLOCKED_COMPLETELY'
  });

  // GUARD 3: Path mismatch complete block
  if (!isExactHDBPage) {
    console.log('🚫 HDB SEO V10 - WRONG PATH - COMPLETE BLOCK');
    return null;
  }

  // GUARD 4: Only now load the SEO component
  const ConsolidatedSEOHead = React.lazy(() => import('@/components/seo/ConsolidatedSEOHead'));

  const canonicalUrl = "https://sipbrewery.com/blog/hdb-financial-services-ipo-analysis";
  const title = "HDB Financial Services IPO Analysis 2025 | Complete Financial Review & SWOT | SIP Brewery";
  const description = "Comprehensive analysis of HDB Financial Services IPO with financial charts, SWOT analysis, and investment insights. Educational content only - not investment advice. Get complete IPO review here.";
  const keywords = "HDB Financial Services IPO, NBFC IPO India, HDB IPO analysis, HDFC Bank subsidiary IPO, financial services IPO 2025, SEBI compliant IPO analysis, retail lending IPO review";
  const ogImage = "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png";
  const publishedTime = "2025-06-21T12:00:00+05:30";
  const modifiedTime = "2025-06-21T12:00:00+05:30";

  console.log('✅ HDB SEO V10 - EXECUTING SEO RENDER:', {
    title: title.substring(0, 50) + '...',
    canonicalUrl,
    'FINAL_RENDER': 'ACTIVE'
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

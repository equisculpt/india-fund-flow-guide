
import React from 'react';

const HDBBlogSEO = () => {
  // TRIPLE PROTECTION: Server-side, client-side, and path checks
  if (typeof window === 'undefined') {
    console.log('🚫 HDB SEO V9 - SERVER SIDE COMPLETELY BLOCKED');
    return null;
  }

  const currentPath = window.location.pathname;
  const isExactHDBPage = currentPath === '/blog/hdb-financial-services-ipo-analysis';

  console.log('🎯 HDB SEO V9 - ULTRA STRICT GUARD:', {
    component: 'HDBBlogSEO',
    timestamp: new Date().toISOString(),
    currentPath,
    isExactHDBPage,
    'RENDER_STATUS': isExactHDBPage ? 'ALLOWED' : 'COMPLETELY_BLOCKED'
  });

  // CRITICAL: Complete block if not on exact HDB page
  if (!isExactHDBPage) {
    console.log('🚫 HDB SEO V9 - WRONG PATH - RETURNING NULL');
    return null;
  }

  // Only import ConsolidatedSEOHead when we're definitely on HDB page
  const ConsolidatedSEOHead = React.lazy(() => import('@/components/seo/ConsolidatedSEOHead'));

  const canonicalUrl = "https://sipbrewery.com/blog/hdb-financial-services-ipo-analysis";
  const title = "HDB Financial Services IPO Analysis 2025 | Complete Financial Review & SWOT | SIP Brewery";
  const description = "Comprehensive analysis of HDB Financial Services IPO with financial charts, SWOT analysis, and investment insights. Educational content only - not investment advice. Get complete IPO review here.";
  const keywords = "HDB Financial Services IPO, NBFC IPO India, HDB IPO analysis, HDFC Bank subsidiary IPO, financial services IPO 2025, SEBI compliant IPO analysis, retail lending IPO review";
  const ogImage = "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png";
  const publishedTime = "2025-06-21T12:00:00+05:30";
  const modifiedTime = "2025-06-21T12:00:00+05:30";

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


import React from 'react';

const HDBBlogSEO = () => {
  console.log('✅ HDB SEO V13 - ROUTER-LEVEL ISOLATION - NO PATH CHECKS NEEDED:', {
    component: 'HDBBlogSEO',
    reason: 'Router-level lazy loading ensures this only loads on correct route',
    timestamp: new Date().toISOString()
  });

  // Only now load the SEO component - router ensures we're on correct path
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

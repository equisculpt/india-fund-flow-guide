
import React from 'react';
import ConsolidatedSEOHead from '@/components/seo/ConsolidatedSEOHead';
import HydrationAwareSEO from '@/components/seo/HydrationAwareSEO';

const HDBBlogSEO = () => {
  const canonicalUrl = "https://sipbrewery.com/blog/hdb-financial-services-ipo-analysis";
  const title = "HDB Financial Services IPO Analysis 2025 | Complete Financial Review & SWOT | SIP Brewery";
  const description = "Comprehensive analysis of HDB Financial Services IPO with financial charts, SWOT analysis, and investment insights. Educational content only - not investment advice. Get complete IPO review here.";
  const keywords = "HDB Financial Services IPO, NBFC IPO India, HDB IPO analysis, HDFC Bank subsidiary IPO, financial services IPO 2025, SEBI compliant IPO analysis, retail lending IPO review";
  const ogImage = "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png";
  const publishedTime = "2025-06-21T12:00:00+05:30";
  const modifiedTime = "2025-06-21T12:00:00+05:30";

  // CRITICAL CHECK - Only render on correct path
  const currentPath = window.location.pathname;
  const isHDBPage = currentPath === '/blog/hdb-financial-services-ipo-analysis';

  console.log('🎯 HDB Blog SEO V5 - HYDRATION AWARE:', {
    component: 'HDBBlogSEO',
    timestamp: new Date().toISOString(),
    currentPath,
    isHDBPage,
    'RENDER_STATUS': isHDBPage ? 'WILL_RENDER_AFTER_HYDRATION' : 'BLOCKED_WRONG_PATH'
  });

  // CRITICAL: Only render SEO if we're on the correct page
  if (!isHDBPage) {
    console.log('🚫 HDB SEO BLOCKED - Not on HDB page, returning null');
    return null;
  }

  return (
    <HydrationAwareSEO>
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
    </HydrationAwareSEO>
  );
};

export default HDBBlogSEO;

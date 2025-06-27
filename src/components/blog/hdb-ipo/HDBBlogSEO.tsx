
import React from 'react';
import ConsolidatedSEOHead from '@/components/seo/ConsolidatedSEOHead';

const HDBBlogSEO = () => {
  // CRITICAL: Multiple layers of protection to prevent rendering on wrong pages
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const isHDBPage = currentPath === '/blog/hdb-financial-services-ipo-analysis';

  console.log('🎯 HDB Blog SEO V6 - ULTRA STRICT GUARD:', {
    component: 'HDBBlogSEO',
    timestamp: new Date().toISOString(),
    currentPath,
    isHDBPage,
    'RENDER_STATUS': isHDBPage ? 'ALLOWED' : 'COMPLETELY_BLOCKED',
    'WINDOW_CHECK': typeof window !== 'undefined' ? 'CLIENT_SIDE' : 'SERVER_SIDE'
  });

  // CRITICAL: Block rendering completely if not on HDB page
  if (!isHDBPage || typeof window === 'undefined') {
    console.log('🚫 HDB SEO ULTRA BLOCKED - Wrong path or server-side, returning null');
    return null;
  }

  const canonicalUrl = "https://sipbrewery.com/blog/hdb-financial-services-ipo-analysis";
  const title = "HDB Financial Services IPO Analysis 2025 | Complete Financial Review & SWOT | SIP Brewery";
  const description = "Comprehensive analysis of HDB Financial Services IPO with financial charts, SWOT analysis, and investment insights. Educational content only - not investment advice. Get complete IPO review here.";
  const keywords = "HDB Financial Services IPO, NBFC IPO India, HDB IPO analysis, HDFC Bank subsidiary IPO, financial services IPO 2025, SEBI compliant IPO analysis, retail lending IPO review";
  const ogImage = "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png";
  const publishedTime = "2025-06-21T12:00:00+05:30";
  const modifiedTime = "2025-06-21T12:00:00+05:30";

  return (
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
  );
};

export default HDBBlogSEO;

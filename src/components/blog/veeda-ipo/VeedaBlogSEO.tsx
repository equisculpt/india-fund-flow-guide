
import React from 'react';
import ConsolidatedSEOHead from '@/components/seo/ConsolidatedSEOHead';

const VeedaBlogSEO = () => {
  const canonicalUrl = "https://sipbrewery.com/blog/veeda-clinical-research-ipo-analysis";
  const title = "Veeda Clinical Research IPO Analysis 2024 | Complete SWOT & Financial Review | SIP Brewery";
  const description = "In-depth analysis of Veeda Clinical Research IPO with financial charts, SWOT analysis, and key insights. Educational content only - not investment advice. Get complete IPO review here.";
  const keywords = "Veeda Clinical Research IPO, CRO IPO India, clinical research IPO analysis, healthcare IPO 2024, biotech IPO review, SEBI compliant IPO analysis, contract research organization stocks";
  const ogImage = "https://sipbrewery.com/og-image.png";
  const publishedTime = "2025-06-21T10:00:00+05:30";
  const modifiedTime = "2025-06-21T10:00:00+05:30";

  console.log('🎯 Veeda Blog SEO Setup - NewsArticle Schema:', {
    title: title.substring(0, 60) + '...',
    titleLength: title.length,
    canonicalUrl,
    description: description.substring(0, 100) + '...',
    descLength: description.length,
    ogImage,
    isNewsArticle: true
  });

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

export default VeedaBlogSEO;

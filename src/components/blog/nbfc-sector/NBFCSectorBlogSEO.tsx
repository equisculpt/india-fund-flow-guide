
import React from 'react';
import ConsolidatedSEOHead from '@/components/seo/ConsolidatedSEOHead';

const NBFCSectorBlogSEO = () => {
  const canonicalUrl = "https://sipbrewery.com/blog/nbfc-sector-analysis-india-2025";
  const title = "NBFC Sector Analysis India 2025: Complete Guide to Non-Banking Financial Companies | SIP Brewery";
  const description = "Deep dive into India's NBFC sector - growth trends, key players, regulatory changes, investment opportunities & risks. Comprehensive analysis of non-banking financial companies in 2025.";
  const keywords = "NBFC sector India, non-banking financial companies, NBFC analysis 2025, NBFC investment guide, RBI NBFC regulations, NBFC vs banks, NBFC stocks India, financial services sector";
  const ogImage = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&crop=center&auto=format&q=80";
  const publishedTime = "2025-06-21T08:00:00+05:30";
  const modifiedTime = "2025-06-21T08:00:00+05:30";

  console.log('🎯 NBFC Blog SEO Setup - NewsArticle Schema:', {
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

export default NBFCSectorBlogSEO;

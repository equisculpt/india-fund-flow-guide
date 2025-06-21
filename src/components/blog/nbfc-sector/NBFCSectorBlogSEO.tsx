
import React from 'react';
import SEOHead from '@/components/SEOHead';

const NBFCSectorBlogSEO = () => {
  const canonicalUrl = "https://sipbrewery.com/blog/nbfc-sector-analysis-india-2025";
  const title = "NBFC Sector Analysis India 2025: Complete Guide to Non-Banking Financial Companies | SIP Brewery";
  const description = "Deep dive into India's NBFC sector - growth trends, key players, regulatory changes, investment opportunities & risks. Comprehensive analysis of non-banking financial companies in 2025.";
  const keywords = "NBFC sector India, non-banking financial companies, NBFC analysis 2025, NBFC investment guide, RBI NBFC regulations, NBFC vs banks, NBFC stocks India, financial services sector";
  const ogImage = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&crop=center&auto=format&q=80";

  console.log('🎯 NBFC Blog SEO Setup:', {
    title,
    canonicalUrl,
    description: description.substring(0, 100) + '...',
    ogImage
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": "SIP Brewery"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SIP Brewery",
      "logo": {
        "@type": "ImageObject",
        "url": ogImage
      }
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "image": ogImage
  };

  return (
    <SEOHead
      title={title}
      description={description}
      keywords={keywords}
      canonicalUrl={canonicalUrl}
      ogImage={ogImage}
      ogType="article"
      articleAuthor="SIP Brewery Research Team"
      articlePublisher="SIP Brewery"
      publishedTime={new Date().toISOString()}
      modifiedTime={new Date().toISOString()}
      structuredData={structuredData}
    />
  );
};

export default NBFCSectorBlogSEO;

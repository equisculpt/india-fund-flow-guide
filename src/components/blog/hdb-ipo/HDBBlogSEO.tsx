
import React from 'react';
import ConsolidatedSEOHead from '@/components/seo/ConsolidatedSEOHead';

const HDBBlogSEO = () => {
  const canonicalUrl = "https://sipbrewery.com/blog/hdb-financial-services-ipo-analysis";
  const title = "HDB Financial Services IPO Analysis 2025 | Complete Financial Review & SWOT | SIP Brewery";
  const description = "Comprehensive analysis of HDB Financial Services IPO with financial charts, SWOT analysis, and investment insights. Educational content only - not investment advice. Get complete IPO review here.";
  const keywords = "HDB Financial Services IPO, NBFC IPO India, HDB IPO analysis, HDFC Bank subsidiary IPO, financial services IPO 2025, SEBI compliant IPO analysis, retail lending IPO review";
  const ogImage = "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png";

  // FORENSIC DEBUGGING - Component level
  console.log('🎯 HDB Blog SEO FORENSIC AUDIT:', {
    component: 'HDBBlogSEO',
    timestamp: new Date().toISOString(),
    'EXACT_VALUES_BEING_PASSED': {
      title: `"${title}"`,
      titleLength: title.length,
      description: `"${description}"`,
      descLength: description.length,
      canonicalUrl: canonicalUrl,
      ogImage: ogImage,
      ogType: 'article'
    },
    'VALIDATION_CHECKS': {
      titleNotEmpty: title.trim().length > 0,
      descNotEmpty: description.trim().length > 0,
      imageIsAbsolute: ogImage.startsWith('https://'),
      urlIsAbsolute: canonicalUrl.startsWith('https://')
    }
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
    <ConsolidatedSEOHead
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

export default HDBBlogSEO;

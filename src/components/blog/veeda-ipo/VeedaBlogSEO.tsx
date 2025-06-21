
import React from 'react';
import SEOHead from '@/components/SEOHead';

const VeedaBlogSEO = () => {
  const canonicalUrl = "https://sipbrewery.com/blog/veeda-clinical-research-ipo-analysis";
  const title = "Veeda Clinical Research IPO Analysis 2024 | Complete SWOT & Financial Review | SIP Brewery";
  const description = "In-depth analysis of Veeda Clinical Research IPO with financial charts, SWOT analysis, and key insights. Educational content only - not investment advice. Get complete IPO review here.";
  const keywords = "Veeda Clinical Research IPO, CRO IPO India, clinical research IPO analysis, healthcare IPO 2024, biotech IPO review, SEBI compliant IPO analysis, contract research organization stocks";
  const ogImage = "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png";

  console.log('🎯 Veeda Blog SEO Setup:', {
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

export default VeedaBlogSEO;

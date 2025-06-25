
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface ConsolidatedSEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object;
  ogType?: 'website' | 'article';
  articleAuthor?: string;
  articlePublisher?: string;
  publishedTime?: string;
  modifiedTime?: string;
  isNewsArticle?: boolean;
}

const ConsolidatedSEOHead = ({ 
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  structuredData,
  ogType = 'website',
  articleAuthor,
  articlePublisher,
  publishedTime,
  modifiedTime,
  isNewsArticle = false
}: ConsolidatedSEOHeadProps) => {
  const location = useLocation();
  
  // Ensure we have valid, non-empty strings
  const finalTitle = title?.trim() || "SIP Brewery - Best Mutual Fund Investment Platform India";
  const finalDescription = description?.trim() || "India's #1 SEBI registered mutual fund investment platform for smart mutual fund investments and SIP planning.";
  const finalKeywords = keywords?.trim() || "mutual funds india, SIP investment, SEBI registered platform";
  const finalCanonicalUrl = canonicalUrl?.trim() || `https://sipbrewery.com${location.pathname}`;
  
  // Ensure absolute image URL
  const defaultImage = "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png";
  let finalOgImage = ogImage?.trim() || defaultImage;
  if (!finalOgImage.startsWith('http')) {
    finalOgImage = `https://sipbrewery.com${finalOgImage}`;
  }

  // Generate NewsArticle schema if this is a news article
  const newsArticleSchema = isNewsArticle ? {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": finalTitle,
    "datePublished": publishedTime || new Date().toISOString(),
    "dateModified": modifiedTime || publishedTime || new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": articleAuthor || "SIP Brewery Research Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SIP Brewery",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png"
      }
    },
    "description": finalDescription,
    "image": finalOgImage,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": finalCanonicalUrl
    },
    "articleSection": "Investment Analysis",
    "inLanguage": "en-IN"
  } : null;

  // Use NewsArticle schema if available, otherwise use provided structured data
  const finalStructuredData = newsArticleSchema || structuredData;

  console.log('🔄 ConsolidatedSEOHead Rendering:', {
    path: location.pathname,
    title: finalTitle.substring(0, 50) + '...',
    isNewsArticle,
    timestamp: new Date().toISOString()
  });

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content={articleAuthor || "SIP Brewery Research Team"} />
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:site_name" content="SIP Brewery" />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:url" content={finalOgImage} />
      <meta property="og:image:secure_url" content={finalOgImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${finalTitle} - SIP Brewery`} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Article specific tags */}
      {ogType === 'article' && (
        <>
          <meta property="article:author" content={articleAuthor || "SIP Brewery Research Team"} />
          <meta property="article:publisher" content={articlePublisher || "SIP Brewery"} />
          <meta property="article:published_time" content={publishedTime || new Date().toISOString()} />
          <meta property="article:modified_time" content={modifiedTime || publishedTime || new Date().toISOString()} />
          <meta property="article:section" content="Investment Analysis" />
        </>
      )}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@SIPBrewery" />
      <meta name="twitter:creator" content="@SIPBrewery" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      <meta name="twitter:image:alt" content={`${finalTitle} - SIP Brewery`} />

      {/* Cache Control */}
      <meta httpEquiv="Cache-Control" content="public, max-age=3600" />

      {/* Structured Data */}
      {finalStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(finalStructuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default ConsolidatedSEOHead;

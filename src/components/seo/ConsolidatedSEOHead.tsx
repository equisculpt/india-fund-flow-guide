
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
  modifiedTime
}: ConsolidatedSEOHeadProps) => {
  const location = useLocation();
  
  // Ensure we have valid, non-empty strings
  const finalTitle = title?.trim() || "SIP Brewery - Best Mutual Fund Investment Platform India";
  const finalDescription = description?.trim() || "India's #1 SEBI registered mutual fund investment platform for smart mutual fund investments and SIP planning.";
  const finalKeywords = keywords?.trim() || "mutual funds india, SIP investment, SEBI registered platform";
  const finalCanonicalUrl = canonicalUrl?.trim() || `https://sipbrewery.com${location.pathname}`;
  
  // Ensure absolute image URL
  const defaultImage = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&crop=center&auto=format&q=80";
  let finalOgImage = ogImage?.trim() || defaultImage;
  if (!finalOgImage.startsWith('http')) {
    finalOgImage = `https://sipbrewery.com${finalOgImage}`;
  }

  console.log('🔥 CONSOLIDATED SEO DEBUG:', {
    path: location.pathname,
    title: `"${finalTitle}"`,
    titleLength: finalTitle.length,
    description: `"${finalDescription.substring(0, 100)}..."`,
    descLength: finalDescription.length,
    ogImage: finalOgImage,
    ogType,
    canonicalUrl: finalCanonicalUrl
  });

  return (
    <Helmet>
      {/* Clear any existing tags first */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content={articleAuthor || "SIP Brewery Research Team"} />
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Open Graph Tags - Critical for Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:site_name" content="SIP Brewery" />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:url" content={finalOgImage} />
      <meta property="og:image:secure_url" content={finalOgImage} />
      <meta property="og:image:type" content="image/jpeg" />
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
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default ConsolidatedSEOHead;

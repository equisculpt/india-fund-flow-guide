
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
  const defaultImage = "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png";
  let finalOgImage = ogImage?.trim() || defaultImage;
  if (!finalOgImage.startsWith('http')) {
    finalOgImage = `https://sipbrewery.com${finalOgImage}`;
  }

  // FORENSIC DEBUGGING - Enhanced logging
  console.log('🔬 FORENSIC AUDIT - ConsolidatedSEOHead:', {
    component: 'ConsolidatedSEOHead',
    timestamp: new Date().toISOString(),
    path: location.pathname,
    'RAW_INPUTS': {
      title: title || 'UNDEFINED',
      description: description || 'UNDEFINED',
      ogImage: ogImage || 'UNDEFINED'
    },
    'PROCESSED_VALUES': {
      finalTitle: `"${finalTitle}"`,
      finalDescription: `"${finalDescription}"`,
      finalOgImage: finalOgImage,
      finalCanonicalUrl: finalCanonicalUrl
    },
    'STRING_CHECKS': {
      titleValid: !!finalTitle && finalTitle.length > 0,
      descValid: !!finalDescription && finalDescription.length > 0,
      imageValid: !!finalOgImage && finalOgImage.startsWith('http')
    },
    'META_TAG_VALUES': {
      'og:title': finalTitle,
      'og:description': finalDescription,
      'og:image': finalOgImage,
      'og:url': finalCanonicalUrl,
      'og:type': ogType
    }
  });

  // Add a window check to verify meta tags are actually in DOM
  React.useEffect(() => {
    setTimeout(() => {
      const titleMeta = document.querySelector('meta[property="og:title"]');
      const descMeta = document.querySelector('meta[property="og:description"]');
      const imageMeta = document.querySelector('meta[property="og:image"]');
      
      console.log('🔍 DOM META TAGS VERIFICATION:', {
        'og:title in DOM': titleMeta ? titleMeta.getAttribute('content') : 'NOT FOUND',
        'og:description in DOM': descMeta ? descMeta.getAttribute('content') : 'NOT FOUND',
        'og:image in DOM': imageMeta ? imageMeta.getAttribute('content') : 'NOT FOUND',
        'All meta tags': Array.from(document.querySelectorAll('meta[property^="og:"]')).map(meta => ({
          property: meta.getAttribute('property'),
          content: meta.getAttribute('content')
        }))
      });
    }, 100);
  }, [finalTitle, finalDescription, finalOgImage]);

  return (
    <Helmet>
      {/* FORCE CLEAR ANY EXISTING TAGS */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content={articleAuthor || "SIP Brewery Research Team"} />
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* CRITICAL OPEN GRAPH TAGS - FORCE OVERWRITE */}
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
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default ConsolidatedSEOHead;

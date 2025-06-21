
import React from 'react';
import { useLocation } from 'react-router-dom';
import { generateDynamicSEOContent } from './seo/utils/seoContentGenerator';
import BasicMetaTags from './seo/components/BasicMetaTags';
import OpenGraphTags from './seo/components/OpenGraphTags';
import TwitterCardTags from './seo/components/TwitterCardTags';
import StructuredDataTags from './seo/components/StructuredDataTags';
import CacheControlTags from './seo/components/CacheControlTags';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object;
  isDynamic?: boolean;
  ogType?: 'website' | 'article';
  articleAuthor?: string;
  articlePublisher?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEOHead = ({ 
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  structuredData,
  isDynamic = false,
  ogType,
  articleAuthor,
  articlePublisher,
  publishedTime,
  modifiedTime
}: SEOHeadProps) => {
  const location = useLocation();
  
  // Generate dynamic content based on current route only if needed
  const dynamicContent = isDynamic ? generateDynamicSEOContent(location.pathname) : null;
  
  // Use provided props or fall back to dynamic generation
  const finalTitle = title || (dynamicContent?.title) || "SIP Brewery - Best Mutual Fund Investment Platform India";
  const finalDescription = description || (dynamicContent?.description) || "India's #1 SEBI registered mutual fund investment platform";
  const finalKeywords = keywords || (dynamicContent?.keywords) || "mutual funds india, SIP investment";
  const finalCanonicalUrl = canonicalUrl || (dynamicContent?.canonicalUrl) || `https://sipbrewery.com${location.pathname}`;
  const finalOgType = ogType || (dynamicContent?.ogType) || 'website';
  
  // Clear debugging for canonical URL
  console.log('SEOHead Final Values:', {
    currentPath: location.pathname,
    isDynamic,
    providedCanonicalUrl: canonicalUrl || 'Not provided',
    dynamicCanonicalUrl: dynamicContent?.canonicalUrl || 'Not generated',
    finalCanonicalUrl,
    finalTitle: finalTitle.substring(0, 60) + '...',
    finalOgType
  });
  
  // Use a properly sized default image - Facebook requires minimum 200x200
  const defaultOgImage = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&crop=center&auto=format&q=80";
  const finalOgImage = ogImage || defaultOgImage;
  const absoluteOgImage = finalOgImage.startsWith('http') ? finalOgImage : `https://sipbrewery.com${finalOgImage}`;

  return (
    <>
      <BasicMetaTags
        title={finalTitle}
        description={finalDescription}
        keywords={finalKeywords}
        canonicalUrl={finalCanonicalUrl}
        articleAuthor={articleAuthor}
      />
      
      <OpenGraphTags
        title={finalTitle}
        description={finalDescription}
        canonicalUrl={finalCanonicalUrl}
        ogImage={absoluteOgImage}
        ogType={finalOgType}
        articleAuthor={articleAuthor}
        articlePublisher={articlePublisher}
        publishedTime={publishedTime}
        modifiedTime={modifiedTime}
      />
      
      <TwitterCardTags
        title={finalTitle}
        description={finalDescription}
        ogImage={absoluteOgImage}
      />
      
      <StructuredDataTags
        title={finalTitle}
        description={finalDescription}
        canonicalUrl={finalCanonicalUrl}
        ogType={finalOgType}
        ogImage={absoluteOgImage}
        articleAuthor={articleAuthor}
        articlePublisher={articlePublisher}
        publishedTime={publishedTime}
        modifiedTime={modifiedTime}
        structuredData={structuredData}
      />
      
      <CacheControlTags isDynamic={isDynamic} />
    </>
  );
};

export default SEOHead;

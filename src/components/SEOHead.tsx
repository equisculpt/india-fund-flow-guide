
import React from 'react';
import { useLocation } from 'react-router-dom';
import { generateDynamicSEOContent } from './seo/utils/seoContentGenerator';
import ConsolidatedSEOHead from './seo/ConsolidatedSEOHead';

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
  isNewsArticle?: boolean;
  breadcrumbs?: Array<{name: string; url: string}>;
  faqData?: Array<{question: string; answer: string}>;
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
  modifiedTime,
  isNewsArticle = false,
  breadcrumbs,
  faqData
}: SEOHeadProps) => {
  const location = useLocation();
  
  // Generate dynamic content based on current route only if needed
  const dynamicContent = isDynamic ? generateDynamicSEOContent(location.pathname) : null;
  
  // Use provided props or fall back to dynamic generation
  const finalTitle = title || dynamicContent?.title;
  const finalDescription = description || dynamicContent?.description;
  const finalKeywords = keywords || dynamicContent?.keywords;
  const finalCanonicalUrl = canonicalUrl || dynamicContent?.canonicalUrl || `https://sipbrewery.com${location.pathname}`;
  const finalOgType = ogType || dynamicContent?.ogType || 'website';
  
  // Auto-generate breadcrumbs if not provided and this is a deep page
  const autoBreadcrumbs = !breadcrumbs && location.pathname !== '/' ? 
    generateBreadcrumbs(location.pathname) : breadcrumbs;

  console.log('🎯 SEO Head Setup:', {
    currentPath: location.pathname,
    isDynamic,
    hasTitle: !!finalTitle,
    hasDescription: !!finalDescription,
    hasStructuredData: !!structuredData,
    hasBreadcrumbs: !!autoBreadcrumbs,
    hasFAQ: !!faqData
  });

  return (
    <ConsolidatedSEOHead
      title={finalTitle}
      description={finalDescription}
      keywords={finalKeywords}
      canonicalUrl={finalCanonicalUrl}
      ogImage={ogImage}
      structuredData={structuredData}
      ogType={finalOgType}
      articleAuthor={articleAuthor}
      articlePublisher={articlePublisher}
      publishedTime={publishedTime}
      modifiedTime={modifiedTime}
      isNewsArticle={isNewsArticle}
      breadcrumbs={autoBreadcrumbs}
      faqData={faqData}
    />
  );
};

// Helper function to generate breadcrumbs from URL path
const generateBreadcrumbs = (pathname: string) => {
  const segments = pathname.split('/').filter(segment => segment);
  const breadcrumbs = [{ name: 'Home', url: 'https://sipbrewery.com/' }];
  
  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Convert URL segments to readable names
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      name,
      url: `https://sipbrewery.com${currentPath}`
    });
  });
  
  return breadcrumbs;
};

export default SEOHead;

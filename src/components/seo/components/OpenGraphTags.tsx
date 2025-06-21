
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface OpenGraphTagsProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  ogType: 'website' | 'article';
  articleAuthor?: string;
  articlePublisher?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const OpenGraphTags = ({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType,
  articleAuthor,
  articlePublisher,
  publishedTime,
  modifiedTime
}: OpenGraphTagsProps) => {
  console.log('🔧 OpenGraph Tags Debug (FIXED):', {
    title: title ? title.substring(0, 50) + '...' : 'MISSING TITLE',
    description: description ? description.substring(0, 50) + '...' : 'MISSING DESC',
    ogImage: ogImage || 'MISSING IMAGE',
    ogType: ogType || 'MISSING TYPE',
    titleLength: title?.length || 0,
    descLength: description?.length || 0
  });

  // Ensure we have valid strings to prevent empty meta tags
  const safeTitle = title || "SIP Brewery - Mutual Fund Investment Platform";
  const safeDescription = description || "India's leading mutual fund investment platform";
  const safeOgImage = ogImage || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&crop=center&auto=format&q=80";

  return (
    <Helmet>
      {/* Clear any existing og tags first */}
      <meta property="og:title" content={safeTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:site_name" content="SIP Brewery" />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={safeOgImage} />
      <meta property="og:image:secure_url" content={safeOgImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${safeTitle} - SIP Brewery`} />
      <meta property="og:locale" content="en_IN" />
      
      {ogType === 'article' && (
        <>
          <meta property="article:author" content={articleAuthor || "SIP Brewery Research Team"} />
          <meta property="article:publisher" content={articlePublisher || "SIP Brewery"} />
          <meta property="article:published_time" content={publishedTime || new Date().toISOString()} />
          <meta property="article:modified_time" content={modifiedTime || publishedTime || new Date().toISOString()} />
          <meta property="article:section" content="Investment Analysis" />
        </>
      )}
    </Helmet>
  );
};

export default OpenGraphTags;

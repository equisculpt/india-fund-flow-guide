
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface BasicMetaTagsProps {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  articleAuthor?: string;
}

const BasicMetaTags = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl, 
  articleAuthor 
}: BasicMetaTagsProps) => {
  // Ensure we have valid strings
  const safeTitle = title || "SIP Brewery - Mutual Fund Investment Platform";
  const safeDescription = description || "India's leading mutual fund investment platform";
  const safeKeywords = keywords || "mutual funds, SIP, investment";

  console.log('🏷️ Basic Meta Tags Debug:', {
    title: safeTitle.substring(0, 50) + '...',
    description: safeDescription.substring(0, 50) + '...',
    canonicalUrl
  });

  return (
    <Helmet>
      <title>{safeTitle}</title>
      <meta name="description" content={safeDescription} />
      <meta name="keywords" content={safeKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content={articleAuthor || "SIP Brewery Research Team"} />
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default BasicMetaTags;

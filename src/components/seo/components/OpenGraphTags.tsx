
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
  return (
    <Helmet>
      <meta property="og:site_name" content="SIP Brewery" />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} - SIP Brewery`} />
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

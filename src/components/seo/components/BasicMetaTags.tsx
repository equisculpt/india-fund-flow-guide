
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
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content={articleAuthor || "SIP Brewery Research Team"} />
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default BasicMetaTags;

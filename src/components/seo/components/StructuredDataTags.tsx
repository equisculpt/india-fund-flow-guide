
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { generateStructuredData } from '../utils/structuredDataGenerator';

interface StructuredDataTagsProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: 'website' | 'article';
  ogImage: string;
  articleAuthor?: string;
  articlePublisher?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: object;
}

const StructuredDataTags = ({ structuredData, ...props }: StructuredDataTagsProps) => {
  const defaultStructuredData = generateStructuredData(props);
  
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredDataTags;

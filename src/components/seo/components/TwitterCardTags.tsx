
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface TwitterCardTagsProps {
  title: string;
  description: string;
  ogImage: string;
}

const TwitterCardTags = ({ title, description, ogImage }: TwitterCardTagsProps) => {
  return (
    <Helmet>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sipbrewery" />
      <meta name="twitter:creator" content="@sipbrewery" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${title} - SIP Brewery`} />
    </Helmet>
  );
};

export default TwitterCardTags;

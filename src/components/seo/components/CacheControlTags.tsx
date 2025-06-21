
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface CacheControlTagsProps {
  isDynamic?: boolean;
}

const CacheControlTags = ({ isDynamic = false }: CacheControlTagsProps) => {
  if (!isDynamic) return null;

  return (
    <Helmet>
      <meta httpEquiv="cache-control" content="no-cache" />
      <meta httpEquiv="expires" content="0" />
      <meta httpEquiv="pragma" content="no-cache" />
    </Helmet>
  );
};

export default CacheControlTags;

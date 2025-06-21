
import React from 'react';
import { Helmet } from 'react-helmet-async';

const NBFCSectorBlogSEO = () => {
  const canonicalUrl = "https://sipbrewery.com/blog/nbfc-sector-analysis-india-2025";
  const title = "NBFC Sector Analysis India 2025: Complete Guide to Non-Banking Financial Companies | SIP Brewery";
  const description = "Deep dive into India's NBFC sector - growth trends, key players, regulatory changes, investment opportunities & risks. Comprehensive analysis of non-banking financial companies in 2025.";
  const keywords = "NBFC sector India, non-banking financial companies, NBFC analysis 2025, NBFC investment guide, RBI NBFC regulations, NBFC vs banks, NBFC stocks India, financial services sector";
  const ogImage = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&crop=center&auto=format&q=80";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="SIP Brewery" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="SIP Brewery Research Team" />
      <meta property="article:author" content="SIP Brewery Research Team" />
      <meta property="article:publisher" content="SIP Brewery" />
      <meta property="article:section" content="Sector Analysis" />
      <meta property="article:tag" content="NBFC, Financial Services, Investment Analysis, India" />
    </Helmet>
  );
};

export default NBFCSectorBlogSEO;

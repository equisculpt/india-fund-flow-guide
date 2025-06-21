
export interface StructuredDataProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: 'website' | 'article';
  ogImage: string;
  articleAuthor?: string;
  articlePublisher?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const generateStructuredData = ({
  title,
  description,
  canonicalUrl,
  ogType,
  ogImage,
  articleAuthor,
  articlePublisher,
  publishedTime,
  modifiedTime
}: StructuredDataProps) => {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": ogType === 'article' ? "Article" : "FinancialService",
    "name": title,
    "headline": title,
    "description": description,
    "url": canonicalUrl,
    "logo": "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png",
    "image": ogImage,
  };

  if (ogType === 'article') {
    return {
      ...baseStructuredData,
      "author": {
        "@type": "Organization",
        "name": articleAuthor || "SIP Brewery Research Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": articlePublisher || "SIP Brewery",
        "logo": {
          "@type": "ImageObject",
          "url": "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png"
        }
      },
      "datePublished": publishedTime || new Date().toISOString(),
      "dateModified": modifiedTime || publishedTime || new Date().toISOString()
    };
  }

  return {
    ...baseStructuredData,
    "sameAs": [
      "https://twitter.com/sipbrewery",
      "https://linkedin.com/company/sipbrewery"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "serviceType": "Mutual Fund Investment Advisory",
    "areaServed": "India"
  };
};

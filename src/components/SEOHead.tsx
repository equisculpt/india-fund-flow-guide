
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object;
  isDynamic?: boolean;
}

const SEOHead = ({ 
  title = "SIP Brewery - Best Mutual Fund Investment Platform India | SIP Calculator",
  description = "India's #1 SEBI registered mutual fund investment platform. Compare 1000+ mutual funds, professional recommendations, SIP calculator, goal-based investing. Start SIP with ₹500. Regular mutual funds only.",
  keywords = "mutual funds india, SIP investment, mutual fund comparison, best mutual funds 2024, SIP calculator, ELSS funds, large cap funds, small cap funds, mutual fund analysis, investment advisor, portfolio tracker, regular mutual funds",
  canonicalUrl,
  ogImage = "/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png",
  structuredData,
  isDynamic = false
}: SEOHeadProps) => {
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://sipbrewery.com');
  const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `https://sipbrewery.com${ogImage}`;

  console.log('SEOHead - Meta tags loaded:', { title, description, currentUrl, absoluteOgImage });

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "SIP Brewery",
    "description": "India's leading SEBI registered mutual fund investment platform with professional fund analysis and recommendations",
    "url": "https://sipbrewery.com",
    "logo": "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png",
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

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="SIP Brewery" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph tags - WhatsApp uses these */}
      <meta property="og:site_name" content="SIP Brewery" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:secure_url" content={absoluteOgImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="SIP Brewery - Mutual Fund Investment Platform" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sipbrewery" />
      <meta name="twitter:creator" content="@sipbrewery" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />
      <meta name="twitter:image:alt" content="SIP Brewery - Mutual Fund Investment Platform" />
      
      {/* Additional WhatsApp specific meta tags */}
      <meta property="article:author" content="SIP Brewery" />
      <meta property="article:publisher" content="https://sipbrewery.com" />
      
      {/* Cache control for dynamic content */}
      {isDynamic && (
        <>
          <meta httpEquiv="cache-control" content="no-cache" />
          <meta httpEquiv="expires" content="0" />
          <meta httpEquiv="pragma" content="no-cache" />
        </>
      )}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;

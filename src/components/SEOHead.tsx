
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object;
}

const SEOHead = ({ 
  title = "SIP Brewery - Best Mutual Fund Investment Platform India | SIP Calculator",
  description = "India's #1 mutual fund investment platform. Compare 1000+ mutual funds, AI-powered recommendations, SIP calculator, goal-based investing. Start SIP with ₹500. SEBI registered.",
  keywords = "mutual funds india, SIP investment, mutual fund comparison, best mutual funds 2024, SIP calculator, ELSS funds, large cap funds, small cap funds, mutual fund analysis, investment advisor, portfolio tracker",
  canonicalUrl,
  ogImage = "/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png",
  structuredData
}: SEOHeadProps) => {
  const currentUrl = canonicalUrl || window.location.href;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "SIP Brewery",
    "description": "India's leading mutual fund investment platform with AI-powered fund analysis and recommendations",
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
    "areaServed": "India",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mutual Fund Investment Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SIP Investment Plans"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Mutual Fund Comparison"
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="SIP Brewery" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
      
      {/* Additional meta tags for financial services */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      <meta name="language" content="en-IN" />
      <meta name="author" content="SIP Brewery" />
      <meta name="publisher" content="SIP Brewery" />
    </Helmet>
  );
};

export default SEOHead;

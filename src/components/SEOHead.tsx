
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
  // Force absolute URLs and aggressive cache busting
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://sipbrewery.com');
  const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `https://sipbrewery.com${ogImage}`;
  
  // More aggressive cache busting for WhatsApp
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2);
  const cacheBreaker = isDynamic ? `?v=${timestamp}&r=${randomId}&wp=1` : '';
  const finalImageUrl = `${absoluteOgImage}${cacheBreaker}`;
  
  // WhatsApp-specific URL with cache busting
  const whatsappUrl = isDynamic ? `${currentUrl}${currentUrl.includes('?') ? '&' : '?'}wp=${timestamp}` : currentUrl;

  console.log('SEOHead - WhatsApp optimization:', { 
    title, 
    description, 
    isDynamic, 
    finalImageUrl, 
    whatsappUrl,
    timestamp 
  });

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
    <Helmet key={`seo-head-${timestamp}-${randomId}`}>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={whatsappUrl} />
      
      {/* Open Graph Tags - Critical for WhatsApp */}
      <meta property="og:type" content={isDynamic ? "article" : "website"} />
      <meta property="og:site_name" content="SIP Brewery" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={whatsappUrl} />
      <meta property="og:image" content={finalImageUrl} />
      <meta property="og:image:secure_url" content={finalImageUrl} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sipbrewery" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImageUrl} />
      
      {/* WhatsApp Cache Busting for Dynamic Content */}
      {isDynamic && (
        <>
          <meta property="og:updated_time" content={new Date().toISOString()} />
          <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Expires" content="0" />
          <meta name="whatsapp:refresh" content={timestamp.toString()} />
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

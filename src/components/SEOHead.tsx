
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
  // Force absolute URLs
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://sipbrewery.com');
  const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `https://sipbrewery.com${ogImage}`;
  
  // Force unique cache busting for dynamic content
  const timestamp = Date.now();
  const cacheBuster = isDynamic ? `?v=${timestamp}&t=${Math.random()}` : '';
  const finalImageUrl = `${absoluteOgImage}${cacheBuster}`;

  console.log('SEOHead props received:', { title, description, isDynamic, currentUrl, finalImageUrl });

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

  const dynamicStructuredData = isDynamic ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": currentUrl,
    "author": {
      "@type": "Organization",
      "name": "SIP Brewery Research Team"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "SIP Brewery",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png"
      }
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "image": finalImageUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    }
  } : null;

  return (
    <>
      <Helmet key={`seo-${timestamp}`}>
        {/* Primary Meta Tags - MUST come first */}
        <title key="title">{title}</title>
        <meta key="description" name="description" content={description} />
        <meta key="keywords" name="keywords" content={keywords} />
        <link key="canonical" rel="canonical" href={currentUrl} />
        
        {/* Open Graph Meta Tags - Critical for WhatsApp, EXACT order matters */}
        <meta key="og:type" property="og:type" content={isDynamic ? "article" : "website"} />
        <meta key="og:site_name" property="og:site_name" content="SIP Brewery" />
        <meta key="og:title" property="og:title" content={title} />
        <meta key="og:description" property="og:description" content={description} />
        <meta key="og:url" property="og:url" content={currentUrl} />
        <meta key="og:image" property="og:image" content={finalImageUrl} />
        <meta key="og:image:secure_url" property="og:image:secure_url" content={finalImageUrl} />
        <meta key="og:image:type" property="og:image:type" content="image/png" />
        <meta key="og:image:width" property="og:image:width" content="1200" />
        <meta key="og:image:height" property="og:image:height" content="630" />
        <meta key="og:image:alt" property="og:image:alt" content={title} />
        <meta key="og:locale" property="og:locale" content="en_IN" />
        
        {/* Twitter Card Meta Tags */}
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:site" name="twitter:site" content="@sipbrewery" />
        <meta key="twitter:creator" name="twitter:creator" content="@sipbrewery" />
        <meta key="twitter:title" name="twitter:title" content={title} />
        <meta key="twitter:description" name="twitter:description" content={description} />
        <meta key="twitter:url" name="twitter:url" content={currentUrl} />
        <meta key="twitter:image" name="twitter:image" content={finalImageUrl} />
        <meta key="twitter:image:alt" name="twitter:image:alt" content={title} />
        
        {/* Force refresh for dynamic content - Aggressive cache busting */}
        {isDynamic && (
          <>
            <meta key="og:updated_time" property="og:updated_time" content={new Date().toISOString()} />
            <meta key="cache-control" httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-age=0" />
            <meta key="pragma" httpEquiv="Pragma" content="no-cache" />
            <meta key="expires" httpEquiv="Expires" content="0" />
            <meta key="last-modified" httpEquiv="Last-Modified" content={new Date().toUTCString()} />
            {/* Force WhatsApp to refresh */}
            <meta key="whatsapp:refresh" property="whatsapp:refresh" content={timestamp.toString()} />
          </>
        )}
        
        {/* Additional WhatsApp specific optimizations */}
        <meta key="robots" name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta key="format-detection" name="format-detection" content="telephone=no" />
        <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Article specific meta tags for dynamic content */}
        {isDynamic && (
          <>
            <meta key="article:author" property="article:author" content="SIP Brewery Research Team" />
            <meta key="article:publisher" property="article:publisher" content="https://sipbrewery.com" />
            <meta key="article:section" property="article:section" content="Investment Analysis" />
            <meta key="article:published_time" property="article:published_time" content={new Date().toISOString()} />
            <meta key="article:modified_time" property="article:modified_time" content={new Date().toISOString()} />
          </>
        )}
        
        {/* Additional meta tags */}
        <meta key="geo.region" name="geo.region" content="IN" />
        <meta key="geo.country" name="geo.country" content="India" />
        <meta key="language" name="language" content="en-IN" />
        <meta key="author" name="author" content="SIP Brewery" />
        <meta key="publisher" name="publisher" content="SIP Brewery" />
        <meta key="googlebot" name="googlebot" content="index, follow" />
        <meta key="bingbot" name="bingbot" content="index, follow" />
        <meta key="x-ua-compatible" httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Helmet>
      
      {/* Separate script tag for structured data to avoid conflicts */}
      <Helmet>
        <script key="structured-data" type="application/ld+json">
          {JSON.stringify(dynamicStructuredData || structuredData || defaultStructuredData)}
        </script>
      </Helmet>
    </>
  );
};

export default SEOHead;

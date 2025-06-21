
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
  
  // Force cache busting for dynamic content
  const cacheBuster = isDynamic ? `?v=${Date.now()}` : '';
  const finalImageUrl = `${absoluteOgImage}${cacheBuster}`;

  console.log('SEOHead props received:', { title, description, isDynamic, currentUrl });

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
    <Helmet>
      {/* Clear any existing meta tags first */}
      <meta name="title" content="" />
      <meta property="og:title" content="" />
      <meta property="og:description" content="" />
      <meta name="twitter:title" content="" />
      <meta name="twitter:description" content="" />
      
      {/* Primary Meta Tags - Always set these first */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph Meta Tags - Critical for WhatsApp */}
      <meta property="og:type" content={isDynamic ? "article" : "website"} />
      <meta property="og:site_name" content="SIP Brewery" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
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
      <meta name="twitter:creator" content="@sipbrewery" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImageUrl} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* WhatsApp specific meta tags */}
      <meta property="whatsapp:title" content={title} />
      <meta property="whatsapp:description" content={description} />
      <meta property="whatsapp:image" content={finalImageUrl} />
      
      {/* Force refresh for dynamic content */}
      {isDynamic && (
        <>
          <meta property="og:updated_time" content={new Date().toISOString()} />
          <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Expires" content="0" />
        </>
      )}
      
      {/* Additional meta tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Article specific meta tags for dynamic content */}
      {isDynamic && (
        <>
          <meta property="article:author" content="SIP Brewery Research Team" />
          <meta property="article:publisher" content="https://sipbrewery.com" />
          <meta property="article:section" content="Investment Analysis" />
          <meta property="article:published_time" content={new Date().toISOString()} />
          <meta property="article:modified_time" content={new Date().toISOString()} />
        </>
      )}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(dynamicStructuredData || structuredData || defaultStructuredData)}
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

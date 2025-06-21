
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

  console.log('SEOHead - Aggressive WhatsApp optimization:', { 
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

  const dynamicStructuredData = isDynamic ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": whatsappUrl,
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
      "@id": whatsappUrl
    }
  } : null;

  return (
    <>
      {/* Force clear existing meta tags for dynamic content */}
      {isDynamic && (
        <Helmet>
          <meta key="clear-title" name="title" content="" />
          <meta key="clear-description" name="description" content="" />
          <meta key="clear-og-title" property="og:title" content="" />
          <meta key="clear-og-description" property="og:description" content="" />
          <meta key="clear-og-image" property="og:image" content="" />
          <meta key="clear-og-url" property="og:url" content="" />
        </Helmet>
      )}

      <Helmet key={`whatsapp-seo-${timestamp}-${randomId}`}>
        {/* Primary Meta Tags - Exact order for WhatsApp */}
        <title key={`title-${timestamp}`}>{title}</title>
        <meta key={`description-${timestamp}`} name="description" content={description} />
        <meta key={`keywords-${timestamp}`} name="keywords" content={keywords} />
        <link key={`canonical-${timestamp}`} rel="canonical" href={whatsappUrl} />
        
        {/* WhatsApp-Critical Open Graph Tags - EXACT order */}
        <meta key={`og-type-${timestamp}`} property="og:type" content={isDynamic ? "article" : "website"} />
        <meta key={`og-site-name-${timestamp}`} property="og:site_name" content="SIP Brewery" />
        <meta key={`og-title-${timestamp}`} property="og:title" content={title} />
        <meta key={`og-description-${timestamp}`} property="og:description" content={description} />
        <meta key={`og-url-${timestamp}`} property="og:url" content={whatsappUrl} />
        <meta key={`og-image-${timestamp}`} property="og:image" content={finalImageUrl} />
        <meta key={`og-image-secure-${timestamp}`} property="og:image:secure_url" content={finalImageUrl} />
        <meta key={`og-image-type-${timestamp}`} property="og:image:type" content="image/png" />
        <meta key={`og-image-width-${timestamp}`} property="og:image:width" content="1200" />
        <meta key={`og-image-height-${timestamp}`} property="og:image:height" content="630" />
        <meta key={`og-image-alt-${timestamp}`} property="og:image:alt" content={title} />
        <meta key={`og-locale-${timestamp}`} property="og:locale" content="en_IN" />
        
        {/* Twitter Card Meta Tags */}
        <meta key={`twitter-card-${timestamp}`} name="twitter:card" content="summary_large_image" />
        <meta key={`twitter-site-${timestamp}`} name="twitter:site" content="@sipbrewery" />
        <meta key={`twitter-creator-${timestamp}`} name="twitter:creator" content="@sipbrewery" />
        <meta key={`twitter-title-${timestamp}`} name="twitter:title" content={title} />
        <meta key={`twitter-description-${timestamp}`} name="twitter:description" content={description} />
        <meta key={`twitter-url-${timestamp}`} name="twitter:url" content={whatsappUrl} />
        <meta key={`twitter-image-${timestamp}`} name="twitter:image" content={finalImageUrl} />
        <meta key={`twitter-image-alt-${timestamp}`} name="twitter:image:alt" content={title} />
        
        {/* Aggressive WhatsApp Cache Busting for Dynamic Content */}
        {isDynamic && (
          <>
            <meta key={`og-updated-${timestamp}`} property="og:updated_time" content={new Date().toISOString()} />
            <meta key={`cache-control-${timestamp}`} httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-age=0, private" />
            <meta key={`pragma-${timestamp}`} httpEquiv="Pragma" content="no-cache" />
            <meta key={`expires-${timestamp}`} httpEquiv="Expires" content="0" />
            <meta key={`last-modified-${timestamp}`} httpEquiv="Last-Modified" content={new Date().toUTCString()} />
            <meta key={`etag-${timestamp}`} httpEquiv="ETag" content={`"${timestamp}-${randomId}"` />
            
            {/* WhatsApp-specific meta tags */}
            <meta key={`whatsapp-refresh-${timestamp}`} property="whatsapp:refresh" content={timestamp.toString()} />
            <meta key={`whatsapp-version-${timestamp}`} property="whatsapp:version" content={randomId} />
            <meta key={`fb-app-id-${timestamp}`} property="fb:app_id" content="your-app-id" />
            
            {/* Force browser refresh indicators */}
            <meta key={`refresh-indicator-${timestamp}`} name="refresh-indicator" content={`${timestamp}-${randomId}`} />
            <meta key={`content-version-${timestamp}`} name="content-version" content={timestamp.toString()} />
          </>
        )}
        
        {/* Article-specific meta tags for dynamic content */}
        {isDynamic && (
          <>
            <meta key={`article-author-${timestamp}`} property="article:author" content="SIP Brewery Research Team" />
            <meta key={`article-publisher-${timestamp}`} property="article:publisher" content="https://sipbrewery.com" />
            <meta key={`article-section-${timestamp}`} property="article:section" content="Investment Analysis" />
            <meta key={`article-published-${timestamp}`} property="article:published_time" content={new Date().toISOString()} />
            <meta key={`article-modified-${timestamp}`} property="article:modified_time" content={new Date().toISOString()} />
            <meta key={`article-tag-${timestamp}`} property="article:tag" content="SEBI Guidelines" />
          </>
        )}
        
        {/* Additional optimization meta tags */}
        <meta key={`robots-${timestamp}`} name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta key={`format-detection-${timestamp}`} name="format-detection" content="telephone=no" />
        <meta key={`viewport-${timestamp}`} name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta key={`geo-region-${timestamp}`} name="geo.region" content="IN" />
        <meta key={`geo-country-${timestamp}`} name="geo.country" content="India" />
        <meta key={`language-${timestamp}`} name="language" content="en-IN" />
        <meta key={`author-${timestamp}`} name="author" content="SIP Brewery" />
        <meta key={`publisher-${timestamp}`} name="publisher" content="SIP Brewery" />
        <meta key={`googlebot-${timestamp}`} name="googlebot" content="index, follow" />
        <meta key={`bingbot-${timestamp}`} name="bingbot" content="index, follow" />
        <meta key={`x-ua-compatible-${timestamp}`} httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Force refresh meta for WhatsApp crawler */}
        {isDynamic && (
          <meta key={`refresh-${timestamp}`} httpEquiv="refresh" content={`0; url=${whatsappUrl}`} />
        )}
      </Helmet>
      
      {/* Separate structured data to avoid conflicts */}
      <Helmet>
        <script key={`structured-data-${timestamp}`} type="application/ld+json">
          {JSON.stringify(dynamicStructuredData || structuredData || defaultStructuredData)}
        </script>
      </Helmet>
    </>
  );
};

export default SEOHead;

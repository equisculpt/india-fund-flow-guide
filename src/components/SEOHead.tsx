
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object;
  isDynamic?: boolean;
  ogType?: 'website' | 'article';
  articleAuthor?: string;
  articlePublisher?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEOHead = ({ 
  title = "SIP Brewery - Best Mutual Fund Investment Platform India | SIP Calculator",
  description = "India's #1 SEBI registered mutual fund investment platform. Compare 1000+ mutual funds, professional recommendations, SIP calculator, goal-based investing. Start SIP with ₹500. Regular mutual funds only.",
  keywords = "mutual funds india, SIP investment, mutual fund comparison, best mutual funds 2024, SIP calculator, ELSS funds, large cap funds, small cap funds, mutual fund analysis, investment advisor, portfolio tracker, regular mutual funds",
  canonicalUrl,
  ogImage,
  structuredData,
  isDynamic = false,
  ogType = 'website',
  articleAuthor = "SIP Brewery Research Team",
  articlePublisher = "SIP Brewery",
  publishedTime,
  modifiedTime
}: SEOHeadProps) => {
  // Get current URL properly - use provided canonicalUrl or construct from window.location
  const getCurrentUrl = () => {
    if (canonicalUrl) return canonicalUrl;
    
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    
    // Fallback only for homepage
    return 'https://sipbrewery.com';
  };

  const currentUrl = getCurrentUrl();
  
  // Use a larger image that meets Facebook's 200x200 minimum requirement
  // Default to a business/finance related image from Unsplash that's large enough
  const defaultOgImage = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=630&fit=crop&crop=center";
  const finalOgImage = ogImage || defaultOgImage;
  const absoluteOgImage = finalOgImage.startsWith('http') ? finalOgImage : `https://sipbrewery.com${finalOgImage}`;

  console.log('SEOHead - Dynamic meta tags loaded:', { title, description, currentUrl, absoluteOgImage, ogType });

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": ogType === 'article' ? "Article" : "FinancialService",
    "name": title,
    "headline": title,
    "description": description,
    "url": currentUrl,
    "logo": "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png",
    "image": absoluteOgImage,
    ...(ogType === 'article' && {
      "author": {
        "@type": "Organization",
        "name": articleAuthor
      },
      "publisher": {
        "@type": "Organization",
        "name": articlePublisher,
        "logo": {
          "@type": "ImageObject",
          "url": "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png"
        }
      },
      "datePublished": publishedTime,
      "dateModified": modifiedTime || publishedTime
    }),
    ...(ogType === 'website' && {
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
    })
  };

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content={articleAuthor} />
      
      {/* Canonical URL - now uses current URL instead of hardcoded homepage */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph tags - Essential for WhatsApp */}
      <meta property="og:site_name" content="SIP Brewery" />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:secure_url" content={absoluteOgImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} - SIP Brewery`} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Article specific Open Graph tags */}
      {ogType === 'article' && (
        <>
          <meta property="article:author" content={articleAuthor} />
          <meta property="article:publisher" content={articlePublisher} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          <meta property="article:section" content="Investment Analysis" />
        </>
      )}
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sipbrewery" />
      <meta name="twitter:creator" content="@sipbrewery" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />
      <meta name="twitter:image:alt" content={`${title} - SIP Brewery`} />
      
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

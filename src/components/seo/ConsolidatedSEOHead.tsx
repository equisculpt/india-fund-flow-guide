
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface ConsolidatedSEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object;
  ogType?: 'website' | 'article';
  articleAuthor?: string;
  articlePublisher?: string;
  publishedTime?: string;
  modifiedTime?: string;
  isNewsArticle?: boolean;
  breadcrumbs?: Array<{name: string; url: string}>;
  faqData?: Array<{question: string; answer: string}>;
}

const ConsolidatedSEOHead = ({ 
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  structuredData,
  ogType = 'website',
  articleAuthor,
  articlePublisher,
  publishedTime,
  modifiedTime,
  isNewsArticle = false,
  breadcrumbs,
  faqData
}: ConsolidatedSEOHeadProps) => {
  const location = useLocation();
  
  // Enhanced defaults with better SEO
  const finalTitle = title?.trim() || "SIP Brewery - India's #1 SEBI Registered Mutual Fund Investment Platform";
  const finalDescription = description?.trim() || "Start your mutual fund investment journey with SIP Brewery. SEBI registered platform offering 3000+ mutual funds, AI-powered recommendations, and expert guidance. Minimum SIP ₹500.";
  const finalKeywords = keywords?.trim() || "mutual funds india, SIP investment, SEBI registered, best mutual funds 2025, mutual fund calculator, SIP calculator, investment advisor";
  // Fix canonical URL to prevent conflicts
  let finalCanonicalUrl = canonicalUrl?.trim() || `https://sipbrewery.com${location.pathname}`;
  
  // Ensure homepage uses clean URL without index.html
  if (finalCanonicalUrl.endsWith('/index.html')) {
    finalCanonicalUrl = finalCanonicalUrl.replace('/index.html', '/');
  }
  if (location.pathname === '/' || location.pathname === '/index.html') {
    finalCanonicalUrl = 'https://sipbrewery.com/';
  }
  
  // Enhanced OG image with fallback
  const defaultImage = "https://sipbrewery.com/og-image.png";
  let finalOgImage = ogImage?.trim() || defaultImage;
  if (!finalOgImage.startsWith('http')) {
    finalOgImage = `https://sipbrewery.com${finalOgImage}`;
  }

  // Generate comprehensive schema markup
  const generateSchemaMarkup = () => {
    const baseOrganization = {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "SIP Brewery",
      "alternateName": ["SIPBrewery", "SIP Brewery India"],
      "url": "https://sipbrewery.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sipbrewery.com/og-image.png",
        "width": 400,
        "height": 400
      },
      "image": finalOgImage,
      "description": finalDescription,
      "founder": {
        "@type": "Organization",
        "name": "SIP Brewery Team"
      },
      "foundingDate": "2024",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
        "addressRegion": "India"
      },
      "areaServed": "India",
      "serviceType": ["Mutual Fund Investment", "SIP Planning", "Financial Advisory"],
      "priceRange": "₹500-∞",
      "telephone": "+91-XXXXXXXXXX",
      "email": "support@sipbrewery.com",
      "sameAs": [
        "https://twitter.com/sipbrewery",
        "https://linkedin.com/company/sipbrewery",
        "https://facebook.com/sipbrewery"
      ],
      "potentialAction": {
        "@type": "InvestAction",
        "target": "https://sipbrewery.com/fund-comparison",
        "name": "Start SIP Investment"
      }
    };

    if (structuredData) {
      return structuredData;
    }

    if (ogType === 'article' && isNewsArticle) {
      return {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": finalTitle,
        "description": finalDescription,
        "image": {
          "@type": "ImageObject",
          "url": finalOgImage,
          "width": 1200,
          "height": 630
        },
        "datePublished": publishedTime || new Date().toISOString(),
        "dateModified": modifiedTime || publishedTime || new Date().toISOString(),
        "author": {
          "@type": "Organization",
          "name": articleAuthor || "SIP Brewery Research Team",
          "url": "https://sipbrewery.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "SIP Brewery",
          "logo": {
            "@type": "ImageObject",
            "url": "https://sipbrewery.com/og-image.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": finalCanonicalUrl
        },
        "articleSection": "Investment Analysis",
        "inLanguage": "en-IN",
        "isAccessibleForFree": true,
        "about": {
          "@type": "Thing",
          "name": "Mutual Fund Investment"
        }
      };
    }

    return baseOrganization;
  };

  // Generate breadcrumb schema
  const generateBreadcrumbSchema = () => {
    if (!breadcrumbs || breadcrumbs.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };
  };

  // Generate FAQ schema
  const generateFAQSchema = () => {
    if (!faqData || faqData.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  };

  const mainSchema = generateSchemaMarkup();
  const breadcrumbSchema = generateBreadcrumbSchema();
  const faqSchema = generateFAQSchema();

  console.log('🎯 Enhanced SEO Setup:', {
    title: finalTitle.substring(0, 60) + '...',
    titleLength: finalTitle.length,
    description: finalDescription.substring(0, 100) + '...',
    descLength: finalDescription.length,
    canonicalUrl: finalCanonicalUrl,
    ogImage: finalOgImage,
    hasStructuredData: !!mainSchema,
    hasBreadcrumbs: !!breadcrumbSchema,
    hasFAQ: !!faqSchema
  });

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content={articleAuthor || "SIP Brewery Research Team"} />
      <meta name="language" content="en-IN" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Enhanced Open Graph Tags */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:site_name" content="SIP Brewery" />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:url" content={finalOgImage} />
      <meta property="og:image:secure_url" content={finalOgImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${finalTitle} - SIP Brewery`} />
      <meta property="og:locale" content="en_IN" />
      <meta property="fb:app_id" content="YOUR_FB_APP_ID" />
      
      {/* Article specific OG tags */}
      {ogType === 'article' && (
        <>
          <meta property="article:author" content={articleAuthor || "SIP Brewery Research Team"} />
          <meta property="article:publisher" content={articlePublisher || "SIP Brewery"} />
          <meta property="article:published_time" content={publishedTime || new Date().toISOString()} />
          <meta property="article:modified_time" content={modifiedTime || publishedTime || new Date().toISOString()} />
          <meta property="article:section" content="Investment Analysis" />
          <meta property="article:tag" content="Mutual Funds" />
          <meta property="article:tag" content="Investment" />
          <meta property="article:tag" content="SIP" />
        </>
      )}

      {/* Enhanced Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sipbrewery" />
      <meta name="twitter:creator" content="@sipbrewery" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      <meta name="twitter:image:alt" content={`${finalTitle} - SIP Brewery`} />
      <meta name="twitter:domain" content="sipbrewery.com" />
      <meta name="twitter:label1" content="Category" />
      <meta name="twitter:data1" content="Financial Services" />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      <meta name="application-name" content="SIP Brewery" />
      <meta name="apple-mobile-web-app-title" content="SIP Brewery" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Cache Control & Performance */}
      <meta httpEquiv="Cache-Control" content="public, max-age=3600" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      
      {/* Schema.org Structured Data */}
      {mainSchema && (
        <script type="application/ld+json">
          {JSON.stringify(mainSchema)}
        </script>
      )}
      
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://sipbrewery.com" />
      
      {/* Alternative language versions */}
      <link rel="alternate" hrefLang="en-IN" href={finalCanonicalUrl} />
      <link rel="alternate" hrefLang="en" href={finalCanonicalUrl} />
    </Helmet>
  );
};

export default ConsolidatedSEOHead;

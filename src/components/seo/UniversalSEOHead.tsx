
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface UniversalSEOHeadProps {
  pageType?: 'homepage' | 'blog' | 'fund' | 'tool' | 'info';
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  articleAuthor?: string;
  publishedTime?: string;
  modifiedTime?: string;
  schemaData?: object;
  noIndex?: boolean;
}

const UniversalSEOHead = ({
  pageType = 'homepage',
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  articleAuthor,
  publishedTime,
  modifiedTime,
  schemaData,
  noIndex = false
}: UniversalSEOHeadProps) => {
  const location = useLocation();
  
  // Generate page-specific defaults based on route
  const generatePageDefaults = () => {
    const path = location.pathname;
    const baseUrl = 'https://sipbrewery.com';
    
    // Default SEO values based on route
    const defaults = {
      '/': {
        title: 'SIP Brewery - Best Mutual Fund Investment Platform India | SEBI Registered',
        description: 'India\'s #1 SEBI registered mutual fund investment platform for smart SIP investments. Compare funds, get AI insights, and build your wealth with expert guidance.',
        keywords: 'mutual funds india, SIP investment, SEBI registered platform, best mutual funds, SIP calculator, investment platform',
        ogType: 'website' as const
      },
      '/fund-comparison': {
        title: 'AI Mutual Fund Comparison Tool - Compare Best Funds 2024 | SIP Brewery',
        description: 'Compare mutual funds with AI-powered analysis. Get detailed performance metrics, risk assessment, and investment recommendations. India\'s most advanced fund comparison tool.',
        keywords: 'mutual fund comparison, AI fund analysis, best mutual funds 2024, fund comparison tool, investment research',
        ogType: 'website' as const
      },
      '/public-funds': {
        title: 'Live Mutual Fund NAV & Performance Data - Real-time Fund Tracking | SIP Brewery',
        description: 'Track live mutual fund NAV, performance data, and market insights. Real-time fund tracking with AI analysis. India\'s comprehensive mutual fund data platform.',
        keywords: 'mutual fund NAV, live fund prices, mutual fund performance, fund tracking, real-time data',
        ogType: 'website' as const
      },
      '/sip-calculator': {
        title: 'SIP Calculator - Calculate SIP Returns & Plan Investment | SIP Brewery',
        description: 'Calculate SIP returns with our advanced SIP calculator. Plan your systematic investment with goal-based planning and wealth projection tools.',
        keywords: 'SIP calculator, systematic investment plan, SIP returns calculator, investment planning, wealth calculator',
        ogType: 'website' as const
      },
      '/contact': {
        title: 'Contact SIP Brewery - Investment Support & Customer Service',
        description: 'Get in touch with SIP Brewery for investment support, customer service, and expert guidance. SEBI registered investment platform support.',
        keywords: 'contact SIP Brewery, investment support, customer service, investment help',
        ogType: 'website' as const
      },
      '/community': {
        title: 'Investment Community - Ask Questions & Share Knowledge | SIP Brewery',
        description: 'Join India\'s largest investment community. Ask questions, share knowledge, and learn from fellow investors. Expert guidance and peer support.',
        keywords: 'investment community, mutual fund community, investment questions, investor support',
        ogType: 'website' as const
      }
    };

    // Check for blog posts
    if (path.startsWith('/blog/')) {
      return {
        title: 'Investment Analysis & Market Insights Blog | SIP Brewery',
        description: 'Expert investment analysis, market insights, and financial education. Stay updated with latest trends in mutual funds and investment strategies.',
        keywords: 'investment blog, market analysis, mutual fund insights, financial education',
        ogType: 'article' as const
      };
    }

    // Check for fund details
    if (path.startsWith('/fund/') || path.startsWith('/funds/')) {
      return {
        title: 'Mutual Fund Details & Analysis - Performance & Investment Guide | SIP Brewery',
        description: 'Detailed mutual fund analysis with performance metrics, portfolio insights, and investment recommendations. Make informed investment decisions.',
        keywords: 'mutual fund details, fund analysis, investment guide, fund performance',
        ogType: 'website' as const
      };
    }

    return defaults[path as keyof typeof defaults] || defaults['/'];
  };

  const pageDefaults = generatePageDefaults();
  
  // Final values
  const finalTitle = title || pageDefaults.title;
  const finalDescription = description || pageDefaults.description;
  const finalKeywords = keywords || pageDefaults.keywords;
  const finalCanonicalUrl = canonicalUrl || `https://sipbrewery.com${location.pathname}`;
  const defaultImage = 'https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png';
  const finalOgImage = ogImage || defaultImage;
  const ogType = pageType === 'blog' ? 'article' : 'website';

  // Generate structured data
  const generateStructuredData = () => {
    if (schemaData) return schemaData;

    const baseSchema = {
      "@context": "https://schema.org",
      "@type": pageType === 'blog' ? "Article" : "FinancialService",
      "name": finalTitle,
      "description": finalDescription,
      "url": finalCanonicalUrl,
      "image": finalOgImage
    };

    if (pageType === 'blog') {
      return {
        ...baseSchema,
        "@type": "Article",
        "headline": finalTitle,
        "author": {
          "@type": "Organization",
          "name": articleAuthor || "SIP Brewery Research Team"
        },
        "publisher": {
          "@type": "Organization",
          "name": "SIP Brewery",
          "logo": {
            "@type": "ImageObject",
            "url": defaultImage
          }
        },
        "datePublished": publishedTime || new Date().toISOString(),
        "dateModified": modifiedTime || publishedTime || new Date().toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": finalCanonicalUrl
        }
      };
    }

    if (pageType === 'homepage') {
      return {
        ...baseSchema,
        "@type": "FinancialService",
        "serviceType": "Mutual Fund Investment Advisory",
        "areaServed": "India",
        "provider": {
          "@type": "Organization",
          "name": "SIP Brewery",
          "url": "https://sipbrewery.com"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "1500+"
        }
      };
    }

    return baseSchema;
  };

  const structuredData = generateStructuredData();

  console.log('🎯 Universal SEO Applied:', {
    path: location.pathname,
    title: finalTitle.substring(0, 60) + '...',
    pageType,
    hasSchema: !!structuredData
  });

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="author" content={articleAuthor || "SIP Brewery Research Team"} />
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:site_name" content="SIP Brewery" />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:secure_url" content={finalOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${finalTitle} - SIP Brewery`} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Article specific OG tags */}
      {ogType === 'article' && (
        <>
          <meta property="article:author" content={articleAuthor || "SIP Brewery Research Team"} />
          <meta property="article:publisher" content="SIP Brewery" />
          <meta property="article:published_time" content={publishedTime || new Date().toISOString()} />
          <meta property="article:modified_time" content={modifiedTime || publishedTime || new Date().toISOString()} />
          <meta property="article:section" content="Investment Analysis" />
        </>
      )}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@SIPBrewery" />
      <meta name="twitter:creator" content="@SIPBrewery" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      <meta name="twitter:image:alt" content={`${finalTitle} - SIP Brewery`} />
      
      {/* Additional Meta Tags */}
      <meta name="application-name" content="SIP Brewery" />
      <meta name="theme-color" content="#2563eb" />
      <meta httpEquiv="Cache-Control" content="public, max-age=3600" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default UniversalSEOHead;

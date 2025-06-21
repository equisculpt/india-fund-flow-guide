
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

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
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  structuredData,
  isDynamic = false,
  ogType,
  articleAuthor,
  articlePublisher,
  publishedTime,
  modifiedTime
}: SEOHeadProps) => {
  const location = useLocation();
  
  // Generate dynamic content based on current route
  const generateDynamicContent = () => {
    const baseUrl = 'https://sipbrewery.com';
    const currentPath = location.pathname;
    const generatedCanonicalUrl = `${baseUrl}${currentPath}`;
    
    // Default values
    let dynamicTitle = "SIP Brewery - Best Mutual Fund Investment Platform India | SIP Calculator";
    let dynamicDescription = "India's #1 SEBI registered mutual fund investment platform. Compare 1000+ mutual funds, professional recommendations, SIP calculator, goal-based investing. Start SIP with ₹500. Regular mutual funds only.";
    let dynamicKeywords = "mutual funds india, SIP investment, mutual fund comparison, best mutual funds 2024, SIP calculator, ELSS funds, large cap funds, small cap funds, mutual fund analysis, investment advisor, portfolio tracker, regular mutual funds";
    let dynamicOgType = 'website';
    
    // Route-specific content generation
    if (currentPath.startsWith('/blog/')) {
      dynamicOgType = 'article';
      
      if (currentPath.includes('veeda-clinical-research-ipo')) {
        dynamicTitle = "Veeda Clinical Research IPO Analysis 2024 | Complete SWOT & Financial Review | SIP Brewery";
        dynamicDescription = "In-depth analysis of Veeda Clinical Research IPO with financial charts, SWOT analysis, and key insights. Educational content only - not investment advice. Get complete IPO review here.";
        dynamicKeywords = "Veeda Clinical Research IPO, CRO IPO India, clinical research IPO analysis, healthcare IPO 2024, biotech IPO review, SEBI compliant IPO analysis, contract research organization stocks";
      } else if (currentPath.includes('ipo-analysis-guide')) {
        dynamicTitle = "Complete IPO Analysis Guide 2024 | Professional Investment Evaluation | SIP Brewery";
        dynamicDescription = "Master IPO analysis with our comprehensive guide. Learn key metrics, evaluation techniques, and risk assessment for smart IPO investments in India.";
        dynamicKeywords = "IPO analysis guide, IPO investment tips, IPO evaluation metrics, IPO research methods, stock market analysis, investment guide India";
      } else if (currentPath.includes('healthcare-sector-outlook')) {
        dynamicTitle = "Healthcare Sector Investment Outlook 2024 | Growth Opportunities | SIP Brewery";
        dynamicDescription = "Comprehensive analysis of India's healthcare sector investment opportunities, key trends, and growth drivers for 2024-25.";
        dynamicKeywords = "healthcare sector India, healthcare investments, pharma stocks, medical device investments, healthcare mutual funds";
      } else if (currentPath.includes('how-fund-managers-make-money')) {
        dynamicTitle = "How Fund Managers Make Money from Mutual Funds | Complete Guide | SIP Brewery";
        dynamicDescription = "Understand how mutual fund managers earn through expense ratios, performance fees, and management charges. Learn about regular vs direct plans.";
        dynamicKeywords = "fund manager fees, mutual fund expenses, expense ratio, direct vs regular plans, fund management costs";
      } else if (currentPath.includes('how-mutual-funds-work')) {
        dynamicTitle = "How Mutual Funds Work | Complete Beginner's Guide 2024 | SIP Brewery";
        dynamicDescription = "Learn how mutual funds work, types of mutual funds, NAV calculation, and investment process. Complete guide for beginners in India.";
        dynamicKeywords = "mutual funds basics, how mutual funds work, NAV calculation, mutual fund types, SIP investment guide";
      } else if (currentPath.includes('mutual-funds-benefits')) {
        dynamicTitle = "Top Benefits of Mutual Funds for Individual Investors | SIP Brewery";
        dynamicDescription = "Discover key benefits of mutual fund investing including diversification, professional management, liquidity, and tax advantages.";
        dynamicKeywords = "mutual fund benefits, diversification benefits, professional fund management, mutual fund advantages, investment benefits";
      } else {
        // Generic blog page
        dynamicTitle = "Investment Insights & Analysis | SIP Brewery Blog";
        dynamicDescription = "Expert investment insights, mutual fund analysis, and financial planning tips from India's leading investment platform.";
        dynamicKeywords = "investment blog, mutual fund insights, financial planning, investment analysis, stock market tips";
      }
    } else if (currentPath === '/fund-comparison') {
      dynamicTitle = "Mutual Fund Comparison Tool | Compare Best Funds 2024 | SIP Brewery";
      dynamicDescription = "Compare mutual funds side-by-side with our advanced comparison tool. Analyze performance, fees, and key metrics to make informed investment decisions.";
      dynamicKeywords = "mutual fund comparison, fund comparison tool, compare mutual funds, best mutual funds 2024, fund analysis";
    } else if (currentPath === '/sip-calculator') {
      dynamicTitle = "SIP Calculator | Calculate SIP Returns & Plan Investments | SIP Brewery";
      dynamicDescription = "Use our advanced SIP calculator to plan your systematic investment plan. Calculate potential returns, set investment goals, and start your SIP journey.";
      dynamicKeywords = "SIP calculator, systematic investment plan calculator, SIP returns calculator, investment planning tool, SIP planning";
    } else if (currentPath === '/public-funds') {
      dynamicTitle = "Public Mutual Funds | Browse 1000+ Funds | SIP Brewery";
      dynamicDescription = "Explore comprehensive database of public mutual funds in India. Find the best funds with detailed analysis, performance metrics, and expert insights.";
      dynamicKeywords = "public mutual funds, mutual fund database, best mutual funds India, fund finder, mutual fund search";
    } else if (currentPath === '/contact') {
      dynamicTitle = "Contact SIP Brewery | Get Investment Support | Mutual Fund Help";
      dynamicDescription = "Get in touch with SIP Brewery for investment guidance, mutual fund support, and financial planning assistance. SEBI compliant investment platform.";
      dynamicKeywords = "contact SIP Brewery, investment help, mutual fund support, financial planning assistance";
    } else if (currentPath === '/dashboard') {
      dynamicTitle = "Investment Dashboard | Track Portfolio Performance | SIP Brewery";
      dynamicDescription = "Monitor your mutual fund investments with our comprehensive dashboard. Track performance, analyze returns, and manage your portfolio effectively.";
      dynamicKeywords = "investment dashboard, portfolio tracker, mutual fund portfolio, investment tracking, portfolio management";
    }
    
    return {
      title: dynamicTitle,
      description: dynamicDescription,
      keywords: dynamicKeywords,
      canonicalUrl: generatedCanonicalUrl,
      ogType: dynamicOgType
    };
  };
  
  // Use provided props or fall back to dynamic generation
  const dynamicContent = generateDynamicContent();
  const finalTitle = title || dynamicContent.title;
  const finalDescription = description || dynamicContent.description;
  const finalKeywords = keywords || dynamicContent.keywords;
  const finalCanonicalUrl = canonicalUrl || dynamicContent.canonicalUrl;
  const finalOgType = ogType || dynamicContent.ogType;
  
  // Enhanced debugging
  console.log('SEOHead Dynamic Generation:', {
    currentPath: location.pathname,
    finalTitle: finalTitle.substring(0, 50) + '...',
    finalCanonicalUrl,
    isProvidedOrGenerated: title ? 'Provided' : 'Generated',
    ogType: finalOgType
  });
  
  // Use a properly sized default image - Facebook requires minimum 200x200
  const defaultOgImage = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&crop=center&auto=format&q=80";
  const finalOgImage = ogImage || defaultOgImage;
  const absoluteOgImage = finalOgImage.startsWith('http') ? finalOgImage : `https://sipbrewery.com${finalOgImage}`;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": finalOgType === 'article' ? "Article" : "FinancialService",
    "name": finalTitle,
    "headline": finalTitle,
    "description": finalDescription,
    "url": finalCanonicalUrl,
    "logo": "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png",
    "image": absoluteOgImage,
    ...(finalOgType === 'article' && {
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
    }),
    ...(finalOgType === 'website' && {
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
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content={articleAuthor || "SIP Brewery Research Team"} />
      
      {/* CRITICAL: Canonical URL - Must match og:url exactly */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* CRITICAL: Open Graph tags - Must use same URL as canonical */}
      <meta property="og:site_name" content="SIP Brewery" />
      <meta property="og:type" content={finalOgType} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:secure_url" content={absoluteOgImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${finalTitle} - SIP Brewery`} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Article specific Open Graph tags */}
      {finalOgType === 'article' && (
        <>
          <meta property="article:author" content={articleAuthor || "SIP Brewery Research Team"} />
          <meta property="article:publisher" content={articlePublisher || "SIP Brewery"} />
          <meta property="article:published_time" content={publishedTime || new Date().toISOString()} />
          <meta property="article:modified_time" content={modifiedTime || publishedTime || new Date().toISOString()} />
          <meta property="article:section" content="Investment Analysis" />
        </>
      )}
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sipbrewery" />
      <meta name="twitter:creator" content="@sipbrewery" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={absoluteOgImage} />
      <meta name="twitter:image:alt" content={`${finalTitle} - SIP Brewery`} />
      
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

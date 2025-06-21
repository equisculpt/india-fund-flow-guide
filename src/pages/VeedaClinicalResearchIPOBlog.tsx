
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import VeedaHeader from '@/components/blog/veeda-ipo/VeedaHeader';
import ComplianceDisclaimer from '@/components/blog/veeda-ipo/ComplianceDisclaimer';
import CompanyOverview from '@/components/blog/veeda-ipo/CompanyOverview';
import FinancialCharts from '@/components/blog/veeda-ipo/FinancialCharts';
import SWOTAnalysis from '@/components/blog/veeda-ipo/SWOTAnalysis';
import MarketOpportunities from '@/components/blog/veeda-ipo/MarketOpportunities';
import InvestmentConsiderations from '@/components/blog/veeda-ipo/InvestmentConsiderations';
import BlogFooter from '@/components/blog/veeda-ipo/BlogFooter';

const VeedaClinicalResearchIPOBlog = () => {
  const canonicalUrl = "https://sipbrewery.com/blog/veeda-clinical-research-ipo-analysis";
  const title = "Veeda Clinical Research IPO Analysis 2024 | Complete SWOT & Financial Review | SIP Brewery";
  const description = "In-depth analysis of Veeda Clinical Research IPO with financial charts, SWOT analysis, and key insights. Educational content only - not investment advice. Get complete IPO review here.";
  const keywords = "Veeda Clinical Research IPO, CRO IPO India, clinical research IPO analysis, healthcare IPO 2024, biotech IPO review, SEBI compliant IPO analysis, contract research organization stocks";
  const ogImage = "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png";

  // IMMEDIATE DOM manipulation - runs synchronously before any React rendering
  useEffect(() => {
    console.log('🚨 ULTRA-AGGRESSIVE SEO OVERRIDE STARTING');
    
    // Function to brutally override all SEO
    const brutalSEOOverride = () => {
      // 1. IMMEDIATELY set document title
      document.title = title;
      
      // 2. NUCLEAR removal of ALL existing canonicals
      const existingCanonicals = document.querySelectorAll('link[rel="canonical"]');
      console.log('🗑️ BRUTALLY REMOVING existing canonicals:', existingCanonicals.length);
      existingCanonicals.forEach(canonical => {
        console.log('Removing:', canonical.getAttribute('href'));
        canonical.remove();
      });
      
      // 3. IMMEDIATE insertion of correct canonical
      const canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = canonicalUrl;
      document.head.insertBefore(canonicalLink, document.head.firstChild); // Insert at TOP
      
      // 4. NUCLEAR removal of ALL descriptions
      const existingDescriptions = document.querySelectorAll('meta[name="description"]');
      console.log('🗑️ BRUTALLY REMOVING descriptions:', existingDescriptions.length);
      existingDescriptions.forEach(desc => desc.remove());
      
      // 5. IMMEDIATE insertion of correct description
      const descriptionMeta = document.createElement('meta');
      descriptionMeta.name = 'description';
      descriptionMeta.content = description;
      document.head.insertBefore(descriptionMeta, document.head.firstChild);
      
      // 6. Handle all OG tags aggressively
      const ogTags = [
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: canonicalUrl },
        { property: 'og:image', content: ogImage },
        { property: 'og:type', content: 'article' },
        { property: 'og:site_name', content: 'SIP Brewery' }
      ];
      
      ogTags.forEach(tag => {
        // Remove existing
        const existing = document.querySelector(`meta[property="${tag.property}"]`);
        if (existing) existing.remove();
        
        // Add new at top
        const newTag = document.createElement('meta');
        newTag.setAttribute('property', tag.property);
        newTag.setAttribute('content', tag.content);
        document.head.insertBefore(newTag, document.head.firstChild);
      });
      
      // 7. Handle Twitter cards
      const twitterTags = [
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: ogImage }
      ];
      
      twitterTags.forEach(tag => {
        const existing = document.querySelector(`meta[name="${tag.name}"]`);
        if (existing) existing.remove();
        
        const newTag = document.createElement('meta');
        newTag.setAttribute('name', tag.name);
        newTag.setAttribute('content', tag.content);
        document.head.insertBefore(newTag, document.head.firstChild);
      });
      
      console.log('✅ SEO BRUTALLY OVERRIDDEN - FINAL STATE:', {
        title: document.title,
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
        allCanonicals: Array.from(document.querySelectorAll('link[rel="canonical"]')).map(l => l.getAttribute('href'))
      });
    };
    
    // Execute IMMEDIATELY
    brutalSEOOverride();
    
    // Set up aggressive mutation observer to counter ANY interference
    const observer = new MutationObserver((mutations) => {
      let needsReapply = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              const element = node as Element;
              // Check for rogue canonicals
              if (element.tagName === 'LINK' && element.getAttribute('rel') === 'canonical') {
                const href = element.getAttribute('href');
                if (href !== canonicalUrl) {
                  console.log('🚨 INTERFERENCE DETECTED! Removing rogue canonical:', href);
                  element.remove();
                  needsReapply = true;
                }
              }
              // Check for rogue descriptions
              if (element.tagName === 'META' && element.getAttribute('name') === 'description') {
                const content = element.getAttribute('content');
                if (content !== description) {
                  console.log('🚨 ROGUE DESCRIPTION DETECTED! Removing:', content);
                  element.remove();
                  needsReapply = true;
                }
              }
            }
          });
        }
      });
      
      if (needsReapply) {
        console.log('🔄 REAPPLYING BRUTAL SEO due to interference');
        brutalSEOOverride();
      }
    });
    
    observer.observe(document.head, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['href', 'content']
    });
    
    // Also execute on intervals to be extra sure
    const intervals = [50, 100, 200, 500, 1000, 2000];
    const timeouts = intervals.map(delay => 
      setTimeout(() => {
        console.log(`🔄 Scheduled brutal SEO reapplication at ${delay}ms`);
        brutalSEOOverride();
      }, delay)
    );
    
    return () => {
      observer.disconnect();
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [title, canonicalUrl, description, keywords, ogImage]);

  return (
    <>
      {/* Helmet as backup - but DOM manipulation takes precedence */}
      <Helmet priority>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="SIP Brewery" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <VeedaHeader />
          <ComplianceDisclaimer />
          <CompanyOverview />
          <FinancialCharts />
          <SWOTAnalysis />
          <MarketOpportunities />
          <InvestmentConsiderations />
          <BlogFooter />
        </div>
      </div>
    </>
  );
};

export default VeedaClinicalResearchIPOBlog;

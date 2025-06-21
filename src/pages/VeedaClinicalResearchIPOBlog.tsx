
import React, { useEffect } from 'react';
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

  // NUCLEAR OPTION: Complete DOM takeover bypassing ALL React helmet systems
  useEffect(() => {
    console.log('🚨 NUCLEAR SEO TAKEOVER INITIATED:', {
      targetCanonicalUrl: canonicalUrl,
      targetTitle: title,
      currentLocation: window.location.pathname,
      timestamp: new Date().toISOString()
    });

    // Function to aggressively set SEO
    const setSEOAggressively = () => {
      // 1. Clear document title and set immediately  
      document.title = title;
      
      // 2. Remove ALL canonical links (including those added by other components)
      const allCanonicals = document.querySelectorAll('link[rel="canonical"]');
      console.log('🗑️ Removing existing canonicals:', allCanonicals.length);
      allCanonicals.forEach(link => {
        console.log('Removing canonical:', link.getAttribute('href'));
        link.remove();
      });
      
      // 3. Create and insert new canonical link
      const newCanonical = document.createElement('link');
      newCanonical.rel = 'canonical';
      newCanonical.href = canonicalUrl;
      document.head.appendChild(newCanonical);
      
      // 4. Remove ALL description meta tags
      const allDescriptions = document.querySelectorAll('meta[name="description"]');
      console.log('🗑️ Removing existing descriptions:', allDescriptions.length);
      allDescriptions.forEach(meta => {
        console.log('Removing description:', meta.getAttribute('content'));
        meta.remove();
      });
      
      // 5. Create and insert new description
      const newDescription = document.createElement('meta');
      newDescription.name = 'description';
      newDescription.content = description;
      document.head.appendChild(newDescription);
      
      // 6. Remove ALL keywords meta tags
      const allKeywords = document.querySelectorAll('meta[name="keywords"]');
      allKeywords.forEach(meta => meta.remove());
      
      // 7. Create and insert new keywords
      const newKeywords = document.createElement('meta');
      newKeywords.name = 'keywords';
      newKeywords.content = keywords;
      document.head.appendChild(newKeywords);
      
      // 8. Handle Open Graph tags
      const ogTags = [
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: canonicalUrl },
        { property: 'og:image', content: ogImage },
        { property: 'og:type', content: 'article' },
        { property: 'og:site_name', content: 'SIP Brewery' }
      ];
      
      ogTags.forEach(tag => {
        const existing = document.querySelector(`meta[property="${tag.property}"]`);
        if (existing) existing.remove();
        
        const newTag = document.createElement('meta');
        newTag.setAttribute('property', tag.property);
        newTag.setAttribute('content', tag.content);
        document.head.appendChild(newTag);
      });
      
      // 9. Handle Twitter Card tags
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
        document.head.appendChild(newTag);
      });
      
      console.log('✅ NUCLEAR SEO TAKEOVER COMPLETE:', {
        documentTitle: document.title,
        canonicalInDOM: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        descriptionInDOM: document.querySelector('meta[name="description"]')?.getAttribute('content'),
        allCanonicalLinks: Array.from(document.querySelectorAll('link[rel="canonical"]')).map(link => link.getAttribute('href')),
        timestamp: new Date().toISOString()
      });
    };
    
    // Execute immediately
    setSEOAggressively();
    
    // Execute again after a small delay to catch any late-loading interference
    setTimeout(setSEOAggressively, 100);
    setTimeout(setSEOAggressively, 500);
    setTimeout(setSEOAggressively, 1000);
    
    // Force scroll to top
    window.scrollTo(0, 0);
    
    // Set up observer to watch for any DOM changes that might interfere
    const observer = new MutationObserver((mutations) => {
      let shouldReapply = false;
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              const element = node as Element;
              if (element.tagName === 'LINK' && element.getAttribute('rel') === 'canonical') {
                const href = element.getAttribute('href');
                if (href !== canonicalUrl) {
                  console.log('🚨 INTERFERENCE DETECTED! Removing rogue canonical:', href);
                  element.remove();
                  shouldReapply = true;
                }
              }
            }
          });
        }
      });
      
      if (shouldReapply) {
        console.log('🔄 Reapplying SEO due to interference');
        setSEOAggressively();
      }
    });
    
    observer.observe(document.head, { childList: true, subtree: true });
    
    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [title, canonicalUrl, description, keywords, ogImage]);

  return (
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
  );
};

export default VeedaClinicalResearchIPOBlog;

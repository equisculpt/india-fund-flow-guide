
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  // Pages that have their own SEO implementation - Layout should NOT render SEO for these
  const pagesWithOwnSEO = [
    '/blog/veeda-clinical-research-ipo-analysis',
    '/blog/ipo-analysis-guide',
    '/blog/healthcare-sector-outlook',
    '/blog/how-fund-managers-make-money',
    '/blog/how-mutual-funds-work',
    '/blog/mutual-funds-benefits'
  ];
  
  const shouldRenderSEO = !pagesWithOwnSEO.includes(location.pathname);
  
  console.log('Layout SEO Decision:', {
    currentPath: location.pathname,
    shouldRenderSEO,
    pagesWithOwnSEO,
    isExcluded: pagesWithOwnSEO.includes(location.pathname),
    reason: shouldRenderSEO ? 'No page-specific SEO found' : 'Page has its own SEO - SKIPPED'
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* CRITICAL: Only render SEO if page doesn't have its own SEO implementation */}
      {shouldRenderSEO ? (
        <SEOHead isDynamic={true} />
      ) : (
        <></>
      )}
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

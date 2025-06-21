
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
  
  // Don't render SEO in Layout for pages that have their own SEO implementation
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
    reason: shouldRenderSEO ? 'No page-specific SEO found' : 'Page has its own SEO'
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Only render SEO if page doesn't have its own */}
      {shouldRenderSEO && <SEOHead isDynamic={true} />}
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;


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
  
  // Pages that handle their own SEO completely - Layout should NEVER render SEO for these
  const pagesWithOwnSEO = [
    '/blog/veeda-clinical-research-ipo-analysis',
    '/blog/ipo-analysis-guide',
    '/blog/healthcare-sector-outlook',
    '/blog/how-fund-managers-make-money',
    '/blog/how-mutual-funds-work',
    '/blog/mutual-funds-benefits'
  ];
  
  const shouldRenderSEO = !pagesWithOwnSEO.includes(location.pathname);
  
  console.log('Layout SEO Decision - FORENSIC AUDIT:', {
    currentPath: location.pathname,
    shouldRenderSEO,
    isVeedaPage: location.pathname === '/blog/veeda-clinical-research-ipo-analysis',
    willSkipLayoutSEO: pagesWithOwnSEO.includes(location.pathname),
    reason: shouldRenderSEO ? 'Will render Layout SEO' : 'Page handles own SEO - COMPLETELY SKIPPED'
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* CRITICAL: Absolutely NO SEO rendering for pages with their own implementation */}
      {shouldRenderSEO && (
        <SEOHead isDynamic={true} />
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

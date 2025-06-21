
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
  
  // Pages that completely handle their own SEO - Layout must NEVER interfere
  const pagesWithOwnSEO = [
    '/blog/veeda-clinical-research-ipo-analysis'
  ];
  
  const shouldRenderSEO = !pagesWithOwnSEO.includes(location.pathname);
  
  console.log('🛡️ Layout SEO Guard - ABSOLUTE PROTECTION:', {
    currentPath: location.pathname,
    shouldRenderSEO,
    isVeedaPage: location.pathname === '/blog/veeda-clinical-research-ipo-analysis',
    willSkipLayoutSEO: pagesWithOwnSEO.includes(location.pathname),
    reason: shouldRenderSEO ? 'Will render Layout SEO' : '🚫 COMPLETELY BLOCKED - Page has nuclear SEO'
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* ABSOLUTE PROTECTION: Zero SEO interference for nuclear SEO pages */}
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

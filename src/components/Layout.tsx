
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
  
  // Pages that have COMPLETE SEO control - Layout must NEVER render ANY SEO
  const pagesWithNuclearSEO = [
    '/blog/nbfc-sector-analysis-india-2025',
    '/blog/hdb-financial-services-ipo-analysis',
    '/blog/veeda-clinical-research-ipo-analysis',
    '/blog/indogulf-cropsciences-ipo-complete-analysis-2024'
  ];
  
  const isNuclearSEOPage = pagesWithNuclearSEO.includes(location.pathname);
  
  console.log('🛡️ Layout SEO Guard V8 - ULTRA IMMEDIATE RENDER:', {
    currentPath: location.pathname,
    isNuclearSEOPage,
    willRenderSEO: !isNuclearSEOPage,
    reason: isNuclearSEOPage ? '🚫 NUCLEAR SEO PAGE - ZERO SEO FROM LAYOUT' : '✅ Normal page - ULTRA IMMEDIATE SEO render',
    timestamp: new Date().toISOString(),
    'GUARD_STATUS': isNuclearSEOPage ? 'BLOCKING_ALL_LAYOUT_SEO' : 'ULTRA_IMMEDIATE_LAYOUT_SEO'
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* CRITICAL: Only render SEO for non-nuclear pages, render ULTRA immediately */}
      {!isNuclearSEOPage && (
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

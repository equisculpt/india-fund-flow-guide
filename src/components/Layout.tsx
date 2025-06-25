
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';
import HydrationAwareSEO from './seo/HydrationAwareSEO';

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
  
  console.log('🛡️ Layout SEO Guard V5 - HYDRATION AWARE:', {
    currentPath: location.pathname,
    isNuclearSEOPage,
    willCompletelySkipSEO: isNuclearSEOPage,
    reason: isNuclearSEOPage ? '🚫 NUCLEAR SEO PAGE - ZERO INTERFERENCE' : 'Normal page - will render SEO with hydration guard',
    timestamp: new Date().toISOString(),
    'GUARD_STATUS': isNuclearSEOPage ? 'BLOCKING_ALL_SEO' : 'ALLOWING_SEO_AFTER_HYDRATION'
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* CRITICAL: Only render SEO for non-nuclear pages and only after hydration */}
      {!isNuclearSEOPage && (
        <HydrationAwareSEO>
          <SEOHead isDynamic={true} />
        </HydrationAwareSEO>
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

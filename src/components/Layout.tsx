
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import UniversalSEOHead from './seo/UniversalSEOHead';
import ErrorBoundary from './ErrorBoundary';

interface LayoutProps {
  children: React.ReactNode;
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

const Layout = ({ 
  children, 
  pageType,
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  articleAuthor,
  publishedTime,
  modifiedTime,
  schemaData,
  noIndex
}: LayoutProps) => {
  const location = useLocation();
  
  // Pages that have COMPLETE SEO control - Layout must NEVER render ANY SEO
  const pagesWithNuclearSEO = [
    '/blog/nbfc-sector-analysis-india-2025',
    '/blog/hdb-financial-services-ipo-analysis',
    '/blog/veeda-clinical-research-ipo-analysis',
    '/blog/indogulf-cropsciences-ipo-complete-analysis-2024'
  ];
  
  const isNuclearSEOPage = pagesWithNuclearSEO.includes(location.pathname);
  
  console.log('🛡️ Layout SEO Guard V13:', {
    currentPath: location.pathname,
    isNuclearSEOPage,
    willRenderSEO: !isNuclearSEOPage,
    pageType
  });

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        {/* CRITICAL: Only render SEO for non-nuclear pages */}
        {!isNuclearSEOPage && (
          <UniversalSEOHead
            pageType={pageType}
            title={title}
            description={description}
            keywords={keywords}
            canonicalUrl={canonicalUrl}
            ogImage={ogImage}
            articleAuthor={articleAuthor}
            publishedTime={publishedTime}
            modifiedTime={modifiedTime}
            schemaData={schemaData}
            noIndex={noIndex}
          />
        )}
        
        <Header />
        
        <main className="flex-1">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default Layout;

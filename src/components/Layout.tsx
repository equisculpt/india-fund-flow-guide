
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
  
  // Skip SEO rendering for blog pages - they handle their own SEO
  const shouldRenderSEO = !location.pathname.startsWith('/blog/');
  
  console.log('Layout SEO Decision:', {
    currentPath: location.pathname,
    shouldRenderSEO,
    reason: shouldRenderSEO ? 'Default SEO for non-blog pages' : 'Blog page handles own SEO'
  });

  return (
    <div className="min-h-screen flex flex-col">
      {shouldRenderSEO && <SEOHead />}
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

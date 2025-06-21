
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
  
  // Always render SEO component - it will handle dynamic content generation
  // Blog pages can override with their own SEOHead if needed
  const shouldRenderSEO = true;
  
  console.log('Layout SEO Decision:', {
    currentPath: location.pathname,
    shouldRenderSEO,
    reason: 'Dynamic SEO component handles all routes'
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

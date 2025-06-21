
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
  
  // Completely skip default SEO for blog routes - they handle their own SEO
  const shouldRenderDefaultSEO = !location.pathname.startsWith('/blog/');
  
  console.log('Layout SEO Decision:', {
    currentPath: location.pathname,
    shouldRenderDefaultSEO,
    reason: location.pathname.startsWith('/blog/') ? 'Blog route - no default SEO' : 'Non-blog route - render default SEO'
  });

  return (
    <div className="min-h-screen flex flex-col">
      {shouldRenderDefaultSEO && (
        <SEOHead />
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

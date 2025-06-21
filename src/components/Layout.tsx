
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
  
  console.log('Layout Dynamic SEO:', {
    currentPath: location.pathname,
    reason: 'All pages now use dynamic SEO generation'
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dynamic SEO for all pages */}
      <SEOHead isDynamic={true} />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

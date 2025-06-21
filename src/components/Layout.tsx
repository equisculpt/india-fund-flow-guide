
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
  
  // More specific check - don't render default SEO for any blog routes or pages with their own SEO
  const shouldRenderDefaultSEO = !location.pathname.startsWith('/blog/') && 
                                  !location.pathname.includes('ipo-analysis');
  
  console.log('Layout SEO Decision:', {
    currentPath: location.pathname,
    shouldRenderDefaultSEO,
    reason: location.pathname.startsWith('/blog/') ? 'Blog route detected' : 'Other route'
  });

  return (
    <div className="min-h-screen flex flex-col">
      {shouldRenderDefaultSEO && (
        <SEOHead 
          title="SIP Brewery - Best Mutual Fund Investment Platform India | SIP Calculator"
          description="India's #1 SEBI registered mutual fund investment platform. Compare 1000+ mutual funds, professional recommendations, SIP calculator, goal-based investing. Start SIP with ₹500. Regular mutual funds only."
          keywords="mutual funds india, SIP investment, mutual fund comparison, best mutual funds 2024, SIP calculator, ELSS funds, large cap funds, small cap funds, mutual fund analysis, investment advisor, portfolio tracker, regular mutual funds"
          canonicalUrl="https://sipbrewery.com"
        />
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

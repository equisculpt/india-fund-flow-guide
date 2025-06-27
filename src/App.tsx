
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

import { LanguageProvider } from './contexts/LanguageContext';
import { BrandingProvider } from './contexts/BrandingContext';
import { EnhancedAuthProvider } from './contexts/EnhancedAuthContext';
import { SupabaseAuthProvider } from './contexts/SupabaseAuthContext';
import SecurityHeaders from './components/SecurityHeaders';

// Critical pages - load immediately
import Index from './pages/Index';
import FundComparisonPage from './pages/FundComparisonPage';
import PublicFundsPage from './pages/PublicFundsPage';
import SIPCalculatorPage from './pages/SIPCalculatorPage';

// Non-critical pages - lazy load
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const TermsOfServicePage = React.lazy(() => import('./pages/TermsOfServicePage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage'));
const CommunityPage = React.lazy(() => import('./pages/CommunityPage'));
const FundDetailsPage = React.lazy(() => import('./pages/FundDetailsPage'));
const SecureAdminPage = React.lazy(() => import('./pages/SecureAdminPage'));

// Blog pages - heavily lazy loaded to reduce initial bundle
const IndogulfCropsciencesIPOBlogPage = React.lazy(() => import('@/pages/IndogulfCropsciencesIPOBlog'));
const HDBFinancialServicesIPOBlog = React.lazy(() => import('@/pages/HDBFinancialServicesIPOBlog'));
const VeedaClinicalResearchIPOBlog = React.lazy(() => import('@/pages/VeedaClinicalResearchIPOBlog'));
const NBFCSectorDeepDiveBlog = React.lazy(() => import('@/pages/NBFCSectorDeepDiveBlog'));

// Optimized QueryClient with better defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Lightweight loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Router basename="/">
        <div className="min-h-screen bg-background">
          <QueryClientProvider client={queryClient}>
            <SupabaseAuthProvider>
              <EnhancedAuthProvider>
                <LanguageProvider>
                  <BrandingProvider>
                    <Helmet>
                      <title>SIP Brewery - Best Mutual Fund Investment Platform India | SEBI Registered</title>
                      <meta name="description" content="India's #1 SEBI registered mutual fund investment platform for smart SIP investments. Compare funds, get AI insights, and build your wealth with expert guidance." />
                      <meta name="robots" content="index, follow" />
                      <meta name="author" content="SIP Brewery Research Team" />
                      <link rel="canonical" href="https://sipbrewery.com/" />
                    </Helmet>
                    <Toaster />
                    <SecurityHeaders />
                    <Suspense fallback={<PageLoader />}>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/fund-comparison" element={<FundComparisonPage />} />
                        <Route path="/public-funds" element={<PublicFundsPage />} />
                        <Route path="/sip-calculator" element={<SIPCalculatorPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/terms" element={<TermsOfServicePage />} />
                        <Route path="/privacy" element={<PrivacyPolicyPage />} />
                        <Route path="/community" element={<CommunityPage />} />
                        <Route path="/fund/:fundId" element={<FundDetailsPage />} />
                        <Route path="/funds/:fundId" element={<FundDetailsPage />} />
                        <Route path="/secure-admin" element={<SecureAdminPage />} />
                        
                        {/* Blog Routes - Lazy-loaded */}
                        <Route path="/blog/indogulf-cropsciences-ipo-complete-analysis-2024" element={<IndogulfCropsciencesIPOBlogPage />} />
                        <Route path="/blog/hdb-financial-services-ipo-analysis" element={<HDBFinancialServicesIPOBlog />} />
                        <Route path="/blog/veeda-clinical-research-ipo-analysis" element={<VeedaClinicalResearchIPOBlog />} />
                        <Route path="/blog/nbfc-sector-deep-dive-analysis" element={<NBFCSectorDeepDiveBlog />} />
                      </Routes>
                    </Suspense>
                  </BrandingProvider>
                </LanguageProvider>
              </EnhancedAuthProvider>
            </SupabaseAuthProvider>
          </QueryClientProvider>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;

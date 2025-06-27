
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

import { LanguageProvider } from './contexts/LanguageContext';
import { BrandingProvider } from './contexts/BrandingContext';
import ErrorBoundary from './components/ErrorBoundary';
import PageLoader from './components/PageLoader';

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

// Optimized QueryClient with better defaults and error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error && 'status' in error && typeof error.status === 'number' && error.status >= 400 && error.status < 500) {
          return false;
        }
        return failureCount < 1; // Reduce retries to prevent hanging
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0, // Don't retry mutations
    },
  },
});

// Enhanced loading component
const AppPageLoader = ({ message = "Loading page..." }: { message?: string }) => (
  <PageLoader message={message} />
);

// Safe provider wrapper
const SafeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  try {
    return (
      <LanguageProvider>
        <BrandingProvider>
          {children}
        </BrandingProvider>
      </LanguageProvider>
    );
  } catch (error) {
    console.error('Provider error:', error);
    return <>{children}</>;
  }
};

function App() {
  console.log('🚀 App initializing...');
  
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router basename="/">
          <div className="min-h-screen bg-background">
            <QueryClientProvider client={queryClient}>
              <SafeProviderWrapper>
                <Helmet>
                  <title>SIP Brewery - Best Mutual Fund Investment Platform India | SEBI Registered</title>
                  <meta name="description" content="India's #1 SEBI registered mutual fund investment platform for smart SIP investments. Compare funds, get AI insights, and build your wealth with expert guidance." />
                  <meta name="robots" content="index, follow" />
                  <meta name="author" content="SIP Brewery Research Team" />
                  <link rel="canonical" href="https://sipbrewery.com/" />
                </Helmet>
                <Toaster />
                <ErrorBoundary>
                  <Suspense fallback={<AppPageLoader message="Loading application..." />}>
                    <Routes>
                      {/* Home route - highest priority */}
                      <Route 
                        path="/" 
                        element={
                          <ErrorBoundary fallback={<AppPageLoader message="Loading home page..." />}>
                            <Index />
                          </ErrorBoundary>
                        } 
                      />
                      
                      {/* Core pages */}
                      <Route path="/fund-comparison" element={
                        <ErrorBoundary fallback={<AppPageLoader message="Loading fund comparison..." />}>
                          <FundComparisonPage />
                        </ErrorBoundary>
                      } />
                      <Route path="/public-funds" element={
                        <ErrorBoundary fallback={<AppPageLoader message="Loading public funds..." />}>
                          <PublicFundsPage />
                        </ErrorBoundary>
                      } />
                      <Route path="/sip-calculator" element={
                        <ErrorBoundary fallback={<AppPageLoader message="Loading SIP calculator..." />}>
                          <SIPCalculatorPage />
                        </ErrorBoundary>
                      } />
                      
                      {/* Lazy loaded pages with specific loading messages */}
                      <Route path="/contact" element={
                        <Suspense fallback={<AppPageLoader message="Loading contact page..." />}>
                          <ContactPage />
                        </Suspense>
                      } />
                      <Route path="/terms" element={
                        <Suspense fallback={<AppPageLoader message="Loading terms..." />}>
                          <TermsOfServicePage />
                        </Suspense>
                      } />
                      <Route path="/privacy" element={
                        <Suspense fallback={<AppPageLoader message="Loading privacy policy..." />}>
                          <PrivacyPolicyPage />
                        </Suspense>
                      } />
                      <Route path="/community" element={
                        <Suspense fallback={<AppPageLoader message="Loading community..." />}>
                          <CommunityPage />
                        </Suspense>
                      } />
                      <Route path="/fund/:fundId" element={
                        <Suspense fallback={<AppPageLoader message="Loading fund details..." />}>
                          <FundDetailsPage />
                        </Suspense>
                      } />
                      <Route path="/funds/:fundId" element={
                        <Suspense fallback={<AppPageLoader message="Loading fund analysis..." />}>
                          <FundDetailsPage />
                        </Suspense>
                      } />
                      <Route path="/secure-admin" element={
                        <Suspense fallback={<AppPageLoader message="Loading admin panel..." />}>
                          <SecureAdminPage />
                        </Suspense>
                      } />
                      
                      {/* Blog Routes - Lazy-loaded with specific messages */}
                      <Route path="/blog/indogulf-cropsciences-ipo-complete-analysis-2024" element={
                        <Suspense fallback={<AppPageLoader message="Loading IPO analysis..." />}>
                          <IndogulfCropsciencesIPOBlogPage />
                        </Suspense>
                      } />
                      <Route path="/blog/hdb-financial-services-ipo-analysis" element={
                        <Suspense fallback={<AppPageLoader message="Loading HDB IPO analysis..." />}>
                          <HDBFinancialServicesIPOBlog />
                        </Suspense>
                      } />
                      <Route path="/blog/veeda-clinical-research-ipo-analysis" element={
                        <Suspense fallback={<AppPageLoader message="Loading Veeda IPO analysis..." />}>
                          <VeedaClinicalResearchIPOBlog />
                        </Suspense>
                      } />
                      <Route path="/blog/nbfc-sector-deep-dive-analysis" element={
                        <Suspense fallback={<AppPageLoader message="Loading NBFC sector analysis..." />}>
                          <NBFCSectorDeepDiveBlog />
                        </Suspense>
                      } />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </SafeProviderWrapper>
            </QueryClientProvider>
          </div>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;

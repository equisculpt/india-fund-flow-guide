
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

import { LanguageProvider } from './contexts/LanguageContext';
import { BrandingProvider } from './contexts/BrandingContext';
import { EnhancedAuthProvider } from './contexts/EnhancedAuthContext';
import { SupabaseAuthProvider } from './contexts/SupabaseAuthContext';
import SecurityHeaders from './components/SecurityHeaders';

import Index from './pages/Index';
import FundComparisonPage from './pages/FundComparisonPage';
import PublicFundsPage from './pages/PublicFundsPage';
import SIPCalculatorPage from './pages/SIPCalculatorPage';
import ContactPage from './pages/ContactPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CommunityPage from './pages/CommunityPage';
import FundDetailsPage from './pages/FundDetailsPage';
import SecureAdminPage from './pages/SecureAdminPage';

// ✅ CRITICAL FIX: Router-level lazy loading for blog components
// This prevents ANY blog code from loading unless user visits that specific blog route
const IndogulfCropsciencesIPOBlogPage = React.lazy(() => import('@/pages/IndogulfCropsciencesIPOBlog'));
const HDBFinancialServicesIPOBlog = React.lazy(() => import('@/pages/HDBFinancialServicesIPOBlog'));
const VeedaClinicalResearchIPOBlog = React.lazy(() => import('@/pages/VeedaClinicalResearchIPOBlog'));

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <QueryClientProvider client={queryClient}>
            <SupabaseAuthProvider>
              <EnhancedAuthProvider>
                <LanguageProvider>
                  <BrandingProvider>
                    <Toaster />
                    <SecurityHeaders />
                    <Suspense fallback={<div>Loading...</div>}>
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
                        
                        {/* Blog Routes - Lazy-loaded only when needed */}
                        <Route path="/blog/indogulf-cropsciences-ipo-complete-analysis-2024" element={<IndogulfCropsciencesIPOBlogPage />} />
                        <Route path="/blog/hdb-financial-services-ipo-analysis" element={<HDBFinancialServicesIPOBlog />} />
                        <Route path="/blog/veeda-clinical-research-ipo-analysis" element={<VeedaClinicalResearchIPOBlog />} />
                        
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


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { LanguageProvider } from './contexts/LanguageContext';
import { BrandingProvider } from './contexts/BrandingContext';
import { EnhancedAuthProvider } from './contexts/EnhancedAuthContext';
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
import IndogulfCropsciencesIPOBlogPage from '@/pages/IndogulfCropsciencesIPOBlog';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <QueryClientProvider client={queryClient}>
          <EnhancedAuthProvider>
            <LanguageProvider>
              <BrandingProvider>
                <Toaster />
                <SecurityHeaders />
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
                  
                  <Route path="/blog/indogulf-cropsciences-ipo-complete-analysis-2024" element={<IndogulfCropsciencesIPOBlogPage />} />
                  
                </Routes>
              </BrandingProvider>
            </LanguageProvider>
          </EnhancedAuthProvider>
        </QueryClientProvider>
      </div>
    </Router>
  );
}

export default App;

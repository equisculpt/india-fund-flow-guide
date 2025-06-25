import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import { QueryClient } from 'react-query';

import LanguageProvider from './components/LanguageProvider';
import BrandingProvider from './components/BrandingProvider';
import EnhancedAuthProvider from './components/auth/AuthProvider';
import SecurityHeaders from './components/SecurityHeaders';

import HomePage from './pages/HomePage';
import FundComparisonPage from './pages/FundComparisonPage';
import PublicFundsPage from './pages/PublicFundsPage';
import SIPCalculatorPage from './pages/SIPCalculatorPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import CommunityPage from './pages/CommunityPage';
import FundDetailsPage from './pages/FundDetailsPage';
import FundsPage from './pages/FundsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AdminLoginPage from './pages/AdminLoginPage';
import SecureAdminPage from './pages/SecureAdminPage';
import IndogulfCropsciencesIPOBlogPage from '@/pages/IndogulfCropsciencesIPOBlog';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <QueryClient>
          <EnhancedAuthProvider>
            <LanguageProvider>
              <BrandingProvider>
                <Toaster />
                <SecurityHeaders />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/fund-comparison" element={<FundComparisonPage />} />
                  <Route path="/public-funds" element={<PublicFundsPage />} />
                  <Route path="/sip-calculator" element={<SIPCalculatorPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/fund/:fundId" element={<FundDetailsPage />} />
                  <Route path="/funds/:fundId" element={<FundDetailsPage />} />
                  <Route path="/funds" element={<FundsPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route path="/secure-admin" element={<SecureAdminPage />} />
                  
                  <Route path="/blog/indogulf-cropsciences-ipo-complete-analysis-2024" element={<IndogulfCropsciencesIPOBlogPage />} />
                  
                </Routes>
              </BrandingProvider>
            </LanguageProvider>
          </EnhancedAuthProvider>
        </QueryClient>
      </div>
    </Router>
  );
}

export default App;

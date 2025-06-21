import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';

import { Layout } from '@/components/layout/Layout';
import { SupabaseAuthProvider } from '@/contexts/SupabaseAuthContext';
import { EnhancedAuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { BrandingProvider } from '@/contexts/BrandingContext';
import ScrollToTop from '@/components/ScrollToTop';
import LandingPage from '@/pages/LandingPage';
import PricingPage from '@/pages/PricingPage';
import ContactPage from '@/pages/ContactPage';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import DashboardPage from '@/pages/DashboardPage';
import CommunityPage from '@/pages/CommunityPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ComingSoonPage from '@/pages/ComingSoonPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import CookiePolicyPage from '@/pages/CookiePolicyPage';
import CommunityBlogs from '@/components/community/CommunityBlogs';
import CreateBlogModal from '@/components/community/CreateBlogModal';
import ChatPage from '@/pages/ChatPage';
import VeedaClinicalResearchIPOBlog from './pages/VeedaClinicalResearchIPOBlog';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <SupabaseAuthProvider>
          <EnhancedAuthProvider>
            <LanguageProvider>
              <BrandingProvider>
                <Layout>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/community/blogs" element={<CommunityBlogs />} />
                    <Route path="/community/create" element={<CreateBlogModal isOpen={true} onClose={() => {}} />} />
                    <Route path="/community/blog/:id" element={<BlogPostPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/terms" element={<TermsOfServicePage />} />
                    <Route path="/privacy" element={<PrivacyPolicyPage />} />
                    <Route path="/cookies" element={<CookiePolicyPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/blog/veeda-clinical-research-ipo-analysis" element={<VeedaClinicalResearchIPOBlog />} />
                    <Route path="/coming-soon" element={<ComingSoonPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Layout>
              </BrandingProvider>
            </LanguageProvider>
          </EnhancedAuthProvider>
        </SupabaseAuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

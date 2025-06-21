
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from '@/components/Layout';
import { SupabaseAuthProvider } from '@/contexts/SupabaseAuthContext';
import { EnhancedAuthProvider } from '@/contexts/EnhancedAuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { BrandingProvider } from '@/contexts/BrandingContext';
import Index from '@/pages/Index';
import ContactPage from '@/pages/ContactPage';
import UserDashboard from '@/pages/UserDashboard';
import CommunityPage from '@/pages/CommunityPage';
import NotFound from '@/pages/NotFound';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import CommunityBlogs from '@/components/community/CommunityBlogs';
import CreateBlogModal from '@/components/community/CreateBlogModal';
import ChatPage from '@/pages/ChatPage';
import VeedaClinicalResearchIPOBlog from './pages/VeedaClinicalResearchIPOBlog';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SupabaseAuthProvider>
            <EnhancedAuthProvider>
              <LanguageProvider>
                <BrandingProvider>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/dashboard" element={<UserDashboard />} />
                      <Route path="/community" element={<CommunityPage />} />
                      <Route path="/community/blogs" element={<CommunityBlogs />} />
                      <Route path="/community/create" element={<CreateBlogModal isOpen={true} onClose={() => {}} />} />
                      <Route path="/terms" element={<TermsOfServicePage />} />
                      <Route path="/privacy" element={<PrivacyPolicyPage />} />
                      <Route path="/chat" element={<ChatPage />} />
                      <Route path="/blog/veeda-clinical-research-ipo-analysis" element={<VeedaClinicalResearchIPOBlog />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                  <Toaster />
                </BrandingProvider>
              </LanguageProvider>
            </EnhancedAuthProvider>
          </SupabaseAuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

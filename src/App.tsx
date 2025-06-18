
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { SupabaseAuthProvider } from "@/contexts/SupabaseAuthContext";
import { EnhancedAuthProvider } from "@/contexts/EnhancedAuthContext";
import { BrandingProvider } from "@/contexts/BrandingContext";
import MobileLayout from "@/components/MobileLayout";
import Index from "@/pages/Index";
import AdminPage from "@/pages/AdminPage";
import AdminPortalPage from "@/pages/AdminPortalPage";
import FundDetailsPage from "@/pages/FundDetailsPage";
import FundComparisonPage from "@/pages/FundComparisonPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import OnboardingPage from "@/pages/OnboardingPage";
import AgentHomePage from "@/pages/AgentHomePage";
import ReferralPage from "@/pages/ReferralPage";
import ComprehensiveDashboard from "@/pages/ComprehensiveDashboard";
import AIPortfolioDashboard from "@/pages/AIPortfolioDashboard";
import UserDashboard from "@/pages/UserDashboard";
import AdvancedFeaturesPage from "@/pages/AdvancedFeaturesPage";
import PublicFundsPage from "@/pages/PublicFundsPage";
import WhatsAppBotPage from "@/pages/WhatsAppBotPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import SBISmallCapFundPage from "@/pages/SBISmallCapFundPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const SitemapHandler = () => {
  React.useEffect(() => {
    // Redirect to the static sitemap.xml file
    window.location.replace('/sitemap.xml');
  }, []);
  
  return null;
};

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrandingProvider>
          <SupabaseAuthProvider>
            <EnhancedAuthProvider>
              <Router>
                <MobileLayout>
                  <div className="min-h-screen bg-background font-sans antialiased">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/admin" element={<AdminPage />} />
                      <Route path="/admin-portal" element={<AdminPortalPage />} />
                      <Route path="/fund/:fundId" element={<FundDetailsPage />} />
                      <Route path="/fund-comparison" element={<FundComparisonPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/onboarding" element={<OnboardingPage />} />
                      <Route path="/agent" element={<AgentHomePage />} />
                      <Route path="/referral" element={<ReferralPage />} />
                      <Route path="/dashboard" element={<ComprehensiveDashboard />} />
                      <Route path="/ai-portfolio" element={<AIPortfolioDashboard />} />
                      <Route path="/user-dashboard" element={<UserDashboard />} />
                      <Route path="/advanced-features" element={<AdvancedFeaturesPage />} />
                      <Route path="/public-funds" element={<PublicFundsPage />} />
                      <Route path="/whatsapp-bot" element={<WhatsAppBotPage />} />
                      <Route path="/terms" element={<TermsOfServicePage />} />
                      <Route path="/privacy" element={<PrivacyPolicyPage />} />
                      
                      {/* SEO-optimized SBI Small Cap Fund pages */}
                      <Route path="/sbi-small-cap-mutual-fund" element={<SBISmallCapFundPage />} />
                      <Route path="/sbi-small-cap-fund-review" element={<SBISmallCapFundPage />} />
                      <Route path="/sbi-small-cap-fund-performance" element={<SBISmallCapFundPage />} />
                      <Route path="/sbi-small-cap-fund-nav" element={<SBISmallCapFundPage />} />
                      
                      <Route path="/sitemap.xml" element={<SitemapHandler />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Toaster />
                  </div>
                </MobileLayout>
              </Router>
            </EnhancedAuthProvider>
          </SupabaseAuthProvider>
        </BrandingProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

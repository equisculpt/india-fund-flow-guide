
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
import UniversalFundSEOPage from "@/components/UniversalFundSEOPage";
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
                      
                      {/* SBI Fund SEO Pages */}
                      <Route path="/sbi-small-cap-mutual-fund" element={<SBISmallCapFundPage />} />
                      <Route path="/sbi-small-cap-fund-review" element={<SBISmallCapFundPage />} />
                      <Route path="/sbi-small-cap-fund-performance" element={<SBISmallCapFundPage />} />
                      <Route path="/sbi-small-cap-fund-nav" element={<SBISmallCapFundPage />} />
                      
                      {/* Universal Fund SEO Pages - SBI */}
                      <Route path="/sbi-bluechip-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/sbi-large-midcap-fund" element={<UniversalFundSEOPage />} />
                      
                      {/* Universal Fund SEO Pages - HDFC */}
                      <Route path="/hdfc-top-100-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/hdfc-small-cap-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/hdfc-balanced-advantage-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/hdfc-large-cap-fund" element={<UniversalFundSEOPage />} />
                      
                      {/* Universal Fund SEO Pages - ICICI Prudential */}
                      <Route path="/icici-prudential-bluechip-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/icici-prudential-small-cap-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/icici-prudential-large-cap-fund" element={<UniversalFundSEOPage />} />
                      
                      {/* Universal Fund SEO Pages - Axis */}
                      <Route path="/axis-bluechip-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/axis-small-cap-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/axis-long-term-equity-fund" element={<UniversalFundSEOPage />} />
                      
                      {/* Universal Fund SEO Pages - Other AMCs */}
                      <Route path="/kotak-small-cap-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/kotak-emerging-equity-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/mirae-asset-large-cap-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/mirae-asset-emerging-bluechip-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/parag-parikh-flexi-cap-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/parag-parikh-long-term-equity-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/motilal-oswal-nasdaq-100-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/motilal-oswal-midcap-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/nippon-india-small-cap-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/nippon-india-large-cap-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/uti-nifty-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/uti-flexi-cap-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/dsp-small-cap-fund" element={<UniversalFundSEOPage />} />
                      <Route path="/dsp-midcap-fund" element={<UniversalFundSEOPage />} />
                      
                      {/* AMC Company Pages */}
                      <Route path="/sbi-mutual-funds" element={<UniversalFundSEOPage />} />
                      <Route path="/hdfc-mutual-funds" element={<UniversalFundSEOPage />} />
                      <Route path="/icici-prudential-mutual-funds" element={<UniversalFundSEOPage />} />
                      <Route path="/axis-mutual-funds" element={<UniversalFundSEOPage />} />
                      <Route path="/kotak-mutual-funds" element={<UniversalFundSEOPage />} />
                      <Route path="/mirae-asset-mutual-funds" element={<UniversalFundSEOPage />} />
                      
                      {/* Category and Investment Pages */}
                      <Route path="/best-mutual-funds-2024" element={<UniversalFundSEOPage />} />
                      <Route path="/small-cap-mutual-funds" element={<UniversalFundSEOPage />} />
                      <Route path="/large-cap-mutual-funds" element={<UniversalFundSEOPage />} />
                      <Route path="/mid-cap-mutual-funds" element={<UniversalFundSEOPage />} />
                      <Route path="/elss-mutual-funds" element={<UniversalFundSEOPage />} />
                      <Route path="/index-funds" element={<UniversalFundSEOPage />} />
                      <Route path="/debt-mutual-funds" element={<UniversalFundSEOPage />} />
                      <Route path="/flexi-cap-funds" element={<UniversalFundSEOPage />} />
                      <Route path="/sip-investment" element={<UniversalFundSEOPage />} />
                      <Route path="/mutual-fund-calculator" element={<UniversalFundSEOPage />} />
                      <Route path="/best-sip-plans" element={<UniversalFundSEOPage />} />
                      <Route path="/top-performing-mutual-funds" element={<UniversalFundSEOPage />} />
                      
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

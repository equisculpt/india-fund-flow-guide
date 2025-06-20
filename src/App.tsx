
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { SupabaseAuthProvider } from "@/contexts/SupabaseAuthContext";
import { EnhancedAuthProvider } from "@/contexts/EnhancedAuthContext";
import { BrandingProvider } from "@/contexts/BrandingContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComplianceFooter from "@/components/ComplianceFooter";
import Index from "./pages/Index";
import FundDetailsPage from "./pages/FundDetailsPage";
import FundComparisonPage from "./pages/FundComparisonPage";
import PublicFundsPage from "./pages/PublicFundsPage";
import UserDashboard from "./pages/UserDashboard";
import AIPortfolioDashboard from "./pages/AIPortfolioDashboard";
import ComprehensiveDashboard from "./pages/ComprehensiveDashboard";
import OnboardingPage from "./pages/OnboardingPage";
import AgentHomePage from "./pages/AgentHomePage";
import ReferralPage from "./pages/ReferralPage";
import AdminPage from "./pages/AdminPage";
import SecureAdminPage from "./pages/SecureAdminPage";
import AdminPortalPage from "./pages/AdminPortalPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import RiskDisclosurePage from "./pages/RiskDisclosurePage";
import NotFound from "./pages/NotFound";
import CommunityPage from "./pages/CommunityPage";
import SIPCalculatorPage from "./pages/SIPCalculatorPage";
import AdvancedFeaturesPage from "./pages/AdvancedFeaturesPage";
import MutualFundDistributorPage from "./pages/MutualFundDistributorPage";
import SBISmallCapFundPage from "./pages/SBISmallCapFundPage";
import WhatsAppBotPage from "./pages/WhatsAppBotPage";
import UniversalFundSEOPage from "@/components/UniversalFundSEOPage";

// Blog pages
import WhatAreMutualFundsBlog from "./pages/WhatAreMutualFundsBlog";
import HowMutualFundsWorkBlog from "./pages/HowMutualFundsWorkBlog";
import HowFundManagersMakeMoneyBlog from "./pages/HowFundManagersMakeMoneyBlog";
import MutualFundBenefitsBlog from "./pages/MutualFundBenefitsBlog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <BrandingProvider>
        <SupabaseAuthProvider>
          <EnhancedAuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/fund/:fundName" element={<FundDetailsPage />} />
                      <Route path="/fund-comparison" element={<FundComparisonPage />} />
                      <Route path="/public-funds" element={<PublicFundsPage />} />
                      <Route path="/dashboard" element={<UserDashboard />} />
                      <Route path="/ai-portfolio" element={<AIPortfolioDashboard />} />
                      <Route path="/comprehensive-dashboard" element={<ComprehensiveDashboard />} />
                      <Route path="/onboarding" element={<OnboardingPage />} />
                      <Route path="/agent" element={<AgentHomePage />} />
                      <Route path="/referral" element={<ReferralPage />} />
                      <Route path="/admin" element={<AdminPage />} />
                      <Route path="/secure-admin" element={<SecureAdminPage />} />
                      <Route path="/admin-portal" element={<AdminPortalPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/terms" element={<TermsOfServicePage />} />
                      <Route path="/privacy" element={<PrivacyPolicyPage />} />
                      <Route path="/risk-disclosure" element={<RiskDisclosurePage />} />
                      <Route path="/community" element={<CommunityPage />} />
                      <Route path="/community/*" element={<CommunityPage />} />
                      <Route path="/sip-calculator" element={<SIPCalculatorPage />} />
                      <Route path="/advanced-features" element={<AdvancedFeaturesPage />} />
                      <Route path="/mutual-fund-distributor" element={<MutualFundDistributorPage />} />
                      <Route path="/sbi-small-cap-fund" element={<SBISmallCapFundPage />} />
                      <Route path="/whatsapp-bot" element={<WhatsAppBotPage />} />
                      <Route path="/:fundSlug" element={<UniversalFundSEOPage />} />

                      {/* Blog Routes */}
                      <Route path="/blog/what-are-mutual-funds-complete-guide" element={<WhatAreMutualFundsBlog />} />
                      <Route path="/blog/how-mutual-funds-work-detailed-explanation" element={<HowMutualFundsWorkBlog />} />
                      <Route path="/blog/why-regular-mutual-funds-make-sense" element={<HowFundManagersMakeMoneyBlog />} />
                      <Route path="/blog/mutual-funds-benefits-individual-investors" element={<MutualFundBenefitsBlog />} />

                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                  <ComplianceFooter />
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </EnhancedAuthProvider>
        </SupabaseAuthProvider>
      </BrandingProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;

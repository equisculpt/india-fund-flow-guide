
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SupabaseAuthProvider } from "@/contexts/SupabaseAuthContext";
import { EnhancedAuthProvider } from "@/contexts/EnhancedAuthContext";
import { BrandingProvider } from "@/contexts/BrandingContext";

import Index from "./pages/Index";
import FundDetailsPage from "./pages/FundDetailsPage";
import FundComparisonPage from "./pages/FundComparisonPage";
import SIPCalculatorPage from "./pages/SIPCalculatorPage";
import BestSIPPlansPage from "./pages/BestSIPPlansPage";
import SBISmallCapFundPage from "./pages/SBISmallCapFundPage";
import UniversalFundSEOPage from "./components/UniversalFundSEOPage";
import PublicFundsPage from "./pages/PublicFundsPage";
import UserDashboard from "./pages/UserDashboard";
import ComprehensiveDashboard from "./pages/ComprehensiveDashboard";
import AIPortfolioDashboard from "./pages/AIPortfolioDashboard";
import AdvancedFeaturesPage from "./pages/AdvancedFeaturesPage";
import OnboardingPage from "./pages/OnboardingPage";
import AgentHomePage from "./pages/AgentHomePage";
import MutualFundDistributorPage from "./pages/MutualFundDistributorPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import RiskDisclosurePage from "./pages/RiskDisclosurePage";
import CommunityPage from "./pages/CommunityPage";
import ReferralPage from "./pages/ReferralPage";
import WhatsAppBotPage from "./pages/WhatsAppBotPage";
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/AdminPage";
import AdminPortalPage from "./pages/AdminPortalPage";
import SecureAdminPage from "./pages/SecureAdminPage";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileLayout from "./components/MobileLayout";
import SecurityHeaders from "./components/SecurityHeaders";
import FinancialDataProtection from "./components/FinancialDataProtection";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SupabaseAuthProvider>
            <EnhancedAuthProvider>
              <BrandingProvider>
                <SecurityHeaders />
                <FinancialDataProtection>
                  <MobileLayout>
                    <div className="min-h-screen flex flex-col">
                      <Header />
                      <main className="flex-1">
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/fund/:schemeCode" element={<FundDetailsPage />} />
                          <Route path="/compare" element={<FundComparisonPage />} />
                          <Route path="/sip-calculator" element={<SIPCalculatorPage />} />
                          <Route path="/best-sip-plans" element={<BestSIPPlansPage />} />
                          <Route path="/sbi-small-cap-fund" element={<SBISmallCapFundPage />} />
                          <Route path="/fund-seo/:schemeCode" element={<UniversalFundSEOPage />} />
                          <Route path="/explore" element={<PublicFundsPage />} />
                          <Route path="/dashboard" element={<UserDashboard />} />
                          <Route path="/user-dashboard" element={<ComprehensiveDashboard />} />
                          <Route path="/ai-portfolio" element={<AIPortfolioDashboard />} />
                          <Route path="/advanced-features" element={<AdvancedFeaturesPage />} />
                          <Route path="/onboarding" element={<OnboardingPage />} />
                          <Route path="/agent" element={<AgentHomePage />} />
                          <Route path="/distributor" element={<MutualFundDistributorPage />} />
                          <Route path="/about" element={<AboutPage />} />
                          <Route path="/contact" element={<ContactPage />} />
                          <Route path="/privacy" element={<PrivacyPolicyPage />} />
                          <Route path="/terms" element={<TermsOfServicePage />} />
                          <Route path="/risk-disclosure" element={<RiskDisclosurePage />} />
                          <Route path="/community" element={<CommunityPage />} />
                          <Route path="/referral" element={<ReferralPage />} />
                          <Route path="/whatsapp-bot" element={<WhatsAppBotPage />} />
                          <Route path="/admin" element={<AdminPage />} />
                          <Route path="/admin-portal" element={<AdminPortalPage />} />
                          <Route path="/secure-admin" element={<SecureAdminPage />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                      <Footer />
                    </div>
                  </MobileLayout>
                </FinancialDataProtection>
                <Toaster />
                <Sonner />
              </BrandingProvider>
            </EnhancedAuthProvider>
          </SupabaseAuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { BackendAuthProvider } from "@/contexts/BackendAuthContext";
import Index from "./pages/Index";
import FundDetailsPage from "./pages/FundDetailsPage";
import FundComparisonPage from "./pages/FundComparisonPage";
import PublicFundsPage from "./pages/PublicFundsPage";
import SIPCalculatorPage from "./pages/SIPCalculatorPage";
import ContactPage from "./pages/ContactPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import RiskDisclosurePage from "./pages/RiskDisclosurePage";
import AdminPage from "./pages/AdminPage";
import SecureAdminPage from "./pages/SecureAdminPage";
import CommunityPage from "./pages/CommunityPage";
import OnboardingPage from "./pages/OnboardingPage";
import UserDashboard from "./pages/UserDashboard";
import PortfolioDashboardPage from "./pages/PortfolioDashboard";
import InvestmentExplorer from "./pages/InvestmentExplorer";
import AIPortfolioDashboard from "./pages/AIPortfolioDashboard";
import HDBFinancialServicesIPOBlog from "./pages/HDBFinancialServicesIPOBlog";
import VeedaClinicalResearchIPOBlog from "./pages/VeedaClinicalResearchIPOBlog";
import NBFCSectorDeepDiveBlog from "./pages/NBFCSectorDeepDiveBlog";
import HowFundManagersMakeMoneyBlog from "./pages/HowFundManagersMakeMoneyBlog";

import BackendLogin from "./pages/BackendLogin";
import TestLogin from "./pages/TestLogin";
import TestDashboard from "./pages/TestDashboard";
import StatementPreviewPage from "./pages/StatementPreviewPage";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BackendAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
              <Routes>
                {/* Authentication Routes */}
                <Route path="/login" element={<BackendLogin />} />
                
                {/* Test Routes */}
                <Route path="/test-login" element={<TestLogin />} />
                <Route path="/test-dashboard" element={<TestDashboard />} />
                <Route path="/statement-preview" element={<StatementPreviewPage />} />
                
                {/* Keep existing routes */}
                <Route path="/" element={<Index />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/portfolio-dashboard" element={<PortfolioDashboardPage />} />
                <Route path="/investment-explorer" element={<InvestmentExplorer />} />
                <Route path="/ai-portfolio" element={<AIPortfolioDashboard />} />
                <Route path="/fund/:fundCode" element={<FundDetailsPage />} />
                <Route path="/fund-comparison" element={<FundComparisonPage />} />
                <Route path="/public-funds" element={<PublicFundsPage />} />
                <Route path="/sip-calculator" element={<SIPCalculatorPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/risk-disclosure" element={<RiskDisclosurePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/secure-admin" element={<SecureAdminPage />} />
                <Route path="/community" element={<CommunityPage />} />
                
                
                {/* Blog pages */}
                <Route path="/blog/hdb-financial-services-ipo" element={<HDBFinancialServicesIPOBlog />} />
                <Route path="/blog/veeda-clinical-research-ipo" element={<VeedaClinicalResearchIPOBlog />} />
                <Route path="/blog/nbfc-sector-deep-dive" element={<NBFCSectorDeepDiveBlog />} />
                <Route path="/blog/how-fund-managers-make-money" element={<HowFundManagersMakeMoneyBlog />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
      </BackendAuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { SupabaseAuthProvider } from "@/contexts/SupabaseAuthContext";
import { TestAuthProvider } from "@/contexts/TestAuthContext";
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
import IPOAnalysisGuideBlog from "./pages/IPOAnalysisGuideBlog";
import HealthcareSectorOutlookBlog from "./pages/HealthcareSectorOutlookBlog";
import NotFound from "./pages/NotFound";
import SIPManagement from "./pages/SIPManagement";
import ReferralPage from "./pages/ReferralPage";
import TestLogin from "./pages/TestLogin";
import TestDashboard from "./pages/TestDashboard";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TestAuthProvider>
        <SupabaseAuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Test Routes */}
                <Route path="/test-login" element={<TestLogin />} />
                <Route path="/test-dashboard" element={<TestDashboard />} />
                
                {/* Keep existing routes */}
                <Route path="/" element={<Index />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/portfolio" element={<PortfolioDashboardPage />} />
                <Route path="/explore" element={<InvestmentExplorer />} />
                <Route path="/sip-management" element={<SIPManagement />} />
                <Route path="/ai-dashboard" element={<AIPortfolioDashboard />} />
                <Route path="/referral" element={<ReferralPage />} />
                <Route path="/fund/:schemeCode" element={<FundDetailsPage />} />
                <Route path="/funds/:fundType" element={<PublicFundsPage />} />
                <Route path="/fund-comparison" element={<FundComparisonPage />} />
                <Route path="/sip-calculator" element={<SIPCalculatorPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/risk-disclosure" element={<RiskDisclosurePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/secure-admin" element={<SecureAdminPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/blog/hdb-financial-services-ipo-analysis" element={<HDBFinancialServicesIPOBlog />} />
                <Route path="/blog/veeda-clinical-research-ipo-analysis" element={<VeedaClinicalResearchIPOBlog />} />
                <Route path="/blog/nbfc-sector-analysis-india-2025" element={<NBFCSectorDeepDiveBlog />} />
                <Route path="/blog/how-fund-managers-make-money-mutual-funds" element={<HowFundManagersMakeMoneyBlog />} />
                <Route path="/blog/ipo-analysis-guide" element={<IPOAnalysisGuideBlog />} />
                <Route path="/blog/healthcare-sector-outlook" element={<HealthcareSectorOutlookBlog />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SupabaseAuthProvider>
      </TestAuthProvider>
    </TooltipProvider>
  </HelmetProvider>
);

export default App;

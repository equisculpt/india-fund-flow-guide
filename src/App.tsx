import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { BackendAuthProvider } from "@/contexts/BackendAuthContext";
import { lazy, Suspense } from "react";
import LoadingFallback from "@/components/LoadingFallback";

// Critical pages loaded immediately
import Index from "./pages/Index";

// Lazy load all non-critical pages for massive performance boost
const FundDetailsPage = lazy(() => import("./pages/FundDetailsPage"));
const FundComparisonPage = lazy(() => import("./pages/FundComparisonPage"));
const PublicFundsPage = lazy(() => import("./pages/PublicFundsPage"));
const SIPCalculatorPage = lazy(() => import("./pages/SIPCalculatorPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const RiskDisclosurePage = lazy(() => import("./pages/RiskDisclosurePage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const SecureAdminPage = lazy(() => import("./pages/SecureAdminPage"));
const CommunityPage = lazy(() => import("./pages/CommunityPage"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const PortfolioDashboardPage = lazy(() => import("./pages/PortfolioDashboard"));
const InvestmentExplorer = lazy(() => import("./pages/InvestmentExplorer"));
const AIPortfolioDashboard = lazy(() => import("./pages/AIPortfolioDashboard"));
const HDBFinancialServicesIPOBlog = lazy(() => import("./pages/HDBFinancialServicesIPOBlog"));
const VeedaClinicalResearchIPOBlog = lazy(() => import("./pages/VeedaClinicalResearchIPOBlog"));
const NBFCSectorDeepDiveBlog = lazy(() => import("./pages/NBFCSectorDeepDiveBlog"));
const HowFundManagersMakeMoneyBlog = lazy(() => import("./pages/HowFundManagersMakeMoneyBlog"));
const BackendLogin = lazy(() => import("./pages/BackendLogin"));
const TestLogin = lazy(() => import("./pages/TestLogin"));
const TestDashboard = lazy(() => import("./pages/TestDashboard"));
const StatementPreviewPage = lazy(() => import("./pages/StatementPreviewPage"));

// Optimized query client for performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BackendAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Authentication Routes */}
                <Route path="/login" element={<BackendLogin />} />
                
                {/* Test Routes */}
                <Route path="/test-login" element={<TestLogin />} />
                <Route path="/test-dashboard" element={<TestDashboard />} />
                <Route path="/statement-preview" element={<StatementPreviewPage />} />
                
                {/* Critical route - loaded immediately */}
                <Route path="/" element={<Index />} />
                
                {/* All other routes lazy loaded */}
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
            </Suspense>
            </BrowserRouter>
          </TooltipProvider>
      </BackendAuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { SupabaseAuthProvider } from "@/contexts/SupabaseAuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FundDetailsPage from "./pages/FundDetailsPage";
import FundComparisonPage from "./pages/FundComparisonPage";
import PublicFundsPage from "./pages/PublicFundsPage";
import SIPCalculatorPage from "./pages/SIPCalculatorPage";
import ContactPage from "./pages/ContactPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import RiskDisclosurePage from "./pages/RiskDisclosurePage";
import AdminPage from "./pages/AdminPage";
import CommunityPage from "./pages/CommunityPage";
import HDBFinancialServicesIPOBlog from "./pages/HDBFinancialServicesIPOBlog";
import VeedaClinicalResearchIPOBlog from "./pages/VeedaClinicalResearchIPOBlog";
import NBFCSectorDeepDiveBlog from "./pages/NBFCSectorDeepDiveBlog";
import HowFundManagersMakeMoneyBlog from "./pages/HowFundManagersMakeMoneyBlog";
import IPOAnalysisGuideBlog from "./pages/IPOAnalysisGuideBlog";
import HealthcareSectorOutlookBlog from "./pages/HealthcareSectorOutlookBlog";

const queryClient = new QueryClient();

// Custom component to handle route exclusions
const AppRoutes = () => {
  const pathname = window.location.pathname;
  
  // Handle static XML and TXT files - these should be served directly from public folder
  const staticFiles = ['/sitemap.xml', '/news-sitemap.xml', '/robots.txt'];
  
  if (staticFiles.includes(pathname)) {
    // Force redirect to actual static file
    window.location.replace(pathname);
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/fund/:fundSlug" element={<FundDetailsPage />} />
      <Route path="/funds/:fundType" element={<PublicFundsPage />} />
      <Route path="/fund-comparison" element={<FundComparisonPage />} />
      <Route path="/sip-calculator" element={<SIPCalculatorPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/risk-disclosure" element={<RiskDisclosurePage />} />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/blog/hdb-financial-services-ipo-analysis" element={<HDBFinancialServicesIPOBlog />} />
      <Route path="/blog/veeda-clinical-research-ipo-analysis" element={<VeedaClinicalResearchIPOBlog />} />
      <Route path="/blog/nbfc-sector-analysis-india-2025" element={<NBFCSectorDeepDiveBlog />} />
      <Route path="/blog/how-fund-managers-make-money-mutual-funds" element={<HowFundManagersMakeMoneyBlog />} />
      <Route path="/blog/ipo-analysis-guide" element={<IPOAnalysisGuideBlog />} />
      <Route path="/blog/healthcare-sector-outlook" element={<HealthcareSectorOutlookBlog />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SupabaseAuthProvider>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </SupabaseAuthProvider>
  </QueryClientProvider>
);

export default App;

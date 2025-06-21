
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SupabaseAuthProvider>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </SupabaseAuthProvider>
  </QueryClientProvider>
);

export default App;

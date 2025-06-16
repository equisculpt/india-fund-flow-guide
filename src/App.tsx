
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EnhancedAuthProvider } from "@/contexts/EnhancedAuthContext";
import { BrandingProvider } from "@/contexts/BrandingContext";
import Header from "@/components/Header";
import Index from "@/pages/Index";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import OnboardingPage from "@/pages/OnboardingPage";
import ComprehensiveDashboard from "@/pages/ComprehensiveDashboard";
import AgentHomePage from "@/pages/AgentHomePage";
import AdminPage from "@/pages/AdminPage";
import NotFound from "@/pages/NotFound";
import ReferralPage from "@/pages/ReferralPage";
import AIPortfolioDashboard from "@/pages/AIPortfolioDashboard";
import WhatsAppBotPage from "@/pages/WhatsAppBotPage";
import FundDetailsPage from "@/pages/FundDetailsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrandingProvider>
      <EnhancedAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background font-sans antialiased">
              <Header />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
                <Route path="/onboard" element={<OnboardingPage />} />
                <Route path="/dashboard" element={<ComprehensiveDashboard />} />
                <Route path="/agent" element={<AgentHomePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/referral" element={<ReferralPage />} />
                <Route path="/ai-portfolio" element={<AIPortfolioDashboard />} />
                <Route path="/whatsapp-bot" element={<WhatsAppBotPage />} />
                <Route path="/fund/:fundId" element={<FundDetailsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </EnhancedAuthProvider>
    </BrandingProvider>
  </QueryClientProvider>
);

export default App;

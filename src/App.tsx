import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { SupabaseAuthProvider } from "@/contexts/SupabaseAuthContext";
import Index from "@/pages/Index";
import AdminPage from "@/pages/AdminPage";
import AdminPortalPage from "@/pages/AdminPortalPage";
import FundDetailsPage from "@/pages/FundDetailsPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import OnboardingPage from "@/pages/OnboardingPage";
import AgentHomePage from "@/pages/AgentHomePage";
import ReferralPage from "@/pages/ReferralPage";
import ComprehensiveDashboard from "@/pages/ComprehensiveDashboard";
import AIPortfolioDashboard from "@/pages/AIPortfolioDashboard";
import PublicFundsPage from "@/pages/PublicFundsPage";
import WhatsAppBotPage from "@/pages/WhatsAppBotPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseAuthProvider>
        <Router>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin-portal" element={<AdminPortalPage />} />
              <Route path="/fund/:fundId" element={<FundDetailsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/agent" element={<AgentHomePage />} />
              <Route path="/referral" element={<ReferralPage />} />
              <Route path="/dashboard" element={<ComprehensiveDashboard />} />
              <Route path="/ai-portfolio" element={<AIPortfolioDashboard />} />
              <Route path="/public-funds" element={<PublicFundsPage />} />
              <Route path="/whatsapp-bot" element={<WhatsAppBotPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </SupabaseAuthProvider>
    </QueryClientProvider>
  );
}

export default App;

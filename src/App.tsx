
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AgentDashboard from "./components/AgentDashboard";
import ReferralPage from "./pages/ReferralPage";
import ComprehensiveDashboard from "./pages/ComprehensiveDashboard";
import OnboardingPage from "./pages/OnboardingPage";
import WhatsAppBotPage from "./pages/WhatsAppBotPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <ComprehensiveDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/agent-dashboard" 
              element={
                <ProtectedRoute requiredUserType="agent">
                  <AgentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/referrals" 
              element={
                <ProtectedRoute>
                  <ReferralPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/onboard" 
              element={
                <ProtectedRoute requiredUserType="agent">
                  <OnboardingPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/whatsapp-bot" element={<WhatsAppBotPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

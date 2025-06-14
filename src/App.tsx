import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AgentDashboard from "./components/AgentDashboard";
import ReferralPage from "./pages/ReferralPage";
import ComprehensiveDashboard from "./pages/ComprehensiveDashboard";
import OnboardingPage from "./pages/OnboardingPage";
import WhatsAppBotPage from "./pages/WhatsAppBotPage";

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
            <Route path="/dashboard" element={<ComprehensiveDashboard />} />
            <Route path="/agent-dashboard" element={<AgentDashboard />} />
            <Route path="/referrals" element={<ReferralPage />} />
            <Route path="/onboard" element={<OnboardingPage />} />
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

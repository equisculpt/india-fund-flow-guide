
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SupabaseAuthProvider } from "@/contexts/SupabaseAuthContext";
import { BrandingProvider } from "@/contexts/BrandingContext";
import Index from "./pages/Index";
import FundDetailsPage from "./pages/FundDetailsPage";
import SIPCalculatorPage from "./pages/SIPCalculatorPage";
import UniversalFundSEOPage from "./components/UniversalFundSEOPage";
import AdvancedFeaturesPage from "./pages/AdvancedFeaturesPage";
import ComprehensiveDashboard from "./pages/ComprehensiveDashboard";
import AdminPage from "./pages/AdminPage";
import FundComparisonPage from "./pages/FundComparisonPage";
import PublicFundsPage from "./pages/PublicFundsPage";
import PortfolioDashboard from "./components/PortfolioDashboard";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CommunityPage from "./pages/CommunityPage";
import AIPortfolioDashboard from "./pages/AIPortfolioDashboard";
import HowMutualFundsWorkBlog from "./pages/HowMutualFundsWorkBlog";
import HowFundManagersMakeMoneyBlog from "./pages/HowFundManagersMakeMoneyBlog";
import AdminPortalPage from "./pages/AdminPortalPage";
import AgentHomePage from "./pages/AgentHomePage";
import WhatsAppBotPage from "./pages/WhatsAppBotPage";
import ChatPage from "./pages/ChatPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseAuthProvider>
        <BrandingProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/fund/:schemeCode" element={<FundDetailsPage />} />
                <Route path="/sip-calculator" element={<SIPCalculatorPage />} />
                <Route path="/fund-seo/:schemeCode" element={<UniversalFundSEOPage />} />
                <Route path="/advanced-features" element={<AdvancedFeaturesPage />} />
                <Route path="/dashboard" element={<ComprehensiveDashboard />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/fund-comparison" element={<FundComparisonPage />} />
                <Route path="/public-funds" element={<PublicFundsPage />} />
                <Route path="/portfolio" element={<PortfolioDashboard />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/ai-portfolio" element={<AIPortfolioDashboard />} />
                <Route path="/blog/how-mutual-funds-work" element={<HowMutualFundsWorkBlog />} />
                <Route path="/blog/how-fund-managers-make-money" element={<HowFundManagersMakeMoneyBlog />} />
                <Route path="/admin-portal" element={<AdminPortalPage />} />
                <Route path="/agent" element={<AgentHomePage />} />
                <Route path="/whatsapp-bot" element={<WhatsAppBotPage />} />
                <Route path="/chat" element={<ChatPage />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </BrandingProvider>
      </SupabaseAuthProvider>
    </QueryClientProvider>
  );
}

export default App;

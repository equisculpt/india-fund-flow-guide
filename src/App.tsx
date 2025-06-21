import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import SitemapPage from "./pages/SitemapPage";
import NewsSitemapPage from "./pages/NewsSitemapPage";
import NotFound from "./pages/NotFound";
import FundPage from "./pages/FundPage";
import FundComparisonPage from "./pages/FundComparisonPage";
import PublicFundsPage from "./pages/PublicFundsPage";
import BlogIndexPage from "./pages/BlogIndexPage";
import BlogPostPage from "./pages/BlogPostPage";
import SipCalculatorPage from "./pages/SipCalculatorPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import RiskDisclosurePage from "./pages/RiskDisclosurePage";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sitemap.xml" element={<SitemapPage />} />
            <Route path="/news-sitemap.xml" element={<NewsSitemapPage />} />
            <Route path="/fund/:fundSlug" element={<FundPage />} />
            <Route path="/funds/:fundType" element={<PublicFundsPage />} />
            <Route path="/fund-comparison" element={<FundComparisonPage />} />
            <Route path="/sip-calculator" element={<SipCalculatorPage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:blogPostSlug" element={<BlogPostPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/risk-disclosure" element={<RiskDisclosurePage />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;

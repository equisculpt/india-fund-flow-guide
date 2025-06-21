
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { EnhancedAuthProvider } from '@/contexts/EnhancedAuthContext';
import { SupabaseAuthProvider } from '@/contexts/SupabaseAuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { BrandingProvider } from '@/contexts/BrandingContext';

// Page imports
import Index from '@/pages/Index';
import FundComparisonPage from '@/pages/FundComparisonPage';
import PublicFundsPage from '@/pages/PublicFundsPage';
import FundDetailsPage from '@/pages/FundDetailsPage';
import UserDashboard from '@/pages/UserDashboard';
import ContactPage from '@/pages/ContactPage';
import AboutPage from '@/pages/AboutPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import RiskDisclosurePage from '@/pages/RiskDisclosurePage';
import AdminPage from '@/pages/AdminPage';
import SecureAdminPage from '@/pages/SecureAdminPage';
import AdminPortalPage from '@/pages/AdminPortalPage';
import MutualFundDistributorPage from '@/pages/MutualFundDistributorPage';
import OnboardingPage from '@/pages/OnboardingPage';
import AgentHomePage from '@/pages/AgentHomePage';
import ReferralPage from '@/pages/ReferralPage';
import SIPCalculatorPage from '@/pages/SIPCalculatorPage';
import ComprehensiveDashboard from '@/pages/ComprehensiveDashboard';
import AIPortfolioDashboard from '@/pages/AIPortfolioDashboard';
import AdvancedFeaturesPage from '@/pages/AdvancedFeaturesPage';
import ChatPage from '@/pages/ChatPage';
import CommunityPage from '@/pages/CommunityPage';
import WhatsAppBotPage from '@/pages/WhatsAppBotPage';
import SBISmallCapFundPage from '@/pages/SBISmallCapFundPage';

// Blog page imports
import WhatAreMutualFundsBlog from '@/pages/WhatAreMutualFundsBlog';
import HowMutualFundsWorkBlog from '@/pages/HowMutualFundsWorkBlog';
import MutualFundBenefitsBlog from '@/pages/MutualFundBenefitsBlog';
import HowFundManagersMakeMoneyBlog from '@/pages/HowFundManagersMakeMoneyBlog';
import HDBFinancialServicesIPOBlog from '@/pages/HDBFinancialServicesIPOBlog';
import VeedaClinicalResearchIPOBlog from '@/pages/VeedaClinicalResearchIPOBlog';
import NBFCSectorDeepDiveBlog from '@/pages/NBFCSectorDeepDiveBlog';
import IPOAnalysisGuideBlog from '@/pages/IPOAnalysisGuideBlog';
import HealthcareSectorOutlookBlog from '@/pages/HealthcareSectorOutlookBlog';
import SEBIGuidelinesBlog from '@/pages/SEBIGuidelinesBlog';

// SEO and Sitemap imports
import SitemapPage from '@/pages/SitemapPage';
import NewsSitemapPage from '@/pages/NewsSitemapPage';

// 404 page import
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <EnhancedAuthProvider>
          <SupabaseAuthProvider>
            <LanguageProvider>
              <BrandingProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/fund-comparison" element={<FundComparisonPage />} />
                      <Route path="/public-funds" element={<PublicFundsPage />} />
                      <Route path="/fund/:fundName" element={<FundDetailsPage />} />
                      <Route path="/dashboard" element={<UserDashboard />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/terms" element={<TermsOfServicePage />} />
                      <Route path="/privacy" element={<PrivacyPolicyPage />} />
                      <Route path="/risk-disclosure" element={<RiskDisclosurePage />} />
                      <Route path="/admin" element={<AdminPage />} />
                      <Route path="/secure-admin" element={<SecureAdminPage />} />
                      <Route path="/admin-portal" element={<AdminPortalPage />} />
                      <Route path="/distributor" element={<MutualFundDistributorPage />} />
                      <Route path="/onboarding" element={<OnboardingPage />} />
                      <Route path="/agent" element={<AgentHomePage />} />
                      <Route path="/referral" element={<ReferralPage />} />
                      <Route path="/sip-calculator" element={<SIPCalculatorPage />} />
                      <Route path="/comprehensive-dashboard" element={<ComprehensiveDashboard />} />
                      <Route path="/ai-portfolio" element={<AIPortfolioDashboard />} />
                      <Route path="/advanced-features" element={<AdvancedFeaturesPage />} />
                      <Route path="/chat" element={<ChatPage />} />
                      <Route path="/community" element={<CommunityPage />} />
                      <Route path="/whatsapp-bot" element={<WhatsAppBotPage />} />
                      <Route path="/fund/sbi-small-cap-fund" element={<SBISmallCapFundPage />} />

                      {/* Blog Routes */}
                      <Route path="/blog/what-are-mutual-funds" element={<WhatAreMutualFundsBlog />} />
                      <Route path="/blog/how-mutual-funds-work" element={<HowMutualFundsWorkBlog />} />
                      <Route path="/blog/mutual-fund-benefits" element={<MutualFundBenefitsBlog />} />
                      <Route path="/blog/how-fund-managers-make-money-mutual-funds" element={<HowFundManagersMakeMoneyBlog />} />
                      <Route path="/blog/hdb-financial-services-ipo-analysis" element={<HDBFinancialServicesIPOBlog />} />
                      <Route path="/blog/veeda-clinical-research-ipo-analysis" element={<VeedaClinicalResearchIPOBlog />} />
                      <Route path="/blog/nbfc-sector-analysis-india-2025" element={<NBFCSectorDeepDiveBlog />} />
                      <Route path="/blog/ipo-analysis-guide" element={<IPOAnalysisGuideBlog />} />
                      <Route path="/blog/healthcare-sector-outlook" element={<HealthcareSectorOutlookBlog />} />
                      <Route path="/blog/sebi-guidelines" element={<SEBIGuidelinesBlog />} />

                      {/* SEO and Sitemap Routes */}
                      <Route path="/sitemap.xml" element={<SitemapPage />} />
                      <Route path="/news-sitemap.xml" element={<NewsSitemapPage />} />

                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </TooltipProvider>
              </BrandingProvider>
            </LanguageProvider>
          </SupabaseAuthProvider>
        </EnhancedAuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;

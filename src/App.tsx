
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { SupabaseAuthProvider } from "@/contexts/SupabaseAuthContext";
import { EnhancedAuthProvider } from "@/contexts/EnhancedAuthContext";
import { BrandingProvider } from "@/contexts/BrandingContext";
import MobileLayout from "@/components/MobileLayout";
import { lazy, Suspense } from "react";

// Lazy load components for better performance
const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));
const ComplianceFooter = lazy(() => import("@/components/ComplianceFooter"));
const Index = lazy(() => import("./pages/Index"));
const FundDetailsPage = lazy(() => import("./pages/FundDetailsPage"));
const FundComparisonPage = lazy(() => import("./pages/FundComparisonPage"));
const PublicFundsPage = lazy(() => import("./pages/PublicFundsPage"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const AIPortfolioDashboard = lazy(() => import("./pages/AIPortfolioDashboard"));
const ComprehensiveDashboard = lazy(() => import("./pages/ComprehensiveDashboard"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
const AgentHomePage = lazy(() => import("./pages/AgentHomePage"));
const ReferralPage = lazy(() => import("./pages/ReferralPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const SecureAdminPage = lazy(() => import("./pages/SecureAdminPage"));
const AdminPortalPage = lazy(() => import("./pages/AdminPortalPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const RiskDisclosurePage = lazy(() => import("./pages/RiskDisclosurePage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CommunityPage = lazy(() => import("./pages/CommunityPage"));
const SIPCalculatorPage = lazy(() => import("./pages/SIPCalculatorPage"));
const AdvancedFeaturesPage = lazy(() => import("./pages/AdvancedFeaturesPage"));
const MutualFundDistributorPage = lazy(() => import("./pages/MutualFundDistributorPage"));
const SBISmallCapFundPage = lazy(() => import("./pages/SBISmallCapFundPage"));
const WhatsAppBotPage = lazy(() => import("./pages/WhatsAppBotPage"));
const UniversalFundSEOPage = lazy(() => import("@/components/UniversalFundSEOPage"));

// Blog pages
const WhatAreMutualFundsBlog = lazy(() => import("./pages/WhatAreMutualFundsBlog"));
const HowMutualFundsWorkBlog = lazy(() => import("./pages/HowMutualFundsWorkBlog"));
const HowFundManagersMakeMoneyBlog = lazy(() => import("./pages/HowFundManagersMakeMoneyBlog"));
const MutualFundBenefitsBlog = lazy(() => import("./pages/MutualFundBenefitsBlog"));

// Optimized QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1, // Reduce retries
    },
  },
});

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <BrandingProvider>
        <SupabaseAuthProvider>
          <EnhancedAuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <MobileLayout>
                  <div className="min-h-screen flex flex-col">
                    <Suspense fallback={
                      <div className="h-16 bg-white shadow-sm flex items-center justify-center">
                        <div className="animate-pulse text-gray-400">Loading header...</div>
                      </div>
                    }>
                      <Header />
                    </Suspense>
                    
                    <main className="flex-1">
                      <Suspense fallback={<LoadingFallback />}>
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/fund/:fundName" element={<FundDetailsPage />} />
                          <Route path="/fund-comparison" element={<FundComparisonPage />} />
                          <Route path="/public-funds" element={<PublicFundsPage />} />
                          <Route path="/dashboard" element={<UserDashboard />} />
                          <Route path="/ai-portfolio" element={<AIPortfolioDashboard />} />
                          <Route path="/comprehensive-dashboard" element={<ComprehensiveDashboard />} />
                          <Route path="/onboarding" element={<OnboardingPage />} />
                          <Route path="/agent" element={<AgentHomePage />} />
                          <Route path="/referral" element={<ReferralPage />} />
                          <Route path="/admin" element={<AdminPage />} />
                          <Route path="/secure-admin" element={<SecureAdminPage />} />
                          <Route path="/admin-portal" element={<AdminPortalPage />} />
                          <Route path="/contact" element={<ContactPage />} />
                          <Route path="/about" element={<AboutPage />} />
                          <Route path="/terms" element={<TermsOfServicePage />} />
                          <Route path="/privacy" element={<PrivacyPolicyPage />} />
                          <Route path="/risk-disclosure" element={<RiskDisclosurePage />} />
                          <Route path="/community" element={<CommunityPage />} />
                          <Route path="/community/*" element={<CommunityPage />} />
                          <Route path="/sip-calculator" element={<SIPCalculatorPage />} />
                          <Route path="/advanced-features" element={<AdvancedFeaturesPage />} />
                          <Route path="/mutual-fund-distributor" element={<MutualFundDistributorPage />} />
                          <Route path="/sbi-small-cap-fund" element={<SBISmallCapFundPage />} />
                          <Route path="/whatsapp-bot" element={<WhatsAppBotPage />} />
                          <Route path="/:fundSlug" element={<UniversalFundSEOPage />} />

                          {/* Blog Routes */}
                          <Route path="/blog/what-are-mutual-funds-complete-guide" element={<WhatAreMutualFundsBlog />} />
                          <Route path="/blog/how-mutual-funds-work-detailed-explanation" element={<HowMutualFundsWorkBlog />} />
                          <Route path="/blog/why-regular-mutual-funds-make-sense" element={<HowFundManagersMakeMoneyBlog />} />
                          <Route path="/blog/mutual-funds-benefits-individual-investors" element={<MutualFundBenefitsBlog />} />

                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </Suspense>
                    </main>
                    
                    <Suspense fallback={<div className="h-16 bg-gray-50"></div>}>
                      <Footer />
                      <ComplianceFooter />
                    </Suspense>
                  </div>
                </MobileLayout>
              </BrowserRouter>
            </TooltipProvider>
          </EnhancedAuthProvider>
        </SupabaseAuthProvider>
      </BrandingProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;

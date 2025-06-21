
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './contexts/LanguageContext';
import { BrandingProvider } from './contexts/BrandingContext';
import { SupabaseAuthProvider } from './contexts/SupabaseAuthContext';
import PublicFundsPage from './pages/PublicFundsPage';
import FundComparisonPage from './pages/FundComparisonPage';
import FundDetailsPage from './pages/FundDetailsPage';
import Index from './pages/Index';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import NotFound from './pages/NotFound';
import CommunityPage from './pages/CommunityPage';
import HDBFinancialServicesIPOBlog from './pages/HDBFinancialServicesIPOBlog';
import NBFCSectorDeepDiveBlog from './pages/NBFCSectorDeepDiveBlog';
import VeedaClinicalResearchIPOBlog from './pages/VeedaClinicalResearchIPOBlog';
import HowFundManagersMakeMoneyBlog from './pages/HowFundManagersMakeMoneyBlog';
import IPOAnalysisGuideBlog from './pages/IPOAnalysisGuideBlog';
import HealthcareSectorOutlookBlog from './pages/HealthcareSectorOutlookBlog';
import NewsSitemapPage from './pages/NewsSitemapPage';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <BrandingProvider>
            <SupabaseAuthProvider>
              <QueryClientProvider client={queryClient}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/fund-comparison" element={<FundComparisonPage />} />
                  <Route path="/public-funds" element={<PublicFundsPage />} />
                  <Route path="/fund/:fundId" element={<FundDetailsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/terms" element={<TermsOfServicePage />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  
                  {/* Blog Routes */}
                  <Route path="/blog" element={<CommunityPage />} />
                  <Route path="/blog/hdb-financial-services-ipo-analysis" element={<HDBFinancialServicesIPOBlog />} />
                  <Route path="/blog/nbfc-sector-analysis-india-2025" element={<NBFCSectorDeepDiveBlog />} />
                  <Route path="/blog/veeda-clinical-research-ipo-analysis" element={<VeedaClinicalResearchIPOBlog />} />
                  <Route path="/blog/how-fund-managers-make-money-mutual-funds" element={<HowFundManagersMakeMoneyBlog />} />
                  <Route path="/blog/ipo-analysis-guide" element={<IPOAnalysisGuideBlog />} />
                  <Route path="/blog/healthcare-sector-outlook" element={<HealthcareSectorOutlookBlog />} />
                  
                  {/* Dynamic News Sitemap Route */}
                  <Route path="/news-sitemap.xml" element={<NewsSitemapPage />} />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </QueryClientProvider>
            </SupabaseAuthProvider>
          </BrandingProvider>
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

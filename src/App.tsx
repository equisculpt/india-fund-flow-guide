import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LanguageProvider } from './contexts/LanguageContext';
import { BrandingProvider } from './contexts/BrandingContext';
import { SupabaseAuthProvider } from './contexts/SupabaseAuthContext';
import PublicFundsPage from './pages/PublicFundsPage';
import FundComparisonPage from './pages/FundComparisonPage';
import FundDetailsPage from './pages/FundDetailsPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import BlogPage from './pages/BlogPage';
import HDBFinancialServicesIPOBlog from './pages/HDBFinancialServicesIPOBlog';
import NBFCSectorBlog from './pages/NBFCSectorBlog';
import VeedaClinicalResearchIPOBlog from './pages/VeedaClinicalResearchIPOBlog';
import FundManagersBlog from './pages/FundManagersBlog';
import IPOAnalysisGuideBlog from './pages/IPOAnalysisGuideBlog';
import HealthcareSectorBlog from './pages/HealthcareSectorBlog';
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
                  <Route path="/" element={<HomePage />} />
                  <Route path="/fund-comparison" element={<FundComparisonPage />} />
                  <Route path="/public-funds" element={<PublicFundsPage />} />
                  <Route path="/fund/:fundId" element={<FundDetailsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  
                  {/* Blog Routes */}
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/hdb-financial-services-ipo-analysis" element={<HDBFinancialServicesIPOBlog />} />
                  <Route path="/blog/nbfc-sector-analysis-india-2025" element={<NBFCSectorBlog />} />
                  <Route path="/blog/veeda-clinical-research-ipo-analysis" element={<VeedaClinicalResearchIPOBlog />} />
                  <Route path="/blog/how-fund-managers-make-money-mutual-funds" element={<FundManagersBlog />} />
                  <Route path="/blog/ipo-analysis-guide" element={<IPOAnalysisGuideBlog />} />
                  <Route path="/blog/healthcare-sector-outlook" element={<HealthcareSectorBlog />} />
                  
                  {/* Dynamic News Sitemap Route */}
                  <Route path="/news-sitemap.xml" element={<NewsSitemapPage />} />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFoundPage />} />
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

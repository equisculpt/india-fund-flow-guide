
import React from 'react';
import SEOHead from '@/components/SEOHead';
import { Badge } from "@/components/ui/badge";
import IntroductionSection from '@/components/blog/fund-managers-money/IntroductionSection';
import RegularPlansBenefitsSection from '@/components/blog/fund-managers-money/RegularPlansBenefitsSection';
import PerformanceComparisonSection from '@/components/blog/fund-managers-money/PerformanceComparisonSection';
import HiddenCostsSection from '@/components/blog/fund-managers-money/HiddenCostsSection';
import FundManagerRevenueSection from '@/components/blog/fund-managers-money/FundManagerRevenueSection';
import DecisionGuideSection from '@/components/blog/fund-managers-money/DecisionGuideSection';
import DistributorSelectionSection from '@/components/blog/fund-managers-money/DistributorSelectionSection';
import ConclusionSection from '@/components/blog/fund-managers-money/ConclusionSection';

const HowFundManagersMakeMoneyBlog = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How Do Fund Managers Make Money? Why Regular Plans Offer Better Value 2025",
    "description": "Detailed explanation of how mutual fund companies make money and why regular plans with professional guidance often deliver better outcomes than direct plans despite higher fees.",
    "author": {
      "@type": "Organization",
      "name": "SIP Brewery"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SIP Brewery",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png"
      }
    },
    "datePublished": "2025-06-19",
    "dateModified": "2025-06-19"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="How Fund Managers Make Money & Why Regular Plans Offer Better Value 2025 | SIP Brewery"
        description="Understand how mutual fund companies earn revenue and discover why regular plans with professional guidance often deliver superior long-term outcomes despite higher fees compared to direct plans."
        keywords="how fund managers make money, regular vs direct plans, mutual fund advisory, investment guidance, professional fund advice, mutual fund distributor benefits"
        structuredData={structuredData}
        isDynamic={true}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Professional Investment Guidance</Badge>
            <h1 className="text-4xl font-bold mb-4">How Fund Managers Make Money & Why Regular Plans Offer Better Value</h1>
            <p className="text-xl text-gray-600 mb-6">Understanding the mutual fund business model and why professional guidance through regular plans often leads to better investment outcomes</p>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
              <span>Published: June 19, 2025</span>
              <span>•</span>
              <span>18 min read</span>
              <span>•</span>
              <span>By SIP Brewery Team</span>
            </div>
          </div>

          {/* All Sections */}
          <IntroductionSection />
          <RegularPlansBenefitsSection />
          <PerformanceComparisonSection />
          <HiddenCostsSection />
          <FundManagerRevenueSection />
          <DecisionGuideSection />
          <DistributorSelectionSection />
          <ConclusionSection />
        </div>
      </div>
    </div>
  );
};

export default HowFundManagersMakeMoneyBlog;

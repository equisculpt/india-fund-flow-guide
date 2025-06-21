
import React from 'react';
import Layout from '@/components/Layout';
import { Badge } from "@/components/ui/badge";
import MutualFundEcosystemSection from '@/components/blog/how-mutual-funds-work/MutualFundEcosystemSection';
import StepByStepProcessSection from '@/components/blog/how-mutual-funds-work/StepByStepProcessSection';
import NAVExplanationSection from '@/components/blog/how-mutual-funds-work/NAVExplanationSection';
import SIPMechanismSection from '@/components/blog/how-mutual-funds-work/SIPMechanismSection';
import ReturnsCalculationSection from '@/components/blog/how-mutual-funds-work/ReturnsCalculationSection';
import FundManagerRoleSection from '@/components/blog/how-mutual-funds-work/FundManagerRoleSection';
import RegulatoryFrameworkSection from '@/components/blog/how-mutual-funds-work/RegulatoryFrameworkSection';
import ConclusionSection from '@/components/blog/how-mutual-funds-work/ConclusionSection';

const HowMutualFundsWorkBlog = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How Do Mutual Funds Work? Detailed Explanation with Examples 2025",
    "description": "Complete explanation of how mutual funds work in India. Learn about NAV, fund managers, investment process, returns calculation with real examples.",
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
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Deep Dive Explanation</Badge>
              <h1 className="text-4xl font-bold mb-4">How Do Mutual Funds Work? Detailed Explanation with Examples</h1>
              <p className="text-xl text-gray-600 mb-6">Understanding the complete mechanism behind mutual fund operations, NAV calculation, and investment process</p>
              <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
                <span>Published: June 19, 2025</span>
                <span>•</span>
                <span>18 min read</span>
                <span>•</span>
                <span>By SIP Brewery Team</span>
              </div>
            </div>

            {/* All Sections */}
            <MutualFundEcosystemSection />
            <StepByStepProcessSection />
            <NAVExplanationSection />
            <SIPMechanismSection />
            <ReturnsCalculationSection />
            <FundManagerRoleSection />
            <RegulatoryFrameworkSection />
            <ConclusionSection />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HowMutualFundsWorkBlog;

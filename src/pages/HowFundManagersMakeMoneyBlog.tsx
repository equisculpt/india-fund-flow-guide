
import React from 'react';
import Layout from '@/components/Layout';
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
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Professional Investment Research</Badge>
              <h1 className="text-4xl font-bold mb-4">Why Regular Mutual Fund Plans Can Outperform Direct Plans</h1>
              <p className="text-xl text-gray-600 mb-6">Evidence-based research showing how professional guidance in regular mutual funds can generate higher returns despite slightly higher costs</p>
              <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
                <span>Published: June 20, 2025</span>
                <span>•</span>
                <span>18 min read</span>
                <span>•</span>
                <span>By SIP Brewery Research Team</span>
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
    </Layout>
  );
};

export default HowFundManagersMakeMoneyBlog;

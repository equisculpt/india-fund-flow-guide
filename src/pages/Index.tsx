
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FundCategories from '@/components/FundCategories';
import IndexPageSections from '@/components/IndexPageSections';
import { useFundData } from '@/components/FundData';

const Index = () => {
  const { allFunds } = useFundData();

  const handleRiskProfilingComplete = (result: any) => {
    console.log('Risk profiling completed:', result);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Explore Mutual Funds - Restored Original with Categories */}
      <FundCategories allFunds={allFunds} />

      {/* All Other Page Sections */}
      <IndexPageSections onRiskProfilingComplete={handleRiskProfilingComplete} />
    </div>
  );
};

export default Index;

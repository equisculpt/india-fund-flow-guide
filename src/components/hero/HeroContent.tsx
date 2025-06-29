
import React from 'react';
import HeroBadge from './HeroBadge';
import HeroHeadline from './HeroHeadline';
import HeroSubheadline from './HeroSubheadline';
import HeroFeatureGrid from './HeroFeatureGrid';
import HeroRewardSection from './HeroRewardSection';
import HeroActionButtons from './HeroActionButtons';
import HeroDisclaimer from './HeroDisclaimer';
import HeroIllustration from './HeroIllustration';
import HeroTrustBar from './HeroTrustBar';

interface HeroContentProps {
  onStartInvesting: () => void;
  onCalculateReturns: () => void;
}

const HeroContent = ({ onStartInvesting, onCalculateReturns }: HeroContentProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <HeroBadge />

      {/* Header Section - Centered */}
      <div className="text-center space-y-6 lg:space-y-8 mb-12 lg:mb-16">
        <HeroHeadline />
        <HeroSubheadline />
      </div>

      {/* Two Column Layout Below "No paperwork" Statement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
        {/* Left Column - Interactive Elements */}
        <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
          <HeroFeatureGrid />
          <HeroRewardSection />
          <HeroActionButtons 
            onStartInvesting={onStartInvesting}
            onCalculateReturns={onCalculateReturns}
          />
          <HeroDisclaimer />
        </div>

        {/* Right Column - Hero Illustration */}
        <div className="order-1 lg:order-2 flex items-center justify-center">
          <HeroIllustration />
        </div>
      </div>

      <HeroTrustBar />
    </div>
  );
};

export default HeroContent;

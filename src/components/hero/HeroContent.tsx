
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start min-h-[600px] lg:min-h-[700px]">
        {/* Left Section - Content */}
        <div className="order-2 lg:order-1 space-y-6 lg:space-y-8 text-center lg:text-left">
          <HeroHeadline />
          <HeroSubheadline />
          <HeroFeatureGrid />
          <HeroRewardSection />
          <HeroActionButtons 
            onStartInvesting={onStartInvesting}
            onCalculateReturns={onCalculateReturns}
          />
          <HeroDisclaimer />
        </div>

        {/* Right Section - Hero Illustration */}
        <div className="order-1 lg:order-2 flex items-center justify-center">
          <HeroIllustration />
        </div>
      </div>

      <HeroTrustBar />
    </div>
  );
};

export default HeroContent;

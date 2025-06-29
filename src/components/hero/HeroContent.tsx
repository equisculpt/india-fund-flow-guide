
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

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[700px]">
        {/* Left Section - Content */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
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
        <div className="lg:col-span-5 order-first lg:order-last">
          <HeroIllustration />
        </div>
      </div>

      <HeroTrustBar />
    </div>
  );
};

export default HeroContent;

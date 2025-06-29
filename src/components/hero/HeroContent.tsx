
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
    <div className="max-w-7xl mx-auto relative">
      <HeroBadge />

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Section - Content */}
        <div className="text-center lg:text-left space-y-8">
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
        <HeroIllustration />
      </div>

      <HeroTrustBar />
    </div>
  );
};

export default HeroContent;

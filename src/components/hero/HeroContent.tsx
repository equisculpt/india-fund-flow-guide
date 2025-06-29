
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
      {/* Top Section - Badge and Headlines - Single Column Centered */}
      <div className="text-center mb-16 lg:mb-20">
        <HeroBadge />
        <div className="max-w-5xl mx-auto space-y-8">
          <HeroHeadline />
          <HeroSubheadline />
        </div>
      </div>

      {/* Middle Section - Two Column Layout for Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center mb-16 lg:mb-20">
        {/* Left Column - Interactive Elements */}
        <div className="space-y-8 order-2 lg:order-1">
          <HeroFeatureGrid />
          <HeroRewardSection />
          <HeroActionButtons 
            onStartInvesting={onStartInvesting}
            onCalculateReturns={onCalculateReturns}
          />
        </div>

        {/* Right Column - Hero Illustration */}
        <div className="order-1 lg:order-2 flex items-center justify-center">
          <HeroIllustration />
        </div>
      </div>

      {/* Bottom Section - Disclaimer - Single Column Centered */}
      <div className="text-center mb-16 lg:mb-20">
        <HeroDisclaimer />
      </div>

      {/* Trust Bar */}
      <HeroTrustBar />
    </div>
  );
};

export default HeroContent;

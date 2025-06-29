
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <HeroBadge />

      {/* Single Column Centered Layout */}
      <div className="space-y-8 lg:space-y-12 text-center">
        <HeroHeadline />
        <HeroSubheadline />
        
        {/* Hero Illustration - Centered */}
        <div className="flex items-center justify-center">
          <HeroIllustration />
        </div>
        
        <HeroFeatureGrid />
        <HeroRewardSection />
        <HeroActionButtons 
          onStartInvesting={onStartInvesting}
          onCalculateReturns={onCalculateReturns}
        />
        <HeroDisclaimer />
      </div>

      <HeroTrustBar />
    </div>
  );
};

export default HeroContent;

import React from 'react';
import WorldClassHero from './hero/WorldClassHero';
import HeroBadge from './hero/HeroBadge';
import AIAnalysisPreview from './features/AIAnalysisPreview';
import WorldClassFundComparison from './features/WorldClassFundComparison';
import { Shield } from "lucide-react";

const HeroSection = () => {
  console.log('HeroSection component is rendering');
  
  try {
    console.log('About to render components');
    return (
      <div>
        <HeroBadge />
        <WorldClassHero />
        <AIAnalysisPreview />
        <WorldClassFundComparison />
      
        {/* Enhanced Compliance Notice with improved readability */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-glass backdrop-blur-xl rounded-3xl p-8 border border-primary/20 shadow-luxury hover:shadow-glow transition-all duration-500 max-w-5xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-primary p-3 rounded-2xl border border-primary-glow/30 shadow-glow">
                  <Shield className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-left flex-1">
                  <h4 className="font-heading font-bold text-xl text-foreground mb-3" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    Regulatory Compliance & Risk Disclosure
                  </h4>
                  <div className="text-sm text-foreground/85 leading-relaxed space-y-2" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>
                    <p>
                      <strong className="text-secondary font-semibold" style={{ textShadow: '0 0 8px hsl(var(--secondary) / 0.6)' }}>Risk Disclosure:</strong> Mutual funds are subject to market risks. 
                      Please read all scheme related documents carefully before investing. 
                      Past performance is not indicative of future returns.
                    </p>
                    <p>
                      <strong className="text-accent font-semibold" style={{ textShadow: '0 0 8px hsl(var(--accent) / 0.6)' }}>Registration Details:</strong> AMFI Registered Mutual Fund Distributor | 
                      All investments are regulated by SEBI and compliant with AMFI guidelines.
                    </p>
                    <p>
                      <strong className="text-primary font-semibold" style={{ textShadow: '0 0 8px hsl(var(--primary) / 0.6)' }}>Research Disclaimer:</strong> All research and analysis are for informational purposes only and do not constitute investment advice. Platform rewards and referral incentives are promotional benefits subject to terms and conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error in HeroSection:', error);
    return <div>Error loading hero section: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }
};

export default HeroSection;
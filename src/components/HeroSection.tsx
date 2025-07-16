import React from 'react';
import PremiumHero from './hero/PremiumHero';
import HeroBadge from './hero/HeroBadge';
import AIAnalysisPreview from './features/AIAnalysisPreview';
import WorldClassFundComparison from './features/WorldClassFundComparison';
import { Shield } from "lucide-react";

const HeroSection = () => {
  console.log('HeroSection component is rendering');
  
  try {
    console.log('About to render premium components');
    return (
      <div>
        <PremiumHero />
        <AIAnalysisPreview />
        <WorldClassFundComparison />
      
        {/* Premium Regulatory Compliance Section */}
        <section className="py-20" style={{
          background: 'linear-gradient(135deg, #1e1852 0%, #0f1a3d 50%, #0B132B 100%)'
        }}>
          <div className="container mx-auto px-4">
            <div className="glass-panel rounded-3xl p-12 border-white/10 shadow-luxury max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-gradient-secondary p-6 rounded-3xl border border-secondary/30 shadow-gold mb-8 animate-glow-pulse">
                  <Shield className="h-10 w-10 text-secondary-foreground mr-4" />
                  <h2 className="text-3xl font-bold font-heading text-secondary-foreground">
                    Regulatory Excellence & Trust
                  </h2>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
                <div className="glass-panel p-8 rounded-2xl border-white/10 shadow-glass hover:shadow-glow transition-all duration-500 hover:scale-105 group">
                  <h3 className="font-bold font-heading text-foreground text-xl mb-4 group-hover:text-secondary transition-colors duration-300">
                    AMFI Registered
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    Officially registered with Association of Mutual Funds in India with complete regulatory compliance
                  </p>
                </div>
                <div className="glass-panel p-8 rounded-2xl border-white/10 shadow-glass hover:shadow-glow transition-all duration-500 hover:scale-105 group">
                  <h3 className="font-bold font-heading text-foreground text-xl mb-4 group-hover:text-accent transition-colors duration-300">
                    SEBI Compliant
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    Full adherence to Securities and Exchange Board of India regulations and guidelines
                  </p>
                </div>
                <div className="glass-panel p-8 rounded-2xl border-white/10 shadow-glass hover:shadow-glow transition-all duration-500 hover:scale-105 group">
                  <h3 className="font-bold font-heading text-foreground text-xl mb-4 group-hover:text-primary transition-colors duration-300">
                    3000+ Funds
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    Comprehensive access to all major mutual fund schemes across India's top AMCs
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-muted-foreground font-body leading-relaxed max-w-5xl mx-auto" style={{
                  filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3))'
                }}>
                  <strong className="text-secondary font-semibold">Important Disclosure:</strong> Mutual Fund investments are subject to market risks. 
                  Please read all scheme related documents carefully before investing. Past performance is not indicative of future results. 
                  SIP Brewery is a registered mutual fund distributor (ARN: XXXXXX) with AMFI and operates under strict SEBI regulations. 
                  All investments are processed through verified AMCs and custodians for maximum security.
                </p>
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
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
      
        {/* Consistent Dark Theme Regulatory Compliance Section */}
        <section className="py-16 bg-gradient-glass backdrop-blur-xl">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-glass backdrop-blur-xl rounded-3xl p-8 border border-secondary/30 shadow-luxury max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-gradient-secondary p-4 rounded-2xl border border-secondary/40 shadow-glow mb-6">
                  <Shield className="h-8 w-8 text-secondary-foreground mr-3" />
                  <h2 className="text-2xl font-bold text-secondary-foreground" style={{ 
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)' 
                  }}>
                    Regulatory Compliance & Trust
                  </h2>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-gradient-glass backdrop-blur-md p-6 rounded-2xl border border-secondary/20 shadow-glass">
                  <h3 className="font-bold text-foreground text-lg mb-2" style={{ 
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)' 
                  }}>
                    AMFI Registered
                  </h3>
                  <p className="text-muted-foreground text-sm" style={{ 
                    textShadow: '0 1px 2px rgba(0,0,0,0.8)' 
                  }}>
                    Association of Mutual Funds in India registered distributor with complete compliance
                  </p>
                </div>
                <div className="bg-gradient-glass backdrop-blur-md p-6 rounded-2xl border border-accent/20 shadow-glass">
                  <h3 className="font-bold text-foreground text-lg mb-2" style={{ 
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)' 
                  }}>
                    SEBI Compliant
                  </h3>
                  <p className="text-muted-foreground text-sm" style={{ 
                    textShadow: '0 1px 2px rgba(0,0,0,0.8)' 
                  }}>
                    Securities and Exchange Board of India regulations fully adhered to
                  </p>
                </div>
                <div className="bg-gradient-glass backdrop-blur-md p-6 rounded-2xl border border-primary/20 shadow-glass">
                  <h3 className="font-bold text-foreground text-lg mb-2" style={{ 
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)' 
                  }}>
                    3000+ Funds
                  </h3>
                  <p className="text-muted-foreground text-sm" style={{ 
                    textShadow: '0 1px 2px rgba(0,0,0,0.8)' 
                  }}>
                    Comprehensive access to all major mutual fund schemes in India
                  </p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl mx-auto" style={{ 
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)' 
                }}>
                  <strong className="text-secondary" style={{ 
                    textShadow: '0 0 15px hsl(var(--secondary) / 0.8)' 
                  }}>
                    Important:
                  </strong> Mutual Fund investments are subject to market risks. Please read all scheme related documents carefully before investing. 
                  Past performance is not indicative of future results. SIP Brewery is a registered mutual fund distributor (ARN: XXXXXX) 
                  with AMFI and operates under SEBI regulations. All investments are processed through verified AMCs and custodians.
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
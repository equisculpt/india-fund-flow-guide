import React from 'react';
import WorldClassHero from './hero/WorldClassHero';
import AIAnalysisPreview from './features/AIAnalysisPreview';
import WorldClassFundComparison from './features/WorldClassFundComparison';
import { Shield } from "lucide-react";

const HeroSection = () => {
  console.log('HeroSection component is rendering');
  
  try {
    console.log('About to render components');
    return (
      <div>
        <WorldClassHero />
        <AIAnalysisPreview />
        <WorldClassFundComparison />
      
        {/* Enhanced Compliance Notice */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-border shadow-lg hover:shadow-xl transition-all duration-500 max-w-5xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-2xl border border-primary/20">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <div className="text-left flex-1">
                  <h4 className="font-heading font-bold text-xl text-card-foreground mb-3">Regulatory Compliance & Risk Disclosure</h4>
                  <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                    <p>
                      <strong className="text-primary">Risk Disclosure:</strong> Mutual funds are subject to market risks. 
                      Please read all scheme related documents carefully before investing. 
                      Past performance is not indicative of future returns.
                    </p>
                    <p>
                      <strong className="text-secondary">Registration Details:</strong> AMFI Registered Mutual Fund Distributor | 
                      All investments are regulated by SEBI and compliant with AMFI guidelines.
                    </p>
                    <p>
                      <strong className="text-accent">Research Disclaimer:</strong> All research and analysis are for informational purposes only and do not constitute investment advice. Platform rewards and referral incentives are promotional benefits subject to terms and conditions.
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
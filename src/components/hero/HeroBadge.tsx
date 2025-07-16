
import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

const HeroBadge = () => {
  return (
    <>
      {/* Consistent Dark Theme Badge */}
      <div className="mb-10 lg:mb-12 text-center">
        <div className="relative inline-flex items-center">
          <span className="inline-flex items-center bg-gradient-glass backdrop-blur-xl border border-secondary/40 text-foreground px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-semibold shadow-luxury hover:shadow-glow transition-all duration-300 hover:scale-105 group">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl rounded-full border border-secondary/30 shadow-glass"></div>
            <Shield className="relative h-5 w-5 sm:h-6 sm:w-6 mr-3 sm:mr-4 text-secondary group-hover:animate-pulse" style={{ filter: 'drop-shadow(0 0 8px hsl(var(--secondary) / 0.8))' }} />
            <span className="relative text-foreground font-medium" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 20px hsl(var(--secondary) / 0.4)' }}>
              🎉 AMFI Registered | SEBI Compliant | 3000+ Funds | Real Human Support
            </span>
            <Sparkles className="relative h-5 w-5 sm:h-6 sm:w-6 ml-3 sm:ml-4 text-accent animate-bounce" style={{ filter: 'drop-shadow(0 0 8px hsl(var(--accent) / 0.8))' }} />
          </span>
          
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-secondary opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Consistent Dark Theme Tagline */}
      <div className="bg-gradient-glass backdrop-blur-xl py-8 rounded-3xl mx-4 mb-12 border border-secondary/30 shadow-luxury">
        <div className="text-center px-6">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2" style={{ 
            textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 30px hsl(var(--secondary) / 0.6)' 
          }}>
            <span className="bg-gradient-to-r from-secondary via-secondary-glow to-accent bg-clip-text text-transparent">
              India&apos;s Trusted AMFI Registered Mutual Fund Distributor & SIP Investment Platform
            </span>
          </h2>
          <p className="text-muted-foreground font-medium" style={{ 
            textShadow: '0 1px 2px rgba(0,0,0,0.8)' 
          }}>
            Empowering smart investments with AI-driven insights and transparent analytics
          </p>
        </div>
      </div>
    </>
  );
};

export default HeroBadge;

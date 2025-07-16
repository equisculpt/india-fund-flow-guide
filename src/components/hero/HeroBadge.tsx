
import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

const HeroBadge = () => {
  return (
    <>
      {/* Dark Hero Section with Badge */}
      <div className="mb-10 lg:mb-12 text-center">
        <div className="relative inline-flex items-center">
          <span className="inline-flex items-center bg-gradient-glass backdrop-blur-xl border border-primary-glow/30 text-foreground px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-semibold shadow-luxury hover:shadow-glow transition-all duration-300 hover:scale-105 group">
            <div className="absolute inset-0 bg-background/70 backdrop-blur-xl rounded-full border border-primary-glow/20" style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)' }}></div>
            <Shield className="relative h-5 w-5 sm:h-6 sm:w-6 mr-3 sm:mr-4 text-accent group-hover:animate-pulse" />
            <span className="relative text-foreground font-medium drop-shadow-sm">🎉 AMFI Registered | SEBI Compliant | 3000+ Funds | Real Human Support</span>
            <Sparkles className="relative h-5 w-5 sm:h-6 sm:w-6 ml-3 sm:ml-4 text-secondary animate-bounce" />
          </span>
          
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Light Background Section for Tagline */}
      <div className="bg-gradient-to-br from-secondary/5 via-white/95 to-accent/5 backdrop-blur-sm py-8 rounded-3xl mx-4 mb-12 border border-secondary/20 shadow-luxury">
        <div className="text-center px-6">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 mb-2">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              India's Trusted AMFI Registered Mutual Fund Distributor & SIP Investment Platform
            </span>
          </h2>
          <p className="text-gray-600 font-medium">
            Empowering smart investments with AI-driven insights and transparent analytics
          </p>
        </div>
      </div>
    </>
  );
};

export default HeroBadge;

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
      
        {/* Light Background Regulatory Compliance Section */}
        <section className="py-16 bg-gradient-light">
          <div className="container mx-auto px-4">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-amber-200/50 shadow-xl max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-gradient-to-r from-amber-100 to-yellow-50 p-4 rounded-2xl border border-amber-200 shadow-lg mb-6">
                  <Shield className="h-8 w-8 text-amber-700 mr-3" />
                  <h2 className="text-2xl font-bold text-amber-900">Regulatory Compliance & Trust</h2>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-2xl border border-amber-100 shadow-md">
                  <h3 className="font-bold text-amber-800 text-lg mb-2">AMFI Registered</h3>
                  <p className="text-amber-700 text-sm">Association of Mutual Funds in India registered distributor with complete compliance</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-2xl border border-yellow-100 shadow-md">
                  <h3 className="font-bold text-amber-800 text-lg mb-2">SEBI Compliant</h3>
                  <p className="text-amber-700 text-sm">Securities and Exchange Board of India regulations fully adhered to</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-amber-50 p-6 rounded-2xl border border-red-100 shadow-md">
                  <h3 className="font-bold text-amber-800 text-lg mb-2">3000+ Funds</h3>
                  <p className="text-amber-700 text-sm">Comprehensive access to all major mutual fund schemes in India</p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-amber-700 leading-relaxed max-w-4xl mx-auto">
                  <strong>Important:</strong> Mutual Fund investments are subject to market risks. Please read all scheme related documents carefully before investing. 
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
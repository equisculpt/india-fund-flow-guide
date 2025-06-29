
import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

const HeroBadge = () => {
  return (
    <div className="mb-10 lg:mb-12 text-center">
      <div className="relative inline-flex items-center">
        <span className="inline-flex items-center bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-300 text-blue-800 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 group">
          <Shield className="h-5 w-5 sm:h-6 sm:w-6 mr-3 sm:mr-4 text-blue-600 group-hover:animate-pulse" />
          🎉 AMFI Registered | SEBI Compliant | 3000+ Funds | Real Human Support
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 ml-3 sm:ml-4 text-yellow-500 animate-bounce" />
        </span>
        
        {/* Floating glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300"></div>
      </div>
    </div>
  );
};

export default HeroBadge;

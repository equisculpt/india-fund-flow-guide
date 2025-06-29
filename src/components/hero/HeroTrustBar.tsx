
import React from 'react';
import { Shield, Users, Brain } from 'lucide-react';

const HeroTrustBar = () => {
  return (
    <div className="mt-20 text-center">
      <div className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-3xl p-8 shadow-2xl hover:shadow-xl transition-all duration-500">
        <div className="flex flex-wrap justify-center items-center gap-12">
          <div className="flex items-center group">
            <Shield className="h-8 w-8 text-blue-600 mr-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-bold text-gray-800 text-lg">AMFI Registered</span>
          </div>
          <div className="flex items-center group">
            <Shield className="h-8 w-8 text-green-600 mr-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-bold text-gray-800 text-lg">SEBI Compliant</span>
          </div>
          <div className="flex items-center group">
            <Users className="h-8 w-8 text-purple-600 mr-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-bold text-gray-800 text-lg">Trusted by 10,000+ Investors</span>
          </div>
          <div className="flex items-center group">
            <Brain className="h-8 w-8 text-amber-600 mr-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-bold text-gray-800 text-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-pulse">AI-Powered</span> Research
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTrustBar;

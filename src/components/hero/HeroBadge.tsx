
import React from 'react';
import { Shield } from 'lucide-react';

const HeroBadge = () => {
  return (
    <div className="mb-8 lg:mb-12 text-center">
      <span className="inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 text-blue-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
        <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-blue-600" />
        🎉 AMFI Registered Distributor | SEBI Compliant | 3000+ Funds | Real Human Support
      </span>
    </div>
  );
};

export default HeroBadge;

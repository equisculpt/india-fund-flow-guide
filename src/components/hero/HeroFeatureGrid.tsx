
import React from 'react';
import { BarChart3, DollarSign, Users, Shield } from 'lucide-react';

const HeroFeatureGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto lg:mx-0">
      <div className="flex items-center bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
        <BarChart3 className="h-7 w-7 text-blue-600 mr-4 flex-shrink-0" />
        <span className="font-bold text-gray-800">Advanced Fund Research</span>
      </div>
      <div className="flex items-center bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-2xl border-2 border-green-200 shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105">
        <DollarSign className="h-7 w-7 text-green-600 mr-4 flex-shrink-0" />
        <span className="font-bold text-gray-800">Zero Hidden Fees</span>
      </div>
      <div className="flex items-center bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
        <Users className="h-7 w-7 text-purple-600 mr-4 flex-shrink-0" />
        <span className="font-bold text-gray-800">Real Human Support</span>
      </div>
      <div className="flex items-center bg-gradient-to-r from-amber-50 to-amber-100 p-5 rounded-2xl border-2 border-amber-200 shadow-lg hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105">
        <Shield className="h-7 w-7 text-amber-600 mr-4 flex-shrink-0" />
        <span className="font-bold text-gray-800">AMFI Registered</span>
      </div>
    </div>
  );
};

export default HeroFeatureGrid;

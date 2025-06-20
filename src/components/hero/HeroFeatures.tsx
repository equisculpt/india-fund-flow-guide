
import React from 'react';
import { TrendingUp, Shield, Award } from 'lucide-react';

const HeroFeatures = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
      <div className="group text-center bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2">
        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
          <TrendingUp className="h-10 w-10 text-white" />
        </div>
        <h3 className="font-bold text-xl text-gray-900 mb-2">Higher Returns</h3>
        <p className="text-gray-600 font-medium">Professional fund management with proven track record</p>
      </div>
      
      <div className="group text-center bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2">
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
          <Shield className="h-10 w-10 text-white" />
        </div>
        <h3 className="font-bold text-xl text-gray-900 mb-2">AMFI Registered</h3>
        <p className="text-gray-600 font-medium">100% safe & transparent investing platform</p>
      </div>
      
      <div className="group text-center bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2">
        <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
          <Award className="h-10 w-10 text-white" />
        </div>
        <h3 className="font-bold text-xl text-gray-900 mb-2">Consistency Rewards</h3>
        <p className="text-gray-600 font-medium">SIP consistency rewards + Transfer incentives + Referral earnings</p>
      </div>
    </div>
  );
};

export default HeroFeatures;

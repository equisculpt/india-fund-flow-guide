
import React from 'react';
import { Gift, Sparkles } from 'lucide-react';

const HeroRewardSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl lg:rounded-[2rem] p-6 lg:p-8 shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 max-w-2xl mx-auto lg:mx-0 group hover:scale-105">
      {/* Floating particles effect */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
      <div className="absolute top-8 right-8 w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-200"></div>
      
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-3 rounded-xl shadow-lg">
            <Gift className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg lg:text-xl font-bold text-amber-900">Exclusive Platform Rewards</h3>
        </div>
        
        <p className="text-gray-700 font-medium text-base lg:text-lg leading-relaxed">
          As a gesture of appreciation, we may offer platform rewards for active investing, consistent SIPs, and referrals.*
        </p>
        
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-2xl p-4 lg:p-5">
          <div className="flex items-center text-green-800 font-bold text-base lg:text-lg">
            <Sparkles className="h-6 w-6 mr-3 text-green-600 animate-bounce" />
            🎉 Refer friends and earn up to ₹500 per successful referral
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroRewardSection;

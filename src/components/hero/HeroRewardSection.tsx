
import React from 'react';
import { Sparkles } from 'lucide-react';

const HeroRewardSection = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-3xl p-8 shadow-xl hover:shadow-blue-500/25 transition-all duration-300">
      <div className="space-y-4">
        <p className="text-gray-700 font-medium text-lg leading-relaxed">
          As a gesture of appreciation, we may, from time to time, offer platform rewards or loyalty bonuses for active investing, consistent SIPs, and referrals.*
        </p>
        <div className="flex items-center text-green-700 font-bold text-lg">
          <Sparkles className="h-6 w-6 mr-3 text-green-600" />
          🥳 Refer friends and earn up to ₹500 per successful referral
        </div>
      </div>
    </div>
  );
};

export default HeroRewardSection;

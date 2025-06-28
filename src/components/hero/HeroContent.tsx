
import React from 'react';
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight, Sparkles } from "lucide-react";

interface HeroContentProps {
  onStartInvesting: () => void;
  onCalculateReturns: () => void;
}

const HeroContent = ({ onStartInvesting, onCalculateReturns }: HeroContentProps) => {
  return (
    <div className="max-w-6xl mx-auto text-center relative">
      {/* Enhanced Badge */}
      <div className="mb-8">
        <span className="inline-flex items-center bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-800 px-8 py-4 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 mr-2 text-amber-600" />
          🎉 AMFI Registered Platform: Professional Advisory & Compliance-First Approach
        </span>
      </div>
      
      {/* Enhanced Heading */}
      <div className="mb-8">
        <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
          Start Your{" "}
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 animate-gradient-x">
              Mutual Fund
            </span>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-700/20 rounded-lg blur-lg -z-10"></div>
          </span>{" "}
          Journey Today
        </h1>
        
        <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
      </div>
      
      {/* Enhanced Description */}
      <div className="mb-10">
        <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-5xl mx-auto leading-relaxed font-medium">
          Invest in top-performing regular mutual funds with professional{" "}
          <span className="font-semibold text-blue-600">AMFI registered distributor</span>.
        </p>
        <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-4">
          Earn consistency rewards and gift cards for maintaining 12 uninterrupted SIPs
          AND portfolio transfer incentives up to ₹50,000!
        </p>
        <p className="text-lg md:text-xl text-green-600 font-semibold max-w-4xl mx-auto leading-relaxed">
          🎁 Refer friends and earn up to ₹500 on successful referrals!*
        </p>
      </div>
      
      {/* Enhanced Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
        <Button 
          size="lg" 
          onClick={onStartInvesting}
          className="group relative bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 text-white px-12 py-7 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 rounded-2xl border-2 border-white/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"></div>
          <span className="relative flex items-center">
            Start Investing with ₹500
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
          </span>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          onClick={onCalculateReturns}
          className="group relative border-3 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-12 py-7 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 rounded-2xl bg-white/80 backdrop-blur-sm"
        >
          <span className="relative flex items-center">
            Calculate Returns
            <TrendingUp className="ml-3 h-6 w-6 group-hover:scale-125 transition-transform duration-300" />
          </span>
        </Button>
      </div>

      {/* Enhanced Stats or Features Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50">
          <div className="text-3xl font-bold text-blue-600 mb-2">3000+</div>
          <div className="text-gray-700 font-medium">Mutual Funds Available</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50">
          <div className="text-3xl font-bold text-green-600 mb-2">₹500</div>
          <div className="text-gray-700 font-medium">Minimum SIP Amount</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50">
          <div className="text-3xl font-bold text-purple-600 mb-2">₹500</div>
          <div className="text-gray-700 font-medium">Max Referral Earning</div>
        </div>
      </div>
      
      {/* Enhanced Disclaimer */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg max-w-5xl mx-auto">
        <p className="text-sm text-gray-600 leading-relaxed">
          *These rewards are not guaranteed, are not linked to investment returns, and may be changed or withdrawn without notice.
          Please see our Terms & Conditions and Commission Disclosure for details. Mutual fund investments are subject to market risk. No incentive or reward is provided as an inducement to invest.
        </p>
      </div>
    </div>
  );
};

export default HeroContent;

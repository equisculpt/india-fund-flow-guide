
import React from 'react';
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight, Sparkles, Zap } from "lucide-react";

interface HeroContentProps {
  onStartInvesting: () => void;
  onCalculateReturns: () => void;
}

const HeroContent = ({ onStartInvesting, onCalculateReturns }: HeroContentProps) => {
  return (
    <div className="max-w-6xl mx-auto text-center relative">
      {/* Mesmerizing Badge */}
      <div className="mb-8">
        <span className="inline-flex items-center bg-white/10 backdrop-blur-xl border border-white/30 text-white px-8 py-4 rounded-full text-sm font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
          <Sparkles className="h-4 w-4 mr-2 text-yellow-400 animate-pulse" />
          🎉 AMFI Registered Platform: Professional Investment Distribution
        </span>
      </div>
      
      {/* Stunning Heading with Enhanced Animations */}
      <div className="mb-8">
        <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-4 leading-tight tracking-tight">
          Start Your{" "}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse">
              Mutual Fund
            </span>
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-lg blur-xl animate-pulse"></div>
          </span>{" "}
          Journey Today
        </h1>
        
        <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-6 animate-pulse"></div>
      </div>
      
      {/* Captivating Description */}
      <div className="mb-10">
        <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-5xl mx-auto leading-relaxed font-medium">
          Invest in top-performing mutual funds through our{" "}
          <span className="font-semibold text-cyan-400 animate-pulse">AMFI-registered platform</span>.
        </p>
        <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-4">
          As a gesture of appreciation, we may, from time to time and at our sole discretion, offer platform rewards or loyalty bonuses to customers who use our services, maintain active SIPs, or consolidate portfolios with us.*
        </p>
        <p className="text-lg md:text-xl text-green-400 font-semibold max-w-4xl mx-auto leading-relaxed animate-pulse">
          🎁 Refer friends and earn up to ₹500 on successful referrals!*
        </p>
      </div>
      
      {/* Irresistible Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
        <Button 
          size="lg" 
          onClick={onStartInvesting}
          className="group relative bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 text-white px-12 py-7 text-xl font-bold shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-3 rounded-2xl border-2 border-white/30 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"></div>
          <div className="absolute inset-0 bg-white/10 rounded-2xl animate-pulse"></div>
          <span className="relative flex items-center">
            <Zap className="mr-3 h-6 w-6 animate-bounce" />
            Start Investing with ₹500
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
          </span>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          onClick={onCalculateReturns}
          className="group relative border-3 border-white/50 text-white hover:bg-white/10 hover:text-white px-12 py-7 text-xl font-bold shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-3 rounded-2xl bg-white/5 backdrop-blur-xl"
        >
          <span className="relative flex items-center">
            Calculate Returns
            <TrendingUp className="ml-3 h-6 w-6 group-hover:scale-125 transition-transform duration-300" />
          </span>
        </Button>
      </div>

      {/* Stunning Stats Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 border border-white/20">
          <div className="text-3xl font-bold text-cyan-400 mb-2 animate-pulse">3000+</div>
          <div className="text-white/80 font-medium">Mutual Funds Available</div>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 border border-white/20">
          <div className="text-3xl font-bold text-green-400 mb-2 animate-pulse">₹500</div>
          <div className="text-white/80 font-medium">Minimum SIP Amount</div>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 border border-white/20">
          <div className="text-3xl font-bold text-purple-400 mb-2 animate-pulse">₹500</div>
          <div className="text-white/80 font-medium">Max Referral Earning</div>
        </div>
      </div>
      
      {/* Enhanced Disclaimer */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg max-w-5xl mx-auto">
        <p className="text-sm text-white/70 leading-relaxed">
          *These rewards are not guaranteed, are not linked to investment returns, and may be changed or withdrawn without notice.
          Please see our Terms & Conditions and Commission Disclosure for details. Mutual fund investments are subject to market risk. No incentive or reward is provided as an inducement to invest.
        </p>
      </div>
    </div>
  );
};

export default HeroContent;

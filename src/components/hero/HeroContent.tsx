
import React from 'react';
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight } from "lucide-react";

interface HeroContentProps {
  onStartInvesting: () => void;
  onCalculateReturns: () => void;
}

const HeroContent = ({ onStartInvesting, onCalculateReturns }: HeroContentProps) => {
  return (
    <div className="max-w-5xl mx-auto text-center">
      <div className="mb-6">
        <span className="inline-flex items-center bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-6 py-3 rounded-full text-sm font-semibold mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          🎉 AMFI Registered Platform: Professional Advisory & Compliance-First Approach
        </span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
        Start Your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
          Mutual Fund
        </span>{" "}
        Journey Today
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed font-medium">
        Invest in top-performing mutual funds through our AMFI-registered platform.
        As a gesture of appreciation, we may, from time to time and at our sole discretion, offer platform rewards or loyalty bonuses to customers who use our services, maintain active SIPs, or consolidate portfolios with us.
        <br />
        <span className="text-lg text-blue-600 font-semibold">
          These rewards are not guaranteed, are not linked to investment returns, and may be changed or withdrawn without notice.
        </span>
        <br />
        <span className="text-sm text-gray-500">
          Please see our Terms & Conditions and Commission Disclosure for details. Mutual fund investments are subject to market risk. No incentive or reward is provided as an inducement to invest.
        </span>
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
        <Button 
          size="lg" 
          onClick={onStartInvesting}
          className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-6 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
        >
          Start Investing with ₹500
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          onClick={onCalculateReturns}
          className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
        >
          Calculate Returns
          <TrendingUp className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default HeroContent;

import React from 'react';
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight, Sparkles, Zap, Brain, Shield, Users, DollarSign } from "lucide-react";

interface HeroContentProps {
  onStartInvesting: () => void;
  onCalculateReturns: () => void;
}

const HeroContent = ({ onStartInvesting, onCalculateReturns }: HeroContentProps) => {
  return (
    <div className="max-w-7xl mx-auto relative">
      {/* AMFI Badge */}
      <div className="mb-8 text-center">
        <span className="inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
          <Shield className="h-4 w-4 mr-2 text-blue-600" />
          🎉 AMFI Registered Distributor | SEBI Compliant | 3000+ Funds | Real Human Support
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Section - Content */}
        <div className="text-left">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Upgrade Your{" "}
            <span className="rainbow-text">
              Mutual Fund
            </span>{" "}
            Experience
          </h1>
          
          {/* AI Highlight Tagline */}
          <div className="mb-6">
            <div className="inline-flex items-center bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 text-amber-800 px-6 py-3 rounded-full text-lg font-bold shadow-lg">
              <Brain className="h-5 w-5 mr-2 text-amber-600 animate-pulse" />
              Discover smarter investing with <span className="rainbow-text ml-1">AI-powered</span> fund research and insights
            </div>
          </div>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed font-medium">
            Invest, track, and grow—all in one place with India's most transparent AMFI-registered platform.
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            No paperwork, no hidden fees—just honest investing, advanced tools, and exclusive platform rewards.
          </p>

          {/* Features Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center bg-blue-50 p-4 rounded-xl border border-blue-200">
              <Brain className="h-6 w-6 text-blue-600 mr-3" />
              <span className="font-semibold text-gray-800"><span className="rainbow-text">AI-Powered</span> Fund Research</span>
            </div>
            <div className="flex items-center bg-green-50 p-4 rounded-xl border border-green-200">
              <DollarSign className="h-6 w-6 text-green-600 mr-3" />
              <span className="font-semibold text-gray-800">Zero Hidden Fees</span>
            </div>
            <div className="flex items-center bg-purple-50 p-4 rounded-xl border border-purple-200">
              <Users className="h-6 w-6 text-purple-600 mr-3" />
              <span className="font-semibold text-gray-800">Real Human Support</span>
            </div>
            <div className="flex items-center bg-amber-50 p-4 rounded-xl border border-amber-200">
              <Shield className="h-6 w-6 text-amber-600 mr-3" />
              <span className="font-semibold text-gray-800">AMFI Registered</span>
            </div>
          </div>

          {/* Reward & Referral Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <p className="text-gray-700 mb-3 font-medium">
              As a gesture of appreciation, we may, from time to time, offer platform rewards or loyalty bonuses for active investing, consistent SIPs, and referrals.*
            </p>
            <div className="flex items-center text-green-700 font-semibold">
              <Sparkles className="h-5 w-5 mr-2 text-green-600" />
              🥳 Refer friends and earn up to ₹500 per successful referral
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              size="lg" 
              onClick={onStartInvesting}
              className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-6 text-xl font-bold shadow-xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 rounded-xl"
            >
              <Zap className="mr-3 h-6 w-6" />
              Start Investing With ₹500
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onCalculateReturns}
              className="group border-2 border-amber-400 text-amber-700 hover:bg-amber-50 px-8 py-6 text-xl font-bold shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50"
            >
              <Brain className="mr-3 h-6 w-6" />
              Try <span className="rainbow-text ml-1">AI</span> Fund Comparison
            </Button>
          </div>

          {/* Compliance Disclaimer */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-700 leading-relaxed">
            <p className="font-medium mb-1">⚠️ Important Disclaimers:</p>
            <p>
              *Rewards are discretionary, not guaranteed, and may be changed or withdrawn at any time. 
              <span className="rainbow-text">AI</span>-generated research and analysis are for informational purposes only and do not constitute investment advice. 
              Please see our Terms & Conditions and Commission Disclosure for details. 
              <span className="rainbow-text">Mutual fund</span> investments are subject to market risk.
            </p>
          </div>
        </div>

        {/* Right Section - Hero Illustration */}
        <div className="relative">
          <div className="relative bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
            {/* AI Dashboard Mockup */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex items-center mb-4">
                <Brain className="h-8 w-8 text-blue-600 mr-3 animate-pulse" />
                <h3 className="text-xl font-bold text-gray-800"><span className="rainbow-text">AI</span> Fund Analysis</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Risk Score</span>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Low</div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600"><span className="rainbow-text">AI</span> Recommendation</span>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Strong Buy</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-700">
                    <strong><span className="rainbow-text">AI</span> Insight:</strong> This fund shows consistent performance with low volatility, perfect for your risk profile.
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-blue-600">3000+</div>
                <div className="text-sm text-gray-600">Funds Available</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-green-600">₹500</div>
                <div className="text-sm text-gray-600">Min SIP Amount</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-purple-600">10K+</div>
                <div className="text-sm text-gray-600">Happy Investors</div>
              </div>
            </div>

            {/* Floating AI Elements */}
            <div className="absolute -top-4 -right-4 bg-amber-400 text-white p-3 rounded-full shadow-lg animate-bounce">
              <Brain className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-pulse">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="mt-16 text-center">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              <span className="font-semibold text-gray-800">AMFI Registered</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-green-600 mr-2" />
              <span className="font-semibold text-gray-800">SEBI Compliant</span>
            </div>
            <div className="flex items-center">
              <Users className="h-6 w-6 text-purple-600 mr-2" />
              <span className="font-semibold text-gray-800">Trusted by 10,000+ Investors</span>
            </div>
            <div className="flex items-center">
              <Brain className="h-6 w-6 text-amber-600 mr-2" />
              <span className="font-semibold text-gray-800"><span className="rainbow-text">AI-Powered</span> Research</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;

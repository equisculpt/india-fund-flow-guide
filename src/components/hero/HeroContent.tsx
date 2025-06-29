
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
      <div className="mb-12 text-center">
        <span className="inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 text-blue-800 px-8 py-4 rounded-full text-base font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
          <Shield className="h-5 w-5 mr-3 text-blue-600" />
          🎉 AMFI Registered Distributor | SEBI Compliant | 3000+ Funds | Real Human Support
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Section - Content */}
        <div className="text-left space-y-8">
          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
              Upgrade Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-pulse">
                Mutual Fund
              </span>{" "}
              Experience
            </h1>
            
            {/* AI Highlight Tagline - Full Width Centered */}
            <div className="relative w-full">
              <div className="w-full bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-200 rounded-3xl px-8 py-6 shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 transform hover:scale-105">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-amber-600 animate-pulse" />
                    <span className="text-sm font-medium text-amber-700">discover smarter investing with</span>
                  </div>
                  <div className="text-2xl font-extrabold">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-pulse">
                      AI-Powered
                    </span>
                    <span className="text-amber-800 ml-2">Fund Research & Insights</span>
                    <span className="ml-2 text-xl">✨</span>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-3 -right-3 text-2xl animate-bounce">✨</div>
              <div className="absolute -bottom-3 -left-3 text-xl animate-pulse">💡</div>
            </div>
          </div>

          {/* Subheadline */}
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl text-gray-700 font-medium leading-relaxed">
              Invest, track, and grow—all in one place with India's most transparent AMFI-registered platform.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              No paperwork, no hidden fees—just honest investing, advanced tools, and exclusive platform rewards.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
              <Brain className="h-7 w-7 text-blue-600 mr-4 flex-shrink-0" />
              <span className="font-bold text-gray-800">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-pulse">AI-Powered</span> Fund Research
              </span>
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

          {/* Reward Section */}
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6">
            <Button 
              size="lg" 
              onClick={onStartInvesting}
              className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 py-7 text-xl font-bold shadow-2xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-110 rounded-2xl border-2 border-green-500"
            >
              <Zap className="mr-4 h-7 w-7" />
              Start Investing With ₹500
              <ArrowRight className="ml-4 h-7 w-7 group-hover:translate-x-3 transition-transform duration-300" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onCalculateReturns}
              className="group border-3 border-amber-400 text-amber-700 hover:bg-amber-50 px-10 py-7 text-xl font-bold shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-110 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50"
            >
              <Brain className="mr-4 h-7 w-7" />
              Try <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-pulse ml-2">AI</span> Fund Comparison
            </Button>
          </div>

          {/* Compliance Disclaimer */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-sm text-red-700 leading-relaxed shadow-lg">
            <p className="font-semibold mb-2">⚠️ Important Disclaimers:</p>
            <p>
              *Rewards are discretionary, not guaranteed, and may be changed or withdrawn at any time. 
              AI-generated research and analysis are for informational purposes only and do not constitute investment advice. 
              Please see our Terms & Conditions and Commission Disclosure for details. 
              Mutual fund investments are subject to market risk.
            </p>
          </div>
        </div>

        {/* Right Section - Hero Illustration */}
        <div className="relative">
          <div className="relative bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-3xl p-10 shadow-2xl border border-white/50">
            {/* AI Dashboard Mockup */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3 mr-4">
                  <Brain className="h-8 w-8 text-white animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-pulse">AI</span> Fund Analysis
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium">Risk Score</span>
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold border border-green-200">Low</div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-pulse">AI</span> Recommendation
                  </span>
                  <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold border border-blue-200">Strong Buy</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-5 rounded-2xl border border-blue-200">
                  <div className="text-sm text-gray-700 leading-relaxed">
                    <strong className="text-blue-600">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-pulse">AI</span> Insight:
                    </strong> This fund shows consistent performance with low volatility, perfect for your risk profile.
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-blue-600 mb-2">3000+</div>
                <div className="text-sm text-gray-600 font-medium">Funds Available</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-green-600 mb-2">₹500</div>
                <div className="text-sm text-gray-600 font-medium">Min SIP Amount</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
                <div className="text-sm text-gray-600 font-medium">Happy Investors</div>
              </div>
            </div>

            {/* Floating AI Elements */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-amber-400 to-orange-500 text-white p-4 rounded-full shadow-2xl animate-bounce">
              <Brain className="h-8 w-8" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-2xl animate-pulse">
              <TrendingUp className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
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
    </div>
  );
};

export default HeroContent;

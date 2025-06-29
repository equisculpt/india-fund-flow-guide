
import React from 'react';
import { Shield, TrendingUp } from 'lucide-react';

const HeroIllustration = () => {
  return (
    <div className="relative">
      <div className="relative bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/50">
        {/* SEBI Compliant Fund Analysis Mockup */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 mb-6 lg:mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3 mr-4">
              <Shield className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
              Fund Research & Analysis
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600 font-medium">Risk Assessment</span>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold border border-green-200">Low Risk</div>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600 font-medium">Performance Rating</span>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold border border-blue-200">4.2/5 Stars</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-5 rounded-2xl border border-blue-200">
              <div className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-blue-600">Research Insight:</strong> This fund shows consistent performance with low volatility. Past performance does not guarantee future results. Please read all scheme-related documents carefully.
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-3 gap-4 lg:gap-6 text-center">
          <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2">3000+</div>
            <div className="text-xs lg:text-sm text-gray-600 font-medium">Funds Available</div>
          </div>
          <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="text-2xl lg:text-3xl font-bold text-green-600 mb-2">₹500</div>
            <div className="text-xs lg:text-sm text-gray-600 font-medium">Min SIP Amount</div>
          </div>
          <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="text-2xl lg:text-3xl font-bold text-purple-600 mb-2">10K+</div>
            <div className="text-xs lg:text-sm text-gray-600 font-medium">Happy Investors</div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-6 -right-6 bg-gradient-to-r from-amber-400 to-orange-500 text-white p-4 rounded-full shadow-2xl animate-bounce">
          <Shield className="h-6 w-6 lg:h-8 lg:w-8" />
        </div>
        <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-2xl animate-pulse">
          <TrendingUp className="h-6 w-6 lg:h-8 lg:w-8" />
        </div>
      </div>
    </div>
  );
};

export default HeroIllustration;

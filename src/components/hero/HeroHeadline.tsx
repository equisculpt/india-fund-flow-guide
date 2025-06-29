
import React from 'react';
import { Brain } from 'lucide-react';

const HeroHeadline = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight text-center lg:text-left">
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
  );
};

export default HeroHeadline;

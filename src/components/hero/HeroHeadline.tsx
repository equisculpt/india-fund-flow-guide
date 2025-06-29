
import React from 'react';
import { Brain } from 'lucide-react';

const HeroHeadline = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
        Upgrade Your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
          Mutual Fund
        </span>{" "}
        Experience
      </h1>
      
      {/* AI Highlight Tagline */}
      <div className="relative">
        <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-200 rounded-3xl px-6 py-4 shadow-xl hover:shadow-amber-500/30 transition-all duration-500">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <Brain className="h-5 w-5 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">discover smarter investing with</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                AI-Powered
              </span>
              <span className="text-amber-800 ml-2">Fund Research & Insights</span>
              <span className="ml-2">✨</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroHeadline;


import React from 'react';
import { Brain } from 'lucide-react';

const HeroHeadline = () => {
  return (
    <div className="space-y-4 lg:space-y-6">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
        Upgrade Your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
          Mutual Fund
        </span>{" "}
        Experience
      </h1>
      
      {/* Research Highlight Tagline */}
      <div className="relative max-w-xl mx-auto lg:mx-0">
        <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-200 rounded-2xl lg:rounded-3xl px-4 lg:px-6 py-3 lg:py-4 shadow-lg hover:shadow-amber-500/30 transition-all duration-500">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-1 lg:mb-2">
              <Brain className="h-4 w-4 lg:h-5 lg:w-5 text-amber-600" />
              <span className="text-xs lg:text-sm font-medium text-amber-700">discover smarter investing with</span>
            </div>
            <div className="text-base lg:text-lg xl:text-xl font-extrabold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                Fund Research
              </span>
              <span className="text-amber-800 ml-2">& Performance Analysis</span>
              <span className="ml-2">✨</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroHeadline;

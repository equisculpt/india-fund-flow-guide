
import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

const HeroHeadline = () => {
  return (
    <div className="space-y-6 lg:space-y-8">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
        Upgrade Your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-pulse">
          Mutual Fund
        </span>{" "}
        Experience
      </h1>
      
      {/* Enhanced AI Research Highlight */}
      <div className="relative max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-300 rounded-3xl lg:rounded-[2rem] px-6 lg:px-8 py-4 lg:py-6 shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 transform hover:scale-105">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2 lg:mb-3">
              <div className="relative">
                <Brain className="h-6 w-6 lg:h-7 lg:w-7 text-blue-600 animate-pulse" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
              </div>
              <span className="text-sm lg:text-base font-bold text-blue-800 uppercase tracking-wide">
                Powered by Advanced AI
              </span>
              <Sparkles className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-500 animate-bounce" />
            </div>
            <div className="text-xl lg:text-2xl xl:text-3xl font-extrabold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                Smart Fund Research
              </span>
              <span className="text-indigo-800 ml-2">&</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 ml-2">
                Performance Analysis
              </span>
              <span className="ml-2 text-2xl">✨</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroHeadline;

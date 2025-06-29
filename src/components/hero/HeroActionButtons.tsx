
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Calculator, Brain } from 'lucide-react';

interface HeroActionButtonsProps {
  onStartInvesting: () => void;
  onCalculateReturns: () => void;
}

const HeroActionButtons = ({ onStartInvesting, onCalculateReturns }: HeroActionButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start max-w-6xl mx-auto lg:mx-0">
      {/* Primary CTA */}
      <Button 
        size="lg" 
        onClick={onStartInvesting}
        className="group relative bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 lg:px-10 py-6 lg:py-7 text-base lg:text-lg font-bold shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 rounded-2xl lg:rounded-3xl border-2 border-blue-500 overflow-hidden min-w-fit"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        <div className="flex items-center justify-center gap-2 lg:gap-3">
          <Play className="h-5 w-5 lg:h-6 lg:w-6 flex-shrink-0" />
          <span className="font-bold whitespace-nowrap">Start Investing With ₹500</span>
          <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
        </div>
      </Button>
      
      {/* Secondary CTA */}
      <Button 
        size="lg" 
        variant="outline" 
        onClick={onCalculateReturns}
        className="group border-3 border-green-400 text-green-700 hover:bg-green-50 hover:border-green-500 px-6 lg:px-8 py-6 lg:py-7 text-base lg:text-lg font-bold shadow-xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-105 rounded-2xl lg:rounded-3xl bg-gradient-to-r from-green-50 to-emerald-50 min-w-fit"
      >
        <div className="flex items-center justify-center gap-2 lg:gap-3">
          <Calculator className="h-5 w-5 lg:h-6 lg:w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
          <span className="font-bold whitespace-nowrap">Try SIP Calculator</span>
        </div>
      </Button>

      {/* Tertiary CTA - AI Fund Comparison */}
      <Button 
        size="lg" 
        variant="outline" 
        onClick={() => {
          const element = document.getElementById('ai-fund-comparison');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="group border-3 border-purple-400 text-purple-700 hover:bg-purple-50 hover:border-purple-500 px-4 lg:px-6 py-6 lg:py-7 text-sm lg:text-base font-bold shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 rounded-2xl lg:rounded-3xl bg-gradient-to-r from-purple-50 to-pink-50 min-w-fit"
      >
        <div className="flex items-center justify-center gap-2">
          <Brain className="h-4 w-4 lg:h-5 lg:w-5 group-hover:animate-pulse flex-shrink-0" />
          <span className="font-bold whitespace-nowrap">AI Fund Compare</span>
        </div>
      </Button>
    </div>
  );
};

export default HeroActionButtons;

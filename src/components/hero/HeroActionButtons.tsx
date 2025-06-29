
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Calculator, Brain } from 'lucide-react';

interface HeroActionButtonsProps {
  onStartInvesting: () => void;
  onCalculateReturns: () => void;
}

const HeroActionButtons = ({ onStartInvesting, onCalculateReturns }: HeroActionButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start max-w-2xl mx-auto lg:mx-0">
      {/* Primary CTA */}
      <Button 
        size="lg" 
        onClick={onStartInvesting}
        className="group relative bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 lg:px-10 py-6 lg:py-7 text-lg lg:text-xl font-bold shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 rounded-2xl lg:rounded-3xl border-2 border-blue-500 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        <Play className="mr-3 lg:mr-4 h-6 w-6 lg:h-7 lg:w-7" />
        Start Investing With ₹500
        <ArrowRight className="ml-3 lg:ml-4 h-6 w-6 lg:h-7 lg:w-7 group-hover:translate-x-1 transition-transform duration-300" />
      </Button>
      
      {/* Secondary CTA */}
      <Button 
        size="lg" 
        variant="outline" 
        onClick={onCalculateReturns}
        className="group border-3 border-green-400 text-green-700 hover:bg-green-50 hover:border-green-500 px-8 lg:px-10 py-6 lg:py-7 text-lg lg:text-xl font-bold shadow-xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-105 rounded-2xl lg:rounded-3xl bg-gradient-to-r from-green-50 to-emerald-50"
      >
        <Calculator className="mr-3 lg:mr-4 h-6 w-6 lg:h-7 lg:w-7 group-hover:rotate-12 transition-transform duration-300" />
        Try SIP Calculator
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
        className="group border-3 border-purple-400 text-purple-700 hover:bg-purple-50 hover:border-purple-500 px-6 lg:px-8 py-6 lg:py-7 text-base lg:text-lg font-bold shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 rounded-2xl lg:rounded-3xl bg-gradient-to-r from-purple-50 to-pink-50"
      >
        <Brain className="mr-2 lg:mr-3 h-5 w-5 lg:h-6 lg:w-6 group-hover:animate-pulse" />
        AI Fund Compare
      </Button>
    </div>
  );
};

export default HeroActionButtons;

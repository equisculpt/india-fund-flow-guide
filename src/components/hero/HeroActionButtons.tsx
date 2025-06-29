
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Brain } from 'lucide-react';

interface HeroActionButtonsProps {
  onStartInvesting: () => void;
  onCalculateReturns: () => void;
}

const HeroActionButtons = ({ onStartInvesting, onCalculateReturns }: HeroActionButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
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
  );
};

export default HeroActionButtons;

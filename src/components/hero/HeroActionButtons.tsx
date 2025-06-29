
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Calculator } from 'lucide-react';

interface HeroActionButtonsProps {
  onStartInvesting: () => void;
  onCalculateReturns: () => void;
}

const HeroActionButtons = ({ onStartInvesting, onCalculateReturns }: HeroActionButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start max-w-xl mx-auto lg:mx-0">
      <Button 
        size="lg" 
        onClick={onStartInvesting}
        className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 lg:px-8 py-5 lg:py-6 text-base lg:text-lg font-bold shadow-2xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-105 rounded-xl lg:rounded-2xl border-2 border-green-500"
      >
        <Play className="mr-2 lg:mr-3 h-5 w-5 lg:h-6 lg:w-6" />
        Start Investing With ₹500
        <ArrowRight className="ml-2 lg:ml-3 h-5 w-5 lg:h-6 lg:w-6 group-hover:translate-x-1 transition-transform duration-300" />
      </Button>
      
      <Button 
        size="lg" 
        variant="outline" 
        onClick={onCalculateReturns}
        className="group border-3 border-amber-400 text-amber-700 hover:bg-amber-50 px-6 lg:px-8 py-5 lg:py-6 text-base lg:text-lg font-bold shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 rounded-xl lg:rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50"
      >
        <Calculator className="mr-2 lg:mr-3 h-5 w-5 lg:h-6 lg:w-6" />
        Try SIP Calculator
      </Button>
    </div>
  );
};

export default HeroActionButtons;

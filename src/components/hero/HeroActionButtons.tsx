
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Calculator } from 'lucide-react';

interface HeroActionButtonsProps {
  onStartInvesting: () => void;
  onCalculateReturns: () => void;
}

const HeroActionButtons = ({ onStartInvesting, onCalculateReturns }: HeroActionButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start max-w-2xl mx-auto lg:mx-0">
      <Button 
        size="lg" 
        onClick={onStartInvesting}
        className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 sm:px-10 py-6 sm:py-7 text-lg sm:text-xl font-bold shadow-2xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-105 rounded-2xl border-2 border-green-500"
      >
        <Zap className="mr-3 sm:mr-4 h-6 w-6 sm:h-7 sm:w-7" />
        Start Investing With ₹500
        <ArrowRight className="ml-3 sm:ml-4 h-6 w-6 sm:h-7 sm:w-7 group-hover:translate-x-1 sm:group-hover:translate-x-3 transition-transform duration-300" />
      </Button>
      
      <Button 
        size="lg" 
        variant="outline" 
        onClick={onCalculateReturns}
        className="group border-3 border-amber-400 text-amber-700 hover:bg-amber-50 px-8 sm:px-10 py-6 sm:py-7 text-lg sm:text-xl font-bold shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50"
      >
        <Calculator className="mr-3 sm:mr-4 h-6 w-6 sm:h-7 sm:w-7" />
        Try SIP Calculator
      </Button>
    </div>
  );
};

export default HeroActionButtons;

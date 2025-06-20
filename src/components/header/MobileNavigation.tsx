
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User } from '@supabase/supabase-js';
import TranslatedText from '../TranslatedText';

interface MobileNavigationProps {
  isMenuOpen: boolean;
  user: User | null;
  handleNavigation: (path: string) => void;
  handleFundComparisonClick: () => void;
  handleBrowseFundsClick: () => void;
}

const MobileNavigation = ({ 
  isMenuOpen, 
  user, 
  handleNavigation, 
  handleFundComparisonClick, 
  handleBrowseFundsClick 
}: MobileNavigationProps) => {
  if (!isMenuOpen) return null;

  return (
    <div className="lg:hidden bg-white border-t">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <Button 
          variant="ghost" 
          onClick={handleBrowseFundsClick}
          className="w-full justify-start text-gray-700 hover:text-blue-600"
        >
          <TranslatedText text="Browse Funds" />
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={handleFundComparisonClick}
          className="w-full justify-start text-gray-700 hover:text-blue-600"
        >
          <TranslatedText text="Compare Funds" />
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={() => handleNavigation('/sip-calculator')}
          className="w-full justify-start text-gray-700 hover:text-blue-600"
        >
          <TranslatedText text="SIP Calculator" />
        </Button>
        
        {user && (
          <>
            <Button 
              variant="ghost" 
              onClick={() => handleNavigation('/dashboard')}
              className="w-full justify-start text-gray-700 hover:text-blue-600"
            >
              <TranslatedText text="Dashboard" />
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={() => handleNavigation('/ai-portfolio')}
              className="w-full justify-start text-gray-700 hover:text-blue-600"
            >
              <TranslatedText text="AI Portfolio" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileNavigation;

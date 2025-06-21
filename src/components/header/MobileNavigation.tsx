
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User } from '@supabase/supabase-js';

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
          Browse Funds
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={handleFundComparisonClick}
          className="w-full justify-start text-gray-700 hover:text-blue-600"
        >
          Compare Funds
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={() => handleNavigation('/sip-calculator')}
          className="w-full justify-start text-gray-700 hover:text-blue-600"
        >
          SIP Calculator
        </Button>

        <Button 
          variant="ghost" 
          onClick={() => handleNavigation('/chat')}
          className="w-full justify-start text-gray-700 hover:text-blue-600"
        >
          Ask AI Assistant
        </Button>

        <Button 
          variant="ghost" 
          onClick={() => handleNavigation('/community')}
          className="w-full justify-start text-gray-700 hover:text-blue-600"
        >
          Community
        </Button>
        
        {user && (
          <>
            <Button 
              variant="ghost" 
              onClick={() => handleNavigation('/dashboard')}
              className="w-full justify-start text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={() => handleNavigation('/ai-portfolio')}
              className="w-full justify-start text-gray-700 hover:text-blue-600"
            >
              AI Portfolio
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileNavigation;

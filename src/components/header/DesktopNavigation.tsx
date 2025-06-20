
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User } from '@supabase/supabase-js';

interface DesktopNavigationProps {
  user: User | null;
  handleFundComparisonClick: () => void;
  handleBrowseFundsClick: () => void;
}

const DesktopNavigation = ({ user, handleFundComparisonClick, handleBrowseFundsClick }: DesktopNavigationProps) => {
  return (
    <nav className="hidden lg:flex items-center space-x-6">
      <Button 
        variant="ghost" 
        onClick={handleBrowseFundsClick}
        className="text-gray-700 hover:text-blue-600"
      >
        Browse Funds
      </Button>
      
      <Button 
        variant="ghost" 
        onClick={handleFundComparisonClick}
        className="text-gray-700 hover:text-blue-600"
      >
        Compare Funds
      </Button>
      
      <Link to="/sip-calculator">
        <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
          SIP Calculator
        </Button>
      </Link>
      
      {user && (
        <>
          <Link to="/dashboard">
            <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Button>
          </Link>
          
          <Link to="/ai-portfolio">
            <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
              AI Portfolio
            </Button>
          </Link>
        </>
      )}
    </nav>
  );
};

export default DesktopNavigation;

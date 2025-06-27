
import React from 'react';
import { Link } from 'react-router-dom';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface MobileNavigationProps {
  isMenuOpen: boolean;
  user: SupabaseUser | null;
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
    <div className="lg:hidden border-t border-gray-200 py-4">
      <nav className="flex flex-col space-y-4 px-4">
        <button
          onClick={handleBrowseFundsClick}
          className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
        >
          Browse Funds
        </button>
        <button
          onClick={handleFundComparisonClick}
          className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
        >
          Compare Funds
        </button>
        <Link
          to="/sip-calculator"
          onClick={() => handleNavigation('/sip-calculator')}
          className="text-gray-700 hover:text-blue-600 transition-colors py-2"
        >
          SIP Calculator
        </Link>
        {user && (
          <Link
            to="/dashboard"
            onClick={() => handleNavigation('/dashboard')}
            className="text-gray-700 hover:text-blue-600 transition-colors py-2"
          >
            Dashboard
          </Link>
        )}
      </nav>
    </div>
  );
};

export default MobileNavigation;

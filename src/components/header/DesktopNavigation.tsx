
import React from 'react';
import { Link } from 'react-router-dom';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface DesktopNavigationProps {
  user: SupabaseUser | null;
  handleFundComparisonClick: () => void;
  handleBrowseFundsClick: () => void;
}

const DesktopNavigation = ({ user, handleFundComparisonClick, handleBrowseFundsClick }: DesktopNavigationProps) => {
  return (
    <nav className="hidden lg:flex items-center space-x-6">
      <button
        onClick={handleBrowseFundsClick}
        className="text-blue-800 hover:text-blue-600 font-semibold transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg hover:bg-blue-50/50"
      >
        Browse Funds
      </button>
      <button
        onClick={handleFundComparisonClick}
        className="text-blue-800 hover:text-blue-600 font-semibold transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg hover:bg-blue-50/50"
      >
        Compare Funds
      </button>
      <Link
        to="/sip-calculator"
        className="text-blue-800 hover:text-blue-600 font-semibold transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg hover:bg-blue-50/50"
      >
        SIP Calculator
      </Link>
      {user && (
        <>
          <Link
            to="/dashboard"
            className="text-blue-800 hover:text-blue-600 font-semibold transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg hover:bg-blue-50/50"
          >
            Dashboard
          </Link>
          <Link
            to="/referral"
            className="text-blue-800 hover:text-blue-600 font-semibold transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg hover:bg-blue-50/50"
          >
            Referral
          </Link>
        </>
      )}
    </nav>
  );
};

export default DesktopNavigation;

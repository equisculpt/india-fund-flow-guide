
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
    <nav className="hidden lg:flex items-center space-x-8">
      <button
        onClick={handleBrowseFundsClick}
        className="text-foreground hover:text-secondary font-semibold font-heading transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/5 relative group"
      >
        Browse Funds
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-secondary group-hover:w-full transition-all duration-300"></div>
      </button>
      <button
        onClick={handleFundComparisonClick}
        className="text-foreground hover:text-secondary font-semibold font-heading transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/5 relative group"
      >
        Compare Funds
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-secondary group-hover:w-full transition-all duration-300"></div>
      </button>
      <Link
        to="/sip-calculator"
        className="text-foreground hover:text-secondary font-semibold font-heading transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/5 relative group"
      >
        SIP Calculator
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-secondary group-hover:w-full transition-all duration-300"></div>
      </Link>
      {user && (
        <>
          <Link
            to="/dashboard"
            className="text-foreground hover:text-secondary font-semibold font-heading transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/5 relative group"
          >
            Dashboard
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-secondary group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link
            to="/referral"
            className="text-foreground hover:text-secondary font-semibold font-heading transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/5 relative group"
          >
            Referral
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-secondary group-hover:w-full transition-all duration-300"></div>
          </Link>
        </>
      )}
    </nav>
  );
};

export default DesktopNavigation;

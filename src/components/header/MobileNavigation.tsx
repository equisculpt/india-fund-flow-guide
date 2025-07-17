
import React from 'react';
import { Link } from 'react-router-dom';
interface User {
  id: string;
  name: string;
  email: string;
  kycStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  riskProfile: string;
}

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
  return (
    <nav className="flex flex-col space-y-4 px-4">
      <button
        onClick={handleBrowseFundsClick}
        className="text-left text-white hover:text-yellow-300 font-semibold font-heading transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/10 relative group"
      >
        Browse Funds
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-500 group-hover:w-full transition-all duration-300"></div>
      </button>
      <button
        onClick={handleFundComparisonClick}
        className="text-left text-white hover:text-yellow-300 font-semibold font-heading transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/10 relative group"
      >
        Compare Funds
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-500 group-hover:w-full transition-all duration-300"></div>
      </button>
      <Link
        to="/sip-calculator"
        onClick={() => handleNavigation('/sip-calculator')}
        className="text-white hover:text-yellow-300 font-semibold font-heading transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/10 relative group"
      >
        SIP Calculator
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-500 group-hover:w-full transition-all duration-300"></div>
      </Link>
      {user && (
        <>
          <Link
            to="/dashboard"
            onClick={() => handleNavigation('/dashboard')}
            className="text-gray-700 hover:text-blue-600 transition-colors py-2"
          >
            Dashboard
          </Link>
          <Link
            to="/referral"
            onClick={() => handleNavigation('/referral')}
            className="text-gray-700 hover:text-blue-600 transition-colors py-2"
          >
            Referral
          </Link>
        </>
      )}
    </nav>
  );
};

export default MobileNavigation;

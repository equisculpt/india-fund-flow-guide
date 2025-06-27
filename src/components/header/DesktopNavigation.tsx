
import React from 'react';
import { Link } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
  type: 'customer' | 'agent' | 'admin';
  avatar?: string;
}

interface DesktopNavigationProps {
  user: User | null;
  handleFundComparisonClick: () => void;
  handleBrowseFundsClick: () => void;
}

const DesktopNavigation = ({ user, handleFundComparisonClick, handleBrowseFundsClick }: DesktopNavigationProps) => {
  return (
    <nav className="hidden lg:flex items-center space-x-6">
      <button
        onClick={handleBrowseFundsClick}
        className="text-gray-700 hover:text-blue-600 transition-colors"
      >
        Browse Funds
      </button>
      <button
        onClick={handleFundComparisonClick}
        className="text-gray-700 hover:text-blue-600 transition-colors"
      >
        Compare Funds
      </button>
      <Link
        to="/sip-calculator"
        className="text-gray-700 hover:text-blue-600 transition-colors"
      >
        SIP Calculator
      </Link>
      {user && (
        <Link
          to="/dashboard"
          className="text-gray-700 hover:text-blue-600 transition-colors"
        >
          Dashboard
        </Link>
      )}
    </nav>
  );
};

export default DesktopNavigation;

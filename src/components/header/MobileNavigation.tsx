
import React from 'react';

interface MobileNavigationProps {
  isMenuOpen: boolean;
  user: any;
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
    <div className="lg:hidden py-4 border-t bg-white">
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => handleNavigation('/')}
          className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
        >
          Home
        </button>
        <button
          onClick={handleFundComparisonClick}
          className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
        >
          Compare Funds
        </button>
        <button
          onClick={handleBrowseFundsClick}
          className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
        >
          Browse Funds
        </button>
        <button
          onClick={() => handleNavigation('/community')}
          className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
        >
          Community
        </button>
        {user && (
          <>
            <button
              onClick={() => handleNavigation('/advanced-features')}
              className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
            >
              AI Features
            </button>
            <button
              onClick={() => handleNavigation('/dashboard')}
              className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavigation('/user-dashboard')}
              className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
            >
              Analytics
            </button>
            <button
              onClick={() => handleNavigation('/ai-portfolio')}
              className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
            >
              AI Portfolio
            </button>
            <button
              onClick={() => handleNavigation('/secure-admin')}
              className="text-gray-500 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
            >
              Admin Portal
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileNavigation;

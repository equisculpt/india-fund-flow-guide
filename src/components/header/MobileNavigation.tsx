
import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="lg:hidden border-t border-gray-200">
      <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
        <button
          onClick={handleBrowseFundsClick}
          className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md min-h-[48px] touch-manipulation"
        >
          Browse Funds
        </button>
        
        <button
          onClick={handleFundComparisonClick}
          className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md min-h-[48px] touch-manipulation"
        >
          Fund Comparison
        </button>
        
        <button
          onClick={() => handleNavigation('/sip-calculator')}
          className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md min-h-[48px] touch-manipulation"
        >
          SIP Calculator
        </button>
        
        <button
          onClick={() => handleNavigation('/community')}
          className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md min-h-[48px] touch-manipulation"
        >
          Community
        </button>

        {user && (
          <>
            <button
              onClick={() => handleNavigation('/dashboard')}
              className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md min-h-[48px] touch-manipulation"
            >
              <User className="inline-block w-4 h-4 mr-2" />
              Dashboard
            </button>
            
            {user.email === 'admin@sipbrewery.com' && (
              <button
                onClick={() => handleNavigation('/admin')}
                className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md min-h-[48px] touch-manipulation"
              >
                Admin Portal
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MobileNavigation;

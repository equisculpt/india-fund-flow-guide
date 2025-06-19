
import React from 'react';
import { BarChart3, Brain, MessageSquare, Shield } from 'lucide-react';
import NavLink from './NavLink';

interface DesktopNavigationProps {
  user: any;
  handleFundComparisonClick: () => void;
  handleBrowseFundsClick: () => void;
}

const DesktopNavigation = ({ user, handleFundComparisonClick, handleBrowseFundsClick }: DesktopNavigationProps) => {
  return (
    <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
      <NavLink to="/">Home</NavLink>
      <NavLink onClick={handleFundComparisonClick}>
        Compare
      </NavLink>
      <NavLink onClick={handleBrowseFundsClick}>
        Browse
      </NavLink>
      <NavLink to="/community">
        <div className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          <span className="hidden xl:inline">Community</span>
        </div>
      </NavLink>
      {user && (
        <NavLink to="/advanced-features">
          <div className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            <span className="hidden xl:inline">AI</span>
          </div>
        </NavLink>
      )}
      {user && (
        <>
          <NavLink to="/dashboard">
            <div className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden xl:inline">Dashboard</span>
            </div>
          </NavLink>
          <NavLink to="/user-dashboard">Analytics</NavLink>
          <NavLink to="/ai-portfolio">Portfolio</NavLink>
        </>
      )}
      
      {/* Secure Admin Access - Hidden from normal navigation */}
      {user && (
        <NavLink to="/secure-admin">
          <div className="flex items-center gap-1 opacity-50 hover:opacity-100">
            <Shield className="h-4 w-4" />
            <span className="hidden xl:inline text-xs">Admin</span>
          </div>
        </NavLink>
      )}
    </nav>
  );
};

export default DesktopNavigation;

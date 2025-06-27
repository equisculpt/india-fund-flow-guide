
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEnhancedAuth } from '@/contexts/EnhancedAuthContext';
import { Menu, X } from 'lucide-react';
import BreweryLogo from './BreweryLogo';
import DesktopNavigation from './header/DesktopNavigation';
import MobileNavigation from './header/MobileNavigation';
import FirebaseUserMenu from './header/FirebaseUserMenu';
import EnhancedFundSearch from './EnhancedFundSearch';

const Header = () => {
  const { user, logout } = useEnhancedAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleFundComparisonClick = () => {
    console.log('Header: Fund comparison clicked, current path:', location.pathname);
    navigate('/fund-comparison');
    setIsMenuOpen(false);
  };

  const handleBrowseFundsClick = () => {
    console.log('Header: Browse funds clicked, current path:', location.pathname);
    navigate('/public-funds');
    setIsMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0" onClick={() => window.scrollTo(0, 0)}>
              <BreweryLogo showText={true} />
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-md mx-6">
              <EnhancedFundSearch placeholder="Search mutual funds..." />
            </div>

            {/* Desktop Navigation */}
            <DesktopNavigation 
              user={user}
              handleFundComparisonClick={handleFundComparisonClick}
              handleBrowseFundsClick={handleBrowseFundsClick}
            />

            {/* User Menu */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <FirebaseUserMenu 
                user={user}
                logout={logout}
                setShowLoginModal={setShowLoginModal}
                setIsMenuOpen={setIsMenuOpen}
              />

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden px-2 pb-2">
            <EnhancedFundSearch placeholder="Search mutual funds..." />
          </div>

          {/* Mobile Navigation */}
          <MobileNavigation 
            isMenuOpen={isMenuOpen}
            user={user}
            handleNavigation={handleNavigation}
            handleFundComparisonClick={handleFundComparisonClick}
            handleBrowseFundsClick={handleBrowseFundsClick}
          />
        </div>
      </header>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Login Required</h2>
            <p className="mb-4">Please log in to access this feature.</p>
            <button
              onClick={() => setShowLoginModal(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

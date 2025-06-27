
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X } from 'lucide-react';
import BreweryLogo from './BreweryLogo';
import SimpleLoginModal from './SimpleLoginModal';
import DesktopNavigation from './header/DesktopNavigation';
import MobileNavigation from './header/MobileNavigation';
import UserMenu from './header/UserMenu';
import EnhancedFundSearch from './EnhancedFundSearch';

const Header = () => {
  const { user, signOut } = useAuth();
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
              <UserMenu 
                user={user}
                signOut={signOut}
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

      <SimpleLoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default Header;

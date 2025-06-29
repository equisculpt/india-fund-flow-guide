
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Menu, X } from 'lucide-react';
import BreweryLogo from './BreweryLogo';
import DesktopNavigation from './header/DesktopNavigation';
import MobileNavigation from './header/MobileNavigation';
import SupabaseUserMenu from './header/SupabaseUserMenu';
import EnhancedFundSearch from './EnhancedFundSearch';
import SupabaseLoginModal from './auth/SupabaseLoginModal';

const Header = () => {
  const { user, signOut } = useSupabaseAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <BreweryLogo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <DesktopNavigation 
                user={user}
                handleFundComparisonClick={handleFundComparisonClick}
                handleBrowseFundsClick={handleBrowseFundsClick}
              />

              {/* Test Login Link */}
              <Link 
                to="/test-login" 
                className="text-orange-600 hover:text-orange-700 font-medium bg-orange-50 px-3 py-1 rounded-full border border-orange-200 hover:bg-orange-100 transition-colors"
              >
                Test Login
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* User Menu */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <SupabaseUserMenu 
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

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              <Link 
                to="/test-login"
                className="text-orange-600 hover:text-orange-700 font-medium bg-orange-50 px-2 py-1 rounded text-sm border border-orange-200"
              >
                Test
              </Link>
              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden px-2 pb-2">
            <EnhancedFundSearch placeholder="Search mutual funds..." />
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                {/* Mobile Navigation */}
                <MobileNavigation 
                  isMenuOpen={isMenuOpen}
                  user={user}
                  handleNavigation={handleNavigation}
                  handleFundComparisonClick={handleFundComparisonClick}
                  handleBrowseFundsClick={handleBrowseFundsClick}
                />

                {/* Test Login Link */}
                <Link 
                  to="/test-login" 
                  className="text-orange-600 hover:text-orange-700 block px-3 py-2 text-base font-medium bg-orange-50 rounded-md border border-orange-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Test Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <SupabaseLoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default Header;


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
    setIsMobileMenuOpen(false);
  };

  const handleBrowseFundsClick = () => {
    console.log('Header: Browse funds clicked, current path:', location.pathname);
    navigate('/public-funds');
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-glass backdrop-blur-xl border-b border-primary/20 shadow-luxury">
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/98 to-background/95"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                className="text-accent hover:text-accent/80 font-semibold bg-gradient-glass backdrop-blur-md px-4 py-2 rounded-xl border border-accent/30 hover:border-accent/50 transition-all duration-300 hover:scale-105 shadow-glass"
              >
                Test Login
              </Link>
            </nav>

            {/* Desktop Search */}
            <div className="hidden lg:flex items-center flex-1 max-w-lg mx-8">
              <EnhancedFundSearch placeholder="Search mutual funds..." />
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <SupabaseUserMenu 
                user={user}
                signOut={signOut}
                setShowLoginModal={setShowLoginModal}
                setIsMenuOpen={setIsMenuOpen}
              />
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              <Link 
                to="/test-login"
                className="text-orange-600 hover:text-orange-700 font-medium bg-orange-50 px-2 py-1 rounded text-sm border border-orange-200"
              >
                Test
              </Link>
              <button
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
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
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-glass backdrop-blur-xl border-t border-primary/20">
                <MobileNavigation 
                  isMenuOpen={isMobileMenuOpen}
                  user={user}
                  handleNavigation={handleNavigation}
                  handleFundComparisonClick={handleFundComparisonClick}
                  handleBrowseFundsClick={handleBrowseFundsClick}
                />

                {/* Mobile User Menu */}
                <div className="pt-4 border-t border-primary/20">
                  <SupabaseUserMenu 
                    user={user}
                    signOut={signOut}
                    setShowLoginModal={setShowLoginModal}
                    setIsMenuOpen={setIsMobileMenuOpen}
                  />
                </div>
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

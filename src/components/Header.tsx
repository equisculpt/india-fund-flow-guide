
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
      <header className="fixed top-0 left-0 right-0 z-50" style={{
        background: 'linear-gradient(90deg, #0B132B 0%, #2E0F5C 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        height: '76px'
      }}>
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
          <div className="flex items-center h-full">
            {/* Logo - Fixed to left side */}
            <div className="flex-shrink-0 mr-auto">
              <Link to="/" className="flex items-center group">
                <img 
                  src="/lovable-uploads/29ef2888-33a0-4d86-bd99-68a1b0d8fa38.png" 
                  alt="SIP Brewery - Brewing Wealth" 
                  className="transition-all duration-300 group-hover:scale-105"
                  style={{
                    width: '400px',
                    height: '100px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 4px 20px rgba(245, 158, 11, 0.3))'
                  }}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 flex-1 justify-end">
              {/* Search Bar */}
              <div className="relative max-w-md w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" style={{ color: '#00F5D4' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search mutual funds..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border-0 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300"
                    style={{
                      background: '#050B14',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                  />
                </div>
              </div>

              {/* Navigation Menu Items */}
              <nav className="flex items-center space-x-6">
                <DesktopNavigation 
                  user={user}
                  handleFundComparisonClick={handleFundComparisonClick}
                  handleBrowseFundsClick={handleBrowseFundsClick}
                />
              </nav>

              {/* Test Button */}
              <button
                onClick={() => handleNavigation('/test-login')}
                className="group relative px-6 py-2.5 rounded-full border transition-all duration-300 ease-in-out hover:scale-105"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #FFD700 0%, #E6B800 100%)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 215, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.color = '#1a1a1a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                Test
              </button>

              {/* User Menu */}
              <SupabaseUserMenu 
                user={user}
                signOut={signOut}
                setShowLoginModal={setShowLoginModal}
                setIsMenuOpen={setIsMenuOpen}
              />
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-3">
              <button
                onClick={() => handleNavigation('/test-login')}
                className="px-4 py-2 rounded-lg border text-white font-medium text-sm transition-all duration-300"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                Test
              </button>
              <button
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:text-cyan-400 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden">
              <div className="absolute top-full left-0 right-0 backdrop-blur-xl border-t border-white/10" style={{
                background: 'linear-gradient(135deg, rgba(11, 19, 43, 0.95) 0%, rgba(46, 15, 92, 0.95) 100%)'
              }}>
                <div className="px-4 py-4 space-y-4">
                  {/* Mobile Search */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4" style={{ color: '#00F5D4' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search mutual funds..."
                      className="w-full pl-9 pr-4 py-2 rounded-lg border-0 text-white placeholder-gray-400 text-sm"
                      style={{
                        background: '#050B14',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                      }}
                    />
                  </div>

                  <MobileNavigation 
                    isMenuOpen={isMobileMenuOpen}
                    user={user}
                    handleNavigation={handleNavigation}
                    handleFundComparisonClick={handleFundComparisonClick}
                    handleBrowseFundsClick={handleBrowseFundsClick}
                  />

                  {/* Mobile User Menu */}
                  <div className="pt-4 border-t border-white/10">
                    <SupabaseUserMenu 
                      user={user}
                      signOut={signOut}
                      setShowLoginModal={setShowLoginModal}
                      setIsMenuOpen={setIsMobileMenuOpen}
                    />
                  </div>
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


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
          <div className="flex items-center justify-between h-full">
            {/* Logo Section - EXACT Reference Match */}
            <Link to="/" className="flex items-center">
              {/* Sophisticated Glassmorphic Container - Reference Perfect */}
              <div className="relative rounded-3xl px-8 py-4 flex items-center space-x-4" style={{
                background: 'linear-gradient(135deg, rgba(11, 19, 43, 0.4) 0%, rgba(46, 15, 92, 0.3) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid transparent',
                backgroundImage: `
                  linear-gradient(135deg, rgba(11, 19, 43, 0.4), rgba(46, 15, 92, 0.3)),
                  linear-gradient(135deg, #FFD700 0%, #FF8F00 20%, #FFD700 40%, #FFA000 60%, #FFD700 80%, #FF8F00 100%)
                `,
                backgroundOrigin: 'border-box',
                backgroundClip: 'content-box, border-box',
                boxShadow: `
                  0 8px 32px rgba(0, 0, 0, 0.4), 
                  0 0 80px rgba(255, 215, 0, 0.15), 
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `
              }}>
                {/* Premium Mug Icon Container */}
                <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FF8F00 100%)',
                  boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  {/* Premium Beer Mug Icon */}
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))' }}
                  >
                    <path
                      d="M5 7h10v9c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V7z"
                      fill="#1a1a1a"
                      stroke="#000"
                      strokeWidth="1"
                    />
                    <path
                      d="M15 9v4c1 0 2-.5 2-1.5v-1c0-1-.5-1.5-2-1.5z"
                      fill="#1a1a1a"
                      stroke="#000"
                      strokeWidth="1"
                    />
                    <rect x="6" y="8" width="8" height="6" fill="#8B4513" />
                    <ellipse cx="10" cy="8" rx="4" ry="1" fill="#F5DEB3" opacity="0.9" />
                  </svg>
                </div>
                
                {/* Refined Logo Text */}
                <div className="flex flex-col">
                  <div className="text-xl font-bold leading-tight" style={{
                    background: 'linear-gradient(90deg, #FFD700 0%, #FFA000 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: 'Poppins, sans-serif',
                    filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5))'
                  }}>
                    SIP Brewery
                  </div>
                  <div className="text-sm italic font-serif leading-tight" style={{
                    color: '#FFD700',
                    opacity: 0.85,
                    fontFamily: 'serif',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.7)'
                  }}>
                    Brewing Wealth
                  </div>
                </div>
              </div>
            </Link>

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

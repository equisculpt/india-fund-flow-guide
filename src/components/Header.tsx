
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
            {/* Logo Section - Matching Reference Image */}
            <Link to="/" className="flex items-center">
              {/* Glassmorphic Container with Gradient Border - Like Reference Image */}
              <div className="relative rounded-3xl p-4 flex items-center space-x-4" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05)), linear-gradient(135deg, #FFD700 0%, #FF8F00 25%, #FFD700 50%, #FFA000 75%, #FFD700 100%)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'content-box, border-box',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 60px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}>
                {/* Premium Beer Mug Icon */}
                <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 50%, #FF8F00 100%)',
                  boxShadow: '0 8px 24px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 160, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
                  border: '2px solid rgba(255, 255, 255, 0.3)'
                }}>
                  {/* Heavy gradient overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent"></div>
                  
                  {/* Premium Beer Mug SVG - Better Design */}
                  <svg 
                    width="28" 
                    height="28" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="relative z-10"
                    style={{
                      filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4))'
                    }}
                  >
                    {/* Mug body - main container */}
                    <path
                      d="M5 5h10c1.5 0 2.5 1 2.5 2.5v9c0 1.5-1 2.5-2.5 2.5H5c-1.5 0-2.5-1-2.5-2.5v-9C2.5 6 3.5 5 5 5z"
                      fill="#1A1A1A"
                      stroke="#000"
                      strokeWidth="1.2"
                    />
                    {/* Mug handle - more prominent */}
                    <path
                      d="M17.5 9v6c1.5 0 2.5-1 2.5-2.5v-1c0-1.5-1-2.5-2.5-2.5z"
                      fill="#1A1A1A"
                      stroke="#000"
                      strokeWidth="1.2"
                    />
                    {/* Beer liquid */}
                    <path
                      d="M3.5 7h11v7.5c0 1-0.8 1.5-1.8 1.5H5.3c-1 0-1.8-0.5-1.8-1.5V7z"
                      fill="#B8860B"
                    />
                    {/* Beer foam - more realistic */}
                    <ellipse
                      cx="9"
                      cy="7"
                      rx="5.5"
                      ry="2"
                      fill="#F5F5DC"
                      opacity="0.95"
                    />
                    {/* Additional foam layer */}
                    <ellipse
                      cx="9"
                      cy="6.5"
                      rx="4"
                      ry="1.2"
                      fill="#FFFFFF"
                      opacity="0.8"
                    />
                    {/* Bubbles in beer */}
                    <circle cx="7" cy="11" r="1" fill="#DAA520" opacity="0.8" />
                    <circle cx="11" cy="9" r="0.8" fill="#DAA520" opacity="0.8" />
                    <circle cx="8.5" cy="13" r="0.6" fill="#DAA520" opacity="0.8" />
                    <circle cx="10.5" cy="12" r="0.7" fill="#DAA520" opacity="0.8" />
                  </svg>
                  
                  {/* Heavy glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-200/40 to-orange-300/40 animate-pulse"></div>
                </div>
                
                {/* Logo Text */}
                <div className="flex flex-col">
                  <div className="text-xl font-black" style={{
                    background: 'linear-gradient(90deg, #FFD700 0%, #FFA000 25%, #FFD700 50%, #FF8F00 75%, #FFD700 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: 'Poppins, sans-serif',
                    textShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.5)',
                    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))'
                  }}>
                    SIP Brewery
                  </div>
                  <div className="text-xs italic font-serif -mt-0.5" style={{
                    color: '#FFD700',
                    fontFamily: 'serif',
                    textShadow: '0 0 10px rgba(255, 215, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.8)',
                    filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.4))'
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

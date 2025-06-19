
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSupabaseAuthContext } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Menu, X, Settings, BarChart3, Brain, MessageSquare, Shield } from 'lucide-react';
import BreweryLogo from './BreweryLogo';
import EnhancedLoginModal from './EnhancedLoginModal';

const Header = () => {
  const { user, signOut } = useSupabaseAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleFundComparisonClick = () => {
    if (location.pathname === '/') {
      const element = document.getElementById('fund-comparison');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#fund-comparison');
    }
    setIsMenuOpen(false);
  };

  const handleBrowseFundsClick = () => {
    if (location.pathname === '/') {
      const element = document.getElementById('explore-funds');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#explore-funds');
    }
    setIsMenuOpen(false);
  };

  const NavLink = ({ to, children, onClick }: { to?: string; children: React.ReactNode; onClick?: () => void }) => (
    <Link
      to={to || '#'}
      onClick={onClick}
      className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
    >
      {children}
    </Link>
  );

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <BreweryLogo showText={true} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              <NavLink to="/">Home</NavLink>
              <button
                onClick={handleFundComparisonClick}
                className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
              >
                Compare
              </button>
              <button
                onClick={handleBrowseFundsClick}
                className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
              >
                Browse
              </button>
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

            {/* User Menu */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/user-dashboard')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Analytics
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/advanced-features')}>
                      <Brain className="mr-2 h-4 w-4" />
                      AI Features
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/community')}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Community
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/secure-admin')} className="text-gray-500">
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Portal
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => setShowLoginModal(true)} size="sm" className="text-xs sm:text-sm">
                  Sign In
                </Button>
              )}

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

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t bg-white">
              <div className="flex flex-col space-y-2">
                <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                <button
                  onClick={handleFundComparisonClick}
                  className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left"
                >
                  Compare Funds
                </button>
                <button
                  onClick={handleBrowseFundsClick}
                  className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left"
                >
                  Browse Funds
                </button>
                <NavLink to="/community" onClick={() => setIsMenuOpen(false)}>Community</NavLink>
                {user && (
                  <NavLink to="/advanced-features" onClick={() => setIsMenuOpen(false)}>AI Features</NavLink>
                )}
                {user && (
                  <>
                    <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>
                    <NavLink to="/user-dashboard" onClick={() => setIsMenuOpen(false)}>Analytics</NavLink>
                    <NavLink to="/ai-portfolio" onClick={() => setIsMenuOpen(false)}>AI Portfolio</NavLink>
                    <Link 
                      to="/secure-admin" 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-500 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Admin Portal
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <EnhancedLoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default Header;

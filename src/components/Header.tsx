
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
    try {
      await signOut();
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
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

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const NavLink = ({ to, children, onClick }: { 
    to?: string; 
    children: React.ReactNode; 
    onClick?: () => void;
  }) => {
    if (onClick) {
      return (
        <button
          onClick={onClick}
          className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer"
        >
          {children}
        </button>
      );
    }

    return (
      <Link
        to={to || '#'}
        className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
      >
        {children}
      </Link>
    );
  };

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
                    <DropdownMenuItem onClick={() => handleNavigation('/dashboard')}>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigation('/user-dashboard')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Analytics
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigation('/advanced-features')}>
                      <Brain className="mr-2 h-4 w-4" />
                      AI Features
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigation('/community')}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Community
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigation('/secure-admin')} className="text-gray-500">
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
                <Button 
                  onClick={() => setShowLoginModal(true)} 
                  size="sm" 
                  className="text-xs sm:text-sm"
                >
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
                <button
                  onClick={() => handleNavigation('/')}
                  className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
                >
                  Home
                </button>
                <button
                  onClick={handleFundComparisonClick}
                  className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
                >
                  Compare Funds
                </button>
                <button
                  onClick={handleBrowseFundsClick}
                  className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
                >
                  Browse Funds
                </button>
                <button
                  onClick={() => handleNavigation('/community')}
                  className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
                >
                  Community
                </button>
                {user && (
                  <>
                    <button
                      onClick={() => handleNavigation('/advanced-features')}
                      className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
                    >
                      AI Features
                    </button>
                    <button
                      onClick={() => handleNavigation('/dashboard')}
                      className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => handleNavigation('/user-dashboard')}
                      className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
                    >
                      Analytics
                    </button>
                    <button
                      onClick={() => handleNavigation('/ai-portfolio')}
                      className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
                    >
                      AI Portfolio
                    </button>
                    <button
                      onClick={() => handleNavigation('/secure-admin')}
                      className="text-gray-500 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left bg-transparent border-none cursor-pointer"
                    >
                      Admin Portal
                    </button>
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

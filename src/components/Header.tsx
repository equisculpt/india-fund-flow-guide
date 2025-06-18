
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSupabaseAuthContext } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Menu, X, Settings, BarChart3, Brain } from 'lucide-react';
import BreweryLogo from './BreweryLogo';
import EnhancedLoginModal from './EnhancedLoginModal';

const Header = () => {
  const { user, signOut } = useSupabaseAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const NavLink = ({ to, children, onClick }: { to?: string; children: React.ReactNode; onClick?: () => void }) => (
    <Link
      to={to || '#'}
      onClick={onClick}
      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
    >
      {children}
    </Link>
  );

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <BreweryLogo showText={true} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/fund-comparison">Compare Funds</NavLink>
              <NavLink to="/public-funds">Browse Funds</NavLink>
              {user && (
                <NavLink to="/advanced-features">
                  <div className="flex items-center gap-1">
                    <Brain className="h-4 w-4" />
                    AI Features
                  </div>
                </NavLink>
              )}
              {user && (
                <>
                  <NavLink to="/dashboard">
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-4 w-4" />
                      Dashboard
                    </div>
                  </NavLink>
                  <NavLink to="/user-dashboard">Analytics</NavLink>
                  <NavLink to="/ai-portfolio">AI Portfolio</NavLink>
                </>
              )}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
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
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => setShowLoginModal(true)}>
                  Sign In
                </Button>
              )}

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-2">
                <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                <NavLink to="/fund-comparison" onClick={() => setIsMenuOpen(false)}>Compare Funds</NavLink>
                <NavLink to="/public-funds" onClick={() => setIsMenuOpen(false)}>Browse Funds</NavLink>
                {user && (
                  <NavLink to="/advanced-features" onClick={() => setIsMenuOpen(false)}>AI Features</NavLink>
                )}
                {user && (
                  <>
                    <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>
                    <NavLink to="/user-dashboard" onClick={() => setIsMenuOpen(false)}>Analytics</NavLink>
                    <NavLink to="/ai-portfolio" onClick={() => setIsMenuOpen(false)}>AI Portfolio</NavLink>
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

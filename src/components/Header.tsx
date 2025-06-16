
import { Button } from "@/components/ui/button";
import BreweryLogo from "./BreweryLogo";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { useEnhancedAuth } from "@/contexts/EnhancedAuthContext";
import { LogOut, User, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useEnhancedAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleStartInvesting = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="hover:scale-105 transition-transform duration-200">
            <BreweryLogo size="md" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 hover:scale-105 transform"
              >
                Dashboard
              </Link>
            )}
            <button 
              onClick={() => scrollToSection('funds')} 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 hover:scale-105 transform cursor-pointer"
            >
              Mutual Funds
            </button>
            <button 
              onClick={() => scrollToSection('calculator')} 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 hover:scale-105 transform cursor-pointer"
            >
              SIP Calculator
            </button>
            {isAuthenticated && (
              <Link 
                to="/referrals" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 hover:scale-105 transform"
              >
                Referrals
              </Link>
            )}
            <Link 
              to="/whatsapp-bot" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              WhatsApp Bot
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              About
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-full">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    {user?.name} ({user?.type})
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  onClick={handleStartInvesting}
                >
                  Start Investing
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 mt-4">
              {isAuthenticated && (
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <button 
                onClick={() => scrollToSection('funds')} 
                className="text-left text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              >
                Mutual Funds
              </button>
              <button 
                onClick={() => scrollToSection('calculator')} 
                className="text-left text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
              >
                SIP Calculator
              </button>
              {isAuthenticated && (
                <Link 
                  to="/referrals" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Referrals
                </Link>
              )}
              <Link 
                to="/whatsapp-bot" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                WhatsApp Bot
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              
              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-200 mt-4">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                      <User className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">
                        {user?.name} ({user?.type})
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleLogout}
                      className="w-full text-gray-600 hover:text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button 
                      variant="ghost" 
                      className="w-full text-gray-700 hover:text-blue-600"
                      onClick={() => {
                        setShowLogin(true);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Login
                    </Button>
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      onClick={() => {
                        handleStartInvesting();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Start Investing
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
      
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </header>
  );
};

export default Header;

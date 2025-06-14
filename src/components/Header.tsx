
import { Button } from "@/components/ui/button";
import BreweryLogo from "./BreweryLogo";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <BreweryLogo size="md" />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            {isAuthenticated && (
              <Link to="/dashboard" className="text-gray-600 hover:text-amber-600 transition-colors">
                Dashboard
              </Link>
            )}
            <button 
              onClick={() => scrollToSection('funds')} 
              className="text-gray-600 hover:text-amber-600 transition-colors cursor-pointer"
            >
              Mutual Funds
            </button>
            <button 
              onClick={() => scrollToSection('calculator')} 
              className="text-gray-600 hover:text-amber-600 transition-colors cursor-pointer"
            >
              SIP Calculator
            </button>
            {isAuthenticated && (
              <Link to="/referrals" className="text-gray-600 hover:text-amber-600 transition-colors">
                Referrals
              </Link>
            )}
            <Link to="/whatsapp-bot" className="text-gray-600 hover:text-amber-600 transition-colors">
              WhatsApp Bot
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-amber-600 transition-colors">
              About
            </Link>
          </nav>
          
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">
                    {user?.name} ({user?.type})
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-gray-600"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </Button>
                <Button 
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                  onClick={() => setShowLogin(true)}
                >
                  Start Investing
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </header>
  );
};

export default Header;

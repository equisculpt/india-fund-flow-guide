
import { Button } from "@/components/ui/button";
import BreweryLogo from "./BreweryLogo";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <BreweryLogo size="md" />
          
          <nav className="hidden md:flex items-center space-x-6">
            {isAuthenticated && (
              <a href="/dashboard" className="text-gray-600 hover:text-amber-600 transition-colors">
                Dashboard
              </a>
            )}
            <a href="#funds" className="text-gray-600 hover:text-amber-600 transition-colors">
              Mutual Funds
            </a>
            <a href="#calculator" className="text-gray-600 hover:text-amber-600 transition-colors">
              SIP Calculator
            </a>
            {isAuthenticated && (
              <a href="/referrals" className="text-gray-600 hover:text-amber-600 transition-colors">
                Referrals
              </a>
            )}
            <a href="/whatsapp-bot" className="text-gray-600 hover:text-amber-600 transition-colors">
              WhatsApp Bot
            </a>
            <a href="#about" className="text-gray-600 hover:text-amber-600 transition-colors">
              About
            </a>
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

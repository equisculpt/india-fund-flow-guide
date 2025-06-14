
import { Button } from "@/components/ui/button";
import BreweryLogo from "./BreweryLogo";
import { useState } from "react";
import LoginModal from "./LoginModal";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <BreweryLogo size="md" />
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#funds" className="text-gray-600 hover:text-amber-600 transition-colors">
              Mutual Funds
            </a>
            <a href="#calculator" className="text-gray-600 hover:text-amber-600 transition-colors">
              SIP Calculator
            </a>
            <a href="#about" className="text-gray-600 hover:text-amber-600 transition-colors">
              About
            </a>
          </nav>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              className="text-gray-600"
              onClick={() => setShowLogin(true)}
            >
              Login
            </Button>
            <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
              Start Investing
            </Button>
          </div>
        </div>
      </div>
      
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </header>
  );
};

export default Header;

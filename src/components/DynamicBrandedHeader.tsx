
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useBranding } from "@/contexts/BrandingContext";
import BreweryLogo from "./BreweryLogo";
import EnhancedLoginModal from "./EnhancedLoginModal";

const DynamicBrandedHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { brandConfig, isWhiteLabel } = useBranding();

  // Only apply white-label styling if it's actually a white-label client
  const headerStyle = isWhiteLabel ? {
    backgroundColor: brandConfig.primaryColor,
  } : {};

  const headerClasses = isWhiteLabel 
    ? 'text-white shadow-sm sticky top-0 z-50' 
    : 'bg-white shadow-sm sticky top-0 z-50';

  const linkClasses = isWhiteLabel 
    ? 'text-white hover:text-gray-200' 
    : 'text-gray-700 hover:text-gray-900';

  const mobileTextClasses = isWhiteLabel 
    ? 'text-white' 
    : 'text-gray-700';

  return (
    <header className={headerClasses} style={headerStyle}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {isWhiteLabel ? (
              <div className="flex items-center space-x-2">
                <img src={brandConfig.logo} alt={brandConfig.companyName} className="h-8 w-8" />
                <span className="text-xl font-bold">{brandConfig.companyName}</span>
              </div>
            ) : (
              <BreweryLogo size="md" />
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#funds" className={`${linkClasses} transition-colors`}>
              Mutual Funds
            </a>
            <a href="#calculator" className={`${linkClasses} transition-colors`}>
              SIP Calculator
            </a>
            <Link to="/contact" className={`${linkClasses} transition-colors`}>
              Contact
            </Link>
            <Link to="/about" className={`${linkClasses} transition-colors`}>
              About
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant={isWhiteLabel ? "secondary" : "outline"}
              onClick={() => setIsLoginOpen(true)}
            >
              Login / Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#funds" className={mobileTextClasses}>
                Mutual Funds
              </a>
              <a href="#calculator" className={mobileTextClasses}>
                SIP Calculator
              </a>
              <Link to="/contact" className={mobileTextClasses}>
                Contact
              </Link>
              <Link to="/about" className={mobileTextClasses}>
                About
              </Link>
              <Button 
                variant={isWhiteLabel ? "secondary" : "outline"}
                onClick={() => setIsLoginOpen(true)}
                className="w-fit"
              >
                Login / Sign Up
              </Button>
            </nav>
          </div>
        )}
      </div>

      <EnhancedLoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </header>
  );
};

export default DynamicBrandedHeader;

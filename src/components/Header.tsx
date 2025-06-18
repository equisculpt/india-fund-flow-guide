
import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BreweryLogo from './BreweryLogo';
import { useBranding } from '@/contexts/BrandingContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { brandConfig } = useBranding();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <BreweryLogo size="md" showText={true} />
          </div>

          {/* Desktop Navigation - All items centered */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-8">
              <a href="#funds" className="text-gray-700 hover:text-blue-600 transition-colors">
                Funds
              </a>
              <a href="#fund-comparison" className="text-gray-700 hover:text-blue-600 transition-colors">
                Compare
              </a>
              <a href="#sip-calculator" className="text-gray-700 hover:text-blue-600 transition-colors">
                SIP Calculator
              </a>
              <a href="#risk-profiling" className="text-gray-700 hover:text-blue-600 transition-colors">
                Risk Profiling
              </a>
              <a href="#goal-investing" className="text-gray-700 hover:text-blue-600 transition-colors">
                Goal Based
              </a>
            </div>
          </nav>

          {/* Login Button */}
          <div className="hidden md:flex items-center">
            <Button variant="outline" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#funds"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Funds
              </a>
              <a
                href="#fund-comparison"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Compare
              </a>
              <a
                href="#sip-calculator"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                SIP Calculator
              </a>
              <a
                href="#risk-profiling"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Risk Profiling
              </a>
              <a
                href="#goal-investing"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Goal Based
              </a>
              <div className="px-3 py-2">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <User className="h-4 w-4" />
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

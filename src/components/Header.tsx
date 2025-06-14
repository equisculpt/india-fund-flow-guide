
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white rounded-lg p-2 font-bold text-xl">
              SB
            </div>
            <span className="text-xl font-bold text-gray-800">SIP Brewery</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#funds" className="text-gray-600 hover:text-blue-600 transition-colors">
              Mutual Funds
            </a>
            <a href="#calculator" className="text-gray-600 hover:text-blue-600 transition-colors">
              SIP Calculator
            </a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </a>
          </nav>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="text-gray-600">
              Login
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Start Investing
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

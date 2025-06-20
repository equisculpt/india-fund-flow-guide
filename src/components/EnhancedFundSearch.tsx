
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFundSearch } from '@/hooks/useFundSearch';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface EnhancedFundSearchProps {
  placeholder?: string;
  className?: string;
}

const EnhancedFundSearch = ({ placeholder, className = "" }: EnhancedFundSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { data: searchResults, isLoading } = useFundSearch(searchTerm);
  const navigate = useNavigate();
  const { translateSync } = useLanguage();

  const translatedPlaceholder = translateSync(placeholder || "Search mutual funds...", placeholder);

  useEffect(() => {
    setShowResults(searchTerm.length > 0);
  }, [searchTerm]);

  const handleFundSelect = (fundName: string) => {
    const formattedName = fundName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    navigate(`/fund/${formattedName}`);
    setSearchTerm('');
    setShowResults(false);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder={translatedPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              {translateSync("Searching...", "Searching...")}
            </div>
          ) : searchResults && searchResults.length > 0 ? (
            searchResults.map((fund, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                onClick={() => handleFundSelect(fund.fund_name)}
              >
                <div>
                  <div className="font-medium text-gray-900">{fund.fund_name}</div>
                  <div className="text-sm text-gray-500">{fund.amc_name}</div>
                </div>
              </Button>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              {translateSync("No funds found", "No funds found")}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedFundSearch;

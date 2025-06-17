
import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Star, Building, Loader2 } from "lucide-react";
import { MutualFundSearchService } from "@/services/mutualFundSearchService";
import { useNavigate } from "react-router-dom";

interface FundSearchResult {
  schemeCode: string;
  schemeName: string;
  nav?: number;
  navDate?: string;
  fundHouse?: string;
  category?: string;
}

interface EnhancedFundSearchProps {
  onFundSelect?: (fund: FundSearchResult) => void;
  placeholder?: string;
  className?: string;
}

const EnhancedFundSearch = ({ 
  onFundSelect, 
  placeholder = "Search any mutual fund...", 
  className = "" 
}: EnhancedFundSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FundSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const searchFunds = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    console.log('EnhancedFundSearch: Starting search for:', query);

    try {
      // First get the search results
      const results = await MutualFundSearchService.searchFunds(query);
      
      if (results.length === 0) {
        setSearchResults([]);
        setShowResults(true);
        setLoading(false);
        return;
      }

      // Get detailed information for top 8 results
      const topResults = results.slice(0, 8);
      const schemeCodes = topResults.map(fund => fund.schemeCode.toString());
      const detailedResults = await MutualFundSearchService.getMultipleFundDetails(schemeCodes);

      // Combine search results with detailed NAV data
      const enhancedResults: FundSearchResult[] = topResults.map(fund => {
        const details = detailedResults.get(fund.schemeCode.toString());
        return {
          schemeCode: fund.schemeCode.toString(),
          schemeName: fund.schemeName,
          nav: details?.nav,
          navDate: details?.navDate,
          fundHouse: details?.fundHouse,
          category: details?.category
        };
      });

      console.log('EnhancedFundSearch: Found', enhancedResults.length, 'enhanced results');
      setSearchResults(enhancedResults);
      setShowResults(true);
    } catch (error) {
      console.error('EnhancedFundSearch: Search error:', error);
      setSearchResults([]);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchFunds(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchFunds]);

  const handleFundSelect = (fund: FundSearchResult) => {
    console.log('EnhancedFundSearch: Fund selected:', fund);
    setShowResults(false);
    setSearchQuery(fund.schemeName);
    
    if (onFundSelect) {
      onFundSelect(fund);
    } else {
      // Navigate to fund details page
      navigate(`/fund/${fund.schemeCode}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length === 0) {
      setShowResults(false);
    }
  };

  const handleInputFocus = () => {
    if (searchQuery.length >= 2 && searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const formatNavDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    
    try {
      // Handle DD-MM-YYYY format from API
      const parts = dateString.split('-');
      if (parts.length === 3) {
        const [day, month, year] = parts;
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return date.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      }
      
      // Fallback for other formats
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString; // Return original if can't parse
      }
      
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'large cap': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'mid cap': return 'bg-green-100 text-green-800 border-green-200';
      case 'small cap': return 'bg-red-100 text-red-800 border-red-200';
      case 'elss': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'debt': 
      case 'debt - overnight':
      case 'debt scheme - dynamic bond':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'hybrid':
      case 'hybrid - conservative':
      case 'hybrid - aggressive':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'index': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="pl-10 pr-4 h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-4 w-4 animate-spin" />
        )}
      </div>

      {showResults && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-2 max-h-96 overflow-y-auto shadow-xl border-2 border-gray-200">
          <CardContent className="p-0">
            {loading && searchResults.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Searching funds...</span>
                </div>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {searchQuery.length >= 2 ? 'No funds found matching your search' : 'Type at least 2 characters to search...'}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {searchResults.map((fund, index) => (
                  <div
                    key={`${fund.schemeCode}-${index}`}
                    className="p-4 hover:bg-blue-50 cursor-pointer transition-all duration-200 hover:shadow-sm"
                    onClick={() => handleFundSelect(fund)}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
                          {fund.schemeName}
                        </h4>
                        
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          {fund.fundHouse && (
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <Building className="h-3 w-3" />
                              <span className="truncate max-w-32">{fund.fundHouse}</span>
                            </div>
                          )}
                          
                          {fund.category && (
                            <Badge 
                              variant="outline" 
                              className={`text-xs px-2 py-1 ${getCategoryColor(fund.category)}`}
                            >
                              {fund.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right ml-2 flex-shrink-0">
                        {fund.nav ? (
                          <div className="space-y-1">
                            <div className="text-sm font-bold text-gray-900">
                              ₹{fund.nav.toFixed(4)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatNavDate(fund.navDate)}
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400 flex items-center gap-1">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Loading...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedFundSearch;

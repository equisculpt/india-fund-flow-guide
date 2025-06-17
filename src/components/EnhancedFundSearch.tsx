
import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Star, Building } from "lucide-react";
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

      // Get detailed information for top 10 results
      const topResults = results.slice(0, 10);
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

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'Large Cap': return 'bg-blue-100 text-blue-800';
      case 'Mid Cap': return 'bg-green-100 text-green-800';
      case 'Small Cap': return 'bg-red-100 text-red-800';
      case 'ELSS': return 'bg-purple-100 text-purple-800';
      case 'Debt': return 'bg-gray-100 text-gray-800';
      case 'Hybrid': return 'bg-orange-100 text-orange-800';
      case 'Index': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-600';
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
          className="pl-10 pr-4"
          onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
        />
      </div>

      {showResults && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-96 overflow-y-auto shadow-lg">
          <CardContent className="p-0">
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                Searching funds...
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {searchQuery.length >= 2 ? 'No funds found' : 'Type to search funds...'}
              </div>
            ) : (
              <div className="divide-y">
                {searchResults.map((fund, index) => (
                  <div
                    key={`${fund.schemeCode}-${index}`}
                    className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleFundSelect(fund)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {fund.schemeName}
                        </h4>
                        
                        <div className="flex items-center gap-2 mt-1">
                          {fund.fundHouse && (
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <Building className="h-3 w-3" />
                              <span>{fund.fundHouse}</span>
                            </div>
                          )}
                          
                          {fund.category && (
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getCategoryColor(fund.category)}`}
                            >
                              {fund.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right ml-2">
                        {fund.nav ? (
                          <div>
                            <div className="text-sm font-bold">₹{fund.nav.toFixed(4)}</div>
                            {fund.navDate && (
                              <div className="text-xs text-gray-500">
                                {new Date(fund.navDate).toLocaleDateString('en-IN')}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-500">Loading NAV...</div>
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

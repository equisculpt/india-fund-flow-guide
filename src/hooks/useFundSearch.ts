
import { useState, useCallback, useEffect, useRef } from "react";
import { MutualFundSearchService } from "@/services/mutualFundSearchService";

interface FundSearchResult {
  schemeCode: string;
  schemeName: string;
  nav?: number;
  navDate?: string;
  fundHouse?: string;
  category?: string;
}

export const useFundSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FundSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const searchFunds = useCallback(async (query: string) => {
    if (!query || query.length < 3) {
      setSearchResults([]);
      setShowResults(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    console.log('useFundSearch: Starting search for:', query);

    try {
      const results = await MutualFundSearchService.searchFunds(query);
      
      if (results.length === 0) {
        setSearchResults([]);
        setShowResults(true);
        setLoading(false);
        return;
      }

      const topResults = results.slice(0, 8);
      const schemeCodes = topResults.map(fund => fund.schemeCode.toString());
      const detailedResults = await MutualFundSearchService.getMultipleFundDetails(schemeCodes);

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

      console.log('useFundSearch: Found', enhancedResults.length, 'enhanced results');
      setSearchResults(enhancedResults);
      setShowResults(true);
    } catch (error) {
      console.error('useFundSearch: Search error:', error);
      setSearchResults([]);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  }, []); // Remove all dependencies to prevent circular dependency

  useEffect(() => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for search
    searchTimeoutRef.current = setTimeout(() => {
      searchFunds(searchQuery);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]); // Only depend on searchQuery, not searchFunds

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    
    if (value.length === 0) {
      setShowResults(false);
      setSearchResults([]);
      setLoading(false);
    }
  };

  const handleInputFocus = () => {
    if (searchQuery.length >= 3 && searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const handleResultSelect = (fund: FundSearchResult) => {
    console.log('useFundSearch: Fund selected, clearing search:', fund.schemeName);
    setShowResults(false);
    setSearchResults([]);
    setSearchQuery(""); // Clear the search query completely
    setLoading(false);
    return fund;
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
    setLoading(false);
    
    // Clear any pending search timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  };

  return {
    searchQuery,
    searchResults,
    loading,
    showResults,
    handleInputChange,
    handleInputFocus,
    handleResultSelect,
    clearSearch
  };
};

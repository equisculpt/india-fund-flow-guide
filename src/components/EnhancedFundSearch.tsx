
import { useNavigate, useLocation } from "react-router-dom";
import { useFundSearch } from "@/hooks/useFundSearch";
import SearchInput from "./search/SearchInput";
import SearchResults from "./search/SearchResults";

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
  const navigate = useNavigate();
  const location = useLocation();
  const {
    searchQuery,
    searchResults,
    loading,
    showResults,
    handleInputChange,
    handleInputFocus,
    handleResultSelect,
    clearSearch
  } = useFundSearch();

  const handleFundSelect = (fund: FundSearchResult) => {
    console.log('EnhancedFundSearch: Fund selected:', fund);
    console.log('EnhancedFundSearch: Current location:', location.pathname);
    console.log('EnhancedFundSearch: About to navigate to:', `/fund/${fund.schemeCode}`);
    
    const selectedFund = handleResultSelect(fund);
    
    try {
      // Clear search results immediately
      clearSearch();
      
      // Always navigate to fund details page when a fund is selected
      navigate(`/fund/${selectedFund.schemeCode}`);
      console.log('EnhancedFundSearch: Navigation called successfully');
      
      // Scroll to top after navigation
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    } catch (error) {
      console.error('EnhancedFundSearch: Navigation error:', error);
    }
    
    // Also call the callback if provided (for any additional handling)
    if (onFundSelect) {
      console.log('EnhancedFundSearch: Calling onFundSelect callback');
      onFundSelect(selectedFund);
    }
  };

  const handleInputClick = () => {
    if (searchQuery.length === 0) {
      clearSearch();
    }
    handleInputFocus();
  };

  // Clear search when clicking outside
  const handleOutsideClick = () => {
    setTimeout(() => {
      clearSearch();
    }, 200); // Small delay to allow selection to complete
  };

  return (
    <div className={`relative w-full ${className}`} onBlur={handleOutsideClick}>
      <SearchInput
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={handleInputClick}
        placeholder={placeholder}
        loading={loading}
      />

      <SearchResults
        results={searchResults}
        loading={loading}
        searchQuery={searchQuery}
        onFundSelect={handleFundSelect}
        showResults={showResults}
      />
    </div>
  );
};

export default EnhancedFundSearch;

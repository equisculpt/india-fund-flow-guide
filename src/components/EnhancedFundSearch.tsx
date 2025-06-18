
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
    const selectedFund = handleResultSelect(fund);
    
    // If we're on the public-funds page, don't navigate away - just call the callback
    if (location.pathname === '/public-funds' && onFundSelect) {
      console.log('EnhancedFundSearch: On public-funds page, using callback instead of navigation');
      onFundSelect(selectedFund);
    } else {
      // For other pages, navigate to fund details page
      navigate(`/fund/${selectedFund.schemeCode}`);
      
      // Also call the callback if provided
      if (onFundSelect) {
        onFundSelect(selectedFund);
      }
    }
  };

  const handleInputClick = () => {
    if (searchQuery.length === 0) {
      clearSearch();
    }
    handleInputFocus();
  };

  return (
    <div className={`relative w-full ${className}`}>
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


import { useNavigate } from "react-router-dom";
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
  const {
    searchQuery,
    searchResults,
    loading,
    showResults,
    handleInputChange,
    handleInputFocus,
    handleResultSelect
  } = useFundSearch();

  const handleFundSelect = (fund: FundSearchResult) => {
    console.log('EnhancedFundSearch: Fund selected:', fund);
    const selectedFund = handleResultSelect(fund);
    
    // Always navigate to fund details page for proper analytics
    navigate(`/fund/${selectedFund.schemeCode}`);
    
    // Also call the callback if provided
    if (onFundSelect) {
      onFundSelect(selectedFund);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <SearchInput
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
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

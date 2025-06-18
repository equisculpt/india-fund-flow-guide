
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import FundResultItem from "./FundResultItem";

interface FundSearchResult {
  schemeCode: string;
  schemeName: string;
  nav?: number;
  navDate?: string;
  fundHouse?: string;
  category?: string;
}

interface SearchResultsProps {
  results: FundSearchResult[];
  loading: boolean;
  searchQuery: string;
  onFundSelect: (fund: FundSearchResult) => void;
  showResults: boolean;
}

const SearchResults = ({ results, loading, searchQuery, onFundSelect, showResults }: SearchResultsProps) => {
  if (!showResults) return null;

  return (
    <Card className="absolute top-full left-0 right-0 z-50 mt-2 max-h-96 overflow-y-auto shadow-xl border-2 border-gray-200">
      <CardContent className="p-0">
        {loading && results.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Searching funds...</span>
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {searchQuery.length >= 3 ? 'No funds found matching your search' : 'Type at least 3 characters to search...'}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {results.map((fund, index) => (
              <FundResultItem
                key={`${fund.schemeCode}-${index}`}
                fund={fund}
                onSelect={onFundSelect}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchResults;

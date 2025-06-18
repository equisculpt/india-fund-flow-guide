
import { useState, useEffect } from 'react';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X, Plus } from 'lucide-react';
import { MutualFundSearchService } from '@/services/mutualFundSearchService';

interface FundSearchResult {
  schemeCode: string;
  schemeName: string;
  category?: string;
  fundHouse?: string;
}

interface FundSearchAutocompleteProps {
  onFundSelect: (fund: FundSearchResult) => void;
  selectedFunds: FundSearchResult[];
  maxFunds: number;
  placeholder?: string;
}

const FundSearchAutocomplete = ({ onFundSelect, selectedFunds, maxFunds, placeholder = "Search mutual funds..." }: FundSearchAutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FundSearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  // Reset all state when dialog opens/closes
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset everything when closing
      setQuery('');
      setSearchResults([]);
      setSearching(false);
    }
  };

  // Search function
  const performSearch = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    try {
      console.log('FundSearchAutocomplete: Searching for:', searchQuery);
      
      const results = await MutualFundSearchService.searchFunds(searchQuery);
      console.log('FundSearchAutocomplete: API returned:', results.length, 'results');
      
      if (results.length === 0) {
        setSearchResults([]);
        return;
      }
      
      // Enhanced filtering for multi-word searches
      const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 0);
      
      // Filter results - ALL search terms must be present
      const filteredResults = results.filter(fund => {
        const schemeName = fund.schemeName.toLowerCase();
        return searchTerms.every(term => schemeName.includes(term));
      });
      
      // Map to our format
      const mappedResults = filteredResults.slice(0, 15).map(fund => {
        const category = MutualFundSearchService.detectCategory(fund.schemeName);
        return {
          schemeCode: fund.schemeCode.toString(),
          schemeName: fund.schemeName,
          category: category,
          fundHouse: 'Unknown'
        };
      });
      
      console.log('FundSearchAutocomplete: Final results:', mappedResults.length);
      setSearchResults(mappedResults);
    } catch (error) {
      console.error('FundSearchAutocomplete: Search error:', error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(query);
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSelect = (fund: FundSearchResult) => {
    if (selectedFunds.length < maxFunds && !selectedFunds.find(f => f.schemeCode === fund.schemeCode)) {
      console.log('FundSearchAutocomplete: Selecting fund:', fund);
      onFundSelect(fund);
      setOpen(false); // Close dialog after selection
    }
  };

  const canAddMore = selectedFunds.length < maxFunds;

  return (
    <div className="space-y-3">
      {canAddMore && (
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 w-full justify-start"
        >
          <Plus className="h-4 w-4" />
          {placeholder}
        </Button>
      )}

      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Type fund name to search (e.g., 'hdfc small cap')..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>
              {searching ? (
                <div className="flex items-center justify-center gap-2 py-4">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span>Searching funds...</span>
                </div>
              ) : query.length < 2 ? (
                "Type at least 2 characters to search"
              ) : (
                <div className="py-4 text-center">
                  <p>No funds found matching "{query}"</p>
                  <p className="text-sm text-gray-500 mt-1">Try keywords like "hdfc equity", "sbi small cap", or "axis large cap"</p>
                </div>
              )}
            </CommandEmpty>
            {searchResults.length > 0 && (
              <CommandGroup>
                {searchResults.map((fund) => (
                  <CommandItem
                    key={fund.schemeCode}
                    onSelect={() => handleSelect(fund)}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col w-full">
                      <span className="font-medium">{fund.schemeName}</span>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Code: {fund.schemeCode}</span>
                        {fund.category && (
                          <Badge variant="outline" className="text-xs">
                            {fund.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>

      {selectedFunds.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedFunds.map((fund, index) => (
            <Badge key={fund.schemeCode} variant="secondary" className="flex items-center gap-2 px-3 py-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'][index] }}
              />
              <span className="max-w-40 truncate">{fund.schemeName}</span>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default FundSearchAutocomplete;

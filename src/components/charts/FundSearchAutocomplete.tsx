
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

  useEffect(() => {
    const searchFunds = async () => {
      if (query.length < 2) {
        setSearchResults([]);
        return;
      }

      setSearching(true);
      try {
        const results = await MutualFundSearchService.searchFunds(query);
        const mappedResults = results.map(fund => ({
          schemeCode: fund.schemeCode.toString(),
          schemeName: fund.schemeName,
          category: 'Unknown', // Will be determined when fund is selected
          fundHouse: 'Unknown'
        }));
        setSearchResults(mappedResults.slice(0, 20)); // Limit to 20 results
      } catch (error) {
        console.error('Fund search error:', error);
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchFunds, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSelect = (fund: FundSearchResult) => {
    if (selectedFunds.length < maxFunds && !selectedFunds.find(f => f.schemeCode === fund.schemeCode)) {
      onFundSelect(fund);
      setOpen(false);
      setQuery('');
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

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput
            placeholder="Type fund name to search..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>
              {searching ? "Searching..." : query.length < 2 ? "Type at least 2 characters to search" : "No funds found"}
            </CommandEmpty>
            <CommandGroup>
              {searchResults.map((fund) => (
                <CommandItem
                  key={fund.schemeCode}
                  onSelect={() => handleSelect(fund)}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col w-full">
                    <span className="font-medium">{fund.schemeName}</span>
                    <span className="text-sm text-gray-500">Code: {fund.schemeCode}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
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

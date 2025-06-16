
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Plus, X } from 'lucide-react';

interface FundComparison {
  id: string;
  name: string;
  schemeCode: string;
  color: string;
  enabled: boolean;
}

interface FundComparisonManagerProps {
  fundComparisons: FundComparison[];
  setFundComparisons: (funds: FundComparison[]) => void;
  availableFunds: any[];
  primaryFundCategory: string;
}

const FundComparisonManager = ({
  fundComparisons,
  setFundComparisons,
  availableFunds,
  primaryFundCategory
}: FundComparisonManagerProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFundSearch, setShowFundSearch] = useState(false);

  const addFundForComparison = (fund: any) => {
    if (fundComparisons.length >= 4) return;
    
    const newComparison: FundComparison = {
      id: `comparison_${fundComparisons.length}`,
      name: fund.schemeName,
      schemeCode: fund.schemeCode,
      color: ['#10B981', '#F59E0B', '#8B5CF6'][fundComparisons.length - 1],
      enabled: true
    };
    
    setFundComparisons([...fundComparisons, newComparison]);
    setShowFundSearch(false);
    setSearchQuery('');
  };

  const removeFund = (fundId: string) => {
    if (fundId === 'primary' || fundComparisons.length <= 1) return;
    setFundComparisons(fundComparisons.filter(fund => fund.id !== fundId));
  };

  const filteredFunds = availableFunds
    .filter(fund => 
      fund.category === primaryFundCategory &&
      fund.schemeCode !== fundComparisons[0]?.schemeCode &&
      !fundComparisons.find(f => f.schemeCode === fund.schemeCode)
    )
    .filter(fund =>
      fund.schemeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fund.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Comparing Funds:</span>
        {fundComparisons.length < 4 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFundSearch(!showFundSearch)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add {primaryFundCategory} Fund
          </Button>
        )}
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {fundComparisons.map((fund) => (
          <Badge key={fund.id} variant="secondary" className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: fund.color }}
            />
            <span className="max-w-32 truncate">{fund.name}</span>
            {fund.id !== 'primary' && (
              <X 
                className="h-3 w-3 cursor-pointer hover:text-red-500" 
                onClick={() => removeFund(fund.id)}
              />
            )}
          </Badge>
        ))}
      </div>

      {showFundSearch && (
        <div className="border rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder={`Search ${primaryFundCategory} funds...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="max-h-40 overflow-y-auto space-y-1">
            {filteredFunds.slice(0, 10).map((fund) => (
              <div
                key={fund.schemeCode}
                className="p-2 hover:bg-gray-50 cursor-pointer rounded text-sm"
                onClick={() => addFundForComparison(fund)}
              >
                <div className="font-medium">{fund.schemeName.substring(0, 60)}...</div>
                <div className="text-gray-500 text-xs">{fund.category} • {fund.amcName}</div>
              </div>
            ))}
            {filteredFunds.length === 0 && (
              <div className="text-sm text-gray-500 text-center py-2">
                No {primaryFundCategory} funds found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FundComparisonManager;

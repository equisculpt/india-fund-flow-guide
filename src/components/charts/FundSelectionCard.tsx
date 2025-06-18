
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, CheckCircle } from 'lucide-react';
import FundSearchAutocomplete from './FundSearchAutocomplete';

interface FundSelectionCardProps {
  selectedFunds: any[];
  onFundSelect: (fund: any) => void;
  comparisonResult: any;
  onRefreshComparison: () => void;
}

const FundSelectionCard = ({ 
  selectedFunds, 
  onFundSelect, 
  comparisonResult, 
  onRefreshComparison 
}: FundSelectionCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Stable AI Fund Comparison (2-5 funds)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FundSearchAutocomplete
          onFundSelect={onFundSelect}
          selectedFunds={selectedFunds.map(f => ({ 
            schemeCode: f.schemeCode, 
            schemeName: f.schemeName, 
            category: f.category 
          }))}
          maxFunds={5}
          placeholder="Search and add funds to compare..."
        />
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            {selectedFunds.length >= 2 && (
              <>
                Comparing {selectedFunds.length} fund{selectedFunds.length > 1 ? 's' : ''} • 
                {selectedFunds.length < 5 && ' Add more funds for comprehensive analysis'}
              </>
            )}
          </div>
          
          {comparisonResult && (
            <div className="flex items-center gap-2">
              {comparisonResult.isStableResult && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Stable Result
                </Badge>
              )}
              <button
                onClick={onRefreshComparison}
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Force Refresh
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FundSelectionCard;

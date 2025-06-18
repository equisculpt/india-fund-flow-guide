
import { TrendingUp, Star, Building, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FundSearchResult {
  schemeCode: string;
  schemeName: string;
  nav?: number;
  navDate?: string;
  fundHouse?: string;
  category?: string;
}

interface FundResultItemProps {
  fund: FundSearchResult;
  onSelect: (fund: FundSearchResult) => void;
}

const FundResultItem = ({ fund, onSelect }: FundResultItemProps) => {
  const formatNavDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    
    try {
      const parts = dateString.split('-');
      if (parts.length === 3) {
        const [day, month, year] = parts;
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        
        if (isNaN(date.getTime())) {
          return dateString;
        }
        
        return date.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      }
      
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString || 'Invalid Date';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'large cap': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'mid cap': return 'bg-green-100 text-green-800 border-green-200';
      case 'small cap': return 'bg-red-100 text-red-800 border-red-200';
      case 'elss': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'debt': 
      case 'debt - overnight':
      case 'debt scheme - dynamic bond':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'hybrid':
      case 'hybrid - conservative':
      case 'hybrid - aggressive':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'index': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div
      className="p-4 hover:bg-blue-50 cursor-pointer transition-all duration-200 hover:shadow-sm border-l-4 border-transparent hover:border-blue-500"
      onClick={() => onSelect(fund)}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight mb-2">
            {fund.schemeName}
          </h4>
          
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {fund.fundHouse && (
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Building className="h-3 w-3" />
                <span className="truncate max-w-32">{fund.fundHouse}</span>
              </div>
            )}
            
            {fund.category && (
              <Badge 
                variant="outline" 
                className={`text-xs px-2 py-1 ${getCategoryColor(fund.category)}`}
              >
                {fund.category}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="text-right ml-2 flex-shrink-0">
          {fund.nav ? (
            <div className="space-y-1">
              <div className="text-sm font-bold text-gray-900">
                ₹{fund.nav.toFixed(4)}
              </div>
              <div className="text-xs text-gray-500">
                {formatNavDate(fund.navDate)}
              </div>
            </div>
          ) : (
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              Loading...
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-2 text-xs text-blue-600 flex items-center gap-1">
        <TrendingUp className="h-3 w-3" />
        Click to view detailed analysis
      </div>
    </div>
  );
};

export default FundResultItem;

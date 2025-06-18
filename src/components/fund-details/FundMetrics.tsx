
import { TrendingUp, TrendingDown } from 'lucide-react';

interface FundMetricsProps {
  fundData: any;
  latestNAV: any;
  navError: string;
}

const FundMetrics = ({ fundData, latestNAV, navError }: FundMetricsProps) => {
  return (
    <div className="text-right">
      <div className="text-3xl font-bold">₹{fundData.nav.toFixed(4)}</div>
      <div className="text-sm text-gray-600">
        Current NAV {latestNAV ? '(Live)' : '(Calculated)'}
      </div>
      {latestNAV && (
        <div className="text-xs text-green-600 mt-1">
          Updated: {latestNAV.navDate}
        </div>
      )}
      
      {/* Enhanced Performance Display */}
      <div className="mt-2 space-y-1">
        <div className="flex items-center gap-2">
          {fundData.returns1Y >= 0 ? 
            <TrendingUp className="h-4 w-4 text-green-600" /> : 
            <TrendingDown className="h-4 w-4 text-red-600" />
          }
          <span className={`font-semibold ${fundData.returns1Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {fundData.returns1Y >= 0 ? '+' : ''}{fundData.returns1Y.toFixed(2)}% (1Y)
          </span>
        </div>
        <div className="text-xs text-gray-600">
          3Y: {fundData.returns3Y.toFixed(2)}% | 5Y: {fundData.returns5Y.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default FundMetrics;

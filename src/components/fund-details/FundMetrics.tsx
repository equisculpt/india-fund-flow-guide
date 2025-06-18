
import { TrendingUp, TrendingDown } from 'lucide-react';

interface FundMetricsProps {
  fundData: any;
  latestNAV: any;
  navError: string;
}

const FundMetrics = ({ fundData, latestNAV, navError }: FundMetricsProps) => {
  // Use the CORRECTED calculated performance data from fundData - this is the single source of truth
  const currentReturns1Y = fundData.returns1Y || 0;
  const currentReturns3Y = fundData.returns3Y || 0;
  const currentReturns5Y = fundData.returns5Y || 0;
  
  // Use XIRR values from fundData, with fallback to returns if XIRR is not available
  const xirr1Y = fundData.xirr1Y || fundData.returns1Y || 0;
  const xirr3Y = fundData.xirr3Y || fundData.returns3Y || 0;
  const xirr5Y = fundData.xirr5Y || fundData.returns5Y || 0;
  
  console.log('FundMetrics: Displaying CORRECTED performance data with proper XIRR:', {
    returns1Y: currentReturns1Y,
    returns3Y: currentReturns3Y,
    returns5Y: currentReturns5Y,
    xirr1Y: xirr1Y,
    xirr3Y: xirr3Y,
    xirr5Y: xirr5Y
  });

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
      
      {/* CORRECTED Performance Display - Single Source of Truth */}
      <div className="mt-2 space-y-1">
        <div className="flex items-center gap-2">
          {currentReturns1Y >= 0 ? 
            <TrendingUp className="h-4 w-4 text-green-600" /> : 
            <TrendingDown className="h-4 w-4 text-red-600" />
          }
          <span className={`font-semibold ${currentReturns1Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {currentReturns1Y >= 0 ? '+' : ''}{currentReturns1Y.toFixed(2)}% (1Y)
          </span>
        </div>
        <div className="text-xs text-gray-600">
          3Y: {currentReturns3Y >= 0 ? '+' : ''}{currentReturns3Y.toFixed(2)}% | 5Y: {currentReturns5Y >= 0 ? '+' : ''}{currentReturns5Y.toFixed(2)}%
        </div>
        <div className="text-xs text-blue-600">
          XIRR - 1Y: {xirr1Y >= 0 ? '+' : ''}{xirr1Y.toFixed(2)}% | 3Y: {xirr3Y >= 0 ? '+' : ''}{xirr3Y.toFixed(2)}% | 5Y: {xirr5Y >= 0 ? '+' : ''}{xirr5Y.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default FundMetrics;

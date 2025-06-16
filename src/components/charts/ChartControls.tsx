
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, TrendingUp, BarChart3 } from 'lucide-react';

interface ChartControlsProps {
  period: '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y';
  setPeriod: (period: '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y') => void;
  showSIPChart: boolean;
  setShowSIPChart: (show: boolean) => void;
  sipAmount: number;
  setSipAmount: (amount: number) => void;
}

const ChartControls = ({
  period,
  setPeriod,
  showSIPChart,
  setShowSIPChart,
  sipAmount,
  setSipAmount
}: ChartControlsProps) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="sipAmount" className="text-sm font-medium">Monthly SIP (₹):</Label>
          <Input
            id="sipAmount"
            type="number"
            value={sipAmount}
            onChange={(e) => setSipAmount(Number(e.target.value))}
            className="w-28 h-8"
            min="1000"
            step="10000"
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant={showSIPChart ? "default" : "outline"}
          size="sm"
          onClick={() => setShowSIPChart(!showSIPChart)}
          className="flex items-center gap-2"
        >
          {showSIPChart ? (
            <>
              <TrendingUp className="h-4 w-4" />
              % Returns
            </>
          ) : (
            <>
              <Calculator className="h-4 w-4" />
              SIP Portfolio
            </>
          )}
        </Button>
        
        <Select value={period} onValueChange={(value: any) => setPeriod(value)}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1M">1M</SelectItem>
            <SelectItem value="3M">3M</SelectItem>
            <SelectItem value="6M">6M</SelectItem>
            <SelectItem value="1Y">1Y</SelectItem>
            <SelectItem value="3Y">3Y</SelectItem>
            <SelectItem value="5Y">5Y</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ChartControls;

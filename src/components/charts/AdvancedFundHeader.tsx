
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Star, TrendingUp, TrendingDown } from 'lucide-react';

interface AdvancedFundHeaderProps {
  primaryFund: any;
  performance: {
    return: number;
    volatility: number;
    sipReturn: number;
    totalInvested?: number;
    sipValue?: number;
  };
  irr: number;
  period: string;
  children: React.ReactNode;
}

const AdvancedFundHeader = ({ 
  primaryFund, 
  performance, 
  irr, 
  period, 
  children 
}: AdvancedFundHeaderProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Advanced Fund Performance Analysis
            </CardTitle>
            <div className="flex items-center gap-4 mt-2">
              {primaryFund.trendScore && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{primaryFund.trendScore}/10</span>
                  <span className="text-sm text-muted-foreground">Trend Score</span>
                </div>
              )}
              <Badge variant={performance.return >= 0 ? "default" : "destructive"}>
                {performance.return >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {performance.return.toFixed(2)}% ({period})
              </Badge>
              <Badge variant="outline">
                IRR: {irr.toFixed(2)}%
              </Badge>
            </div>
          </div>
          
          {children}
        </div>
      </CardHeader>
    </Card>
  );
};

export default AdvancedFundHeader;

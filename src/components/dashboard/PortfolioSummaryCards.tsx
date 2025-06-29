
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Zap } from "lucide-react";
import { TEST_USER_DATA } from '@/services/testData';

interface PortfolioSummaryCardsProps {
  hideBalance: boolean;
  formatCurrency: (amount: number) => string;
}

const PortfolioSummaryCards = ({ hideBalance, formatCurrency }: PortfolioSummaryCardsProps) => {
  const { portfolioAnalytics } = TEST_USER_DATA;

  return (
    <div className="grid md:grid-cols-5 gap-4">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 font-medium">Current Value</p>
              <p className="text-3xl font-bold text-blue-900">{formatCurrency(portfolioAnalytics.totalValue)}</p>
            </div>
            <TrendingUp className="h-10 w-10 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardContent className="p-6">
          <div>
            <p className="text-sm text-green-700 font-medium">Total Invested</p>
            <p className="text-2xl font-bold text-green-900">{formatCurrency(portfolioAnalytics.totalInvested)}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
        <CardContent className="p-6">
          <div>
            <p className="text-sm text-emerald-700 font-medium">Total Gains</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-emerald-900">
                {formatCurrency(portfolioAnalytics.totalGains)}
              </p>
              <span className="text-sm text-emerald-700 bg-emerald-200 px-2 py-1 rounded-full">
                +{portfolioAnalytics.gainPercentage}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-6">
          <div>
            <p className="text-sm text-purple-700 font-medium">Portfolio XIRR</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-purple-900">
                {portfolioAnalytics.portfolioXIRR}%
              </p>
              <span className="text-sm text-purple-700 flex items-center bg-purple-200 px-2 py-1 rounded-full">
                <TrendingUp className="h-3 w-3 mr-1" />
                p.a.
              </span>
            </div>
            <div className="text-xs text-purple-600 mt-1">Annualized Return</div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
        <CardContent className="p-6">
          <div>
            <p className="text-sm text-yellow-700 font-medium">XIRR Percentile</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-yellow-900">
                {portfolioAnalytics.xirrPercentile}th
              </p>
              <span className="text-sm text-yellow-700 bg-yellow-200 px-2 py-1 rounded-full">
                Top {100 - portfolioAnalytics.xirrPercentile}%
              </span>
            </div>
            <div className="text-xs text-yellow-600 mt-1">Better than peers</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioSummaryCards;


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Building, Briefcase } from 'lucide-react';

interface PortfolioHoldingsProps {
  fundData: any;
}

const PortfolioHoldings = ({ fundData }: PortfolioHoldingsProps) => {
  // Mock portfolio holdings data
  const holdings = [
    { name: "Reliance Industries", percentage: 8.5, change: "+0.5%", sector: "Energy" },
    { name: "HDFC Bank", percentage: 7.2, change: "-0.2%", sector: "Banking" },
    { name: "Infosys", percentage: 6.8, change: "+0.8%", sector: "IT" },
    { name: "TCS", percentage: 6.1, change: "+0.3%", sector: "IT" },
    { name: "ITC", percentage: 5.9, change: "-0.1%", sector: "FMCG" },
    { name: "HDFC", percentage: 5.2, change: "+0.4%", sector: "Financial Services" },
    { name: "Kotak Mahindra Bank", percentage: 4.8, change: "+0.6%", sector: "Banking" },
    { name: "Bharti Airtel", percentage: 4.3, change: "-0.3%", sector: "Telecom" },
  ];

  const sectorAllocation = [
    { sector: "Banking & Financial Services", percentage: 35.2, color: "#3B82F6" },
    { sector: "Information Technology", percentage: 22.8, color: "#10B981" },
    { sector: "Consumer Goods", percentage: 15.6, color: "#F59E0B" },
    { sector: "Energy", percentage: 12.4, color: "#EF4444" },
    { sector: "Telecom", percentage: 8.5, color: "#8B5CF6" },
    { sector: "Others", percentage: 5.5, color: "#6B7280" },
  ];

  const recentChanges = [
    { action: "Added", stock: "Adani Ports", percentage: "1.2%", date: "15 Dec 2024" },
    { action: "Increased", stock: "HDFC Bank", percentage: "+0.5%", date: "10 Dec 2024" },
    { action: "Reduced", stock: "Wipro", percentage: "-0.8%", date: "8 Dec 2024" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Holdings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600" />
            Top Holdings ({holdings.length} of 50 stocks)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {holdings.map((holding, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{holding.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{holding.percentage}%</span>
                      <span className={`text-sm flex items-center gap-1 ${
                        holding.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {holding.change.startsWith('+') ? 
                          <TrendingUp className="h-3 w-3" /> : 
                          <TrendingDown className="h-3 w-3" />
                        }
                        {holding.change}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">{holding.sector}</Badge>
                    <Progress value={holding.percentage} className="w-20 h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sector Allocation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-green-600" />
            Sector-wise Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sectorAllocation.map((sector, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{sector.sector}</span>
                  <span className="font-bold">{sector.percentage}%</span>
                </div>
                <Progress 
                  value={sector.percentage} 
                  className="h-3"
                  style={{ 
                    backgroundColor: '#f3f4f6',
                  }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Portfolio Changes */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Portfolio Changes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentChanges.map((change, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={change.action === 'Added' ? 'default' : 
                            change.action === 'Increased' ? 'secondary' : 'destructive'}
                  >
                    {change.action}
                  </Badge>
                  <span className="font-medium">{change.stock}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{change.percentage}</div>
                  <div className="text-xs text-gray-500">{change.date}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioHoldings;

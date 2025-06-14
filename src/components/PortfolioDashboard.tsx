
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Eye, EyeOff, Download, Plus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const PortfolioDashboard = () => {
  const [hideBalance, setHideBalance] = useState(false);
  
  const portfolioData = {
    totalValue: 156750,
    totalInvested: 120000,
    totalGains: 36750,
    gainPercentage: 30.6,
    dayChange: 2850,
    dayChangePercentage: 1.85
  };

  const holdings = [
    {
      name: "HDFC Top 100 Fund",
      units: 127.456,
      avgNav: 723.45,
      currentNav: 856.32,
      invested: 25000,
      currentValue: 31200,
      gains: 6200,
      gainPercentage: 24.8
    },
    {
      name: "SBI Small Cap Fund",
      units: 89.234,
      avgNav: 187.23,
      currentNav: 234.67,
      invested: 35000,
      currentValue: 42350,
      gains: 7350,
      gainPercentage: 21.0
    },
    {
      name: "Axis Long Term Equity",
      units: 156.789,
      avgNav: 312.45,
      currentNav: 445.78,
      invested: 30000,
      currentValue: 38900,
      gains: 8900,
      gainPercentage: 29.7
    },
    {
      name: "Mirae Asset Large Cap",
      units: 98.567,
      avgNav: 456.78,
      currentNav: 567.23,
      invested: 30000,
      currentValue: 44300,
      gains: 14300,
      gainPercentage: 47.7
    }
  ];

  const performanceData = [
    { month: 'Jan', value: 100000 },
    { month: 'Feb', value: 105000 },
    { month: 'Mar', value: 112000 },
    { month: 'Apr', value: 108000 },
    { month: 'May', value: 125000 },
    { month: 'Jun', value: 135000 },
    { month: 'Jul', value: 142000 },
    { month: 'Aug', value: 148000 },
    { month: 'Sep', value: 152000 },
    { month: 'Oct', value: 156750 }
  ];

  const allocationData = [
    { name: 'Large Cap', value: 75500, color: '#3B82F6' },
    { name: 'Small Cap', value: 42350, color: '#10B981' },
    { name: 'ELSS', value: 38900, color: '#F59E0B' }
  ];

  const formatCurrency = (amount: number) => {
    if (hideBalance) return "₹****";
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Portfolio Overview</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setHideBalance(!hideBalance)}>
            {hideBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Value</p>
                <p className="text-2xl font-bold">{formatCurrency(portfolioData.totalValue)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-gray-600">Total Invested</p>
              <p className="text-xl font-semibold">{formatCurrency(portfolioData.totalInvested)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-gray-600">Total Gains</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold text-green-600">
                  {formatCurrency(portfolioData.totalGains)}
                </p>
                <span className="text-sm text-green-600">
                  +{portfolioData.gainPercentage}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-gray-600">1-Day Change</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold text-green-600">
                  {formatCurrency(portfolioData.dayChange)}
                </p>
                <span className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{portfolioData.dayChangePercentage}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="holdings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                My Holdings
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Invest More
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {holdings.map((holding, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div className="md:col-span-2">
                        <h4 className="font-semibold">{holding.name}</h4>
                        <p className="text-sm text-gray-600">{holding.units.toFixed(3)} units</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Invested</p>
                        <p className="font-medium">{formatCurrency(holding.invested)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Current Value</p>
                        <p className="font-medium">{formatCurrency(holding.currentValue)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Gains</p>
                        <p className="font-medium text-green-600">
                          {formatCurrency(holding.gains)}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Returns</p>
                        <p className="font-medium text-green-600">+{holding.gainPercentage}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Portfolio Value']} />
                    <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(1)}%`}
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Allocation Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allocationData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(item.value)}</p>
                        <p className="text-sm text-gray-600">
                          {((item.value / portfolioData.totalValue) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioDashboard;

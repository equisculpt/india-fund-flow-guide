
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Award, Target, BarChart3 } from 'lucide-react';

interface AttributionData {
  category: string;
  contribution: number;
  weight: number;
  return: number;
  benchmark: number;
  excess: number;
}

interface FundPerformance {
  fundName: string;
  contribution: number;
  weight: number;
  return: number;
  category: string;
}

const PerformanceAttributionAnalysis = () => {
  const [attributionData, setAttributionData] = useState<AttributionData[]>([]);
  const [fundPerformance, setFundPerformance] = useState<FundPerformance[]>([]);
  const [totalReturn] = useState(15.8);
  const [benchmarkReturn] = useState(12.5);

  useEffect(() => {
    generateAttributionData();
    generateFundPerformance();
  }, []);

  const generateAttributionData = () => {
    const data: AttributionData[] = [
      { category: 'Large Cap', contribution: 4.2, weight: 40, return: 10.5, benchmark: 9.8, excess: 0.7 },
      { category: 'Mid Cap', contribution: 6.5, weight: 30, return: 21.7, benchmark: 18.2, excess: 3.5 },
      { category: 'Small Cap', contribution: 3.8, weight: 20, return: 19.0, benchmark: 16.5, excess: 2.5 },
      { category: 'Debt', contribution: 1.3, weight: 10, return: 13.0, benchmark: 11.2, excess: 1.8 }
    ];
    setAttributionData(data);
  };

  const generateFundPerformance = () => {
    const data: FundPerformance[] = [
      { fundName: 'HDFC Top 100 Fund', contribution: 2.8, weight: 25, return: 11.2, category: 'Large Cap' },
      { fundName: 'Axis Bluechip Fund', contribution: 1.4, weight: 15, return: 9.3, category: 'Large Cap' },
      { fundName: 'Axis Midcap Fund', contribution: 4.2, weight: 20, return: 21.0, category: 'Mid Cap' },
      { fundName: 'SBI Midcap Fund', contribution: 2.3, weight: 10, return: 23.0, category: 'Mid Cap' },
      { fundName: 'Axis Small Cap Fund', contribution: 2.5, weight: 12, return: 20.8, category: 'Small Cap' },
      { fundName: 'SBI Small Cap Fund', contribution: 1.3, weight: 8, return: 16.3, category: 'Small Cap' },
      { fundName: 'HDFC Corporate Bond', contribution: 1.3, weight: 10, return: 13.0, category: 'Debt' }
    ];
    setFundPerformance(data);
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <CardTitle>Performance Attribution Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-600">Portfolio Return</h4>
              <p className="text-2xl font-bold text-green-600">{totalReturn}%</p>
            </div>
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-600">Benchmark Return</h4>
              <p className="text-2xl font-bold text-blue-600">{benchmarkReturn}%</p>
            </div>
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-600">Alpha Generated</h4>
              <p className="text-2xl font-bold text-purple-600">+{(totalReturn - benchmarkReturn).toFixed(1)}%</p>
            </div>
          </div>

          <Tabs defaultValue="category" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="category">By Category</TabsTrigger>
              <TabsTrigger value="fund">By Fund</TabsTrigger>
              <TabsTrigger value="factor">Factor Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="category">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Return Contribution by Category</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={attributionData}>
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}%`, 'Contribution']} />
                        <Bar dataKey="contribution" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Portfolio Allocation</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={attributionData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="weight"
                          label={({ category, weight }) => `${category}: ${weight}%`}
                        >
                          {attributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-4">Detailed Category Analysis</h4>
                <div className="space-y-3">
                  {attributionData.map((item, index) => (
                    <Card key={item.category} className="border-l-4" style={{ borderLeftColor: COLORS[index] }}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{item.category}</h5>
                          <Badge variant={item.excess > 0 ? "default" : "destructive"}>
                            {item.excess > 0 ? '+' : ''}{item.excess.toFixed(1)}% vs Benchmark
                          </Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Weight:</span>
                            <p className="font-medium">{item.weight}%</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Return:</span>
                            <p className="font-medium">{item.return}%</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Contribution:</span>
                            <p className="font-medium">{item.contribution}%</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Benchmark:</span>
                            <p className="font-medium">{item.benchmark}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="fund">
              <div>
                <h4 className="font-semibold mb-4">Individual Fund Performance</h4>
                <div className="space-y-3">
                  {fundPerformance.map((fund, index) => (
                    <Card key={fund.fundName}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h5 className="font-medium">{fund.fundName}</h5>
                            <p className="text-sm text-gray-600">{fund.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">{fund.contribution.toFixed(1)}%</p>
                            <p className="text-sm text-gray-600">Contribution</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Weight:</span>
                            <p className="font-medium">{fund.weight}%</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Return:</span>
                            <p className="font-medium">{fund.return}%</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Category:</span>
                            <p className="font-medium">{fund.category}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="factor">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-4">Style Factors</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Value vs Growth</span>
                        <Badge>Growth Tilt: +2.1%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Size Factor</span>
                        <Badge>Mid-cap Bias: +1.8%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Quality Factor</span>
                        <Badge>High Quality: +0.9%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Momentum Factor</span>
                        <Badge>Positive: +1.2%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-4">Risk Factors</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Market Risk</span>
                        <Badge variant="outline">Beta: 1.05</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Sector Concentration</span>
                        <Badge variant="outline">Moderate</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Currency Risk</span>
                        <Badge variant="outline">Low</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Liquidity Risk</span>
                        <Badge variant="outline">Low</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceAttributionAnalysis;

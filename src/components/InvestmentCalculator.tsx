
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const InvestmentCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = years * 12;
    const futureValue = monthlyInvestment * (((1 + monthlyRate) ** totalMonths - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvested = monthlyInvestment * totalMonths;
    const totalGains = futureValue - totalInvested;
    
    return {
      futureValue: Math.round(futureValue),
      totalInvested,
      totalGains: Math.round(totalGains)
    };
  };

  const generateChartData = () => {
    const data = [];
    for (let year = 1; year <= years; year++) {
      const monthlyRate = expectedReturn / 100 / 12;
      const totalMonths = year * 12;
      const futureValue = monthlyInvestment * (((1 + monthlyRate) ** totalMonths - 1) / monthlyRate) * (1 + monthlyRate);
      const totalInvested = monthlyInvestment * totalMonths;
      
      data.push({
        year,
        invested: totalInvested,
        value: Math.round(futureValue)
      });
    }
    return data;
  };

  const result = calculateSIP();
  const chartData = generateChartData();

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Investment Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="monthly-investment">Monthly Investment</Label>
            <div className="mt-2">
              <Input
                id="monthly-investment"
                type="number"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="text-lg"
              />
              <Slider
                value={[monthlyInvestment]}
                onValueChange={([value]) => setMonthlyInvestment(value)}
                max={50000}
                min={500}
                step={500}
                className="mt-3"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>₹500</span>
                <span>₹50,000</span>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="years">Investment Period (Years)</Label>
            <div className="mt-2">
              <Input
                id="years"
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="text-lg"
              />
              <Slider
                value={[years]}
                onValueChange={([value]) => setYears(value)}
                max={30}
                min={1}
                step={1}
                className="mt-3"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="expected-return">Expected Annual Return (%)</Label>
            <div className="mt-2">
              <Input
                id="expected-return"
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="text-lg"
              />
              <Slider
                value={[expectedReturn]}
                onValueChange={([value]) => setExpectedReturn(value)}
                max={20}
                min={8}
                step={0.5}
                className="mt-3"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>8%</span>
                <span>20%</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-3">Investment Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-blue-700">Total Invested:</span>
                <span className="font-semibold">₹{result.totalInvested.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Total Gains:</span>
                <span className="font-semibold text-green-600">₹{result.totalGains.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg border-t pt-2">
                <span className="text-blue-900 font-semibold">Maturity Value:</span>
                <span className="font-bold text-blue-900">₹{result.futureValue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Investment Growth Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `₹${Number(value).toLocaleString()}`,
                    name === 'invested' ? 'Total Invested' : 'Investment Value'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="invested" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentCalculator;

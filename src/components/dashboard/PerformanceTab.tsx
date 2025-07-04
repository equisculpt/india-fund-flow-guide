
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect } from "react";

interface PerformanceTabProps {
  formatCurrency: (amount: number) => string;
}

const PerformanceTab = ({ formatCurrency }: PerformanceTabProps) => {
  const performanceData = [
    { month: 'Jan', value: 25000 },
    { month: 'Feb', value: 32000 },
    { month: 'Mar', value: 45000 },
    { month: 'Apr', value: 52000 },
    { month: 'May', value: 68000 },
    { month: 'Jun', value: 75000 },
    { month: 'Jul', value: 85000 },
    { month: 'Aug', value: 92000 },
    { month: 'Sep', value: 98000 },
    { month: 'Oct', value: 102450 }
  ];

  useEffect(() => {
    console.log('PerformanceTab: Component mounted');
    console.log('PerformanceTab: Data:', performanceData);
    console.log('PerformanceTab: formatCurrency function:', typeof formatCurrency);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Performance Over Time</CardTitle>
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
  );
};

export default PerformanceTab;

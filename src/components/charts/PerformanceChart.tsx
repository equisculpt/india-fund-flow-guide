
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartDataPoint {
  date: string;
  fundPercentage: number;
  fundSIPValue: number;
  benchmarkPercentage?: number;
  benchmarkSIPValue?: number;
  comparison1Percentage?: number;
  comparison1SIPValue?: number;
  comparison2Percentage?: number;
  comparison2SIPValue?: number;
  formattedDate: string;
}

interface FundComparison {
  id: string;
  name: string;
  schemeCode: string;
  color: string;
  enabled: boolean;
}

interface PerformanceChartProps {
  chartData: ChartDataPoint[];
  fundComparisons: FundComparison[];
  showSIPChart: boolean;
}

const PerformanceChart = ({ chartData, fundComparisons, showSIPChart }: PerformanceChartProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    const data = payload[0]?.payload;
    if (!data) return null;

    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-medium mb-2">{new Date(data.date).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.name}:</span>
            <span className="font-medium">
              {showSIPChart 
                ? `₹${entry.value.toLocaleString()}`
                : `${entry.value >= 0 ? '+' : ''}${entry.value.toFixed(2)}%`
              }
            </span>
          </div>
        ))}
      </div>
    );
  };

  const formatYAxisValue = (value: number) => {
    if (showSIPChart) {
      if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
      if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
      return `₹${(value / 1000).toFixed(0)}K`;
    }
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickLine={{ stroke: '#e0e0e0' }}
          />
          <YAxis 
            tickFormatter={formatYAxisValue}
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickLine={{ stroke: '#e0e0e0' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          {/* Primary Fund Line */}
          <Line
            type="monotone"
            dataKey={showSIPChart ? "fundSIPValue" : "fundPercentage"}
            stroke="#3B82F6"
            strokeWidth={3}
            dot={false}
            name={fundComparisons[0]?.name.substring(0, 25) + '...' || "Primary Fund"}
            connectNulls={true}
          />
          
          {/* Comparison Lines */}
          {fundComparisons.slice(1).map((fund, index) => {
            if (!fund.enabled) return null;
            
            const dataKey = showSIPChart 
              ? index === 0 ? "benchmarkSIPValue" : index === 1 ? "comparison1SIPValue" : "comparison2SIPValue"
              : index === 0 ? "benchmarkPercentage" : index === 1 ? "comparison1Percentage" : "comparison2Percentage";
            
            return (
              <Line
                key={fund.id}
                type="monotone"
                dataKey={dataKey}
                stroke={fund.color}
                strokeWidth={2}
                dot={false}
                name={fund.name.substring(0, 25) + '...'}
                connectNulls={true}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;

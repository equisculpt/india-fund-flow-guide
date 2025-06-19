
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SIPPortfolioChartProps {
  chartData: any[];
  fundComparisons: any[];
  sipAmount: number;
}

const SIPPortfolioChart = ({ chartData, fundComparisons, sipAmount }: SIPPortfolioChartProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    const data = payload[0]?.payload;
    if (!data) return null;

    return (
      <div className="bg-white p-2 sm:p-3 border rounded-lg shadow-lg max-w-xs">
        <p className="font-medium mb-1 sm:mb-2 text-xs sm:text-sm">{new Date(data.date).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <div 
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="truncate">{entry.name.length > 20 ? entry.name.substring(0, 20) + '...' : entry.name}:</span>
            <span className="font-medium text-green-600 whitespace-nowrap">
              ₹{entry.value.toLocaleString()}
            </span>
          </div>
        ))}
        <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t text-xs text-gray-600">
          Monthly SIP: ₹{sipAmount.toLocaleString()}
        </div>
      </div>
    );
  };

  const formatYAxisValue = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="h-64 sm:h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 15, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            tick={{ fontSize: 10 }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickLine={{ stroke: '#e0e0e0' }}
            interval="preserveStartEnd"
          />
          <YAxis 
            tickFormatter={formatYAxisValue}
            tick={{ fontSize: 10 }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickLine={{ stroke: '#e0e0e0' }}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
            iconSize={12}
            formatter={(value) => value.length > 25 ? value.substring(0, 25) + '...' : value}
          />
          
          {/* Primary Fund SIP Portfolio Value */}
          <Line
            type="monotone"
            dataKey="fundSIPValue"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            name={fundComparisons[0]?.name.substring(0, 20) + '...' || "Primary Fund SIP Portfolio"}
            connectNulls={true}
          />
          
          {/* Comparison Fund SIP Portfolio Values */}
          {fundComparisons.slice(1).map((fund, index) => {
            if (!fund.enabled) return null;
            
            const dataKey = index === 0 ? "benchmarkSIPValue" : 
                           index === 1 ? "comparison1SIPValue" : "comparison2SIPValue";
            
            return (
              <Line
                key={fund.id}
                type="monotone"
                dataKey={dataKey}
                stroke={fund.color}
                strokeWidth={2}
                dot={false}
                name={fund.name.substring(0, 20) + '... SIP Portfolio'}
                connectNulls={true}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SIPPortfolioChart;

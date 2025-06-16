
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useSIPReturns, useSIPTransactions } from '@/hooks/useMutualFundAnalytics';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

interface SIPAnalyticsProps {
  fundId: string;
  fundName: string;
}

const SIPAnalytics = ({ fundId, fundName }: SIPAnalyticsProps) => {
  const { user } = useSupabaseAuth();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  
  const startDate = dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : format(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
  const endDate = dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');

  const { data: sipReturns, isLoading } = useSIPReturns(
    user?.id || '',
    fundId,
    startDate,
    endDate
  );

  const { data: sipTransactions } = useSIPTransactions(user?.id || '', fundId);

  const monthlyData = sipTransactions?.reduce((acc: any[], transaction) => {
    const month = format(new Date(transaction.transaction_date), 'MMM yyyy');
    const existing = acc.find(item => item.month === month);
    
    if (existing) {
      existing.amount += transaction.sip_amount;
      existing.units += transaction.units_allocated;
    } else {
      acc.push({
        month,
        amount: transaction.sip_amount,
        units: transaction.units_allocated
      });
    }
    
    return acc;
  }, []) || [];

  const pieData = sipReturns ? [
    { name: 'Invested Amount', value: sipReturns.total_invested, color: '#3B82F6' },
    { name: 'Returns', value: sipReturns.absolute_returns, color: sipReturns.absolute_returns >= 0 ? '#10B981' : '#EF4444' }
  ] : [];

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Please login to view SIP analytics
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>SIP Analytics - {fundName}</span>
            <DatePickerWithRange 
              dateRange={dateRange} 
              onDateRangeChange={setDateRange}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading SIP data...</div>
          ) : sipReturns ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-muted-foreground">Total Invested</div>
                    <div className="text-2xl font-bold text-blue-600">
                      ₹{sipReturns.total_invested.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-muted-foreground">Current Value</div>
                    <div className="text-2xl font-bold text-green-600">
                      ₹{sipReturns.current_value.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-sm text-muted-foreground">Total Units</div>
                    <div className="text-2xl font-bold text-purple-600">
                      {sipReturns.total_units.toFixed(3)}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <div className="text-sm text-muted-foreground">XIRR</div>
                    <div className="text-2xl font-bold text-amber-600">
                      {sipReturns.xirr.toFixed(2)}%
                    </div>
                  </div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Absolute Returns</div>
                  <div className={`text-3xl font-bold ${sipReturns.absolute_returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{sipReturns.absolute_returns.toLocaleString()}
                  </div>
                  <div className={`text-sm ${sipReturns.percentage_returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ({sipReturns.percentage_returns.toFixed(2)}%)
                  </div>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No SIP data found for this period
            </div>
          )}
        </CardContent>
      </Card>

      {monthlyData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Monthly SIP Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₹${value.toLocaleString()}`} />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === 'amount' ? `₹${value.toLocaleString()}` : value.toFixed(3),
                      name === 'amount' ? 'Amount' : 'Units'
                    ]}
                  />
                  <Bar dataKey="amount" fill="#3B82F6" name="amount" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SIPAnalytics;

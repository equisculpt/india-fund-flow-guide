
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { RotateCcw, Target, TrendingUp, AlertCircle } from 'lucide-react';

interface AllocationData {
  category: string;
  current: number;
  target: number;
  deviation: number;
  color: string;
}

interface RebalanceAction {
  id: string;
  action: 'BUY' | 'SELL' | 'SWITCH';
  fundName: string;
  amount: number;
  reason: string;
  priority: 'High' | 'Medium' | 'Low';
}

const AssetAllocationRebalancer = () => {
  const [allocationData, setAllocationData] = useState<AllocationData[]>([]);
  const [rebalanceActions, setRebalanceActions] = useState<RebalanceAction[]>([]);
  const [rebalanceThreshold] = useState(5); // 5% deviation threshold

  useEffect(() => {
    generateAllocationData();
    generateRebalanceActions();
  }, []);

  const generateAllocationData = () => {
    const data: AllocationData[] = [
      { category: 'Large Cap', current: 45, target: 40, deviation: 5, color: '#3B82F6' },
      { category: 'Mid Cap', current: 20, target: 25, deviation: -5, color: '#10B981' },
      { category: 'Small Cap', current: 15, target: 15, deviation: 0, color: '#F59E0B' },
      { category: 'Debt', current: 20, target: 20, deviation: 0, color: '#8B5CF6' }
    ];
    setAllocationData(data);
  };

  const generateRebalanceActions = () => {
    const actions: RebalanceAction[] = [
      {
        id: '1',
        action: 'SELL',
        fundName: 'HDFC Top 100 Fund',
        amount: 25000,
        reason: 'Large Cap allocation exceeds target by 5%',
        priority: 'High'
      },
      {
        id: '2',
        action: 'BUY',
        fundName: 'Axis Midcap Fund',
        amount: 25000,
        reason: 'Mid Cap allocation below target by 5%',
        priority: 'High'
      }
    ];
    setRebalanceActions(actions);
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'BUY': return 'bg-green-100 text-green-800';
      case 'SELL': return 'bg-red-100 text-red-800';
      case 'SWITCH': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const needsRebalancing = allocationData.some(item => Math.abs(item.deviation) >= rebalanceThreshold);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <CardTitle>Asset Allocation Rebalancer</CardTitle>
            </div>
            {needsRebalancing && (
              <Badge className="bg-orange-100 text-orange-800">
                <AlertCircle className="h-3 w-3 mr-1" />
                Rebalancing Needed
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-4">Current vs Target Allocation</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={allocationData}>
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="current" fill="#3B82F6" name="Current %" />
                    <Bar dataKey="target" fill="#10B981" name="Target %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Allocation Breakdown</h4>
              <div className="space-y-3">
                {allocationData.map((item) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.category}</span>
                      <span>{item.current}% (Target: {item.target}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={item.current} className="flex-1 h-2" />
                      {Math.abs(item.deviation) >= rebalanceThreshold && (
                        <Badge variant={item.deviation > 0 ? "destructive" : "default"} className="text-xs">
                          {item.deviation > 0 ? '+' : ''}{item.deviation}%
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {needsRebalancing && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Recommended Rebalancing Actions</h4>
                <Button className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Auto-Rebalance
                </Button>
              </div>

              <div className="space-y-3">
                {rebalanceActions.map((action) => (
                  <Card key={action.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getActionColor(action.action)}>{action.action}</Badge>
                          <span className="font-medium">{action.fundName}</span>
                          <Badge className={getPriorityColor(action.priority)}>{action.priority}</Badge>
                        </div>
                        <span className="font-bold text-lg">₹{action.amount.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{action.reason}</p>
                      <div className="flex gap-2">
                        <Button size="sm">Execute</Button>
                        <Button size="sm" variant="outline">Schedule</Button>
                        <Button size="sm" variant="ghost">Skip</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetAllocationRebalancer;

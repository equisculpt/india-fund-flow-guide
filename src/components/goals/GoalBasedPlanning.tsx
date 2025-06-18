
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface Goal {
  type: 'retirement' | 'education' | 'house' | 'emergency';
  targetAmount: number;
  timeHorizon: number;
  currentSavings: number;
  monthlyInvestment: number;
  expectedReturn: number;
}

const GoalBasedPlanning = () => {
  const [selectedGoal, setSelectedGoal] = useState<string>('retirement');
  const [goals, setGoals] = useState<Record<string, Goal>>({
    retirement: {
      type: 'retirement',
      targetAmount: 10000000,
      timeHorizon: 25,
      currentSavings: 500000,
      monthlyInvestment: 15000,
      expectedReturn: 12
    },
    education: {
      type: 'education',
      targetAmount: 2500000,
      timeHorizon: 15,
      currentSavings: 100000,
      monthlyInvestment: 8000,
      expectedReturn: 10
    },
    house: {
      type: 'house',
      targetAmount: 5000000,
      timeHorizon: 10,
      currentSavings: 300000,
      monthlyInvestment: 25000,
      expectedReturn: 9
    }
  });

  const calculateGoalProjection = (goal: Goal) => {
    const { currentSavings, monthlyInvestment, expectedReturn, timeHorizon } = goal;
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = timeHorizon * 12;
    
    // Future value of current savings
    const futureValueCurrentSavings = currentSavings * Math.pow(1 + monthlyRate, totalMonths);
    
    // Future value of monthly investments
    const futureValueMonthlyInvestments = monthlyInvestment * 
      (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
    
    const totalProjected = futureValueCurrentSavings + futureValueMonthlyInvestments;
    const shortfall = Math.max(0, goal.targetAmount - totalProjected);
    const surplusOrShortfall = totalProjected - goal.targetAmount;
    
    return {
      totalProjected,
      shortfall,
      surplusOrShortfall,
      isOnTrack: surplusOrShortfall >= 0
    };
  };

  const getAIRecommendations = (goal: Goal) => {
    const projection = calculateGoalProjection(goal);
    const recommendations = [];
    
    if (!projection.isOnTrack) {
      const requiredMonthlyIncrease = projection.shortfall / (goal.timeHorizon * 12);
      recommendations.push({
        type: 'increase_sip',
        message: `Increase monthly investment by ₹${requiredMonthlyIncrease.toFixed(0)} to meet your goal`,
        priority: 'high'
      });
      
      if (goal.expectedReturn < 12) {
        recommendations.push({
          type: 'asset_allocation',
          message: 'Consider increasing equity allocation for higher returns',
          priority: 'medium'
        });
      }
    } else {
      recommendations.push({
        type: 'on_track',
        message: 'You are on track to meet your goal!',
        priority: 'low'
      });
    }
    
    return recommendations;
  };

  const updateGoal = (goalType: string, field: keyof Goal, value: number) => {
    setGoals(prev => ({
      ...prev,
      [goalType]: {
        ...prev[goalType],
        [field]: value
      }
    }));
  };

  const currentGoal = goals[selectedGoal];
  const projection = calculateGoalProjection(currentGoal);
  const recommendations = getAIRecommendations(currentGoal);

  const allocationData = [
    { name: 'Equity', value: 70, color: '#3B82F6' },
    { name: 'Debt', value: 25, color: '#10B981' },
    { name: 'Gold', value: 5, color: '#F59E0B' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Goal-Based Investment Planning</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedGoal} onValueChange={setSelectedGoal}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="retirement">Retirement</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="house">House Purchase</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedGoal} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="targetAmount">Target Amount (₹)</Label>
                    <Input
                      id="targetAmount"
                      type="number"
                      value={currentGoal.targetAmount}
                      onChange={(e) => updateGoal(selectedGoal, 'targetAmount', Number(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="timeHorizon">Time Horizon (Years)</Label>
                    <Input
                      id="timeHorizon"
                      type="number"
                      value={currentGoal.timeHorizon}
                      onChange={(e) => updateGoal(selectedGoal, 'timeHorizon', Number(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="currentSavings">Current Savings (₹)</Label>
                    <Input
                      id="currentSavings"
                      type="number"
                      value={currentGoal.currentSavings}
                      onChange={(e) => updateGoal(selectedGoal, 'currentSavings', Number(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="monthlyInvestment">Monthly Investment (₹)</Label>
                    <Input
                      id="monthlyInvestment"
                      type="number"
                      value={currentGoal.monthlyInvestment}
                      onChange={(e) => updateGoal(selectedGoal, 'monthlyInvestment', Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Card className={`p-4 ${projection.isOnTrack ? 'bg-green-50' : 'bg-red-50'}`}>
                    <h4 className="font-semibold mb-2">Goal Projection</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Target Amount:</span>
                        <span>₹{currentGoal.targetAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Projected Amount:</span>
                        <span>₹{projection.totalProjected.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>{projection.isOnTrack ? 'Surplus:' : 'Shortfall:'}</span>
                        <span className={projection.isOnTrack ? 'text-green-600' : 'text-red-600'}>
                          ₹{Math.abs(projection.surplusOrShortfall).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">AI Recommendations</h4>
                    <div className="space-y-2">
                      {recommendations.map((rec, index) => (
                        <div key={index} className={`text-sm p-2 rounded ${
                          rec.priority === 'high' ? 'bg-red-100' :
                          rec.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                        }`}>
                          {rec.message}
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recommended Asset Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={allocationData}
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            dataKey="value"
                            label={({name, value}) => `${name} ${value}%`}
                          >
                            {allocationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Investment Growth Projection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        ₹{projection.totalProjected.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 mt-2">
                        Projected value in {currentGoal.timeHorizon} years
                      </div>
                      <Button className="mt-4 w-full">
                        Start Investing Now
                      </Button>
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

export default GoalBasedPlanning;

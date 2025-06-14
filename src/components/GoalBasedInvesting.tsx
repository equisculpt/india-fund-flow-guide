
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Home, GraduationCap, Car, Plane, Baby, Heart } from "lucide-react";

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  timeline: number;
  icon: React.ReactNode;
  category: string;
}

const GoalBasedInvesting = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      name: 'Dream Home',
      targetAmount: 5000000,
      currentAmount: 750000,
      timeline: 7,
      icon: <Home className="h-6 w-6" />,
      category: 'home'
    },
    {
      id: '2',
      name: 'Child Education',
      targetAmount: 2500000,
      currentAmount: 320000,
      timeline: 12,
      icon: <GraduationCap className="h-6 w-6" />,
      category: 'education'
    },
    {
      id: '3',
      name: 'Car Purchase',
      targetAmount: 800000,
      currentAmount: 150000,
      timeline: 3,
      icon: <Car className="h-6 w-6" />,
      category: 'vehicle'
    }
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    timeline: '',
    category: ''
  });

  const goalIcons = {
    home: <Home className="h-6 w-6" />,
    education: <GraduationCap className="h-6 w-6" />,
    vehicle: <Car className="h-6 w-6" />,
    vacation: <Plane className="h-6 w-6" />,
    baby: <Baby className="h-6 w-6" />,
    emergency: <Heart className="h-6 w-6" />
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const calculateMonthlySIP = (target: number, current: number, years: number) => {
    const monthsRemaining = years * 12;
    const amountNeeded = target - current;
    const annualReturn = 0.12; // Assuming 12% annual return
    const monthlyReturn = annualReturn / 12;
    
    const sip = (amountNeeded * monthlyReturn) / ((Math.pow(1 + monthlyReturn, monthsRemaining) - 1));
    return Math.round(sip);
  };

  const addNewGoal = () => {
    if (newGoal.name && newGoal.targetAmount && newGoal.timeline && newGoal.category) {
      const goal: Goal = {
        id: Date.now().toString(),
        name: newGoal.name,
        targetAmount: parseInt(newGoal.targetAmount),
        currentAmount: 0,
        timeline: parseInt(newGoal.timeline),
        icon: goalIcons[newGoal.category as keyof typeof goalIcons],
        category: newGoal.category
      };
      
      setGoals([...goals, goal]);
      setNewGoal({ name: '', targetAmount: '', timeline: '', category: '' });
      setShowAddGoal(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Goal-Based Investing</h2>
        <Button onClick={() => setShowAddGoal(true)} className="bg-blue-600 hover:bg-blue-700">
          Add New Goal
        </Button>
      </div>

      {showAddGoal && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Goal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="goal-name">Goal Name</Label>
                <Input
                  id="goal-name"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                  placeholder="e.g., Dream Home"
                />
              </div>
              <div>
                <Label htmlFor="goal-category">Category</Label>
                <Select value={newGoal.category} onValueChange={(value) => setNewGoal({...newGoal, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="vehicle">Vehicle</SelectItem>
                    <SelectItem value="vacation">Vacation</SelectItem>
                    <SelectItem value="baby">Baby Planning</SelectItem>
                    <SelectItem value="emergency">Emergency Fund</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="target-amount">Target Amount (₹)</Label>
                <Input
                  id="target-amount"
                  type="number"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                  placeholder="5000000"
                />
              </div>
              <div>
                <Label htmlFor="timeline">Timeline (Years)</Label>
                <Input
                  id="timeline"
                  type="number"
                  value={newGoal.timeline}
                  onChange={(e) => setNewGoal({...newGoal, timeline: e.target.value})}
                  placeholder="7"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={addNewGoal}>Add Goal</Button>
              <Button variant="outline" onClick={() => setShowAddGoal(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <Card key={goal.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  {goal.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{goal.name}</CardTitle>
                  <p className="text-sm text-gray-600">{goal.timeline} years</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{calculateProgress(goal.currentAmount, goal.targetAmount).toFixed(1)}%</span>
                </div>
                <Progress value={calculateProgress(goal.currentAmount, goal.targetAmount)} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current:</span>
                  <span className="font-medium">₹{goal.currentAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Target:</span>
                  <span className="font-medium">₹{goal.targetAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Required SIP:</span>
                  <span className="font-medium text-blue-600">
                    ₹{calculateMonthlySIP(goal.targetAmount, goal.currentAmount, goal.timeline).toLocaleString()}/month
                  </span>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <Button size="sm" className="w-full">Start SIP for this Goal</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GoalBasedInvesting;

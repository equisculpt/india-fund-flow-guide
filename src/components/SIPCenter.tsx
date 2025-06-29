
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Clock, 
  Play, 
  Pause, 
  StopCircle, 
  Plus, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Edit,
  Download,
  Target,
  Zap
} from 'lucide-react';
import { TEST_USER_DATA } from '@/services/testData';

const SIPCenter = () => {
  const [selectedSIP, setSelectedSIP] = useState<string | null>(null);
  
  // Mock SIP data - will be replaced with BSE STAR MF API
  const activeSIPs = [
    {
      id: 'sip-1',
      fundName: 'HDFC Top 100 Fund',
      amount: 5000,
      frequency: 'Monthly',
      nextDate: '2025-01-15',
      startDate: '2024-01-15',
      totalInstallments: 12,
      completedInstallments: 12,
      totalInvested: 60000,
      currentValue: 78500,
      returns: 30.8,
      xirr: 22.5,
      status: 'Active',
      consistencyScore: 95,
      missedPayments: 0,
      bseOrderId: 'BSE123456789', // BSE STAR MF reference
      mandateId: 'MANDATE001'
    },
    {
      id: 'sip-2',
      fundName: 'SBI Small Cap Fund',
      amount: 3000,
      frequency: 'Monthly',
      nextDate: '2025-01-20',
      startDate: '2024-02-20',
      totalInstallments: 11,
      completedInstallments: 10,
      totalInvested: 30000,
      currentValue: 35250,
      returns: 17.5,
      xirr: 19.8,
      status: 'Active',
      consistencyScore: 90,
      missedPayments: 1,
      bseOrderId: 'BSE123456790',
      mandateId: 'MANDATE002'
    },
    {
      id: 'sip-3',
      fundName: 'Axis Bluechip Fund',
      amount: 2000,
      frequency: 'Monthly',
      nextDate: '2025-01-10',
      startDate: '2024-03-10',
      totalInstallments: 10,
      completedInstallments: 10,
      totalInvested: 20000,
      currentValue: 23120,
      returns: 15.6,
      xirr: 14.2,
      status: 'Paused',
      consistencyScore: 100,
      missedPayments: 0,
      bseOrderId: 'BSE123456791',
      mandateId: 'MANDATE003'
    }
  ];

  const upcomingSIPs = [
    { date: '2025-01-10', funds: ['Axis Bluechip Fund'], amount: 2000 },
    { date: '2025-01-15', funds: ['HDFC Top 100 Fund'], amount: 5000 },
    { date: '2025-01-20', funds: ['SBI Small Cap Fund'], amount: 3000 }
  ];

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Stopped': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConsistencyBadge = (score: number) => {
    if (score >= 95) return { label: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (score >= 80) return { label: 'Good', color: 'bg-blue-100 text-blue-800' };
    if (score >= 60) return { label: 'Average', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Poor', color: 'bg-red-100 text-red-800' };
  };

  // BSE STAR MF API placeholder functions
  const handlePauseSIP = async (sipId: string) => {
    console.log('BSE STAR MF API: Pause SIP', sipId);
    // Placeholder for: POST /api/bse/sip/pause
  };

  const handleStopSIP = async (sipId: string) => {
    console.log('BSE STAR MF API: Stop SIP', sipId);
    // Placeholder for: POST /api/bse/sip/stop
  };

  const handleModifySIP = async (sipId: string, newAmount: number) => {
    console.log('BSE STAR MF API: Modify SIP', sipId, newAmount);
    // Placeholder for: PUT /api/bse/sip/modify
  };

  const handleStartNewSIP = async () => {
    console.log('BSE STAR MF API: Start new SIP');
    // Placeholder for: POST /api/bse/sip/create
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">SIP Center</h2>
          <p className="text-gray-600 mt-1">Manage your systematic investment plans</p>
        </div>
        <Button onClick={handleStartNewSIP} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Start New SIP
        </Button>
      </div>

      {/* SIP Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Active SIPs</p>
                <p className="text-3xl font-bold text-blue-900">{activeSIPs.filter(s => s.status === 'Active').length}</p>
              </div>
              <Play className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Monthly Investment</p>
                <p className="text-3xl font-bold text-green-900">₹10,000</p>
              </div>
              <Calendar className="h-10 w-10 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Total Invested</p>
                <p className="text-3xl font-bold text-purple-900">₹1,10,000</p>
              </div>
              <TrendingUp className="h-10 w-10 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700 font-medium">Current Value</p>
                <p className="text-3xl font-bold text-emerald-900 mb-1">₹1,36,870</p>
                <span className="text-sm text-emerald-700 bg-emerald-200 px-2 py-1 rounded-full">
                  +24.4%
                </span>
              </div>
              <div className="text-right">
                <Zap className="h-10 w-10 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Smart Alerts */}
      <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-orange-900 mb-2">AI SIP Insights</h3>
              <div className="space-y-2 text-sm text-orange-800">
                <p>• Your SIP consistency score is excellent at 95% - keep it up!</p>
                <p>• Consider increasing SBI Small Cap Fund SIP by ₹1,000 for better portfolio balance</p>
                <p>• Your average SIP return (XIRR: 18.8%) beats 76% of platform users</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="active-sips" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active-sips">Active SIPs</TabsTrigger>
          <TabsTrigger value="sip-calendar">SIP Calendar</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="settings">SIP Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="active-sips">
          <div className="space-y-4">
            {activeSIPs.map((sip) => (
              <Card key={sip.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{sip.fundName}</h3>
                        <Badge className={getStatusColor(sip.status)}>
                          {sip.status}
                        </Badge>
                        {sip.status === 'Active' && (
                          <Badge className={getConsistencyBadge(sip.consistencyScore).color}>
                            {getConsistencyBadge(sip.consistencyScore).label}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatCurrency(sip.amount)}/{sip.frequency}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Next: {sip.nextDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          {sip.completedInstallments}/{sip.totalInstallments} completed
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">XIRR</div>
                      <div className="text-lg font-bold text-green-600">{sip.xirr}%</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Invested</p>
                      <p className="text-lg font-semibold">{formatCurrency(sip.totalInvested)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Current Value</p>
                      <p className="text-lg font-semibold">{formatCurrency(sip.currentValue)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Returns</p>
                      <p className="text-lg font-semibold text-green-600">+{sip.returns}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Consistency</p>
                      <div className="flex items-center gap-2">
                        <Progress value={sip.consistencyScore} className="h-2 flex-1" />
                        <span className="text-sm font-medium">{sip.consistencyScore}%</span>
                      </div>
                    </div>
                  </div>

                  {sip.missedPayments > 0 && (
                    <div className="flex items-center gap-2 mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800">
                        {sip.missedPayments} missed payment(s) - Enable auto-debit for better consistency
                      </span>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4 border-t">
                    {sip.status === 'Active' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePauseSIP(sip.id)}
                      >
                        <Pause className="h-4 w-4 mr-2" />
                        Pause SIP
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePauseSIP(sip.id)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Resume SIP
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleStopSIP(sip.id)}
                    >
                      <StopCircle className="h-4 w-4 mr-2" />
                      Stop SIP
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleModifySIP(sip.id, sip.amount)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Modify Amount
                    </Button>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500 mt-2">
                    BSE Order ID: {sip.bseOrderId} | Mandate: {sip.mandateId}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sip-calendar">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming SIP Dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSIPs.map((upcoming, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-600 text-white p-2 rounded-lg">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900">{upcoming.date}</div>
                        <div className="text-sm text-blue-700">
                          {upcoming.funds.join(', ')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-900">{formatCurrency(upcoming.amount)}</div>
                      <div className="text-xs text-blue-600">Auto-debit scheduled</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>SIP Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-medium">Average XIRR</span>
                    <span className="font-bold text-green-600 text-xl">18.8%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium">Platform Percentile</span>
                    <span className="font-bold text-blue-600">76th</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <span className="font-medium">Consistency Score</span>
                    <span className="font-bold text-purple-600">95%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                    <span className="font-medium">Best Performing SIP</span>
                    <span className="font-bold text-orange-600">HDFC Top 100</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SIP Streaks & Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <CheckCircle className="h-6 w-6 text-yellow-600" />
                    <div>
                      <div className="font-semibold text-yellow-900">12-Month Streak</div>
                      <div className="text-sm text-yellow-700">Eligible for loyalty bonus</div>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900 mb-1">₹500</div>
                    <div className="text-sm text-blue-700">Consistency Reward Earned</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Default SIP Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Default SIP Amount</label>
                    <input 
                      type="number" 
                      className="w-full mt-1 p-2 border rounded-lg" 
                      defaultValue={5000}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Preferred SIP Date</label>
                    <select className="w-full mt-1 p-2 border rounded-lg">
                      <option>1st of every month</option>
                      <option>15th of every month</option>
                      <option>Last day of month</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Auto-increase SIP</label>
                    <select className="w-full mt-1 p-2 border rounded-lg">
                      <option>Disabled</option>
                      <option>10% annually</option>
                      <option>15% annually</option>
                      <option>20% annually</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>SIP due reminders</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Failed SIP alerts</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Performance updates</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>AI recommendations</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Compliance Footer */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <p className="text-xs text-gray-600 text-center">
            All SIP transactions are processed via BSE STAR MF. Mutual fund investments are subject to market risk. 
            Please read scheme-related documents carefully. AI insights are for informational purposes only and do not constitute investment advice.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SIPCenter;

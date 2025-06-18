
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserPlus, Search, TrendingUp, AlertCircle, Phone, Mail, Calendar } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  portfolioValue: number;
  monthlyInvestment: number;
  riskProfile: 'Conservative' | 'Moderate' | 'Aggressive';
  lastActivity: string;
  status: 'Active' | 'Inactive' | 'Needs Attention';
  joinDate: string;
  totalReturns: number;
  kycStatus: 'Completed' | 'Pending' | 'Required';
}

interface ClientAlert {
  id: string;
  clientId: string;
  clientName: string;
  type: 'goal_deviation' | 'poor_performance' | 'kyc_expiry' | 'missed_sip';
  message: string;
  priority: 'High' | 'Medium' | 'Low';
  timestamp: string;
}

const AgentClientManager = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [clientAlerts, setClientAlerts] = useState<ClientAlert[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    loadClients();
    loadClientAlerts();
  }, []);

  const loadClients = () => {
    const mockClients: Client[] = [
      {
        id: '1',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@email.com',
        phone: '+91 98765 43210',
        portfolioValue: 850000,
        monthlyInvestment: 25000,
        riskProfile: 'Moderate',
        lastActivity: '2024-01-15',
        status: 'Active',
        joinDate: '2023-03-15',
        totalReturns: 15.8,
        kycStatus: 'Completed'
      },
      {
        id: '2',
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        phone: '+91 87654 32109',
        portfolioValue: 1200000,
        monthlyInvestment: 35000,
        riskProfile: 'Aggressive',
        lastActivity: '2024-01-14',
        status: 'Needs Attention',
        joinDate: '2022-08-20',
        totalReturns: 12.3,
        kycStatus: 'Pending'
      },
      {
        id: '3',
        name: 'Amit Patel',
        email: 'amit.patel@email.com',
        phone: '+91 76543 21098',
        portfolioValue: 650000,
        monthlyInvestment: 20000,
        riskProfile: 'Conservative',
        lastActivity: '2024-01-10',
        status: 'Active',
        joinDate: '2023-01-10',
        totalReturns: 18.2,
        kycStatus: 'Completed'
      }
    ];
    setClients(mockClients);
  };

  const loadClientAlerts = () => {
    const alerts: ClientAlert[] = [
      {
        id: '1',
        clientId: '2',
        clientName: 'Priya Sharma',
        type: 'kyc_expiry',
        message: 'KYC documents pending update - compliance risk',
        priority: 'High',
        timestamp: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        clientId: '1',
        clientName: 'Rajesh Kumar',
        type: 'goal_deviation',
        message: 'Portfolio allocation deviating from retirement goal',
        priority: 'Medium',
        timestamp: '2024-01-14T15:45:00Z'
      },
      {
        id: '3',
        clientId: '3',
        clientName: 'Amit Patel',
        type: 'poor_performance',
        message: 'Portfolio underperforming benchmark for 3 months',
        priority: 'Medium',
        timestamp: '2024-01-13T09:20:00Z'
      }
    ];
    setClientAlerts(alerts);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Needs Attention': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Conservative': return 'bg-blue-100 text-blue-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Aggressive': return 'bg-red-100 text-red-800';
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

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'active') return matchesSearch && client.status === 'Active';
    if (selectedFilter === 'attention') return matchesSearch && client.status === 'Needs Attention';
    if (selectedFilter === 'high_value') return matchesSearch && client.portfolioValue > 1000000;
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <CardTitle>Client Management Dashboard</CardTitle>
            </div>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add New Client
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-600">Total Clients</h4>
              <p className="text-2xl font-bold text-blue-600">{clients.length}</p>
            </div>
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-600">AUM</h4>
              <p className="text-2xl font-bold text-green-600">₹{(clients.reduce((sum, c) => sum + c.portfolioValue, 0) / 100000).toFixed(1)}L</p>
            </div>
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-600">Monthly SIP</h4>
              <p className="text-2xl font-bold text-purple-600">₹{(clients.reduce((sum, c) => sum + c.monthlyInvestment, 0) / 1000)}K</p>
            </div>
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-600">Alerts</h4>
              <p className="text-2xl font-bold text-red-600">{clientAlerts.length}</p>
            </div>
          </div>

          <Tabs defaultValue="clients" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="clients">Client List</TabsTrigger>
              <TabsTrigger value="alerts">Client Alerts</TabsTrigger>
              <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="clients">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder="Search clients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={selectedFilter === 'all' ? 'default' : 'outline'}
                      onClick={() => setSelectedFilter('all')}
                      size="sm"
                    >
                      All
                    </Button>
                    <Button 
                      variant={selectedFilter === 'active' ? 'default' : 'outline'}
                      onClick={() => setSelectedFilter('active')}
                      size="sm"
                    >
                      Active
                    </Button>
                    <Button 
                      variant={selectedFilter === 'attention' ? 'default' : 'outline'}
                      onClick={() => setSelectedFilter('attention')}
                      size="sm"
                    >
                      Needs Attention
                    </Button>
                    <Button 
                      variant={selectedFilter === 'high_value' ? 'default' : 'outline'}
                      onClick={() => setSelectedFilter('high_value')}
                      size="sm"
                    >
                      High Value
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredClients.map((client) => (
                    <Card key={client.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{client.name}</h4>
                              <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                              <Badge className={getRiskColor(client.riskProfile)}>{client.riskProfile}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {client.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {client.phone}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">₹{(client.portfolioValue / 100000).toFixed(1)}L</p>
                            <p className="text-sm text-gray-600">Portfolio Value</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                          <div>
                            <span className="text-gray-600">Monthly SIP:</span>
                            <p className="font-medium">₹{client.monthlyInvestment.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Returns:</span>
                            <p className="font-medium text-green-600">{client.totalReturns}%</p>
                          </div>
                          <div>
                            <span className="text-gray-600">KYC Status:</span>
                            <p className="font-medium">{client.kycStatus}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Last Activity:</span>
                            <p className="font-medium">{new Date(client.lastActivity).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm">View Portfolio</Button>
                          <Button size="sm" variant="outline">Send Report</Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="h-3 w-3 mr-1" />
                            Schedule Meeting
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="alerts">
              <div className="space-y-4">
                {clientAlerts.map((alert) => (
                  <Card key={alert.id} className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <h4 className="font-semibold">{alert.clientName}</h4>
                          <Badge className={getPriorityColor(alert.priority)}>{alert.priority}</Badge>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(alert.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{alert.message}</p>
                      <div className="flex gap-2">
                        <Button size="sm">Take Action</Button>
                        <Button size="sm" variant="outline">Contact Client</Button>
                        <Button size="sm" variant="ghost">Mark as Resolved</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-4">Client Performance Summary</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Average Portfolio Return:</span>
                        <span className="font-semibold text-green-600">15.4%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Clients Beating Benchmark:</span>
                        <span className="font-semibold">78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active SIP Rate:</span>
                        <span className="font-semibold">92%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Client Retention Rate:</span>
                        <span className="font-semibold">95%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-4">Commission Summary</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>This Month:</span>
                        <span className="font-semibold text-blue-600">₹28,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Month:</span>
                        <span className="font-semibold">₹31,200</span>
                      </div>
                      <div className="flex justify-between">
                        <span>YTD Total:</span>
                        <span className="font-semibold">₹3,42,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Projected Annual:</span>
                        <span className="font-semibold text-green-600">₹4,20,000</span>
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

export default AgentClientManager;

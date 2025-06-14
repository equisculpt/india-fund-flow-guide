
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, DollarSign, Percent } from "lucide-react";
import BreweryLogo from "./BreweryLogo";

const AgentDashboard = () => {
  // Mock data - in real app, this would come from API
  const agentStats = {
    totalClients: 45,
    totalInvestments: 2850000,
    monthlyCommission: 28500,
    commissionRate: 1.0
  };

  const clients = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.k@email.com",
      totalInvestment: 125000,
      monthlyCommission: 1250,
      sipCount: 3,
      status: "Active"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.s@email.com",
      totalInvestment: 85000,
      monthlyCommission: 850,
      sipCount: 2,
      status: "Active"
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit.p@email.com",
      totalInvestment: 200000,
      monthlyCommission: 2000,
      sipCount: 5,
      status: "Active"
    },
    {
      id: 4,
      name: "Neha Singh",
      email: "neha.s@email.com",
      totalInvestment: 75000,
      monthlyCommission: 750,
      sipCount: 2,
      status: "Inactive"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <BreweryLogo size="md" />
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Agent Dashboard</span>
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Agent Dashboard</h1>
          <p className="text-gray-600">Monitor your clients and commission earnings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agentStats.totalClients}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{(agentStats.totalInvestments / 100000).toFixed(1)}L</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Commission</CardTitle>
              <DollarSign className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{agentStats.monthlyCommission.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Current month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commission Rate</CardTitle>
              <Percent className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agentStats.commissionRate}%</div>
              <p className="text-xs text-muted-foreground">Set by admin</p>
            </CardContent>
          </Card>
        </div>

        {/* Clients Table */}
        <Card>
          <CardHeader>
            <CardTitle>Client Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Total Investment</TableHead>
                  <TableHead>SIP Count</TableHead>
                  <TableHead>Monthly Commission</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>₹{client.totalInvestment.toLocaleString()}</TableCell>
                    <TableCell>{client.sipCount}</TableCell>
                    <TableCell>₹{client.monthlyCommission.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={client.status === "Active" ? "default" : "secondary"}
                        className={client.status === "Active" ? "bg-green-100 text-green-800" : ""}
                      >
                        {client.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentDashboard;

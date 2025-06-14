
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Eye, Send, TrendingUp, Users, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalInvestment: number;
  monthlyReturns: number;
  riskProfile: 'Conservative' | 'Moderate' | 'Aggressive';
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate: string;
  lastLogin: string;
}

const ClientManagement = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh@email.com',
      phone: '+91-9876543210',
      totalInvestment: 250000,
      monthlyReturns: 3750,
      riskProfile: 'Moderate',
      status: 'Active',
      joinDate: '2024-01-15',
      lastLogin: '2024-06-13'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya@email.com',
      phone: '+91-9876543211',
      totalInvestment: 150000,
      monthlyReturns: 2250,
      riskProfile: 'Conservative',
      status: 'Active',
      joinDate: '2024-02-20',
      lastLogin: '2024-06-12'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const { toast } = useToast();

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalClients = clients.length;
  const totalAUM = clients.reduce((sum, client) => sum + client.totalInvestment, 0);
  const averageInvestment = totalAUM / totalClients;

  const handleSendMessage = (clientId: string) => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the client via WhatsApp.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalAUM / 100000).toFixed(1)}L</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Investment</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(averageInvestment / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">Per client</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Client Management</CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {filteredClients.map((client) => (
              <div key={client.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="font-medium">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.email}</p>
                      <p className="text-sm text-gray-600">{client.phone}</p>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <div className="font-semibold">₹{(client.totalInvestment / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-green-600">+₹{client.monthlyReturns}/month</div>
                    <Badge variant={client.status === 'Active' ? 'default' : 'secondary'}>
                      {client.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedClient(client)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleSendMessage(client.id)}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                  <span>Risk Profile: {client.riskProfile}</span>
                  <span>Joined: {new Date(client.joinDate).toLocaleDateString()}</span>
                  <span>Last Login: {new Date(client.lastLogin).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientManagement;

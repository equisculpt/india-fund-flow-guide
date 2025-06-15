
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Search, Edit, Users, DollarSign } from 'lucide-react';

interface AgentData {
  id: string;
  full_name: string;
  phone?: string;
  commission_rate: number;
  is_active: boolean;
  created_at: string;
  client_count: number;
  total_commission: number;
  pending_commission: number;
}

const AgentManagementTab = () => {
  const [agents, setAgents] = useState<AgentData[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<AgentData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingAgent, setEditingAgent] = useState<AgentData | null>(null);
  const [newCommissionRate, setNewCommissionRate] = useState<number>(80);
  const { toast } = useToast();

  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    const filtered = agents.filter(agent =>
      agent.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.phone?.includes(searchTerm)
    );
    setFilteredAgents(filtered);
  }, [searchTerm, agents]);

  const fetchAgents = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          clients:profiles!profiles_agent_id_fkey(count),
          commissions(calculated_commission, status)
        `)
        .eq('user_type', 'agent')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedAgents = data?.map(agent => {
        const totalCommission = agent.commissions?.reduce((sum: number, comm: any) => sum + (comm.calculated_commission || 0), 0) || 0;
        const pendingCommission = agent.commissions?.filter((c: any) => c.status === 'pending').reduce((sum: number, comm: any) => sum + (comm.calculated_commission || 0), 0) || 0;
        
        return {
          ...agent,
          client_count: agent.clients?.[0]?.count || 0,
          total_commission: totalCommission,
          pending_commission: pendingCommission,
        };
      }) || [];

      setAgents(formattedAgents);
    } catch (error) {
      console.error('Error fetching agents:', error);
      toast({
        title: "Error",
        description: "Failed to fetch agents",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCommissionRate = async (agentId: string, newRate: number) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ commission_rate: newRate })
        .eq('id', agentId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Commission rate updated successfully",
      });

      fetchAgents();
      setEditingAgent(null);
    } catch (error) {
      console.error('Error updating commission rate:', error);
      toast({
        title: "Error",
        description: "Failed to update commission rate",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading agents...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Management</CardTitle>
        <CardDescription>Manage agents, their commission rates, and client relationships</CardDescription>
        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4" />
          <Input
            placeholder="Search agents by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Commission Rate</TableHead>
              <TableHead>Clients</TableHead>
              <TableHead>Total Commission</TableHead>
              <TableHead>Pending Commission</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell className="font-medium">{agent.full_name}</TableCell>
                <TableCell>{agent.phone || 'Not provided'}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {agent.commission_rate}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{agent.client_count}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>₹{agent.total_commission.toLocaleString()}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>₹{agent.pending_commission.toLocaleString()}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={agent.is_active ? 'default' : 'destructive'}>
                    {agent.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingAgent(agent);
                          setNewCommissionRate(agent.commission_rate);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Commission Rate - {agent.full_name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="commission-rate">Commission Rate (%)</Label>
                          <Input
                            id="commission-rate"
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            value={newCommissionRate}
                            onChange={(e) => setNewCommissionRate(parseFloat(e.target.value))}
                          />
                        </div>
                        <Button
                          onClick={() => updateCommissionRate(agent.id, newCommissionRate)}
                          className="w-full"
                        >
                          Update Commission Rate
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredAgents.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            No agents found matching your search criteria
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AgentManagementTab;

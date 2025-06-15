
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Search, Phone } from 'lucide-react';

interface UserData {
  id: string;
  full_name: string;
  phone?: string;
  pan_number?: string;
  kyc_status: string;
  user_type: string;
  is_active: boolean;
  created_at: string;
  agent_id?: string;
  agent_name?: string;
  total_investments?: number;
}

const UserManagementTab = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm) ||
      user.pan_number?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      // First get all customer profiles
      const { data: customers, error: customersError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'customer')
        .order('created_at', { ascending: false });

      if (customersError) throw customersError;

      // Then get agent names for those who have agents
      const customersWithAgents = await Promise.all(
        customers?.map(async (customer) => {
          let agentName = null;
          
          if (customer.agent_id) {
            const { data: agent } = await supabase
              .from('profiles')
              .select('full_name')
              .eq('id', customer.agent_id)
              .single();
            
            agentName = agent?.full_name;
          }

          // Get total investments
          const { data: investments } = await supabase
            .from('investments')
            .select('total_invested')
            .eq('user_id', customer.id);

          const totalInvestments = investments?.reduce((sum, inv) => sum + (inv.total_invested || 0), 0) || 0;

          return {
            ...customer,
            agent_name: agentName,
            total_investments: totalInvestments
          };
        }) || []
      );

      setUsers(customersWithAgents);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_active: isActive })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      });

      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage all customers and their details</CardDescription>
        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4" />
          <Input
            placeholder="Search users by name, phone, or PAN..."
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
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>PAN</TableHead>
              <TableHead>KYC Status</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Total Investment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.full_name}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {user.phone && (
                      <div className="flex items-center space-x-1">
                        <Phone className="w-3 h-3" />
                        <span className="text-sm">{user.phone}</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{user.pan_number || 'Not provided'}</TableCell>
                <TableCell>
                  <Badge variant={user.kyc_status === 'verified' ? 'default' : 'secondary'}>
                    {user.kyc_status}
                  </Badge>
                </TableCell>
                <TableCell>{user.agent_name || 'Direct'}</TableCell>
                <TableCell>₹{user.total_investments?.toLocaleString() || '0'}</TableCell>
                <TableCell>
                  <Badge variant={user.is_active ? 'default' : 'destructive'}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateUserStatus(user.id, !user.is_active)}
                    >
                      {user.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredUsers.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            No users found matching your search criteria
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserManagementTab;

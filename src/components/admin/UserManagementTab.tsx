
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Search, Phone, AlertCircle } from 'lucide-react';

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
  const [error, setError] = useState<string | null>(null);
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
      console.log('Fetching users...');
      setError(null);
      
      // Try a simple query first to test if policies work
      const { data: customers, error: customersError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'customer')
        .order('created_at', { ascending: false });

      if (customersError) {
        console.error('Customers error:', customersError);
        setError(`Failed to fetch users: ${customersError.message}`);
        
        // Show a more user-friendly error
        if (customersError.message.includes('infinite recursion')) {
          setError('Database policy issue detected. Admin access may be limited. Please contact system administrator.');
        }
        
        toast({
          title: "Error",
          description: "Failed to fetch users due to database configuration issues",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      console.log('Customers fetched successfully:', customers?.length || 0);

      if (!customers || customers.length === 0) {
        setUsers([]);
        setLoading(false);
        return;
      }

      // Process users with additional data
      const usersWithDetails = await Promise.all(
        customers.map(async (customer) => {
          let agentName = null;
          let totalInvestments = 0;
          
          // Try to get agent name if agent_id exists
          if (customer.agent_id) {
            try {
              const { data: agent } = await supabase
                .from('profiles')
                .select('full_name')
                .eq('id', customer.agent_id)
                .single();
              
              agentName = agent?.full_name;
            } catch (error) {
              console.warn('Could not fetch agent name:', error);
            }
          }

          // Try to get total investments
          try {
            const { data: investments } = await supabase
              .from('investments')
              .select('total_invested')
              .eq('user_id', customer.id);

            totalInvestments = investments?.reduce((sum, inv) => sum + (inv.total_invested || 0), 0) || 0;
          } catch (error) {
            console.warn('Could not fetch investments for user:', customer.id, error);
          }

          return {
            ...customer,
            agent_name: agentName,
            total_investments: totalInvestments
          };
        })
      );

      setUsers(usersWithDetails);
      console.log('Users processed successfully:', usersWithDetails.length);
      
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(`Unexpected error: ${error.message}`);
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
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-lg">Loading users...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            User Management Error
          </CardTitle>
          <CardDescription>
            There was an issue accessing user data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 mb-4">{error}</p>
            <Button onClick={fetchUsers} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
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
        {users.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No users found in the system</p>
            <Button onClick={fetchUsers} variant="outline" className="mt-4">
              Refresh
            </Button>
          </div>
        ) : (
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
        )}
        {filteredUsers.length === 0 && users.length > 0 && (
          <div className="text-center py-4 text-muted-foreground">
            No users found matching your search criteria
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserManagementTab;

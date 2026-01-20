
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { mockProfiles, mockInvestments } from '@/services/mockDatabase';
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
    setError(null);
    
    // Use mock data for prototype
    const customers = mockProfiles.filter(p => p.user_type === 'customer');
    const agents = mockProfiles.filter(p => p.user_type === 'agent');
    
    const usersWithDetails: UserData[] = customers.map(customer => {
      // Find agent name
      const agent = agents.find(a => a.id === 'agent-001'); // Mock assignment
      
      // Calculate total investments
      const userInvestments = mockInvestments.filter(inv => inv.user_id === customer.id);
      const totalInvestments = userInvestments.reduce((sum, inv) => sum + inv.total_invested, 0);
      
      return {
        id: customer.id,
        full_name: customer.full_name,
        phone: customer.phone,
        pan_number: 'ABCDE1234F', // Mock PAN
        kyc_status: customer.kyc_status,
        user_type: customer.user_type,
        is_active: customer.is_active,
        created_at: customer.created_at,
        agent_name: agent?.full_name || 'Direct',
        total_investments: totalInvestments
      };
    });

    setUsers(usersWithDetails);
    setLoading(false);
  };

  const updateUserStatus = async (userId: string, isActive: boolean) => {
    // Mock update for prototype
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, is_active: isActive } : user
    ));
    
    toast({
      title: "Success",
      description: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
    });
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


import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Search, DollarSign, Check, X } from 'lucide-react';

interface CommissionData {
  id: string;
  agent_name: string;
  agent_phone?: string;
  fund_name: string;
  investment_amount: number;
  base_commission_rate: number;
  agent_share_percentage: number;
  calculated_commission: number;
  commission_tier: string;
  actual_commission_rate: number;
  status: string;
  created_at: string;
  payment_date?: string;
}

const CommissionManagementTab = () => {
  const [commissions, setCommissions] = useState<CommissionData[]>([]);
  const [filteredCommissions, setFilteredCommissions] = useState<CommissionData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCommissions();
  }, []);

  useEffect(() => {
    const filtered = commissions.filter(commission =>
      commission.agent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commission.fund_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCommissions(filtered);
  }, [searchTerm, commissions]);

  const fetchCommissions = async () => {
    try {
      const { data, error } = await supabase
        .from('commissions')
        .select(`
          *,
          agent:agent_id(full_name, phone),
          fund:fund_id(scheme_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedCommissions = data?.map(commission => ({
        ...commission,
        agent_name: commission.agent?.full_name || 'Unknown Agent',
        agent_phone: commission.agent?.phone,
        fund_name: commission.fund?.scheme_name || 'Unknown Fund',
        // Use fallback values for new commission structure fields until migration is run
        commission_tier: (commission as any).commission_tier || 'STANDARD',
        actual_commission_rate: (commission as any).actual_commission_rate || commission.agent_share_percentage || 80.00,
      })) || [];

      setCommissions(formattedCommissions);
    } catch (error) {
      console.error('Error fetching commissions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch commissions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCommissionStatus = async (commissionId: string, status: 'paid' | 'cancelled') => {
    try {
      const updateData: any = { status };
      if (status === 'paid') {
        updateData.payment_date = new Date().toISOString().split('T')[0];
      }

      const { error } = await supabase
        .from('commissions')
        .update(updateData)
        .eq('id', commissionId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Commission marked as ${status}`,
      });

      fetchCommissions();
    } catch (error) {
      console.error('Error updating commission status:', error);
      toast({
        title: "Error",
        description: "Failed to update commission status",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading commissions...</div>;
  }

  const totalPending = filteredCommissions
    .filter(c => c.status === 'pending')
    .reduce((sum, c) => sum + c.calculated_commission, 0);

  const totalPaid = filteredCommissions
    .filter(c => c.status === 'paid')
    .reduce((sum, c) => sum + c.calculated_commission, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commission Management</CardTitle>
        <CardDescription>
          Agent commission tracking with tier system (80% Standard, 90% Premium for 5+ recruits). 
          Total Pending: ₹{totalPending.toLocaleString()} | Total Paid: ₹{totalPaid.toLocaleString()}
        </CardDescription>
        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4" />
          <Input
            placeholder="Search by agent or fund..."
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
              <TableHead>Agent</TableHead>
              <TableHead>Fund</TableHead>
              <TableHead>Investment</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Agent Share</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCommissions.map((commission) => (
              <TableRow key={commission.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{commission.agent_name}</div>
                    {commission.agent_phone && (
                      <div className="text-sm text-muted-foreground">{commission.agent_phone}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">{commission.fund_name}</TableCell>
                <TableCell>₹{commission.investment_amount?.toLocaleString() || '0'}</TableCell>
                <TableCell>
                  <Badge variant={commission.commission_tier === 'PREMIUM' ? 'default' : 'secondary'}>
                    {commission.commission_tier || 'STANDARD'}
                  </Badge>
                </TableCell>
                <TableCell>{commission.actual_commission_rate || commission.agent_share_percentage || 80}%</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-medium">₹{commission.calculated_commission?.toLocaleString() || '0'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    commission.status === 'paid' ? 'default' : 
                    commission.status === 'pending' ? 'secondary' : 'destructive'
                  }>
                    {commission.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {commission.payment_date ? 
                    new Date(commission.payment_date).toLocaleDateString() :
                    new Date(commission.created_at).toLocaleDateString()
                  }
                </TableCell>
                <TableCell>
                  {commission.status === 'pending' && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => updateCommissionStatus(commission.id, 'paid')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateCommissionStatus(commission.id, 'cancelled')}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredCommissions.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            No commissions found matching your search criteria
          </div>
        )}
      </CardContent>
    </Card>
  );

  async function updateCommissionStatus(commissionId: string, status: 'paid' | 'cancelled') {
    try {
      const updateData: any = { status };
      if (status === 'paid') {
        updateData.payment_date = new Date().toISOString().split('T')[0];
      }

      const { error } = await supabase
        .from('commissions')
        .update(updateData)
        .eq('id', commissionId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Commission marked as ${status}`,
      });

      fetchCommissions();
    } catch (error) {
      console.error('Error updating commission status:', error);
      toast({
        title: "Error",
        description: "Failed to update commission status",
        variant: "destructive",
      });
    }
  }
};

export default CommissionManagementTab;

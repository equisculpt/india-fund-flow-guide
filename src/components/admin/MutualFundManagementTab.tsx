
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
import { Search, Edit, Plus, Upload } from 'lucide-react';

interface MutualFundData {
  id: string;
  scheme_code: string;
  scheme_name: string;
  amc_name: string;
  category?: string;
  nav?: number;
  commission_rate: number;
  is_active: boolean;
  created_at: string;
}

const MutualFundManagementTab = () => {
  const [funds, setFunds] = useState<MutualFundData[]>([]);
  const [filteredFunds, setFilteredFunds] = useState<MutualFundData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingFund, setEditingFund] = useState<MutualFundData | null>(null);
  const [newCommissionRate, setNewCommissionRate] = useState<number>(0);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newFund, setNewFund] = useState({
    scheme_code: '',
    scheme_name: '',
    amc_name: '',
    category: '',
    commission_rate: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchFunds();
  }, []);

  useEffect(() => {
    const filtered = funds.filter(fund =>
      fund.scheme_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fund.amc_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fund.scheme_code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFunds(filtered);
  }, [searchTerm, funds]);

  const fetchFunds = async () => {
    try {
      const { data, error } = await supabase
        .from('mutual_funds')
        .select('*')
        .order('scheme_name');

      if (error) throw error;
      setFunds(data || []);
    } catch (error) {
      console.error('Error fetching funds:', error);
      toast({
        title: "Error",
        description: "Failed to fetch mutual funds",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCommissionRate = async (fundId: string, newRate: number) => {
    try {
      const { error } = await supabase
        .from('mutual_funds')
        .update({ commission_rate: newRate })
        .eq('id', fundId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Commission rate updated successfully. This will affect new investments.",
      });

      fetchFunds();
      setEditingFund(null);
    } catch (error) {
      console.error('Error updating commission rate:', error);
      toast({
        title: "Error",
        description: "Failed to update commission rate",
        variant: "destructive",
      });
    }
  };

  const addNewFund = async () => {
    try {
      const { error } = await supabase
        .from('mutual_funds')
        .insert(newFund);

      if (error) throw error;

      toast({
        title: "Success",
        description: "New mutual fund added successfully",
      });

      fetchFunds();
      setShowAddDialog(false);
      setNewFund({
        scheme_code: '',
        scheme_name: '',
        amc_name: '',
        category: '',
        commission_rate: 0,
      });
    } catch (error) {
      console.error('Error adding fund:', error);
      toast({
        title: "Error",
        description: "Failed to add mutual fund",
        variant: "destructive",
      });
    }
  };

  const toggleFundStatus = async (fundId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('mutual_funds')
        .update({ is_active: !isActive })
        .eq('id', fundId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Fund ${!isActive ? 'activated' : 'deactivated'} successfully`,
      });

      fetchFunds();
    } catch (error) {
      console.error('Error updating fund status:', error);
      toast({
        title: "Error",
        description: "Failed to update fund status",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading mutual funds...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mutual Fund Management</CardTitle>
        <CardDescription>
          Manage mutual funds and their commission rates. Live commission calculation applies to new investments.
        </CardDescription>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <Input
              placeholder="Search funds by name, AMC, or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Fund
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Mutual Fund</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="scheme-code">Scheme Code</Label>
                  <Input
                    id="scheme-code"
                    value={newFund.scheme_code}
                    onChange={(e) => setNewFund({...newFund, scheme_code: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="scheme-name">Scheme Name</Label>
                  <Input
                    id="scheme-name"
                    value={newFund.scheme_name}
                    onChange={(e) => setNewFund({...newFund, scheme_name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="amc-name">AMC Name</Label>
                  <Input
                    id="amc-name"
                    value={newFund.amc_name}
                    onChange={(e) => setNewFund({...newFund, amc_name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newFund.category}
                    onChange={(e) => setNewFund({...newFund, category: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="commission-rate">Commission Rate (%)</Label>
                  <Input
                    id="commission-rate"
                    type="number"
                    min="0"
                    max="10"
                    step="0.01"
                    value={newFund.commission_rate}
                    onChange={(e) => setNewFund({...newFund, commission_rate: parseFloat(e.target.value)})}
                  />
                </div>
                <Button onClick={addNewFund} className="w-full">
                  Add Fund
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Scheme Code</TableHead>
              <TableHead>Scheme Name</TableHead>
              <TableHead>AMC</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>NAV</TableHead>
              <TableHead>Commission Rate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFunds.map((fund) => (
              <TableRow key={fund.id}>
                <TableCell className="font-mono">{fund.scheme_code}</TableCell>
                <TableCell className="max-w-[300px] truncate">{fund.scheme_name}</TableCell>
                <TableCell>{fund.amc_name}</TableCell>
                <TableCell>{fund.category || 'N/A'}</TableCell>
                <TableCell>₹{fund.nav?.toFixed(4) || 'N/A'}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {fund.commission_rate}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={fund.is_active ? 'default' : 'destructive'}>
                    {fund.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingFund(fund);
                            setNewCommissionRate(fund.commission_rate);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Commission Rate</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Fund: {fund.scheme_name}</Label>
                          </div>
                          <div>
                            <Label htmlFor="new-commission-rate">Commission Rate (%)</Label>
                            <Input
                              id="new-commission-rate"
                              type="number"
                              min="0"
                              max="10"
                              step="0.01"
                              value={newCommissionRate}
                              onChange={(e) => setNewCommissionRate(parseFloat(e.target.value))}
                            />
                          </div>
                          <Button
                            onClick={() => updateCommissionRate(fund.id, newCommissionRate)}
                            className="w-full"
                          >
                            Update Commission Rate
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      size="sm"
                      variant={fund.is_active ? "destructive" : "default"}
                      onClick={() => toggleFundStatus(fund.id, fund.is_active)}
                    >
                      {fund.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredFunds.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            No mutual funds found matching your search criteria
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MutualFundManagementTab;


import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Search, TrendingUp, Calendar } from 'lucide-react';

interface InvestmentData {
  id: string;
  user_name: string;
  user_phone?: string;
  agent_name?: string;
  fund_name: string;
  investment_type: string;
  amount: number;
  total_invested: number;
  current_value: number;
  status: string;
  start_date: string;
  created_at: string;
}

const InvestmentOverviewTab = () => {
  const [investments, setInvestments] = useState<InvestmentData[]>([]);
  const [filteredInvestments, setFilteredInvestments] = useState<InvestmentData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchInvestments();
  }, []);

  useEffect(() => {
    const filtered = investments.filter(investment =>
      investment.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investment.fund_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investment.agent_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInvestments(filtered);
  }, [searchTerm, investments]);

  const fetchInvestments = async () => {
    try {
      const { data, error } = await supabase
        .from('investments')
        .select(`
          *,
          user:user_id(full_name, phone),
          agent:agent_id(full_name),
          fund:fund_id(scheme_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedInvestments = data?.map(investment => ({
        ...investment,
        user_name: investment.user?.full_name || 'Unknown User',
        user_phone: investment.user?.phone,
        agent_name: investment.agent?.full_name,
        fund_name: investment.fund?.scheme_name || 'Unknown Fund',
      })) || [];

      setInvestments(formattedInvestments);
    } catch (error) {
      console.error('Error fetching investments:', error);
      toast({
        title: "Error",
        description: "Failed to fetch investments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading investments...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Overview</CardTitle>
        <CardDescription>View all user investments and their performance</CardDescription>
        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4" />
          <Input
            placeholder="Search by user, fund, or agent..."
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
              <TableHead>User</TableHead>
              <TableHead>Fund</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>SIP Amount</TableHead>
              <TableHead>Total Invested</TableHead>
              <TableHead>Current Value</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvestments.map((investment) => (
              <TableRow key={investment.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{investment.user_name}</div>
                    {investment.user_phone && (
                      <div className="text-sm text-muted-foreground">{investment.user_phone}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">{investment.fund_name}</TableCell>
                <TableCell>
                  <Badge variant={investment.investment_type === 'SIP' ? 'default' : 'secondary'}>
                    {investment.investment_type}
                  </Badge>
                </TableCell>
                <TableCell>₹{investment.amount.toLocaleString()}</TableCell>
                <TableCell>₹{investment.total_invested?.toLocaleString() || '0'}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <span>₹{investment.current_value?.toLocaleString() || '0'}</span>
                    {investment.current_value && investment.total_invested && (
                      <TrendingUp className={`w-4 h-4 ${
                        investment.current_value > investment.total_invested ? 'text-green-500' : 'text-red-500'
                      }`} />
                    )}
                  </div>
                </TableCell>
                <TableCell>{investment.agent_name || 'Direct'}</TableCell>
                <TableCell>
                  <Badge variant={investment.status === 'active' ? 'default' : 'secondary'}>
                    {investment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{investment.start_date ? new Date(investment.start_date).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredInvestments.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            No investments found matching your search criteria
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InvestmentOverviewTab;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ReportButtons } from '@/components/shared/ReportButtons';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  TrendingUp,
  TrendingDown,
  Repeat,
  ArrowUpCircle,
  ArrowDownCircle
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  // Mock transaction data with BSE STAR MF references
  const transactions = [
    {
      id: 'TXN001',
      bseOrderId: 'BSE2024010001',
      date: '2024-01-15',
      time: '10:30 AM',
      fundName: 'HDFC Top 100 Fund',
      type: 'SIP',
      amount: 5000,
      nav: 78.45,
      units: 63.745,
      status: 'Completed',
      paymentMethod: 'Auto Debit',
      folio: 'HDC123456789',
      transactionId: 'TXN-HDFC-001',
      charges: 0,
      description: 'Monthly SIP installment'
    },
    {
      id: 'TXN002',
      bseOrderId: 'BSE2024010002',
      date: '2024-01-12',
      time: '2:15 PM',
      fundName: 'SBI Small Cap Fund',
      type: 'Purchase',
      amount: 25000,
      nav: 156.23,
      units: 160.048,
      status: 'Completed',
      paymentMethod: 'Net Banking',
      folio: 'SBI987654321',
      transactionId: 'TXN-SBI-002',
      charges: 0,
      description: 'Lumpsum investment'
    },
    {
      id: 'TXN003',
      bseOrderId: 'BSE2024010003',
      date: '2024-01-10',
      time: '11:45 AM',
      fundName: 'Axis Bluechip Fund',
      type: 'Redemption',
      amount: 15000,
      nav: 42.18,
      units: -355.678,
      status: 'In Process',
      paymentMethod: 'Bank Transfer',
      folio: 'AXS456789123',
      transactionId: 'TXN-AXIS-003',
      charges: 50,
      description: 'Partial redemption'
    },
    {
      id: 'TXN004',
      bseOrderId: 'BSE2024010004',
      date: '2024-01-08',
      time: '9:20 AM',
      fundName: 'HDFC Top 100 Fund',
      type: 'SIP',
      amount: 5000,
      nav: 77.89,
      units: 64.212,
      status: 'Failed',
      paymentMethod: 'Auto Debit',
      folio: 'HDC123456789',
      transactionId: 'TXN-HDFC-004',
      charges: 0,
      description: 'Monthly SIP - Insufficient balance'
    },
    {
      id: 'TXN005',
      bseOrderId: 'BSE2024010005',
      date: '2024-01-05',
      time: '3:30 PM',
      fundName: 'Mirae Asset Large Cap Fund',
      type: 'Switch',
      amount: 20000,
      nav: 89.45,
      units: 223.678,
      status: 'Completed',
      paymentMethod: 'Fund Switch',
      folio: 'MIR789123456',
      transactionId: 'TXN-MIRAE-005',
      charges: 0,
      description: 'Switch from Small Cap to Large Cap'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'In Process': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Failed': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Process': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'SIP': return <Repeat className="h-4 w-4 text-blue-600" />;
      case 'Purchase': return <ArrowUpCircle className="h-4 w-4 text-green-600" />;
      case 'Redemption': return <ArrowDownCircle className="h-4 w-4 text-red-600" />;
      case 'Switch': return <TrendingUp className="h-4 w-4 text-purple-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return `₹${Math.abs(amount).toLocaleString()}`;
  };

  const formatUnits = (units: number) => {
    return `${units.toFixed(3)} units`;
  };


  const handleRefreshTransactions = async () => {
    console.log('BSE STAR MF API: Refresh Transactions');
    // Placeholder for: GET /api/bse/transactions/sync
  };

  const handleDownloadProof = async (transactionId: string) => {
    console.log('BSE STAR MF API: Download Transaction Proof', transactionId);
    // Placeholder for: GET /api/bse/transaction/proof
  };

  const handleTrackOrder = async (bseOrderId: string) => {
    console.log('BSE STAR MF API: Track Order Status', bseOrderId);
    // Placeholder for: GET /api/bse/order/status
  };

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.fundName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         txn.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         txn.bseOrderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || txn.status.toLowerCase() === statusFilter;
    const matchesType = typeFilter === 'all' || txn.type.toLowerCase() === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Summary calculations
  const totalInvested = transactions
    .filter(t => ['SIP', 'Purchase'].includes(t.type) && t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalRedeemed = transactions
    .filter(t => t.type === 'Redemption' && t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const pendingAmount = transactions
    .filter(t => t.status === 'In Process')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Transaction History</h2>
          <p className="text-gray-600 mt-1">Track all your investment transactions and orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefreshTransactions}>
            <Clock className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <ReportButtons 
            reportName="transaction-comprehensive" 
            category="transaction" 
            variant="compact" 
          />
        </div>
      </div>

      {/* Transaction Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Total Invested</p>
                <p className="text-3xl font-bold text-green-900">{formatCurrency(totalInvested)}</p>
              </div>
              <ArrowUpCircle className="h-10 w-10 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-medium">Total Redeemed</p>
                <p className="text-3xl font-bold text-red-900">{formatCurrency(totalRedeemed)}</p>
              </div>
              <ArrowDownCircle className="h-10 w-10 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 font-medium">Pending Orders</p>
                <p className="text-3xl font-bold text-yellow-900">{formatCurrency(pendingAmount)}</p>
              </div>
              <Clock className="h-10 w-10 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Total Transactions</p>
                <p className="text-3xl font-bold text-blue-900">{transactions.length}</p>
              </div>
              <FileText className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all-transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all-transactions">All Transactions</TabsTrigger>
          <TabsTrigger value="sip-transactions">SIP History</TabsTrigger>
          <TabsTrigger value="order-status">Order Status</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
        </TabsList>

        <TabsContent value="all-transactions">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <CardTitle>All Transactions</CardTitle>
                
                {/* Search and Filter Controls */}
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by fund, order ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full md:w-64"
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in process">In Process</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full md:w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="sip">SIP</SelectItem>
                      <SelectItem value="purchase">Purchase</SelectItem>
                      <SelectItem value="redemption">Redemption</SelectItem>
                      <SelectItem value="switch">Switch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Fund Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>NAV</TableHead>
                      <TableHead>Units</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <div className="font-medium">{transaction.date}</div>
                            <div className="text-sm text-gray-500">{transaction.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{transaction.fundName}</div>
                            <div className="text-sm text-gray-500">Folio: {transaction.folio}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(transaction.type)}
                            <span className="font-medium">{transaction.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{formatCurrency(transaction.amount)}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">₹{transaction.nav}</div>
                        </TableCell>
                        <TableCell>
                          <div className={`font-medium ${transaction.units < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {formatUnits(transaction.units)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(transaction.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(transaction.status)}
                              {transaction.status}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDownloadProof(transaction.transactionId)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleTrackOrder(transaction.bseOrderId)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sip-transactions">
          <Card>
            <CardHeader>
              <CardTitle>SIP Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.filter(t => t.type === 'SIP').map((sip) => (
                  <div key={sip.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{sip.fundName}</h4>
                          <Badge className={getStatusColor(sip.status)}>
                            {sip.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Date:</span>
                            <div className="font-medium">{sip.date}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Amount:</span>
                            <div className="font-medium">{formatCurrency(sip.amount)}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">NAV:</span>
                            <div className="font-medium">₹{sip.nav}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Units:</span>
                            <div className="font-medium">{formatUnits(sip.units)}</div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleDownloadProof(sip.transactionId)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      BSE Order ID: {sip.bseOrderId} | Transaction ID: {sip.transactionId}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="order-status">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.filter(t => t.status !== 'Completed').map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold">{order.fundName}</h4>
                      <Badge className={getStatusColor(order.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {order.status}
                        </div>
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Order ID:</span>
                        <div className="font-medium">{order.bseOrderId}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Amount:</span>
                        <div className="font-medium">{formatCurrency(order.amount)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Date:</span>
                        <div className="font-medium">{order.date}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">{order.description}</div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleTrackOrder(order.bseOrderId)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Track Order
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statements">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Download Transaction Statements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">📋 CAMS Statement</h4>
                    <p className="text-sm text-gray-600 mb-3">Computer Age Management Services</p>
                    <ReportButtons reportName="cams" category="transaction" variant="compact" />
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">📋 Karvy Statement</h4>
                    <p className="text-sm text-gray-600 mb-3">Karvy Fintech Services</p>
                    <ReportButtons reportName="karvy" category="transaction" variant="compact" />
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">📊 Consolidated Report</h4>
                    <p className="text-sm text-gray-600 mb-3">All registrars combined</p>
                    <ReportButtons reportName="consolidated" category="transaction" variant="compact" />
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">📈 Recent Transactions</h4>
                    <p className="text-sm text-gray-600 mb-3">Last 30 days activity</p>
                    <ReportButtons reportName="recent-transactions" category="transaction" variant="compact" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Successful Transactions</span>
                    <span className="font-bold text-green-600">
                      {transactions.filter(t => t.status === 'Completed').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium">Pending Transactions</span>
                    <span className="font-bold text-yellow-600">
                      {transactions.filter(t => t.status === 'In Process').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium">Failed Transactions</span>
                    <span className="font-bold text-red-600">
                      {transactions.filter(t => t.status === 'Failed').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Total Charges Paid</span>
                    <span className="font-bold text-blue-600">
                      ₹{transactions.reduce((sum, t) => sum + t.charges, 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Compliance Footer */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <p className="text-xs text-gray-600 text-center">
            All transactions are processed via BSE STAR MF. Transaction history shows orders as per your portfolio records. 
            For official records, please refer to AMC/RTA statements. Past performance does not guarantee future results.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;

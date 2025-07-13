import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Calculator } from 'lucide-react';
import { analyticsService } from '@/services/api/analyticsService';
import { toast } from 'sonner';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'investment' | 'redemption';
}

const IRRCalculator = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-01-01',
      amount: -10000,
      type: 'investment'
    }
  ]);
  const [result, setResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const addTransaction = () => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: '',
      amount: 0,
      type: 'investment'
    };
    setTransactions([...transactions, newTransaction]);
  };

  const removeTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const updateTransaction = (id: string, field: keyof Transaction, value: any) => {
    setTransactions(transactions.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  const calculateXIRR = async () => {
    if (transactions.length < 2) {
      toast.error('Please add at least 2 transactions');
      return;
    }

    const validTransactions = transactions.filter(t => t.date && t.amount !== 0);
    if (validTransactions.length < 2) {
      toast.error('Please ensure all transactions have valid dates and amounts');
      return;
    }

    setIsCalculating(true);
    try {
      const response = await analyticsService.calculateXIRR({
        transactions: validTransactions.map(t => ({
          date: t.date,
          amount: t.type === 'investment' ? -Math.abs(t.amount) : Math.abs(t.amount),
          type: t.type
        }))
      }) as any;

      if (response.success) {
        setResult(response.data);
        toast.success('XIRR calculated successfully');
      } else {
        toast.error('Failed to calculate XIRR');
      }
    } catch (error) {
      // Fallback to local calculation
      const localResult = calculateLocalXIRR(validTransactions);
      setResult(localResult);
      toast.warning('Using local calculation as fallback');
    } finally {
      setIsCalculating(false);
    }
  };

  // Fallback local XIRR calculation
  const calculateLocalXIRR = (txns: Transaction[]) => {
    const totalInvested = txns
      .filter(t => t.type === 'investment')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const totalRedemption = txns
      .filter(t => t.type === 'redemption')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const totalReturn = totalRedemption - totalInvested;
    const simpleReturn = totalReturn / totalInvested * 100;

    return {
      xirr: simpleReturn,
      totalInvested,
      finalValue: totalRedemption,
      totalReturn,
      annualizedReturn: simpleReturn
    };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            XIRR Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {transactions.map((transaction, index) => (
              <div key={transaction.id} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-3">
                  <Label htmlFor={`date-${transaction.id}`}>Date</Label>
                  <Input
                    id={`date-${transaction.id}`}
                    type="date"
                    value={transaction.date}
                    onChange={(e) => updateTransaction(transaction.id, 'date', e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <Label htmlFor={`amount-${transaction.id}`}>Amount (₹)</Label>
                  <Input
                    id={`amount-${transaction.id}`}
                    type="number"
                    value={transaction.amount}
                    onChange={(e) => updateTransaction(transaction.id, 'amount', Number(e.target.value))}
                  />
                </div>
                <div className="col-span-3">
                  <Label htmlFor={`type-${transaction.id}`}>Type</Label>
                  <Select 
                    value={transaction.type} 
                    onValueChange={(value) => updateTransaction(transaction.id, 'type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="redemption">Redemption</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-3">
                  {transactions.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeTransaction(transaction.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={addTransaction}>
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
            <Button onClick={calculateXIRR} disabled={isCalculating}>
              {isCalculating ? 'Calculating...' : 'Calculate XIRR'}
            </Button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-3">XIRR Results</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-blue-700">Total Invested</div>
                  <div className="font-semibold">₹{result.totalInvested?.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-blue-700">Final Value</div>
                  <div className="font-semibold">₹{result.finalValue?.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-blue-700">Total Return</div>
                  <div className="font-semibold text-green-600">₹{result.totalReturn?.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-blue-700">XIRR (Annualized)</div>
                  <div className="font-semibold text-blue-900">{result.xirr?.toFixed(2)}%</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IRRCalculator;

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Calculator, DollarSign, AlertTriangle } from 'lucide-react';

const TrailCommissionManagementTab = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [payoutYear, setPayoutYear] = useState(new Date().getFullYear());
  const [isProcessingPayout, setIsProcessingPayout] = useState(false);
  const { toast } = useToast();

  const handleCalculateMonthlyCommissions = async () => {
    if (!selectedMonth) {
      toast({
        title: "Month Required",
        description: "Please select a month to calculate commissions for",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);
    try {
      // Mock calculation for demonstration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Commission Calculated",
        description: `Monthly trail commissions calculated for ${selectedMonth}`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to calculate monthly commissions",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleProcessAnnualPayouts = async () => {
    setIsProcessingPayout(true);
    try {
      // Mock processing for demonstration
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Payouts Processed",
        description: `Processed annual payouts for ${payoutYear}`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to process annual payouts",
        variant: "destructive"
      });
    } finally {
      setIsProcessingPayout(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Database Setup Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <h3 className="font-semibold mb-2">Database Setup Required</h3>
            <p>
              The trail commission system requires database migrations to be run first. 
              This is currently showing mock data for demonstration purposes.
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Monthly Commission Calculation
          </CardTitle>
          <CardDescription>
            Calculate trail commissions for all users for a specific month
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="commission-month">Select Month</Label>
            <Input
              id="commission-month"
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              max={new Date().toISOString().slice(0, 7)}
            />
          </div>
          <Button 
            onClick={handleCalculateMonthlyCommissions} 
            disabled={isCalculating}
            className="w-full"
          >
            {isCalculating ? 'Calculating...' : 'Calculate Monthly Commissions'}
          </Button>
          <p className="text-sm text-gray-600">
            This will calculate trail commissions for all active investments based on their 
            outstanding value for the selected month.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Annual Payout Processing
          </CardTitle>
          <CardDescription>
            Process annual festival bonus payouts for all eligible users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="payout-year">Payout Year</Label>
            <Input
              id="payout-year"
              type="number"
              value={payoutYear}
              onChange={(e) => setPayoutYear(parseInt(e.target.value))}
              min="2024"
              max={new Date().getFullYear()}
            />
          </div>
          <Button 
            onClick={handleProcessAnnualPayouts} 
            disabled={isProcessingPayout}
            className="w-full"
            variant="secondary"
          >
            {isProcessingPayout ? 'Processing...' : 'Process Annual Payouts'}
          </Button>
          <div className="bg-amber-50 border border-amber-200 rounded p-3">
            <p className="text-sm text-amber-800">
              <strong>Caution:</strong> This will process payouts for all users with pending rewards 
              and reset their pending balances. Ensure all commission calculations are complete 
              before running this process.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Commission Rate Management</CardTitle>
          <CardDescription>
            Current trail commission rates by fund category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span>Equity Large Cap</span>
              <span className="font-medium">1.00% p.a.</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span>Equity Mid Cap</span>
              <span className="font-medium">1.25% p.a.</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span>Equity Small Cap</span>
              <span className="font-medium">1.50% p.a.</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span>Debt Funds</span>
              <span className="font-medium">0.25-0.50% p.a.</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span>Hybrid Funds</span>
              <span className="font-medium">0.75-1.00% p.a.</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-3">
            Users receive 30% of the platform's trail commission earnings as loyalty rewards.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrailCommissionManagementTab;

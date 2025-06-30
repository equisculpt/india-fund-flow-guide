
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useSIPOperations } from './sip/hooks/useSIPOperations';
import SIPOverviewCards from './sip/SIPOverviewCards';
import SIPCard from './sip/SIPCard';
import SIPCalendar from './sip/SIPCalendar';
import SIPPerformance from './sip/SIPPerformance';
import SIPSettings from './sip/SIPSettings';
import SIPAIInsights from './sip/SIPAIInsights';
import StatementGenerator from './dashboard/StatementGenerator';

const SIPCenter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    sipStatuses,
    isProcessing,
    handlePauseSIP,
    handleStopSIP,
    handleModifySIP,
    handleStartNewSIP,
    handleDownloadStatement
  } = useSIPOperations();
  
  // Mock SIP data - will be replaced with BSE STAR MF API
  const activeSIPs = [
    {
      id: 'sip-1',
      fundName: 'HDFC Top 100 Fund',
      amount: 5000,
      frequency: 'Monthly',
      nextDate: '2025-01-15',
      startDate: '2024-01-15',
      totalInstallments: 12,
      completedInstallments: 12,
      totalInvested: 60000,
      currentValue: 78500,
      returns: 30.8,
      xirr: 22.5,
      status: sipStatuses['sip-1'] || 'Active',
      consistencyScore: 95,
      missedPayments: 0,
      bseOrderId: 'BSE123456789',
      mandateId: 'MANDATE001'
    },
    {
      id: 'sip-2',
      fundName: 'SBI Small Cap Fund',
      amount: 3000,
      frequency: 'Monthly',
      nextDate: '2025-01-20',
      startDate: '2024-02-20',
      totalInstallments: 11,
      completedInstallments: 10,
      totalInvested: 30000,
      currentValue: 35250,
      returns: 17.5,
      xirr: 19.8,
      status: sipStatuses['sip-2'] || 'Active',
      consistencyScore: 90,
      missedPayments: 1,
      bseOrderId: 'BSE123456790',
      mandateId: 'MANDATE002'
    },
    {
      id: 'sip-3',
      fundName: 'Axis Bluechip Fund',
      amount: 2000,
      frequency: 'Monthly',
      nextDate: '2025-01-10',
      startDate: '2024-03-10',
      totalInstallments: 10,
      completedInstallments: 10,
      totalInvested: 20000,
      currentValue: 23120,
      returns: 15.6,
      xirr: 14.2,
      status: sipStatuses['sip-3'] || 'Paused',
      consistencyScore: 100,
      missedPayments: 0,
      bseOrderId: 'BSE123456791',
      mandateId: 'MANDATE003'
    }
  ];

  const upcomingSIPs = [
    { date: '2025-01-10', funds: ['Axis Bluechip Fund'], amount: 2000 },
    { date: '2025-01-15', funds: ['HDFC Top 100 Fund'], amount: 5000 },
    { date: '2025-01-20', funds: ['SBI Small Cap Fund'], amount: 3000 }
  ];

  const activeSIPsCount = activeSIPs.filter(s => s.status === 'Active').length;
  const totalInvested = 110000;
  const currentValue = 136870;
  const totalReturns = 24.4;

  const handleStartNewSIPClick = () => {
    toast({
      title: "Starting New SIP",
      description: "Redirecting to fund explorer to start a new SIP...",
    });
    
    // Navigate to fund explorer
    navigate('/explore');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">SIP Center</h2>
          <p className="text-gray-600 mt-1">Manage your systematic investment plans</p>
        </div>
        <Button onClick={handleStartNewSIPClick} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Start New SIP
        </Button>
      </div>

      {/* SIP Overview Cards */}
      <SIPOverviewCards 
        activeSIPsCount={activeSIPsCount}
        totalInvested={totalInvested}
        currentValue={currentValue}
        totalReturns={totalReturns}
      />

      {/* AI Smart Alerts */}
      <SIPAIInsights />

      <Tabs defaultValue="active-sips" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="active-sips">Active SIPs</TabsTrigger>
          <TabsTrigger value="sip-calendar">SIP Calendar</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="active-sips">
          <div className="space-y-4">
            {activeSIPs.map((sip) => (
              <SIPCard
                key={sip.id}
                sip={sip}
                isProcessing={isProcessing[sip.id] || false}
                onPause={handlePauseSIP}
                onStop={handleStopSIP}
                onModify={handleModifySIP}
                onDownload={handleDownloadStatement}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sip-calendar">
          <SIPCalendar upcomingSIPs={upcomingSIPs} />
        </TabsContent>

        <TabsContent value="performance">
          <SIPPerformance onDownload={handleDownloadStatement} />
        </TabsContent>

        <TabsContent value="statements">
          <StatementGenerator onGenerateStatement={handleDownloadStatement} />
        </TabsContent>

        <TabsContent value="settings">
          <SIPSettings onDownload={handleDownloadStatement} />
        </TabsContent>
      </Tabs>

      {/* Compliance Footer */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <p className="text-xs text-gray-600 text-center">
            All SIP transactions are processed via BSE STAR MF. Mutual fund investments are subject to market risk. 
            Please read scheme-related documents carefully. AI insights are for informational purposes only and do not constitute investment advice.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SIPCenter;


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, TrendingUp, TrendingDown, AlertTriangle, Target, Clock } from 'lucide-react';

interface MarketAlert {
  id: string;
  type: 'BUY' | 'SELL' | 'HOLD' | 'REBALANCE';
  title: string;
  description: string;
  fundName: string;
  confidence: number;
  urgency: 'High' | 'Medium' | 'Low';
  timestamp: string;
  aiReasoning: string;
  potentialImpact: string;
}

const MarketTimingAlerts = () => {
  const [alerts, setAlerts] = useState<MarketAlert[]>([]);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [riskTolerance] = useState('Moderate');

  useEffect(() => {
    generateMarketAlerts();
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new alert
        generateNewAlert();
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const generateMarketAlerts = () => {
    const mockAlerts: MarketAlert[] = [
      {
        id: '1',
        type: 'BUY',
        title: 'Small Cap Opportunity',
        description: 'Small cap funds showing strong technical indicators',
        fundName: 'SBI Small Cap Fund',
        confidence: 85,
        urgency: 'High',
        timestamp: new Date().toISOString(),
        aiReasoning: 'RSI oversold, strong support level, positive earnings outlook',
        potentialImpact: '+12-18% in 6 months'
      },
      {
        id: '2',
        type: 'SELL',
        title: 'Profit Booking Alert',
        description: 'Large cap funds approaching resistance levels',
        fundName: 'HDFC Top 100 Fund',
        confidence: 72,
        urgency: 'Medium',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        aiReasoning: 'Overbought conditions, profit booking pressure, high valuations',
        potentialImpact: 'Avoid 5-8% potential downside'
      },
      {
        id: '3',
        type: 'REBALANCE',
        title: 'Sector Rotation Signal',
        description: 'IT sector showing weakness, Banking gaining strength',
        fundName: 'Multiple Sectoral Funds',
        confidence: 78,
        urgency: 'Medium',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        aiReasoning: 'Sector rotation pattern, earnings divergence, policy tailwinds',
        potentialImpact: 'Optimize sector allocation'
      }
    ];
    setAlerts(mockAlerts);
  };

  const generateNewAlert = () => {
    const newAlert: MarketAlert = {
      id: Date.now().toString(),
      type: 'BUY',
      title: 'Flash Market Opportunity',
      description: 'Mid cap correction creating entry opportunity',
      fundName: 'Axis Midcap Fund',
      confidence: 82,
      urgency: 'High',
      timestamp: new Date().toISOString(),
      aiReasoning: 'Sharp correction, strong fundamentals intact, value opportunity',
      potentialImpact: '+15-20% recovery potential'
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'BUY': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'SELL': return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'HOLD': return <Target className="h-4 w-4 text-blue-600" />;
      case 'REBALANCE': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'BUY': return 'bg-green-100 text-green-800 border-green-200';
      case 'SELL': return 'bg-red-100 text-red-800 border-red-200';
      case 'HOLD': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'REBALANCE': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              <CardTitle>AI Market Timing Alerts</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Alerts {alertsEnabled ? 'On' : 'Off'}</span>
              <Switch checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">AI Market Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Market Sentiment:</span>
                <p className="font-medium">Cautiously Optimistic</p>
              </div>
              <div>
                <span className="text-blue-700">Volatility Index:</span>
                <p className="font-medium">Moderate (18.5)</p>
              </div>
              <div>
                <span className="text-blue-700">Risk Level:</span>
                <p className="font-medium">{riskTolerance}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {alerts.map((alert) => (
              <Card key={alert.id} className={`border-l-4 ${getAlertColor(alert.type)}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getAlertIcon(alert.type)}
                      <h4 className="font-semibold">{alert.title}</h4>
                      <Badge className={getUrgencyColor(alert.urgency)}>{alert.urgency}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-3 w-3" />
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </div>
                      <div className="text-sm font-medium text-blue-600">
                        {alert.confidence}% confidence
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-800 mb-1">{alert.fundName}</p>
                    <p className="text-sm text-gray-600">{alert.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">AI Reasoning:</span>
                      <p className="text-gray-600">{alert.aiReasoning}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Potential Impact:</span>
                      <p className="text-gray-600">{alert.potentialImpact}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className={alert.type === 'BUY' ? 'bg-green-600' : alert.type === 'SELL' ? 'bg-red-600' : 'bg-blue-600'}>
                      {alert.type === 'BUY' ? 'Buy Now' : alert.type === 'SELL' ? 'Sell Now' : 'Execute'}
                    </Button>
                    <Button size="sm" variant="outline">Set Reminder</Button>
                    <Button size="sm" variant="ghost">Dismiss</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketTimingAlerts;

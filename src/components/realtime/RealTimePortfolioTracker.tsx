
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PortfolioPosition {
  id: string;
  fundName: string;
  schemeCode: string;
  currentNAV: number;
  units: number;
  investedValue: number;
  currentValue: number;
  dayChange: number;
  dayChangePercentage: number;
  lastUpdated: string;
}

const RealTimePortfolioTracker = () => {
  const [positions, setPositions] = useState<PortfolioPosition[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    // Subscribe to real-time NAV updates
    const channel = supabase
      .channel('nav-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'extended_nav_history'
        },
        (payload) => {
          console.log('Real-time NAV update:', payload);
          handleNAVUpdate(payload);
          setLastUpdate(new Date());
          setIsLive(true);
        }
      )
      .subscribe();

    // Load initial portfolio data
    loadPortfolioPositions();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleNAVUpdate = (payload: any) => {
    const { scheme_code, nav_value } = payload.new || payload;
    
    setPositions(prev => prev.map(position => {
      if (position.schemeCode === scheme_code) {
        const newCurrentValue = position.units * nav_value;
        const dayChange = newCurrentValue - position.currentValue;
        const dayChangePercentage = (dayChange / position.currentValue) * 100;
        
        return {
          ...position,
          currentNAV: nav_value,
          currentValue: newCurrentValue,
          dayChange,
          dayChangePercentage
        };
      }
      return position;
    }));
  };

  const loadPortfolioPositions = async () => {
    // Mock data for demonstration
    const mockPositions: PortfolioPosition[] = [
      {
        id: '1',
        fundName: 'HDFC Top 100 Fund',
        schemeCode: '120716',
        currentNAV: 856.32,
        units: 127.456,
        investedValue: 25000,
        currentValue: 31200,
        dayChange: 420,
        dayChangePercentage: 1.36,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '2',
        fundName: 'SBI Small Cap Fund',
        schemeCode: '122639',
        currentNAV: 234.67,
        units: 89.234,
        investedValue: 35000,
        currentValue: 42350,
        dayChange: -180,
        dayChangePercentage: -0.42,
        lastUpdated: new Date().toISOString()
      }
    ];
    
    setPositions(mockPositions);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Real-Time Portfolio Tracker
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500' : 'bg-gray-400'}`} />
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <RefreshCw className="h-3 w-3" />
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {positions.map((position) => (
            <div key={position.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{position.fundName}</h4>
                <Badge variant={position.dayChange >= 0 ? "default" : "destructive"}>
                  {position.dayChange >= 0 ? '+' : ''}₹{position.dayChange.toFixed(2)}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Current NAV</p>
                  <p className="font-medium">₹{position.currentNAV.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Current Value</p>
                  <p className="font-medium">₹{position.currentValue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Day Change</p>
                  <div className={`flex items-center gap-1 ${position.dayChangePercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {position.dayChangePercentage >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span className="font-medium">{position.dayChangePercentage.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimePortfolioTracker;

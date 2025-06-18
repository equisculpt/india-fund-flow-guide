
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Calendar, Pause, Play, TrendingUp, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface SIP {
  id: string;
  fundName: string;
  schemeCode: string;
  currentAmount: number;
  frequency: 'monthly' | 'quarterly';
  nextDate: string;
  status: 'active' | 'paused';
  returns: number;
  aiRecommendation?: {
    action: 'increase' | 'decrease' | 'pause' | 'continue';
    reason: string;
    suggestedAmount?: number;
  };
}

const SmartSIPManager = () => {
  const [sips, setSips] = useState<SIP[]>([
    {
      id: '1',
      fundName: 'HDFC Top 100 Fund',
      schemeCode: '120716',
      currentAmount: 5000,
      frequency: 'monthly',
      nextDate: '2024-01-15',
      status: 'active',
      returns: 15.2,
      aiRecommendation: {
        action: 'increase',
        reason: 'Fund performance is excellent. Market conditions favorable.',
        suggestedAmount: 7000
      }
    },
    {
      id: '2',
      fundName: 'SBI Small Cap Fund',
      schemeCode: '122639',
      currentAmount: 3000,
      frequency: 'monthly',
      nextDate: '2024-01-20',
      status: 'active',
      returns: 22.5,
      aiRecommendation: {
        action: 'pause',
        reason: 'Small cap valuations are stretched. Consider pausing temporarily.',
        suggestedAmount: 0
      }
    },
    {
      id: '3',
      fundName: 'Axis Long Term Equity',
      schemeCode: '120503',
      currentAmount: 8000,
      frequency: 'monthly',
      nextDate: '2024-01-25',
      status: 'paused',
      returns: 12.8,
      aiRecommendation: {
        action: 'continue',
        reason: 'Tax saving fund with decent performance. Resume for tax benefits.',
        suggestedAmount: 8000
      }
    }
  ]);

  const [editingSIP, setEditingSIP] = useState<string | null>(null);
  const [tempAmount, setTempAmount] = useState<number>(0);

  const handleSIPAction = (sipId: string, action: 'pause' | 'resume' | 'modify') => {
    setSips(prev => prev.map(sip => {
      if (sip.id === sipId) {
        switch (action) {
          case 'pause':
            toast.success(`SIP for ${sip.fundName} paused successfully`);
            return { ...sip, status: 'paused' as const };
          case 'resume':
            toast.success(`SIP for ${sip.fundName} resumed successfully`);
            return { ...sip, status: 'active' as const };
          case 'modify':
            toast.success(`SIP amount updated for ${sip.fundName}`);
            return { ...sip, currentAmount: tempAmount };
          default:
            return sip;
        }
      }
      return sip;
    }));
    setEditingSIP(null);
  };

  const applyAIRecommendation = (sipId: string) => {
    const sip = sips.find(s => s.id === sipId);
    if (!sip?.aiRecommendation) return;

    const { action, suggestedAmount } = sip.aiRecommendation;
    
    setSips(prev => prev.map(s => {
      if (s.id === sipId) {
        switch (action) {
          case 'increase':
          case 'decrease':
            return { ...s, currentAmount: suggestedAmount || s.currentAmount };
          case 'pause':
            return { ...s, status: 'paused' as const };
          case 'continue':
            return { ...s, status: 'active' as const };
          default:
            return s;
        }
      }
      return s;
    }));
    
    toast.success('AI recommendation applied successfully');
  };

  const getRecommendationColor = (action: string) => {
    switch (action) {
      case 'increase': return 'bg-green-100 text-green-800';
      case 'decrease': return 'bg-yellow-100 text-yellow-800';
      case 'pause': return 'bg-red-100 text-red-800';
      case 'continue': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Smart SIP Manager</CardTitle>
            <Button>Add New SIP</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sips.map((sip) => (
              <div key={sip.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{sip.fundName}</h4>
                    <p className="text-sm text-gray-600">Scheme: {sip.schemeCode}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={sip.status === 'active' ? 'default' : 'secondary'}>
                      {sip.status}
                    </Badge>
                    <Badge variant="outline" className="text-green-600">
                      {sip.returns}% returns
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">Current Amount</Label>
                    {editingSIP === sip.id ? (
                      <div className="flex gap-2 mt-1">
                        <Input
                          type="number"
                          value={tempAmount}
                          onChange={(e) => setTempAmount(Number(e.target.value))}
                          className="h-8"
                        />
                        <Button 
                          size="sm" 
                          onClick={() => handleSIPAction(sip.id, 'modify')}
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="font-medium">₹{sip.currentAmount.toLocaleString()}</p>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setEditingSIP(sip.id);
                            setTempAmount(sip.currentAmount);
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">Frequency</Label>
                    <p className="font-medium capitalize">{sip.frequency}</p>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">Next Payment</Label>
                    <p className="font-medium flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(sip.nextDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSIPAction(sip.id, sip.status === 'active' ? 'pause' : 'resume')}
                    >
                      {sip.status === 'active' ? (
                        <>
                          <Pause className="h-3 w-3 mr-1" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3 mr-1" />
                          Resume
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {sip.aiRecommendation && (
                  <div className={`p-3 rounded-lg ${getRecommendationColor(sip.aiRecommendation.action)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="h-4 w-4" />
                          <span className="font-medium">AI Recommendation: {sip.aiRecommendation.action.toUpperCase()}</span>
                        </div>
                        <p className="text-sm">{sip.aiRecommendation.reason}</p>
                        {sip.aiRecommendation.suggestedAmount && (
                          <p className="text-sm font-medium mt-1">
                            Suggested amount: ₹{sip.aiRecommendation.suggestedAmount.toLocaleString()}
                          </p>
                        )}
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => applyAIRecommendation(sip.id)}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">Portfolio Insights</span>
            </div>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• Total monthly SIP: ₹{sips.reduce((sum, sip) => sum + (sip.status === 'active' ? sip.currentAmount : 0), 0).toLocaleString()}</p>
              <p>• Average portfolio returns: {(sips.reduce((sum, sip) => sum + sip.returns, 0) / sips.length).toFixed(1)}%</p>
              <p>• Next payment date: {Math.min(...sips.filter(s => s.status === 'active').map(s => new Date(s.nextDate).getTime()))}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartSIPManager;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Clock, 
  Play, 
  Pause, 
  StopCircle, 
  Edit,
  Download,
  Target,
  AlertCircle
} from 'lucide-react';

interface SIPData {
  id: string;
  fundName: string;
  amount: number;
  frequency: string;
  nextDate: string;
  startDate: string;
  totalInstallments: number;
  completedInstallments: number;
  totalInvested: number;
  currentValue: number;
  returns: number;
  xirr: number;
  status: string;
  consistencyScore: number;
  missedPayments: number;
  bseOrderId: string;
  mandateId: string;
}

interface SIPCardProps {
  sip: SIPData;
  isProcessing: boolean;
  onPause: (sipId: string) => void;
  onStop: (sipId: string) => void;
  onModify: (sipId: string, amount: number) => void;
  onDownload: (type: string) => void;
}

const SIPCard: React.FC<SIPCardProps> = ({
  sip,
  isProcessing,
  onPause,
  onStop,
  onModify,
  onDownload
}) => {
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Stopped': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConsistencyBadge = (score: number) => {
    if (score >= 95) return { label: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (score >= 80) return { label: 'Good', color: 'bg-blue-100 text-blue-800' };
    if (score >= 60) return { label: 'Average', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Poor', color: 'bg-red-100 text-red-800' };
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold">{sip.fundName}</h3>
              <Badge className={getStatusColor(sip.status)}>
                {sip.status}
              </Badge>
              {sip.status === 'Active' && (
                <Badge className={getConsistencyBadge(sip.consistencyScore).color}>
                  {getConsistencyBadge(sip.consistencyScore).label}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatCurrency(sip.amount)}/{sip.frequency}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Next: {sip.nextDate}
              </span>
              <span className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                {sip.completedInstallments}/{sip.totalInstallments} completed
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">XIRR</div>
            <div className="text-lg font-bold text-green-600">{sip.xirr}%</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Total Invested</p>
            <p className="text-lg font-semibold">{formatCurrency(sip.totalInvested)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Value</p>
            <p className="text-lg font-semibold">{formatCurrency(sip.currentValue)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Returns</p>
            <p className="text-lg font-semibold text-green-600">+{sip.returns}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Consistency</p>
            <div className="flex items-center gap-2">
              <Progress value={sip.consistencyScore} className="h-2 flex-1" />
              <span className="text-sm font-medium">{sip.consistencyScore}%</span>
            </div>
          </div>
        </div>

        {sip.missedPayments > 0 && (
          <div className="flex items-center gap-2 mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-yellow-800">
              {sip.missedPayments} missed payment(s) - Enable auto-debit for better consistency
            </span>
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t">
          {sip.status === 'Active' ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onPause(sip.id)}
              disabled={isProcessing}
            >
              <Pause className="h-4 w-4 mr-2" />
              {isProcessing ? 'Processing...' : 'Pause SIP'}
            </Button>
          ) : sip.status === 'Paused' ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onPause(sip.id)}
              disabled={isProcessing}
            >
              <Play className="h-4 w-4 mr-2" />
              {isProcessing ? 'Processing...' : 'Resume SIP'}
            </Button>
          ) : null}
          
          {sip.status !== 'Stopped' && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onStop(sip.id)}
              disabled={isProcessing}
            >
              <StopCircle className="h-4 w-4 mr-2" />
              {isProcessing ? 'Processing...' : 'Stop SIP'}
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onModify(sip.id, sip.amount)}
            disabled={isProcessing}
          >
            <Edit className="h-4 w-4 mr-2" />
            {isProcessing ? 'Processing...' : 'Modify Amount'}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onDownload('sip-details')}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Statement
          </Button>
        </div>

        <div className="text-xs text-gray-500 mt-2">
          BSE Order ID: {sip.bseOrderId} | Mandate: {sip.mandateId}
        </div>
      </CardContent>
    </Card>
  );
};

export default SIPCard;

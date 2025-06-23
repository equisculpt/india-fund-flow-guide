
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Clock, AlertTriangle, ExternalLink, Shield } from 'lucide-react';
import { useDigioKYC } from '@/hooks/useDigioKYC';
import { useToast } from '@/hooks/use-toast';

interface DigioKYCVerificationProps {
  clientData: any;
  onKYCComplete: () => void;
  onBack: () => void;
}

const DigioKYCVerification = ({ clientData, onKYCComplete, onBack }: DigioKYCVerificationProps) => {
  const [panNumber, setPanNumber] = useState(clientData.panNumber || '');
  const [aadhaarNumber, setAadhaarNumber] = useState(clientData.aadhaarNumber || '');
  const [isManualVerification, setIsManualVerification] = useState(false);
  const { kycStatus, isLoading, initiateKYC, checkKYCStatus } = useDigioKYC();
  const { toast } = useToast();

  const handleDigioKYC = async () => {
    if (!panNumber || !aadhaarNumber) {
      toast({
        title: "Missing Information",
        description: "Please enter both PAN and Aadhaar numbers.",
        variant: "destructive",
      });
      return;
    }

    const kycData = {
      panNumber: panNumber.toUpperCase(),
      aadhaarNumber,
      fullName: clientData.fullName,
      email: clientData.email,
      phone: clientData.phone,
      dateOfBirth: clientData.dateOfBirth
    };

    const result = await initiateKYC(kycData);
    
    if (result.success && result.verificationUrl) {
      // Open Digio verification in new window
      window.open(result.verificationUrl, '_blank', 'width=800,height=600');
      
      // Start polling for status updates
      const pollInterval = setInterval(async () => {
        if (result.referenceId) {
          try {
            const status = await checkKYCStatus(result.referenceId);
            if (status.status === 'completed') {
              clearInterval(pollInterval);
              onKYCComplete();
            }
          } catch (error) {
            console.error('Status check failed:', error);
          }
        }
      }, 10000); // Check every 10 seconds

      // Clear interval after 30 minutes
      setTimeout(() => clearInterval(pollInterval), 30 * 60 * 1000);
    }
  };

  const handleManualVerification = () => {
    // Simulate manual verification process
    setIsManualVerification(true);
    toast({
      title: "Manual Verification Initiated",
      description: "Your documents will be verified manually within 24 hours.",
    });
    
    // Simulate completion after a short delay for demo
    setTimeout(() => {
      onKYCComplete();
    }, 3000);
  };

  const renderKYCStatus = () => {
    const statusConfig = {
      idle: { color: "bg-gray-100 text-gray-800", icon: Clock, text: "Ready to Start" },
      initiating: { color: "bg-blue-100 text-blue-800", icon: Clock, text: "Initiating..." },
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock, text: "Verification Pending" },
      in_progress: { color: "bg-blue-100 text-blue-800", icon: Clock, text: "In Progress" },
      completed: { color: "bg-green-100 text-green-800", icon: CheckCircle, text: "Completed" },
      failed: { color: "bg-red-100 text-red-800", icon: AlertTriangle, text: "Failed" }
    };

    const config = statusConfig[kycStatus.status];
    const Icon = config.icon;

    return (
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Digio KYC Verification
          </span>
          {renderKYCStatus()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            We use Digio's secure platform for instant KYC verification. Your documents are processed securely and in compliance with RBI guidelines.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="pan">PAN Number</Label>
            <Input
              id="pan"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
              placeholder="Enter PAN number"
              maxLength={10}
            />
            {kycStatus.panVerified && (
              <div className="flex items-center gap-1 mt-1 text-green-600 text-sm">
                <CheckCircle className="h-4 w-4" />
                Verified
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="aadhaar">Aadhaar Number</Label>
            <Input
              id="aadhaar"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter Aadhaar number"
              maxLength={12}
            />
            {kycStatus.aadhaarVerified && (
              <div className="flex items-center gap-1 mt-1 text-green-600 text-sm">
                <CheckCircle className="h-4 w-4" />
                Verified
              </div>
            )}
          </div>
        </div>

        {kycStatus.status === 'pending' && kycStatus.verificationUrl && (
          <Alert>
            <ExternalLink className="h-4 w-4" />
            <AlertDescription>
              Complete your verification by clicking the link that opened in a new window. 
              If it didn't open, <a href={kycStatus.verificationUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">click here</a>.
            </AlertDescription>
          </Alert>
        )}

        {kycStatus.error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{kycStatus.error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Choose Verification Method</h3>
            <p className="text-sm text-gray-600 mb-4">
              Select how you'd like to complete your KYC verification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h4 className="font-semibold mb-2">Instant Digio KYC</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Complete verification instantly using Digio's secure platform
                </p>
                <Button 
                  onClick={handleDigioKYC}
                  disabled={isLoading || !panNumber || !aadhaarNumber}
                  className="w-full"
                >
                  {isLoading ? "Initiating..." : "Start Digio KYC"}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="mb-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
                <h4 className="font-semibold mb-2">Manual Verification</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Upload documents for manual review (24-48 hours)
                </p>
                <Button 
                  onClick={handleManualVerification}
                  variant="outline"
                  disabled={isLoading || isManualVerification}
                  className="w-full"
                >
                  {isManualVerification ? "Processing..." : "Manual KYC"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-between">
          <Button onClick={onBack} variant="outline">
            Back
          </Button>
          {kycStatus.kycComplete && (
            <Button onClick={onKYCComplete}>
              Continue to Risk Profiling
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DigioKYCVerification;

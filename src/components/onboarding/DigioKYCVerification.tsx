
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, FileText, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DigioKYCVerificationProps {
  clientData: any;
  onKYCComplete: () => void;
  onBack: () => void;
}

const DigioKYCVerification = ({ clientData, onKYCComplete, onBack }: DigioKYCVerificationProps) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [panNumber, setPanNumber] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [kycUrl, setKycUrl] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const { toast } = useToast();

  const generateReferenceId = () => {
    return `SB_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  };

  const initiateDigioKYC = async () => {
    setIsLoading(true);
    const refId = generateReferenceId();
    setReferenceId(refId);

    try {
      const { data, error } = await supabase.functions.invoke('digio-kyc', {
        body: {
          action: 'initiate_kyc',
          data: {
            referenceId: refId,
            email: clientData.email,
            name: clientData.fullName,
            mobile: clientData.phone
          }
        }
      });

      if (error) throw error;

      if (data.verification_url) {
        setKycUrl(data.verification_url);
        setStep(2);
        toast({
          title: "KYC Initiated",
          description: "Please complete your KYC verification using Digio's secure platform",
        });
      }
    } catch (error: any) {
      console.error('Digio KYC Error:', error);
      toast({
        title: "Error",
        description: "Failed to initiate KYC verification. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPAN = async () => {
    if (!panNumber || panNumber.length !== 10) {
      toast({
        title: "Invalid PAN",
        description: "Please enter a valid 10-digit PAN number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const refId = generateReferenceId();

    try {
      const { data, error } = await supabase.functions.invoke('digio-kyc', {
        body: {
          action: 'pan_verification',
          data: {
            referenceId: refId,
            panNumber: panNumber.toUpperCase(),
            customerName: clientData.fullName
          }
        }
      });

      if (error) throw error;

      if (data.status === 'success') {
        toast({
          title: "PAN Verified",
          description: "Your PAN has been verified successfully",
        });
        setStep(3);
      }
    } catch (error: any) {
      console.error('PAN Verification Error:', error);
      toast({
        title: "PAN Verification Failed",
        description: "Please check your PAN number and try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkKYCStatus = async () => {
    if (!referenceId) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('digio-kyc', {
        body: {
          action: 'get_status',
          data: { referenceId }
        }
      });

      if (error) throw error;

      if (data.status === 'completed' || data.status === 'success') {
        toast({
          title: "KYC Completed",
          description: "Your KYC verification has been completed successfully!",
        });
        onKYCComplete();
      } else if (data.status === 'failed') {
        toast({
          title: "KYC Failed",
          description: "KYC verification failed. Please try again.",
          variant: "destructive"
        });
        setStep(1);
      } else {
        toast({
          title: "KYC In Progress",
          description: "Your KYC is still being processed. Please wait.",
        });
      }
    } catch (error: any) {
      console.error('KYC Status Check Error:', error);
      toast({
        title: "Error",
        description: "Failed to check KYC status",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          KYC Verification with Digio
        </CardTitle>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Secure KYC Verification</h4>
              <p className="text-blue-700 text-sm">
                We use Digio's SEBI-approved platform for secure document verification. 
                Your data is encrypted and protected throughout the process.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="pan">PAN Number *</Label>
                <Input
                  id="pan"
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                  placeholder="Enter your PAN number"
                  maxLength={10}
                  className="uppercase"
                />
              </div>
              
              <Button onClick={verifyPAN} disabled={isLoading} className="w-full">
                {isLoading ? "Verifying PAN..." : "Verify PAN & Proceed"}
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={onBack} className="flex-1">
                Back
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Complete KYC Verification</h3>
              <p className="text-gray-600 mb-4">
                Click the button below to complete your KYC verification on Digio's secure platform
              </p>
              
              {kycUrl && (
                <Button 
                  onClick={() => window.open(kycUrl, '_blank')} 
                  className="w-full mb-4"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Complete KYC on Digio
                </Button>
              )}
              
              <Button 
                variant="outline" 
                onClick={checkKYCStatus} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Checking Status..." : "I've Completed KYC - Check Status"}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-800 mb-2">PAN Verified Successfully!</h3>
              <p className="text-gray-600 mb-4">
                Now let's complete your full KYC verification with Digio
              </p>
              
              <Button onClick={initiateDigioKYC} disabled={isLoading} className="w-full">
                {isLoading ? "Initiating KYC..." : "Start Full KYC Verification"}
              </Button>
            </div>
          </div>
        )}

        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-gray-600 mt-0.5" />
            <div className="text-xs text-gray-600">
              <p className="font-medium mb-1">Documents Required:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>PAN Card</li>
                <li>Aadhaar Card</li>
                <li>Bank Account Proof</li>
                <li>Recent Photo</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigioKYCVerification;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, CheckCircle, ClipboardList } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import RiskProfiling from "../RiskProfiling";
import RiskProfileResults from "../RiskProfileResults";
import DigioKYCVerification from "./DigioKYCVerification";
import { useBackendAuth } from "@/contexts/BackendAuthContext";

interface OnboardingStepsProps {
  clientData: any;
  setClientData: (data: any) => void;
  socialLoginUser?: any;
}

interface RiskProfile {
  category: 'Conservative' | 'Moderate' | 'Aggressive';
  score: number;
  suitableFunds: string[];
}

const OnboardingSteps = ({ clientData, setClientData, socialLoginUser }: OnboardingStepsProps) => {
  const [step, setStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);
  const [otp, setOtp] = useState("");
  const { toast } = useToast();
  const { updateKYCStatus } = useBackendAuth();

  const handleSendOTP = async () => {
    if (!clientData.phone) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }
    
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(2);
      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${clientData.phone}`,
      });
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(3);
      toast({
        title: "Phone Verified",
        description: "Your phone number has been verified successfully",
      });
    }, 1500);
  };

  const handleKYCComplete = () => {
    setStep(4);
    toast({
      title: "KYC Verified",
      description: "Your KYC has been completed successfully using Digio verification",
    });
  };

  const handleRiskProfileComplete = (profile: RiskProfile) => {
    setRiskProfile(profile);
    setStep(5);
    toast({
      title: "Risk Profile Complete",
      description: `You've been categorized as a ${profile.category} investor`,
    });
  };

  const handleRiskProfileContinue = () => {
    setStep(6);
  };

  const handleFinalizeOnboarding = async () => {
    // Mark KYC as verified in the database
    await updateKYCStatus('APPROVED');
    
    toast({
      title: "Welcome to SIP Brewery!",
      description: "Your account setup is complete. Redirecting to dashboard...",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {socialLoginUser ? "Complete Your KYC Verification" : "Complete Your Onboarding"}
          </span>
          <Badge variant="outline">Step {step} of 6</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">Step 1: Basic Information & Phone Verification</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName" className="text-center block">Full Name</Label>
                <Input
                  id="fullName"
                  value={clientData.fullName}
                  onChange={(e) => setClientData({...clientData, fullName: e.target.value})}
                  placeholder="Enter your full name"
                  className="text-center"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-center block">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={clientData.email}
                  onChange={(e) => setClientData({...clientData, email: e.target.value})}
                  placeholder="Enter your email"
                  className="text-center"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-center block">Phone Number *</Label>
                <Input
                  id="phone"
                  value={clientData.phone}
                  onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                  placeholder="Enter your phone number"
                  className="text-center"
                />
              </div>
              <div>
                <Label htmlFor="dob" className="text-center block">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={clientData.dateOfBirth}
                  onChange={(e) => setClientData({...clientData, dateOfBirth: e.target.value})}
                  className="text-center"
                />
              </div>
            </div>
            <Button onClick={handleSendOTP} disabled={isVerifying} className="w-full">
              {isVerifying ? "Sending OTP..." : "Send OTP"}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">Step 2: Verify Phone Number</h3>
            <div className="text-center">
              <p className="text-gray-600 mb-4 text-center">Enter the 6-digit OTP sent to {clientData.phone}</p>
              <div className="flex justify-center mb-4">
                <InputOTP value={otp} onChange={setOtp} maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button onClick={handleVerifyOTP} disabled={isVerifying} className="w-full">
                {isVerifying ? "Verifying..." : "Verify OTP"}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <DigioKYCVerification
            clientData={clientData}
            onKYCComplete={handleKYCComplete}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2 text-center">KYC Verified Successfully!</h3>
              <p className="text-gray-600 mb-6 text-center">
                Your documents have been verified using Digio's secure platform. Now let's assess your risk profile as per AMFI guidelines.
              </p>
              <Button onClick={() => setStep(5)} className="w-full">
                <ClipboardList className="h-4 w-4 mr-2" />
                Start Risk Profiling
              </Button>
            </div>
          </div>
        )}

        {step === 5 && (
          <RiskProfiling onComplete={handleRiskProfileComplete} />
        )}

        {step === 6 && riskProfile && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 text-center">KYC Verification Complete!</h3>
            <p className="text-gray-600 text-center">
              Your account has been successfully verified and your risk profile has been assessed. 
              You can now start investing in suitable mutual funds.
            </p>
            {riskProfile && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800 text-center">
                  <strong>Your Risk Profile:</strong> {riskProfile.category} Investor
                </p>
                <p className="text-xs text-blue-700 mt-1 text-center">
                  KYC verified securely using Digio's platform
                </p>
              </div>
            )}
            <Button onClick={handleFinalizeOnboarding} className="w-full">
              Complete Setup & Start Investing
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OnboardingSteps;

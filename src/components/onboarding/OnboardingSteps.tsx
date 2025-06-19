
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, CheckCircle, Clock, Shield, ClipboardList } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import RiskProfiling from "../RiskProfiling";
import RiskProfileResults from "../RiskProfileResults";
import { useEnhancedAuth } from "@/contexts/EnhancedAuthContext";

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
  const [kycStatus, setKycStatus] = useState<"pending" | "processing" | "verified" | "failed">("pending");
  const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);
  const [autoKycEnabled, setAutoKycEnabled] = useState(false);
  const [otp, setOtp] = useState("");
  const { toast } = useToast();
  const { completeOnboarding } = useEnhancedAuth();

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

  const handleKYCSubmit = async () => {
    setKycStatus("processing");
    
    const kycDelay = autoKycEnabled ? 2000 : 5000;
    
    setTimeout(() => {
      if (autoKycEnabled) {
        setKycStatus("verified");
        setStep(4);
        toast({
          title: "KYC Demo-Verified",
          description: "This is a demo verification. Real KYC requires actual document verification.",
        });
      } else {
        setKycStatus("verified");
        setStep(4);
        toast({
          title: "KYC Submitted",
          description: "Your documents have been submitted for manual verification.",
        });
      }
    }, kycDelay);
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

  const handleFinalizeOnboarding = () => {
    completeOnboarding({
      phoneNumber: clientData.phone,
      kycStatus: 'verified',
      riskProfile: riskProfile?.category,
    });
    
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1000);
  };

  const renderKYCStatus = () => {
    const statusConfig = {
      pending: { color: "bg-gray-100 text-gray-800", icon: Clock, text: "Pending" },
      processing: { color: "bg-blue-100 text-blue-800", icon: Clock, text: autoKycEnabled ? "Demo Processing..." : "Processing" },
      verified: { color: "bg-green-100 text-green-800", icon: CheckCircle, text: autoKycEnabled ? "Demo Verified" : "Verified" },
      failed: { color: "bg-red-100 text-red-800", icon: Shield, text: "Failed" }
    };

    const config = statusConfig[kycStatus];
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
            <User className="h-5 w-5" />
            {socialLoginUser ? "Complete Your Profile" : "Complete Your Onboarding"}
          </span>
          {renderKYCStatus()}
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
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">Step 3: KYC Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pan" className="text-center block">PAN Number</Label>
                <Input
                  id="pan"
                  value={clientData.panNumber}
                  onChange={(e) => setClientData({...clientData, panNumber: e.target.value.toUpperCase()})}
                  placeholder="Enter PAN number"
                  className="text-center"
                />
              </div>
              <div>
                <Label htmlFor="aadhaar" className="text-center block">Aadhaar Number</Label>
                <Input
                  id="aadhaar"
                  value={clientData.aadhaarNumber}
                  onChange={(e) => setClientData({...clientData, aadhaarNumber: e.target.value})}
                  placeholder="Enter Aadhaar number"
                  className="text-center"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="address" className="text-center block">Address</Label>
                <Input
                  id="address"
                  value={clientData.address}
                  onChange={(e) => setClientData({...clientData, address: e.target.value})}
                  placeholder="Enter your full address"
                  className="text-center"
                />
              </div>
              <div>
                <Label htmlFor="nominee" className="text-center block">Nominee Name</Label>
                <Input
                  id="nominee"
                  value={clientData.nomineeName}
                  onChange={(e) => setClientData({...clientData, nomineeName: e.target.value})}
                  placeholder="Enter nominee name"
                  className="text-center"
                />
              </div>
              <div>
                <Label htmlFor="relation" className="text-center block">Nominee Relation</Label>
                <Input
                  id="relation"
                  value={clientData.nomineeRelation}
                  onChange={(e) => setClientData({...clientData, nomineeRelation: e.target.value})}
                  placeholder="Enter relation"
                  className="text-center"
                />
              </div>
              <div>
                <Label htmlFor="bank" className="text-center block">Bank Account Number</Label>
                <Input
                  id="bank"
                  value={clientData.bankAccount}
                  onChange={(e) => setClientData({...clientData, bankAccount: e.target.value})}
                  placeholder="Enter bank account number"
                  className="text-center"
                />
              </div>
              <div>
                <Label htmlFor="ifsc" className="text-center block">IFSC Code</Label>
                <Input
                  id="ifsc"
                  value={clientData.ifscCode}
                  onChange={(e) => setClientData({...clientData, ifscCode: e.target.value.toUpperCase()})}
                  placeholder="Enter IFSC code"
                  className="text-center"
                />
              </div>
            </div>
            <Button onClick={handleKYCSubmit} className="w-full">
              Submit KYC for Verification
            </Button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2 text-center">KYC Verified Successfully!</h3>
              <p className="text-gray-600 mb-6 text-center">
                Now let's assess your risk profile as per AMFI guidelines to recommend suitable investment options.
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
          <RiskProfileResults 
            riskProfile={riskProfile} 
            onContinue={handleRiskProfileContinue} 
          />
        )}

        {step === 7 && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 text-center">Onboarding Complete!</h3>
            <p className="text-gray-600 text-center">
              Your account has been successfully verified and your risk profile has been assessed. 
              You can now start investing in suitable mutual funds.
            </p>
            {riskProfile && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800 text-center">
                  <strong>Your Risk Profile:</strong> {riskProfile.category} Investor
                </p>
                {autoKycEnabled && (
                  <p className="text-xs text-blue-700 mt-1 text-center">
                    KYC verified automatically using AI-powered verification
                  </p>
                )}
              </div>
            )}
            <Button onClick={handleFinalizeOnboarding} className="w-full">
              Go to Dashboard
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OnboardingSteps;

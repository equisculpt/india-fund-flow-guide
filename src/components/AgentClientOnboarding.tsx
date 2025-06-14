
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  UserPlus, 
  Phone, 
  Mail, 
  Shield, 
  CheckCircle, 
  Clock,
  Copy,
  Send
} from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

interface AgentClientOnboardingProps {
  isAgent?: boolean;
  agentId?: string;
}

const AgentClientOnboarding = ({ isAgent = false, agentId }: AgentClientOnboardingProps) => {
  const [activeTab, setActiveTab] = useState("self-onboard");
  const [step, setStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [kycStatus, setKycStatus] = useState<"pending" | "processing" | "verified" | "failed">("pending");
  const { toast } = useToast();

  // Form states
  const [clientData, setClientData] = useState({
    fullName: "",
    email: "",
    phone: "",
    panNumber: "",
    aadhaarNumber: "",
    dateOfBirth: "",
    address: "",
    nomineeName: "",
    nomineeRelation: "",
    bankAccount: "",
    ifscCode: ""
  });
  const [otp, setOtp] = useState("");
  const [onboardingLink, setOnboardingLink] = useState("");

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
    // Simulate OTP sending
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
    // Simulate OTP verification
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
    
    // Simulate KYC processing with instant verification
    setTimeout(() => {
      setKycStatus("verified");
      setStep(4);
      toast({
        title: "KYC Verified",
        description: "Your KYC has been verified successfully. You can now start investing!",
      });
    }, 3000);
  };

  const generateOnboardingLink = () => {
    const link = `https://sipbrewery.com/onboard?agent=${agentId}&ref=${Math.random().toString(36).substr(2, 9)}`;
    setOnboardingLink(link);
    toast({
      title: "Link Generated",
      description: "Onboarding link has been generated successfully",
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(onboardingLink);
    toast({
      title: "Copied",
      description: "Onboarding link copied to clipboard",
    });
  };

  const renderKYCStatus = () => {
    const statusConfig = {
      pending: { color: "bg-gray-100 text-gray-800", icon: Clock, text: "Pending" },
      processing: { color: "bg-blue-100 text-blue-800", icon: Clock, text: "Processing" },
      verified: { color: "bg-green-100 text-green-800", icon: CheckCircle, text: "Verified" },
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Onboarding</h1>
        <p className="text-gray-600">Quick and secure client onboarding with instant KYC verification</p>
      </div>

      {isAgent && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="self-onboard">Client Self-Onboarding</TabsTrigger>
            <TabsTrigger value="agent-assist">Agent Assisted</TabsTrigger>
          </TabsList>

          <TabsContent value="self-onboard">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send Onboarding Link
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client-name">Client Name</Label>
                    <Input
                      id="client-name"
                      placeholder="Enter client name"
                      value={clientData.fullName}
                      onChange={(e) => setClientData({...clientData, fullName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="client-phone">Client Phone</Label>
                    <Input
                      id="client-phone"
                      placeholder="Enter client phone"
                      value={clientData.phone}
                      onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                    />
                  </div>
                </div>
                
                <Button onClick={generateOnboardingLink} className="w-full">
                  Generate Onboarding Link
                </Button>

                {onboardingLink && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Label>Onboarding Link</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input value={onboardingLink} readOnly />
                      <Button onClick={copyLink} size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agent-assist">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Agent Assisted Onboarding
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Agent assisted onboarding form will be rendered here */}
                <div className="text-center py-8">
                  <p className="text-gray-600">Agent assisted onboarding form will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Regular onboarding flow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Complete Your Onboarding
            </span>
            {renderKYCStatus()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Step 1: Basic Information & Phone Verification</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={clientData.fullName}
                    onChange={(e) => setClientData({...clientData, fullName: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={clientData.email}
                    onChange={(e) => setClientData({...clientData, email: e.target.value})}
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={clientData.phone}
                    onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={clientData.dateOfBirth}
                    onChange={(e) => setClientData({...clientData, dateOfBirth: e.target.value})}
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
              <h3 className="text-lg font-semibold">Step 2: Verify Phone Number</h3>
              <div className="text-center">
                <p className="text-gray-600 mb-4">Enter the 6-digit OTP sent to {clientData.phone}</p>
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
              <h3 className="text-lg font-semibold">Step 3: KYC Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pan">PAN Number</Label>
                  <Input
                    id="pan"
                    value={clientData.panNumber}
                    onChange={(e) => setClientData({...clientData, panNumber: e.target.value.toUpperCase()})}
                    placeholder="Enter PAN number"
                  />
                </div>
                <div>
                  <Label htmlFor="aadhaar">Aadhaar Number</Label>
                  <Input
                    id="aadhaar"
                    value={clientData.aadhaarNumber}
                    onChange={(e) => setClientData({...clientData, aadhaarNumber: e.target.value})}
                    placeholder="Enter Aadhaar number"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={clientData.address}
                    onChange={(e) => setClientData({...clientData, address: e.target.value})}
                    placeholder="Enter your full address"
                  />
                </div>
                <div>
                  <Label htmlFor="nominee">Nominee Name</Label>
                  <Input
                    id="nominee"
                    value={clientData.nomineeName}
                    onChange={(e) => setClientData({...clientData, nomineeName: e.target.value})}
                    placeholder="Enter nominee name"
                  />
                </div>
                <div>
                  <Label htmlFor="relation">Nominee Relation</Label>
                  <Input
                    id="relation"
                    value={clientData.nomineeRelation}
                    onChange={(e) => setClientData({...clientData, nomineeRelation: e.target.value})}
                    placeholder="Enter relation"
                  />
                </div>
                <div>
                  <Label htmlFor="bank">Bank Account Number</Label>
                  <Input
                    id="bank"
                    value={clientData.bankAccount}
                    onChange={(e) => setClientData({...clientData, bankAccount: e.target.value})}
                    placeholder="Enter bank account number"
                  />
                </div>
                <div>
                  <Label htmlFor="ifsc">IFSC Code</Label>
                  <Input
                    id="ifsc"
                    value={clientData.ifscCode}
                    onChange={(e) => setClientData({...clientData, ifscCode: e.target.value.toUpperCase()})}
                    placeholder="Enter IFSC code"
                  />
                </div>
              </div>
              <Button onClick={handleKYCSubmit} className="w-full">
                Submit KYC for Verification
              </Button>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-800">Onboarding Complete!</h3>
              <p className="text-gray-600">Your account has been successfully verified. You can now start investing in mutual funds.</p>
              <Button className="w-full">Start Investing</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentClientOnboarding;

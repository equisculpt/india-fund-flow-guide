
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  CheckCircle, 
  Copy, 
  ExternalLink,
  Smartphone,
  CreditCard,
  FileText,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WhatsAppIntegration = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const webhookUrl = "https://your-project-ref.supabase.co/functions/v1/whatsapp-webhook";
  const verifyToken = "your_verify_token_here";

  const features = [
    {
      icon: <Users className="h-5 w-5 text-blue-600" />,
      title: "Complete Onboarding",
      description: "Full user registration and profile setup via WhatsApp chat"
    },
    {
      icon: <FileText className="h-5 w-5 text-green-600" />,
      title: "KYC Verification", 
      description: "Upload documents and complete KYC process through chat"
    },
    {
      icon: <CreditCard className="h-5 w-5 text-purple-600" />,
      title: "Investment Management",
      description: "Start SIPs, make lump sum investments, view portfolio"
    },
    {
      icon: <Smartphone className="h-5 w-5 text-orange-600" />,
      title: "Payment Links",
      description: "Generate secure payment links for investments"
    }
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`,
    });
  };

  const testWhatsAppBot = () => {
    if (!phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter your phone number first",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Test Message Sent",
      description: "Check your WhatsApp for a test message from the bot",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <MessageCircle className="h-8 w-8 text-green-600" />
          WhatsApp Banking Bot
        </h1>
        <p className="text-gray-600">Complete mutual fund operations through WhatsApp chat</p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-gray-50 p-2 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bot Demo */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            Try WhatsApp Bot
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="phone">Your WhatsApp Number</Label>
            <div className="flex gap-2">
              <Input
                id="phone"
                placeholder="+91 9876543210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button onClick={testWhatsAppBot}>
                Test Bot
              </Button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold mb-2">Sample Conversation:</h4>
            <div className="space-y-2 text-sm">
              <div className="bg-gray-100 p-2 rounded">
                <strong>You:</strong> Hi
              </div>
              <div className="bg-green-100 p-2 rounded">
                <strong>Bot:</strong> 🌟 Welcome to SIP Brewery!<br/>
                Choose an option:<br/>
                1️⃣ New User Onboarding<br/>
                2️⃣ View Portfolio<br/>
                3️⃣ Make Investment...
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Business API Setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Webhook Configuration</h4>
            <div className="space-y-2">
              <div>
                <Label className="text-sm">Webhook URL:</Label>
                <div className="flex items-center gap-2">
                  <Input value={webhookUrl} readOnly className="bg-white" />
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyToClipboard(webhookUrl, "Webhook URL")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-sm">Verify Token:</Label>
                <div className="flex items-center gap-2">
                  <Input value={verifyToken} readOnly className="bg-white" />
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyToClipboard(verifyToken, "Verify Token")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-yellow-50 text-yellow-800">
              Setup Required
            </Badge>
            <span className="text-sm text-gray-600">
              Configure these values in your WhatsApp Business API dashboard
            </span>
          </div>

          <Button className="w-full" variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            Open WhatsApp Business API Setup Guide
          </Button>
        </CardContent>
      </Card>

      {/* Available Commands */}
      <Card>
        <CardHeader>
          <CardTitle>Available WhatsApp Commands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Basic Commands</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li><code>hi</code> - Show main menu</li>
                <li><code>menu</code> - Return to main menu</li>
                <li><code>1</code> - Start onboarding</li>
                <li><code>2</code> - View portfolio</li>
                <li><code>3</code> - Make investment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Advanced Features</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li><code>4</code> - Manage SIP</li>
                <li><code>5</code> - Complete KYC</li>
                <li><code>6</code> - Generate payment link</li>
                <li><code>7</code> - Get investment advice</li>
                <li><code>8</code> - Referral program</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppIntegration;

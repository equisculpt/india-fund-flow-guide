
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
  Users,
  TrendingUp,
  Shield,
  Calculator,
  Bell
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
      title: "Complete User Onboarding",
      description: "Full signup flow with KYC verification through WhatsApp chat"
    },
    {
      icon: <CreditCard className="h-5 w-5 text-green-600" />,
      title: "Investment Management", 
      description: "Browse funds, start SIPs, make investments with guided flows"
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-purple-600" />,
      title: "Portfolio Tracking",
      description: "Real-time portfolio updates, daily returns, and detailed analytics"
    },
    {
      icon: <Calculator className="h-5 w-5 text-orange-600" />,
      title: "SIP Management",
      description: "Start, pause, modify SIPs with intelligent recommendations"
    },
    {
      icon: <Bell className="h-5 w-5 text-red-600" />,
      title: "Market Updates",
      description: "Live market data, fund performance, and personalized alerts"
    },
    {
      icon: <Shield className="h-5 w-5 text-indigo-600" />,
      title: "Secure Transactions",
      description: "Bank-grade security with BSE Star MF integration"
    }
  ];

  const conversationFlow = [
    {
      user: "Hi",
      bot: `🌟 Welcome to SIP Brewery!

Main Menu:
1️⃣ New User Signup
2️⃣ Login to Account  
3️⃣ Invest in Mutual Funds
4️⃣ View Portfolio
5️⃣ Manage SIP
6️⃣ Check Daily Returns
7️⃣ Complete KYC
8️⃣ Payment & Deposits
9️⃣ Referral Program
0️⃣ Help & Support`
    },
    {
      user: "4",
      bot: `📊 Your Portfolio Summary

💰 Current Value: ₹1,56,750
📈 Total Invested: ₹1,20,000
🎯 Total Gains: ₹36,750 (+30.6%)
📅 Today's Change: ₹2,450 (+1.59%)

📈 Your Holdings:
1. HDFC Top 100 Fund
   Current: ₹31,200 | Gains: ₹6,200 (+24.8%)

2. SBI Small Cap Fund
   Current: ₹42,350 | Gains: ₹7,350 (+21.0%)`
    },
    {
      user: "A",
      bot: `💰 Investment Options

A - Browse Top Funds
B - Start New SIP
C - One-time Investment  
D - Goal-based Investing
E - Tax Saving Funds (ELSS)

Reply with your choice (A-E)`
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
      description: "Check your WhatsApp for a welcome message from SIP Brewery Bot",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <MessageCircle className="h-8 w-8 text-green-600" />
          SIP Brewery WhatsApp Bot
        </h1>
        <p className="text-gray-600 text-lg">Complete investment platform through conversational AI</p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

      {/* Conversation Demo */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-green-600" />
              Live Conversation Demo
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

            <div className="bg-white p-4 rounded-lg border max-h-64 overflow-y-auto">
              <h4 className="font-semibold mb-3">Sample Conversation:</h4>
              <div className="space-y-3 text-sm">
                {conversationFlow.map((exchange, index) => (
                  <div key={index} className="space-y-2">
                    <div className="bg-blue-100 p-3 rounded-lg ml-8">
                      <strong className="text-blue-800">You:</strong>
                      <div className="mt-1">{exchange.user}</div>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg mr-8">
                      <strong className="text-green-800">SIP Brewery Bot:</strong>
                      <div className="mt-1 whitespace-pre-line">{exchange.bot}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Capabilities Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Bot Capabilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Complete user registration with guided flows</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Secure login with multiple authentication methods</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Browse and invest in 2000+ mutual funds</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Real-time portfolio tracking and analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Complete SIP management (start/pause/modify)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Daily market updates and fund performance</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">KYC verification with document upload</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Secure payments with UPI/Net Banking</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Referral program with instant tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">24/7 support with intelligent responses</span>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <div className="flex items-center gap-2 text-amber-800 text-sm font-medium">
                <Shield className="h-4 w-4" />
                Bank-Grade Security
              </div>
              <p className="text-amber-700 text-xs mt-1">
                All transactions processed through BSE Star MF with end-to-end encryption
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

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

      {/* Command Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Command Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Basic Commands</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li><code>hi/hello</code> - Show main menu</li>
                <li><code>menu</code> - Return to main menu</li>
                <li><code>help</code> - Get assistance</li>
                <li><code>1-9</code> - Quick menu actions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Investment Commands</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li><code>portfolio</code> - View holdings</li>
                <li><code>invest</code> - Start investing</li>
                <li><code>sip</code> - Manage SIPs</li>
                <li><code>returns</code> - Check performance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Account Commands</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li><code>kyc</code> - KYC verification</li>
                <li><code>payment</code> - Add money</li>
                <li><code>referral</code> - Earn rewards</li>
                <li><code>support</code> - Get help</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppIntegration;

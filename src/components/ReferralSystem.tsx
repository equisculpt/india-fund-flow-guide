
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Users, Gift, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReferralSystem = () => {
  const [referralCode, setReferralCode] = useState("");
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarnings: 0,
    pendingCommission: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    // Generate or fetch user's referral code
    generateReferralCode();
    fetchReferralStats();
  }, []);

  const generateReferralCode = () => {
    // This would typically come from your Supabase user profile
    const code = `SB${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setReferralCode(code);
  };

  const fetchReferralStats = async () => {
    // TODO: Implement Supabase query to fetch referral statistics
    console.log("Fetching referral stats from Supabase");
    // Placeholder data
    setReferralStats({
      totalReferrals: 12,
      activeReferrals: 8,
      totalEarnings: 15420.50,
      pendingCommission: 2340.75
    });
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const shareReferral = (platform: string) => {
    const message = `Join SIP Brewery and start investing in mutual funds! Use my referral code: ${referralCode}`;
    const url = `${window.location.origin}?ref=${referralCode}`;
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(message + ' ' + url)}`);
    } else if (platform === 'telegram') {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-amber-600" />
            Your Referral Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Input 
              value={referralCode} 
              readOnly 
              className="bg-gray-50 font-mono text-lg"
            />
            <Button onClick={copyReferralCode} variant="outline" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => shareReferral('whatsapp')} 
              className="bg-green-600 hover:bg-green-700"
            >
              Share on WhatsApp
            </Button>
            <Button 
              onClick={() => shareReferral('telegram')} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              Share on Telegram
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Referrals</p>
                <p className="text-2xl font-bold">{referralStats.totalReferrals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active Referrals</p>
                <p className="text-2xl font-bold">{referralStats.activeReferrals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-amber-600" />
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold">₹{referralStats.totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Pending Commission</p>
                <p className="text-2xl font-bold">₹{referralStats.pendingCommission.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReferralSystem;

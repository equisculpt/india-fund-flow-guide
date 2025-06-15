
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Users, Gift, TrendingUp, IndianRupee, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useReferralStats, useReferralCommissions } from "@/hooks/useReferralData";

const ReferralSystem = () => {
  const { toast } = useToast();
  const { data: stats, isLoading: statsLoading } = useReferralStats();
  const { data: commissions, isLoading: commissionsLoading } = useReferralCommissions();

  const copyReferralCode = () => {
    if (stats?.referralCode) {
      navigator.clipboard.writeText(stats.referralCode);
      toast({
        title: "Copied!",
        description: "Referral code copied to clipboard",
      });
    }
  };

  const shareReferral = (platform: string) => {
    const message = `Join SIP Brewery and start investing in mutual funds! Use my referral code: ${stats?.referralCode}`;
    const url = `${window.location.origin}?ref=${stats?.referralCode}`;
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(message + ' ' + url)}`);
    } else if (platform === 'telegram') {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`);
    }
  };

  if (statsLoading) {
    return <div className="text-center py-8">Loading referral data...</div>;
  }

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
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800 mb-2">
              <strong>How it works:</strong> Share your code and earn up to ₹500 when your friend makes their first investment. 
              You get 0.5% of their first investment amount (max ₹500 per referral).
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Input 
              value={stats?.referralCode || ''} 
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
                <p className="text-2xl font-bold">{stats?.totalReferrals || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Earning Referrals</p>
                <p className="text-2xl font-bold">{stats?.activeReferrals || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-amber-600" />
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold">₹{stats?.totalEarnings?.toLocaleString() || '0'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Pending Commission</p>
                <p className="text-2xl font-bold">₹{stats?.pendingCommission?.toLocaleString() || '0'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commission History */}
      <Card>
        <CardHeader>
          <CardTitle>Commission History</CardTitle>
        </CardHeader>
        <CardContent>
          {commissionsLoading ? (
            <p className="text-center py-4">Loading commission history...</p>
          ) : commissions && commissions.length > 0 ? (
            <div className="space-y-3">
              {commissions.map((commission) => (
                <div key={commission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">
                      {commission.referee_profile?.full_name || 'Anonymous User'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(commission.created_at).toLocaleDateString()} • 
                      {commission.commission_rate}% commission
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      +₹{commission.commission_amount.toLocaleString()}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      commission.status === 'earned' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {commission.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No referral commissions yet</p>
              <p className="text-sm text-gray-400">Start sharing your referral code to earn commissions!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralSystem;

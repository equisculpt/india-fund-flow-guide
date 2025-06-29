
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Wallet, 
  Gift, 
  Users, 
  Copy, 
  Share2, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  Clock,
  IndianRupee,
  Star,
  Trophy,
  Target,
  Zap,
  Heart
} from 'lucide-react';

const RewardsWallet = () => {
  const [referralCode] = useState('SIP2024XYZ');
  
  // Mock wallet data
  const walletData = {
    balance: 2450,
    totalEarned: 5680,
    pendingRewards: 450,
    referralCount: 12,
    loyaltyPoints: 850,
    nextMilestone: 1000
  };

  const referralData = {
    totalReferred: 12,
    activeReferrals: 8,
    totalCommission: 3200,
    thisMonthEarnings: 680,
    slabs: [
      { range: '1-3 referrals', reward: 100, status: 'completed', count: 3 },
      { range: '4-6 referrals', reward: 200, status: 'completed', count: 3 },
      { range: '7-16 referrals', reward: 300, status: 'active', count: 6 },
      { range: '17-50 referrals', reward: 400, status: 'upcoming', count: 0 },
      { range: '50+ referrals', reward: 500, status: 'upcoming', count: 0 }
    ]
  };

  const recentTransactions = [
    {
      id: 1,
      type: 'referral_bonus',
      description: 'Referral bonus for Amit Kumar',
      amount: 300,
      status: 'credited',
      date: '2024-01-15'
    },
    {
      id: 2,
      type: 'loyalty_reward',
      description: 'Annual loyalty reward',
      amount: 500,
      status: 'credited',
      date: '2024-01-10'
    },
    {
      id: 3,
      type: 'referral_bonus',
      description: 'Referral bonus for Priya Singh',
      amount: 200,
      status: 'pending',
      date: '2024-01-08'
    }
  ];

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    // Toast notification would go here
  };

  const shareReferralCode = () => {
    const shareText = `Join SIP Brewery and start your investment journey! Use my referral code: ${referralCode}`;
    if (navigator.share) {
      navigator.share({
        title: 'Join SIP Brewery',
        text: shareText,
        url: window.location.origin
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Rewards & Wallet</h2>
          <p className="text-gray-600 mt-1">Earn rewards and manage your wallet</p>
        </div>
        <Button className="flex items-center gap-2">
          <Gift className="h-4 w-4" />
          Claim Rewards
        </Button>
      </div>

      {/* Wallet Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Wallet Balance</p>
                <p className="text-3xl font-bold text-green-900">{formatCurrency(walletData.balance)}</p>
              </div>
              <Wallet className="h-10 w-10 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Total Earned</p>
                <p className="text-3xl font-bold text-blue-900">{formatCurrency(walletData.totalEarned)}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Referrals</p>
                <p className="text-3xl font-bold text-purple-900">{walletData.referralCount}</p>
              </div>
              <Users className="h-10 w-10 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 font-medium">Loyalty Points</p>
                <p className="text-3xl font-bold text-orange-900">{walletData.loyaltyPoints}</p>
              </div>
              <Star className="h-10 w-10 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="wallet" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty Program</TabsTrigger>
          <TabsTrigger value="rewards">Rewards Center</TabsTrigger>
        </TabsList>

        <TabsContent value="wallet">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Wallet Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {formatCurrency(walletData.balance)}
                      </div>
                      <div className="text-sm text-green-700">Available Balance</div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <span className="font-medium">Pending Rewards</span>
                      <span className="font-bold text-blue-600">{formatCurrency(walletData.pendingRewards)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <IndianRupee className="h-4 w-4 mr-2" />
                      Withdraw to Bank
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Target className="h-4 w-4 mr-2" />
                      Invest Wallet Balance
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Gift className="h-4 w-4 mr-2" />
                      Redeem Points
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'referral_bonus' ? 'bg-purple-100' : 'bg-green-100'
                        }`}>
                          {transaction.type === 'referral_bonus' ? 
                            <Users className="h-4 w-4 text-purple-600" /> : 
                            <Gift className="h-4 w-4 text-green-600" />
                          }
                        </div>
                        <div>
                          <div className="font-semibold">{transaction.description}</div>
                          <div className="text-sm text-gray-600">{transaction.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">+{formatCurrency(transaction.amount)}</div>
                        <Badge className={
                          transaction.status === 'credited' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }>
                          {transaction.status === 'credited' ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="referrals">
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-purple-900 mb-2">Your Referral Code</h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Input 
                      value={referralCode} 
                      readOnly 
                      className="text-center font-mono text-lg max-w-xs"
                    />
                    <Button onClick={copyReferralCode} size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button onClick={shareReferralCode} size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-purple-700">Share this code and earn rewards when your friends invest!</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Referral Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <span className="font-medium">Total Referred</span>
                      <span className="font-bold text-blue-600">{referralData.totalReferred}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <span className="font-medium">Active Referrals</span>
                      <span className="font-bold text-green-600">{referralData.activeReferrals}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                      <span className="font-medium">Total Commission</span>
                      <span className="font-bold text-purple-600">{formatCurrency(referralData.totalCommission)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Referral Slabs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {referralData.slabs.map((slab, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${
                        slab.status === 'completed' ? 'bg-green-50 border-green-200' :
                        slab.status === 'active' ? 'bg-blue-50 border-blue-200' :
                        'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold">{slab.range}</div>
                            <div className="text-sm text-gray-600">{formatCurrency(slab.reward)} per referral</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{slab.count}</div>
                            {slab.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />}
                            {slab.status === 'active' && <Zap className="h-4 w-4 text-blue-600 mx-auto" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="loyalty">
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
              <CardContent className="p-6">
                <div className="text-center">
                  <Trophy className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-orange-900 mb-2">Loyalty Program</h3>
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {walletData.loyaltyPoints} Points
                  </div>
                  <div className="text-sm text-orange-700 mb-4">
                    {walletData.nextMilestone - walletData.loyaltyPoints} points to next milestone
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full" 
                      style={{ width: `${(walletData.loyaltyPoints / walletData.nextMilestone) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>How to Earn Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Target className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">Monthly SIP</div>
                        <div className="text-sm text-gray-600">10 points per ₹1000 invested</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Users className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-semibold">Referrals</div>
                        <div className="text-sm text-gray-600">100 points per successful referral</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <Heart className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-semibold">Anniversary Bonus</div>
                        <div className="text-sm text-gray-600">500 points yearly</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Redeem Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="font-semibold">₹100 Cash Voucher</div>
                      <div className="text-sm text-gray-600">1000 points</div>
                      <Button size="sm" className="mt-2 w-full">Redeem</Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-semibold">₹500 Investment Bonus</div>
                      <div className="text-sm text-gray-600">4000 points</div>
                      <Button size="sm" className="mt-2 w-full">Redeem</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rewards">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="text-center p-6">
              <Gift className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Welcome Bonus</h3>
              <p className="text-sm text-gray-600 mb-4">Get ₹100 on your first investment</p>
              <Button size="sm">Claim Now</Button>
            </Card>
            
            <Card className="text-center p-6">
              <Star className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Loyalty Rewards</h3>
              <p className="text-sm text-gray-600 mb-4">Earn 30% of platform commission</p>
              <Button size="sm" variant="outline">Learn More</Button>
            </Card>
            
            <Card className="text-center p-6">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Referral Program</h3>
              <p className="text-sm text-gray-600 mb-4">Earn up to ₹500 per referral</p>
              <Button size="sm" variant="outline">Start Referring</Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RewardsWallet;


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ReferralSystem from "@/components/ReferralSystem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Users, TrendingUp, Award, IndianRupee, Target } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const ReferralPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to access the referral system",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [isAuthenticated, navigate, toast]);

  if (!isAuthenticated) {
    return null;
  }

  const referralBenefits = [
    {
      icon: <IndianRupee className="h-8 w-8 text-amber-600" />,
      title: "Earn Up to ₹500",
      description: "Get 0.5% commission on each friend's first investment (max ₹500 per referral)"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Build Your Network",
      description: "Help friends and family start their investment journey with professional guidance"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: "Instant Payouts",
      description: "Earn commission immediately when your friend makes their first investment"
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "No Limits",
      description: "Refer unlimited friends and earn ₹500 for each successful investment"
    }
  ];

  const commissionExamples = [
    { investment: 5000, commission: 25, maxed: false },
    { investment: 25000, commission: 125, maxed: false },
    { investment: 50000, commission: 250, maxed: false },
    { investment: 100000, commission: 500, maxed: true },
    { investment: 200000, commission: 500, maxed: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Referral Program - Earn ₹500 Per Friend!
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Share the wealth, earn real money. Get 0.5% commission on every friend's first investment, 
            up to ₹500 per referral. No limits on how many friends you can refer!
          </p>
        </div>

        {/* Commission Calculator */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Commission Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-4">
                {commissionExamples.map((example, index) => (
                  <div key={index} className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border">
                    <div className="font-bold text-lg text-gray-900">
                      ₹{example.investment.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">Friend invests</div>
                    <div className="text-2xl font-bold text-green-600">
                      ₹{example.commission}
                    </div>
                    <div className="text-xs text-gray-500">
                      {example.maxed ? 'Max reached' : '0.5% commission'}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  <strong>How it works:</strong> You earn 0.5% of your friend's first investment amount, 
                  with a maximum of ₹500 per referral. Higher investments = higher rewards!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <ReferralSystem />

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Our Referral Program is the Best?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {referralBenefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">How to Maximize Your Earnings</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-3 text-lg">Share Your Code</h3>
              <p className="text-sm opacity-90">
                Share your unique referral code with friends, family, and colleagues. 
                Use WhatsApp, Telegram, or social media to reach more people.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-3 text-lg">Help Them Invest</h3>
              <p className="text-sm opacity-90">
                Guide your referrals to make their first investment. Higher investment amounts 
                mean higher commissions for you (up to ₹500 per referral).
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-3 text-lg">Earn Instantly</h3>
              <p className="text-sm opacity-90">
                Receive your commission immediately when they complete their first investment. 
                Track all earnings in real-time on your dashboard.
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 inline-block">
              <h4 className="font-bold text-xl mb-2">💡 Pro Tip</h4>
              <p className="text-sm max-w-md">
                Encourage friends to start with higher SIP amounts or lump sum investments. 
                A friend investing ₹1,00,000 gets you the maximum ₹500 commission!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;


import Header from "@/components/Header";
import ReferralSystem from "@/components/ReferralSystem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Users, TrendingUp, Award } from "lucide-react";

const ReferralPage = () => {
  const referralBenefits = [
    {
      icon: <Gift className="h-8 w-8 text-amber-600" />,
      title: "Earn Commission",
      description: "Get up to 1% commission on every investment made by your referrals"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Build Your Network",
      description: "Help friends and family start their investment journey"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: "Passive Income",
      description: "Earn recurring income as your referrals continue investing"
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "Special Rewards",
      description: "Unlock exclusive rewards and bonuses for top performers"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Referral Program
          </h1>
          <p className="text-xl text-gray-600">
            Share the wealth, earn rewards. Invite friends to start investing!
          </p>
        </div>

        <ReferralSystem />

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Join Our Referral Program?
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

        <div className="mt-12 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="bg-white bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Share Your Code</h3>
              <p className="text-sm opacity-90">Share your unique referral code with friends and family</p>
            </div>
            <div>
              <div className="bg-white bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">They Invest</h3>
              <p className="text-sm opacity-90">Your referrals sign up and start investing in mutual funds</p>
            </div>
            <div>
              <div className="bg-white bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">You Earn</h3>
              <p className="text-sm opacity-90">Earn commission on every investment they make</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;

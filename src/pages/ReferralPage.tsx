
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gift, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReferralSystem from "@/components/ReferralSystem";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEnhancedAuth } from "@/contexts/EnhancedAuthContext";

const ReferralPage = () => {
  const navigate = useNavigate();
  const { user } = useEnhancedAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Referral Program</h1>
              <p className="text-gray-600">Earn up to ₹500 for every successful referral</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Gift className="h-8 w-8" />
                  <div>
                    <p className="text-green-100">Referral Bonus</p>
                    <p className="text-2xl font-bold">Up to ₹500</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8" />
                  <div>
                    <p className="text-blue-100">Min Investment</p>
                    <p className="text-2xl font-bold">₹1,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-8 w-8" />
                  <div>
                    <p className="text-purple-100">Commission Rate</p>
                    <p className="text-2xl font-bold">0.5%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Gift className="h-8 w-8" />
                  <div>
                    <p className="text-amber-100">Your Tier</p>
                    <p className="text-2xl font-bold">{user?.type === 'agent' ? 'Pro' : 'Basic'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <ReferralSystem />
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-amber-600" />
                Program Terms & Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Eligibility</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Referral must be a new user to SIP Brewery</li>
                    <li>• Minimum investment of ₹1,000 required</li>
                    <li>• Referral must complete KYC verification</li>
                    <li>• Investment must be maintained for 90 days</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Commission Structure</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 0.5% of first investment amount</li>
                    <li>• Maximum ₹500 per referral</li>
                    <li>• Paid within 30 days of qualification</li>
                    <li>• No limit on number of referrals</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> Referral bonuses are promotional incentives and do not guarantee investment returns. 
                  All mutual fund investments are subject to market risks. Please read all scheme related documents carefully.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ReferralPage;

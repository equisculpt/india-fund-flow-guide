
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface InvestmentActionCardProps {
  fundData: any;
  aiAnalysis: any;
}

const InvestmentActionCard = ({ fundData, aiAnalysis }: InvestmentActionCardProps) => {
  const navigate = useNavigate();

  const handleStartSIP = () => {
    console.log('Start SIP clicked, navigating to login');
    navigate('/onboarding');
  };

  const handleOneTimeInvestment = () => {
    console.log('One-time Investment clicked, navigating to login');
    navigate('/onboarding');
  };

  return (
    <Card className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader>
        <CardTitle>Ready to Invest?</CardTitle>
        <CardDescription>
          Start your SIP journey with this {aiAnalysis?.recommendation?.toLowerCase() || 'available'} fund
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Button size="lg" className="flex-1" onClick={handleStartSIP}>
            Start SIP (₹{fundData.minSipAmount}/month)
          </Button>
          <Button variant="outline" size="lg" className="flex-1" onClick={handleOneTimeInvestment}>
            One-time Investment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentActionCard;

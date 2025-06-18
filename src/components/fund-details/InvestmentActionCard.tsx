
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface InvestmentActionCardProps {
  fundData: any;
  aiAnalysis: any;
}

const InvestmentActionCard = ({ fundData, aiAnalysis }: InvestmentActionCardProps) => {
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
          <Button size="lg" className="flex-1">
            Start SIP (₹{fundData.minSipAmount}/month)
          </Button>
          <Button variant="outline" size="lg" className="flex-1">
            One-time Investment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentActionCard;

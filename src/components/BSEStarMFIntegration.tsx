
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, CreditCard, FileText, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FundInvestmentProps {
  fundName?: string;
  fundCode?: string;
  onInvestmentSuccess?: () => void;
}

const BSEStarMFIntegration = ({ fundName, fundCode, onInvestmentSuccess }: FundInvestmentProps) => {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [investmentType, setInvestmentType] = useState("SIP");
  const [sipFrequency, setSipFrequency] = useState("monthly");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleInvestment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      console.log("Processing BSE Star MF investment:", {
        fundName,
        fundCode,
        investmentAmount,
        investmentType,
        sipFrequency
      });

      // TODO: Implement actual BSE Star MF API integration through Supabase edge function
      const response = await fetch('/api/bse-star-mf/invest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fundCode,
          amount: parseFloat(investmentAmount),
          investmentType,
          frequency: sipFrequency
        })
      });

      if (response.ok) {
        toast({
          title: "Investment Successful!",
          description: `Your ${investmentType} of ₹${investmentAmount} has been processed successfully.`,
        });
        onInvestmentSuccess?.();
      } else {
        throw new Error('Investment failed');
      }
    } catch (error) {
      console.error("BSE Star MF investment error:", error);
      toast({
        title: "Investment Failed",
        description: "There was an error processing your investment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          BSE Star MF Investment
        </CardTitle>
        <p className="text-sm text-gray-600">
          Secure investment through BSE Star MF platform
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleInvestment} className="space-y-4">
          {fundName && (
            <div>
              <Label>Selected Fund</Label>
              <Input value={fundName} readOnly className="bg-gray-50" />
            </div>
          )}

          <div>
            <Label htmlFor="investment-type">Investment Type</Label>
            <Select value={investmentType} onValueChange={setInvestmentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select investment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SIP">SIP (Systematic Investment Plan)</SelectItem>
                <SelectItem value="LUMPSUM">Lump Sum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {investmentType === "SIP" && (
            <div>
              <Label htmlFor="sip-frequency">SIP Frequency</Label>
              <Select value={sipFrequency} onValueChange={setSipFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="amount">Investment Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              min="500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum investment: ₹500
            </p>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-blue-800 text-sm">
              <CheckCircle className="h-4 w-4" />
              <span>Direct payment to AMC through BSE Star MF</span>
            </div>
            <div className="flex items-center gap-2 text-blue-800 text-sm mt-1">
              <Shield className="h-4 w-4" />
              <span>SEBI regulated and secure</span>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            disabled={isProcessing}
          >
            {isProcessing ? (
              "Processing Investment..."
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Invest Now
              </>
            )}
          </Button>
        </form>

        <div className="mt-4 text-xs text-gray-500 text-center">
          <FileText className="h-4 w-4 inline mr-1" />
          By investing, you agree to our terms and conditions
        </div>
      </CardContent>
    </Card>
  );
};

export default BSEStarMFIntegration;

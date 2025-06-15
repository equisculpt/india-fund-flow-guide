
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, TrendingUp, CheckCircle } from "lucide-react";

interface RiskProfile {
  category: 'Conservative' | 'Moderate' | 'Aggressive';
  score: number;
  suitableFunds: string[];
}

interface RiskProfileResultsProps {
  riskProfile: RiskProfile;
  onContinue: () => void;
}

const RiskProfileResults = ({ riskProfile, onContinue }: RiskProfileResultsProps) => {
  const getRiskIcon = () => {
    switch (riskProfile.category) {
      case 'Conservative':
        return <Shield className="h-8 w-8 text-green-600" />;
      case 'Moderate':
        return <TrendingUp className="h-8 w-8 text-blue-600" />;
      case 'Aggressive':
        return <AlertTriangle className="h-8 w-8 text-red-600" />;
    }
  };

  const getRiskColor = () => {
    switch (riskProfile.category) {
      case 'Conservative':
        return 'bg-green-100 text-green-800';
      case 'Moderate':
        return 'bg-blue-100 text-blue-800';
      case 'Aggressive':
        return 'bg-red-100 text-red-800';
    }
  };

  const getRiskDescription = () => {
    switch (riskProfile.category) {
      case 'Conservative':
        return "You prefer stability and capital preservation over high returns. You're comfortable with lower but more predictable returns.";
      case 'Moderate':
        return "You're willing to accept moderate risk for potentially higher returns. You seek a balance between growth and stability.";
      case 'Aggressive':
        return "You're comfortable with high risk for potentially high returns. You have a long investment horizon and can handle market volatility.";
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Your Risk Profile Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {getRiskIcon()}
            </div>
            <Badge className={`text-lg px-4 py-2 ${getRiskColor()}`}>
              {riskProfile.category} Investor
            </Badge>
            <p className="text-sm text-gray-600 mt-2">
              Score: {riskProfile.score}/24
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">What this means:</h4>
            <p className="text-gray-700">{getRiskDescription()}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Suitable Fund Categories for You:</h4>
            <div className="grid grid-cols-2 gap-2">
              {riskProfile.suitableFunds.map((fund, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">{fund}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <strong>Important Disclaimer:</strong> This assessment is indicative and for educational purposes only. 
                Past performance doesn't guarantee future returns. Please read all scheme documents carefully before investing.
                Consider consulting with a SEBI registered investment advisor for personalized advice.
              </div>
            </div>
          </div>

          <Button onClick={onContinue} className="w-full">
            Continue with Onboarding
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskProfileResults;

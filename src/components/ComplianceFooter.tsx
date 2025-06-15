
import { Shield, FileText, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ComplianceFooter = () => {
  return (
    <div className="bg-blue-50 border-t border-blue-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-blue-200">
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900 mb-1">SEBI Registered</h3>
              <p className="text-sm text-blue-700">Investment Advisor regulated by Securities and Exchange Board of India</p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200">
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900 mb-1">AMFI Compliant</h3>
              <p className="text-sm text-blue-700">All practices comply with Association of Mutual Funds in India guidelines</p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900 mb-1">Risk Disclosure</h3>
              <p className="text-sm text-blue-700">Mutual funds are subject to market risks. Read all documents carefully</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-blue-600 max-w-4xl mx-auto">
            <strong>Important:</strong> Past performance is not indicative of future returns. 
            Mutual fund investments are subject to market risks, read all scheme related documents carefully. 
            The NAVs of the schemes may go up or down depending upon the factors and forces affecting the securities market including the fluctuations in the interest rates. 
            The past performance of the mutual funds is not necessarily indicative of future performance of the schemes. 
            Rewards and wallet credits are promotional offers and do not guarantee investment returns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComplianceFooter;

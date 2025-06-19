
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
              <h3 className="font-semibold text-blue-900 mb-1">AMFI Registered</h3>
              <p className="text-sm text-blue-700">Mutual Fund Distributor registered with Association of Mutual Funds in India</p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200">
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900 mb-1">Distribution Services</h3>
              <p className="text-sm text-blue-700">We provide mutual fund distribution services and earn commission from fund houses</p>
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
            We are AMFI registered mutual fund distributors and may earn commission when you invest through our platform.
            AI-generated research and analysis are for informational purposes only and should not be considered as investment advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComplianceFooter;

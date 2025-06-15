
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Award } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              🎉 Limited Time: Earn up to ₹70,000 wallet credits!
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Start Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Mutual Fund
            </span>{" "}
            Journey Today
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Invest in top-performing mutual funds with professional guidance. 
            Earn up to ₹20,000 wallet credits for 12 uninterrupted SIPs AND up to ₹50,000 for portfolio transfers!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
              Start Investing with ₹500
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg">
              Calculate Returns
            </Button>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-md">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Higher Returns</h3>
              <p className="text-sm text-gray-600">Professional fund management</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-md">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">SEBI Regulated</h3>
              <p className="text-sm text-gray-600">Safe & transparent investing</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-md">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Reward System</h3>
              <p className="text-sm text-gray-600">Earn wallet credits for discipline</p>
            </div>
          </div>

          {/* Compliance Notice */}
          <div className="mt-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
            <p className="text-xs text-gray-600">
              <strong>Risk Disclosure:</strong> Mutual funds are subject to market risks. 
              Please read all scheme related documents carefully before investing. 
              Past performance is not indicative of future returns. SEBI Registered | AMFI Compliant
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

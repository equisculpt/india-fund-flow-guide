
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Users, Gift } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Invest Smart,
              <span className="text-blue-600 block">Earn Rewards</span>
              with Every SIP
            </h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Get professional mutual fund investment guidance with regular funds, 
              plus earn <strong>wallet credits</strong> through our exclusive reward programs.
            </p>
            
            <div className="bg-gradient-to-r from-teal-50 to-green-50 p-4 rounded-lg mb-8 border border-teal-200">
              <div className="flex items-center space-x-3">
                <Gift className="h-8 w-8 text-teal-600" />
                <div>
                  <h3 className="font-bold text-gray-900">🎁 Exclusive Reward Programs</h3>
                  <p className="text-gray-700">
                    Earn up to ₹20,000 wallet credits for 12 uninterrupted SIPs or ₹50,000 for portfolio transfers!
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                Start SIP with ₹500
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Explore Funds
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">15%+</div>
                <div className="text-sm text-gray-600">Avg. Returns</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Professional Support</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Gift className="h-8 w-8 text-teal-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">₹50K</div>
                <div className="text-sm text-gray-600">Max Wallet Credits</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h3 className="text-xl font-semibold mb-6 text-center">Investment Portfolio + Rewards</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium">Large Cap Fund</div>
                    <div className="text-sm text-gray-600">₹25,000</div>
                  </div>
                  <div className="text-green-600 font-semibold">+12.5%</div>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-medium">Mid Cap Fund</div>
                    <div className="text-sm text-gray-600">₹15,000</div>
                  </div>
                  <div className="text-green-600 font-semibold">+18.2%</div>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <div>
                    <div className="font-medium">ELSS Fund</div>
                    <div className="text-sm text-gray-600">₹10,000</div>
                  </div>
                  <div className="text-green-600 font-semibold">+15.8%</div>
                </div>
              </div>
              
              {/* Wallet Credit Reward Display */}
              <div className="mt-4 p-4 bg-gradient-to-r from-teal-100 to-green-100 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Gift className="h-5 w-5 text-teal-600" />
                    <span className="font-medium text-gray-900">Wallet Credits Earned</span>
                  </div>
                  <span className="font-bold text-teal-600">₹15,000</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">Portfolio transfer + SIP rewards</div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white text-center">
                <div className="text-lg font-semibold">Total Portfolio Value</div>
                <div className="text-2xl font-bold">₹58,750</div>
                <div className="text-sm opacity-90">+16.5% overall growth</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

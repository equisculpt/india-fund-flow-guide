
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Download } from "lucide-react";

interface QuickActionCardsProps {
  handleInvestMore: () => void;
}

const QuickActionCards = ({ handleInvestMore }: QuickActionCardsProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white cursor-pointer hover:from-blue-700 hover:to-indigo-700 transition-all duration-300" onClick={handleInvestMore}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Start New SIP</h3>
              <p className="text-blue-100">Explore 3000+ mutual funds</p>
            </div>
            <ArrowRight className="h-8 w-8" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Goal-based Investing</h3>
              <p className="text-green-100">Plan for your future</p>
            </div>
            <TrendingUp className="h-8 w-8" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Tax Savings</h3>
              <p className="text-purple-100">ELSS funds available</p>
            </div>
            <Download className="h-8 w-8" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActionCards;

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FundCard from "@/components/FundCard";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, TrendingUp, Users, Award, Clock } from "lucide-react";

const Index = () => {
  const topFunds = [
    {
      name: "HDFC Top 100 Fund",
      category: "Large Cap",
      returns1y: 15.2,
      returns3y: 12.8,
      returns5y: 14.1,
      minSip: 500,
      rating: 4,
      nav: 856.32,
      riskLevel: "Moderate" as const
    },
    {
      name: "SBI Small Cap Fund",
      category: "Small Cap",
      returns1y: 22.5,
      returns3y: 18.9,
      returns5y: 16.7,
      minSip: 1000,
      rating: 5,
      nav: 234.67,
      riskLevel: "High" as const
    },
    {
      name: "ICICI Prudential Bluechip",
      category: "Large Cap",
      returns1y: 13.8,
      returns3y: 11.2,
      returns5y: 12.9,
      minSip: 500,
      rating: 4,
      nav: 678.91,
      riskLevel: "Moderate" as const
    },
    {
      name: "Axis Long Term Equity",
      category: "ELSS",
      returns1y: 16.9,
      returns3y: 14.5,
      returns5y: 15.3,
      minSip: 500,
      rating: 5,
      nav: 445.78,
      riskLevel: "Moderate" as const
    },
    {
      name: "Kotak Emerging Equity",
      category: "Mid Cap",
      returns1y: 19.3,
      returns3y: 16.1,
      returns5y: 17.2,
      minSip: 1000,
      rating: 4,
      nav: 567.23,
      riskLevel: "High" as const
    },
    {
      name: "Mirae Asset Large Cap",
      category: "Large Cap",
      returns1y: 14.6,
      returns3y: 12.3,
      returns5y: 13.8,
      minSip: 500,
      rating: 4,
      nav: 789.45,
      riskLevel: "Low" as const
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Higher Returns",
      description: "Historically, mutual funds have delivered better returns than traditional savings"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Professional Management",
      description: "Expert fund managers research and manage your investments"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Diversification",
      description: "Spread risk across multiple securities and sectors"
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600" />,
      title: "Regulated & Safe",
      description: "SEBI regulated funds ensure transparency and investor protection"
    },
    {
      icon: <Clock className="h-8 w-8 text-red-600" />,
      title: "Systematic Investment",
      description: "Start with as low as ₹500 per month through SIP"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-teal-600" />,
      title: "Tax Benefits",
      description: "ELSS funds offer tax deductions up to ₹1.5 lakh under 80C"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      
      {/* Top Mutual Funds Section */}
      <section id="funds" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Performing Mutual Funds</h2>
            <p className="text-xl text-gray-600">Handpicked funds with consistent track record</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topFunds.map((fund, index) => (
              <FundCard key={index} {...fund} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button size="lg" variant="outline" className="px-8">
              View All Funds
            </Button>
          </div>
        </div>
      </section>

      <InvestmentCalculator />

      {/* Why Invest Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Invest in Mutual Funds?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mutual funds offer a simple, efficient way to build wealth over time with professional management and diversified risk
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join millions of Indians who are building wealth through mutual funds
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
              Start Investing Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 text-white rounded-lg p-2 font-bold text-xl">
                  SB
                </div>
                <span className="text-xl font-bold">SIP Brewery</span>
              </div>
              <p className="text-gray-400">
                Making mutual fund investments simple and accessible for every Indian.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Mutual Funds</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SIP Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tax Saving Funds</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Goal Planning</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Learning Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Market Insights</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fund Research</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Investment Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Equisculpt Ventures. All rights reserved. | Mutual Fund investments are subject to market risks.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

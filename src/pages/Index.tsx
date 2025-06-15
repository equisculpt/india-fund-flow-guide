
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FundCard from "@/components/FundCard";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import BreweryLogo from "@/components/BreweryLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, TrendingUp, Users, Award, Clock, Gift } from "lucide-react";
import { Link } from "react-router-dom";

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
      description: "Expert fund managers research and manage your investments with regular fund support"
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
      icon: <Gift className="h-8 w-8 text-teal-600" />,
      title: "Gift Card Rewards",
      description: "Earn 0.2% of your equity investments as gift cards every year"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      
      {/* Rewards banner */}
      <section className="py-12 bg-gradient-to-r from-teal-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-4">
              <Gift className="h-16 w-16 text-teal-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🎁 Our Unique Reward Program</h2>
            <p className="text-xl text-gray-700 mb-4">
              <strong>Get 0.2% of your equity mutual fund investments back as gift cards every year!</strong>
            </p>
            <p className="text-lg text-gray-600">
              This is our way of thanking you for choosing us as your investment partner. 
              The more you invest, the more you earn in gift cards - it's our unique selling proposition!
            </p>
          </div>
        </div>
      </section>
      
      {/* Top Mutual Funds Section */}
      <section id="funds" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Performing Mutual Funds</h2>
            <p className="text-xl text-gray-600">Handpicked regular funds with professional support and consistent track record</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Invest with Equisculpt Ventures?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer regular mutual funds with professional management and an exclusive reward program that gives you more value for your investments
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
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Indians who are building wealth through mutual funds and earning gift card rewards
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 px-8">
              Start Investing Now
            </Button>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-600 px-8">
                Schedule a Call
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <BreweryLogo size="md" />
              </div>
              <p className="text-gray-400">
                Making mutual fund investments rewarding and accessible for every Indian with our unique gift card program.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#funds" className="hover:text-white transition-colors">Mutual Funds</a></li>
                <li><a href="#calculator" className="hover:text-white transition-colors">SIP Calculator</a></li>
                <li><Link to="/referrals" className="hover:text-white transition-colors">Referral Program</Link></li>
                <li><Link to="/whatsapp-bot" className="hover:text-white transition-colors">WhatsApp Bot</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><a href="#funds" className="hover:text-white transition-colors">Fund Research</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Investment Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Support</Link></li>
                <li><a href="https://www.sebi.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">SEBI</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Equisculpt Ventures. All rights reserved. | Mutual Fund investments are subject to market risks. Please read all scheme documents carefully before investing.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

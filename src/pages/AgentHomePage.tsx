
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Smartphone, Zap, Shield, Award, ArrowRight, MessageCircle, CreditCard, Target, BarChart3, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const AgentHomePage = () => {
  const agentBenefits = [
    {
      icon: <CreditCard className="h-12 w-12 text-green-600" />,
      title: "90% Commission Sharing",
      description: "Industry-leading commission rates on equity mutual funds with transparent payouts",
      highlight: "Up to 90%"
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-blue-600" />,
      title: "80% on Debt Funds",
      description: "Competitive rates on debt mutual funds ensuring consistent revenue streams",
      highlight: "Up to 80%"
    },
    {
      icon: <MessageCircle className="h-12 w-12 text-purple-600" />,
      title: "WhatsApp Client Onboarding",
      description: "Seamlessly onboard clients through WhatsApp with automated KYC and investment flows",
      highlight: "Easy Setup"
    },
    {
      icon: <Smartphone className="h-12 w-12 text-orange-600" />,
      title: "White-label Platform",
      description: "Your own branded investment platform with custom domain and branding",
      highlight: "Your Brand"
    },
    {
      icon: <Users className="h-12 w-12 text-teal-600" />,
      title: "Client Management Suite",
      description: "Advanced tools to manage portfolios, track performance, and engage clients",
      highlight: "Advanced Tools"
    },
    {
      icon: <Clock className="h-12 w-12 text-red-600" />,
      title: "Instant Onboarding",
      description: "Get started in minutes with our streamlined agent registration process",
      highlight: "Quick Start"
    }
  ];

  const features = [
    {
      title: "WhatsApp Integration",
      description: "Allow clients to invest, check portfolios, and manage SIPs directly through WhatsApp",
      icon: <MessageCircle className="h-8 w-8 text-green-600" />
    },
    {
      title: "Automated Client Journey",
      description: "From KYC to first investment - everything automated through our platform",
      icon: <Zap className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Real-time Commission Tracking",
      description: "Track your earnings in real-time with detailed commission breakdowns",
      icon: <Target className="h-8 w-8 text-purple-600" />
    },
    {
      title: "SEBI Compliant",
      description: "All processes are SEBI and AMFI compliant ensuring regulatory adherence",
      icon: <Shield className="h-8 w-8 text-green-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section for Agents */}
      <section className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-flex items-center bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-6 py-3 rounded-full text-sm font-semibold mb-4 shadow-lg">
                <Award className="h-4 w-4 mr-2" />
                🚀 Exclusive Agent Program - Limited Spots Available!
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Earn{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
                90% Commission
              </span>{" "}
              with SIP Brewery
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Join India's most rewarding mutual fund distribution platform. Get up to 90% commission sharing, 
              white-label solutions, and seamless WhatsApp client onboarding.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
              <Link to="/onboard">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-10 py-6 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  Start Agent Onboarding
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  Schedule Demo Call
                  <MessageCircle className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="text-2xl font-bold text-green-600">90%</h3>
                  <p className="text-gray-700 font-medium">Commission on Equity Funds</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-600">80%</h3>
                  <p className="text-gray-700 font-medium">Commission on Debt Funds</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-purple-600">24/7</h3>
                  <p className="text-gray-700 font-medium">WhatsApp Client Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SIP Brewery for Agents?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The most comprehensive platform for mutual fund distributors with industry-leading benefits
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agentBenefits.map((benefit, index) => (
              <Card key={index} className="group text-center hover:shadow-2xl transition-all duration-300 bg-white border-2 hover:border-green-200 hover:scale-105 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                  </div>
                  <div className="inline-block bg-gradient-to-r from-green-100 to-blue-100 text-green-800 text-sm px-4 py-2 rounded-full mb-4 font-bold">
                    {benefit.highlight}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-xl text-gray-600">Everything you need to grow your mutual fund business</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-100 rounded-lg p-3">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join 1000+ agents already earning with SIP Brewery. Start your journey towards higher commissions and better client experience today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/onboard">
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100 px-10 py-6 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgentHomePage;

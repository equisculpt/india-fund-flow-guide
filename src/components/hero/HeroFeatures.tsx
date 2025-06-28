
import React from 'react';
import { TrendingUp, Shield, Award, Zap, Users, Star } from 'lucide-react';

const HeroFeatures = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Higher Returns",
      description: "Professional fund management with proven track record",
      gradient: "from-green-400 to-green-600",
      hoverGradient: "from-green-500 to-green-700"
    },
    {
      icon: Shield,
      title: "AMFI Registered",
      description: "100% safe & transparent investing platform",
      gradient: "from-blue-400 to-blue-600",
      hoverGradient: "from-blue-500 to-blue-700"
    },
    {
      icon: Award,
      title: "Consistency Rewards",
      description: "SIP consistency rewards + Transfer incentives + Referral earnings",
      gradient: "from-purple-400 to-purple-600",
      hoverGradient: "from-purple-500 to-purple-700"
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Quick KYC verification and fund processing",
      gradient: "from-yellow-400 to-orange-500",
      hoverGradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: Users,
      title: "Expert Advisory",
      description: "Dedicated relationship managers for guidance",
      gradient: "from-pink-400 to-rose-500",
      hoverGradient: "from-pink-500 to-rose-600"
    },
    {
      icon: Star,
      title: "Premium Experience",
      description: "AI-powered recommendations and portfolio insights",
      gradient: "from-indigo-400 to-purple-500",
      hoverGradient: "from-indigo-500 to-purple-600"
    }
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">SIP Brewery</span>?
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index}
              className="group relative text-center bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 border border-white/50 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.hoverGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
              
              <div className="relative z-10">
                <div className={`bg-gradient-to-br ${feature.gradient} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 group-hover:rotate-6`}>
                  <Icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroFeatures;

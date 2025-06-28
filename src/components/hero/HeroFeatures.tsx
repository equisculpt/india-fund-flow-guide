
import React from 'react';
import { TrendingUp, Shield, Award, Zap, Users, Star } from 'lucide-react';

const HeroFeatures = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Higher Returns",
      description: "Professional fund management with proven track record",
      gradient: "from-green-400 to-emerald-500",
      hoverGradient: "from-green-300 to-emerald-400",
      glowColor: "shadow-green-500/25"
    },
    {
      icon: Shield,
      title: "AMFI Registered",
      description: "100% safe & transparent investing platform",
      gradient: "from-blue-400 to-cyan-500",
      hoverGradient: "from-blue-300 to-cyan-400",
      glowColor: "shadow-blue-500/25"
    },
    {
      icon: Award,
      title: "Platform Rewards",
      description: "Loyalty bonuses + Transfer incentives + Referral earnings up to ₹500",
      gradient: "from-purple-400 to-pink-500",
      hoverGradient: "from-purple-300 to-pink-400",
      glowColor: "shadow-purple-500/25"
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Quick KYC verification and fund processing",
      gradient: "from-yellow-400 to-orange-500",
      hoverGradient: "from-yellow-300 to-orange-400",
      glowColor: "shadow-yellow-500/25"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Dedicated relationship managers for guidance",
      gradient: "from-pink-400 to-rose-500",
      hoverGradient: "from-pink-300 to-rose-400",
      glowColor: "shadow-pink-500/25"
    },
    {
      icon: Star,
      title: "Premium Experience",
      description: "AI-powered recommendations and portfolio insights",
      gradient: "from-indigo-400 to-purple-500",
      hoverGradient: "from-indigo-300 to-purple-400",
      glowColor: "shadow-indigo-500/25"
    }
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Why Choose{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-pulse">
            SIP Brewery
          </span>
          ?
        </h2>
        <p className="text-xl text-gray-600 mb-6">
          Upgrade Your{" "}
          <span className="animate-rainbow font-bold">
            Mutual Fund
          </span>{" "}
          Experience Today
        </p>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index}
              className={`group relative text-center bg-white rounded-3xl p-8 shadow-xl hover:${feature.glowColor} transition-all duration-500 hover:scale-105 hover:-translate-y-3 border border-gray-100 overflow-hidden`}
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.hoverGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
              
              <div className="relative z-10">
                <div className={`bg-gradient-to-br ${feature.gradient} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:${feature.glowColor} group-hover:scale-110 transition-all duration-500 group-hover:rotate-6 border border-white/20`}>
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


import React from 'react';
import { Brain, DollarSign, Users, Shield } from 'lucide-react';

const HeroFeatureGrid = () => {
  const features = [
    {
      icon: Brain,
      text: "AI Fund Research",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      borderColor: "border-blue-300",
      hoverShadow: "hover:shadow-blue-500/30",
      tooltip: "Personalized, data-driven insights for every fund"
    },
    {
      icon: DollarSign,
      text: "Zero Hidden Fees",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      borderColor: "border-green-300",
      hoverShadow: "hover:shadow-green-500/30",
      tooltip: "Complete transparency in all costs"
    },
    {
      icon: Users,
      text: "Real Human Support",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      borderColor: "border-purple-300",
      hoverShadow: "hover:shadow-purple-500/30",
      tooltip: "Expert advisors available when you need them"
    },
    {
      icon: Shield,
      text: "AMFI Registered",
      color: "from-amber-500 to-amber-600",
      bgColor: "from-amber-50 to-amber-100",
      borderColor: "border-amber-300",
      hoverShadow: "hover:shadow-amber-500/30",
      tooltip: "Fully regulated and compliant investment platform"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 max-w-2xl mx-auto lg:mx-0">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div
            key={index}
            className={`group relative flex items-center bg-gradient-to-r ${feature.bgColor} p-5 lg:p-6 rounded-2xl lg:rounded-3xl border-2 ${feature.borderColor} shadow-lg ${feature.hoverShadow} transition-all duration-300 hover:scale-105 cursor-pointer`}
            title={feature.tooltip}
          >
            <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
            </div>
            <span className="font-bold text-base lg:text-lg text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
              {feature.text}
            </span>
            
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-20 bg-gradient-to-r from-blue-400 to-purple-400 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        );
      })}
    </div>
  );
};

export default HeroFeatureGrid;


import React from 'react';
import { Shield, Users, Brain, Award } from 'lucide-react';

const HeroTrustBar = () => {
  const trustItems = [
    {
      icon: Shield,
      text: "AMFI Registered",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Award,
      text: "SEBI Compliant",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: Users,
      text: "Trusted by 10,000+ Investors",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: Brain,
      text: "AI-Powered Research",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      special: true
    }
  ];

  return (
    <div className="mt-20">
      <div className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-3xl lg:rounded-[2rem] p-8 lg:p-10 shadow-2xl hover:shadow-xl transition-all duration-500">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className={`group flex flex-col items-center text-center p-4 lg:p-6 rounded-2xl ${item.bgColor} border-2 ${item.borderColor} hover:shadow-lg transition-all duration-300 hover:scale-105`}
              >
                <div className={`${item.color} mb-3 group-hover:scale-110 transition-transform duration-300 ${item.special ? 'animate-pulse' : ''}`}>
                  <Icon className="h-8 w-8 lg:h-10 lg:w-10" />
                </div>
                <span className={`font-bold text-sm lg:text-base text-gray-800 ${item.special ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600' : ''}`}>
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroTrustBar;

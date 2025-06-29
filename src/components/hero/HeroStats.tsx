
import React from 'react';
import { Users, IndianRupee, Star } from 'lucide-react';

interface HeroStatsProps {
  stats: {
    investors: string;
    amount: string;
    rating: string;
  };
}

const HeroStats = ({ stats }: HeroStatsProps) => {
  const statItems = [
    {
      icon: Users,
      value: stats.investors,
      label: "investors",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      glowColor: "shadow-cyan-500/25"
    },
    {
      icon: IndianRupee,
      value: stats.amount,
      label: "invested",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      glowColor: "shadow-green-500/25"
    },
    {
      icon: Star,
      value: stats.rating,
      label: "User Rating",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      glowColor: "shadow-yellow-500/25"
    }
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Trusted by Thousands
        </h3>
        <p className="text-gray-600">Join our growing community of smart investors</p>
      </div>
      
      <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index}
              className={`group flex items-center space-x-4 bg-white ${item.borderColor} border-2 rounded-2xl px-6 py-4 shadow-lg hover:${item.glowColor} hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <div className={`${item.bgColor} ${item.borderColor} border p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900 animate-pulse">{item.value}</div>
                <div className="text-sm font-medium text-gray-600">{item.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroStats;

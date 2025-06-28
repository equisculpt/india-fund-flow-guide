
import React from 'react';
import { Users, DollarSign, Star } from 'lucide-react';

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
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
      glowColor: "shadow-cyan-500/25"
    },
    {
      icon: DollarSign,
      value: stats.amount,
      label: "invested",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      glowColor: "shadow-green-500/25"
    },
    {
      icon: Star,
      value: stats.rating,
      label: "User Rating",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      glowColor: "shadow-yellow-500/25"
    }
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Trusted by Thousands
        </h3>
        <p className="text-white/70">Join our growing community of smart investors</p>
      </div>
      
      <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index}
              className={`group flex items-center space-x-4 bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-xl hover:${item.glowColor} transition-all duration-300 hover:scale-105 border border-white/20`}
            >
              <div className={`${item.bgColor} backdrop-blur-sm p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 border border-white/20`}>
                <Icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white animate-pulse">{item.value}</div>
                <div className="text-sm font-medium text-white/70">{item.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroStats;

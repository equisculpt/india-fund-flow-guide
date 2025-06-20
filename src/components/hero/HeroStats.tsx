
import React from 'react';

interface HeroStatsProps {
  stats: {
    investors: string;
    amount: string;
    rating: string;
  };
}

const HeroStats = ({ stats }: HeroStatsProps) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 mb-8 opacity-70">
      <div className="text-sm font-medium text-gray-600">{stats.investors} investors</div>
      <div className="w-px h-6 bg-gray-300"></div>
      <div className="text-sm font-medium text-gray-600">{stats.amount} invested</div>
      <div className="w-px h-6 bg-gray-300"></div>
      <div className="text-sm font-medium text-gray-600">{stats.rating} User Rating</div>
    </div>
  );
};

export default HeroStats;

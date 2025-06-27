
import React from 'react';

interface HeroStatsProps {
  stats?: {
    investors: string;
    amount: string;
    rating: string;
  };
}

const HeroStats = ({ stats }: HeroStatsProps) => {
  // Fallback stats if none provided
  const defaultStats = {
    investors: "1000+",
    amount: "₹50Cr+", 
    rating: "4.8★"
  };
  
  const displayStats = stats || defaultStats;
  
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 mb-8 opacity-70">
      <div className="text-sm font-medium text-gray-600">{displayStats.investors} investors</div>
      <div className="w-px h-6 bg-gray-300"></div>
      <div className="text-sm font-medium text-gray-600">{displayStats.amount} invested</div>
      <div className="w-px h-6 bg-gray-300"></div>
      <div className="text-sm font-medium text-gray-600">{displayStats.rating} User Rating</div>
    </div>
  );
};

export default HeroStats;

import React from 'react';

const HeroSection = () => {
  console.log('HeroSection: Starting to render');
  
  try {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Invest Smarter. Grow Faster.
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-powered insights, transparent analytics, and effortless investing.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('HeroSection Error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-red-600 mb-4">Error Loading Page</h1>
          <p className="text-gray-600">Please refresh the page</p>
        </div>
      </div>
    );
  }
};

export default HeroSection;
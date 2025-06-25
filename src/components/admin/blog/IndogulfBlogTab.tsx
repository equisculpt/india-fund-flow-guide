
import React from 'react';
import IndogulfBlogPublisher from './IndogulfBlogPublisher';

const IndogulfBlogTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🧪 Indogulf Cropsciences IPO Analysis
        </h2>
        <p className="text-gray-700">
          Publish a comprehensive, beautifully designed blog post about the Indogulf Cropsciences IPO 
          with detailed financial analysis, sectoral insights, and investment recommendations.
        </p>
      </div>
      
      <IndogulfBlogPublisher />
    </div>
  );
};

export default IndogulfBlogTab;

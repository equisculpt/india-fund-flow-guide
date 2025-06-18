
import React from 'react';
import EnhancedFundSearch from './EnhancedFundSearch';
import { useNavigate } from 'react-router-dom';

interface FundCategoriesProps {
  allFunds: any[];
}

const FundCategories = ({ allFunds }: FundCategoriesProps) => {
  const navigate = useNavigate();

  const handleFundSelect = (fund: any) => {
    console.log('FundCategories: Fund selected:', fund);
    // Navigate to fund details or public funds page with the selected fund
    navigate('/public-funds', { state: { selectedFund: fund } });
  };

  return (
    <section id="explore-funds" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore Mutual Funds</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Search and discover mutual funds with real-time NAV data and AI-powered insights
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto">
            <EnhancedFundSearch 
              onFundSelect={handleFundSelect}
              placeholder="Search any mutual fund by name (e.g., HDFC Top 100, SBI Small Cap...)"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundCategories;

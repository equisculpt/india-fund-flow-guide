
import React from 'react';
import EnhancedFundSearch from './EnhancedFundSearch';

interface FundCategoriesProps {
  allFunds: any[];
}

const FundCategories = ({ allFunds }: FundCategoriesProps) => {
  // Remove the custom handleFundSelect function since EnhancedFundSearch 
  // now handles navigation directly to fund details page

  return (
    <section id="explore-funds" className="py-16" style={{
      background: 'linear-gradient(135deg, #0B132B 0%, #1a0f3a 50%, #2d1b69 100%)'
    }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Explore Mutual Funds</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Search and discover mutual funds with real-time NAV data and AI-powered insights
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto">
            <EnhancedFundSearch 
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

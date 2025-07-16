
import React from 'react';
import EnhancedFundSearch from './EnhancedFundSearch';

interface FundCategoriesProps {
  allFunds: any[];
}

const FundCategories = ({ allFunds }: FundCategoriesProps) => {
  // Remove the custom handleFundSelect function since EnhancedFundSearch 
  // now handles navigation directly to fund details page

  return (
    <section id="explore-funds" className="py-16 bg-gradient-to-br from-background via-card to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
      <div className="container mx-auto px-4 relative z-10">
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

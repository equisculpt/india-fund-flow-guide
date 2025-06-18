
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from 'lucide-react';
import { Fund } from './FundData';
import FundGrid from './FundGrid';

interface FundCategoriesProps {
  allFunds: Fund[];
}

const FundCategories = ({ allFunds }: FundCategoriesProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFunds, setFilteredFunds] = useState<Fund[]>(allFunds);

  useEffect(() => {
    const results = allFunds.filter(fund =>
      fund.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFunds(results);
  }, [searchTerm, allFunds]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Categorize funds
  const categorizedFunds = {
    all: filteredFunds,
    largecap: filteredFunds.filter(f => f.category === 'Large Cap'),
    midcap: filteredFunds.filter(f => f.category === 'Mid Cap'),
    smallcap: filteredFunds.filter(f => f.category === 'Small Cap'),
    elss: filteredFunds.filter(f => f.category === 'ELSS'),
    hybrid: filteredFunds.filter(f => f.category === 'Hybrid')
  };

  return (
    <section id="funds" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Explore Mutual Funds</h2>
          <p className="text-gray-600">Discover top-rated funds across different categories for your investment portfolio.</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search for funds..."
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            <TabsTrigger value="all">All Funds</TabsTrigger>
            <TabsTrigger value="largecap">Large Cap</TabsTrigger>
            <TabsTrigger value="midcap">Mid Cap</TabsTrigger>
            <TabsTrigger value="smallcap">Small Cap</TabsTrigger>
            <TabsTrigger value="elss">ELSS</TabsTrigger>
            <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
          </TabsList>

          {Object.entries(categorizedFunds).map(([category, funds]) => (
            <TabsContent key={category} value={category} className="mt-6">
              <FundGrid funds={funds} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default FundCategories;

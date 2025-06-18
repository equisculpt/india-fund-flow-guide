
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Loader2 } from 'lucide-react';
import { MutualFundSearchService } from '@/services/mutualFundSearchService';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface FundResult {
  schemeCode: string;
  schemeName: string;
  category: string;
  fundHouse?: string;
  nav?: number;
}

interface FundCategoriesProps {
  allFunds: any[];
}

const FundCategories = ({ allFunds }: FundCategoriesProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<FundResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const searchFunds = async (query: string) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    setShowResults(true);

    try {
      console.log('FundCategories: Searching for:', query);
      const results = await MutualFundSearchService.searchFunds(query);
      
      const fundResults: FundResult[] = results.slice(0, 50).map(fund => ({
        schemeCode: fund.schemeCode.toString(),
        schemeName: fund.schemeName,
        category: MutualFundSearchService.detectCategory(fund.schemeName),
        fundHouse: 'Unknown'
      }));

      console.log('FundCategories: Found', fundResults.length, 'funds');
      setSearchResults(fundResults);
    } catch (error) {
      console.error('FundCategories: Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchFunds(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    
    if (value.length === 0) {
      setShowResults(false);
    }
  };

  const handleFundClick = (fund: FundResult) => {
    navigate(`/fund/${fund.schemeCode}`);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'large cap': return 'bg-blue-100 text-blue-800';
      case 'mid cap': return 'bg-green-100 text-green-800';
      case 'small cap': return 'bg-red-100 text-red-800';
      case 'elss': return 'bg-purple-100 text-purple-800';
      case 'debt': return 'bg-gray-100 text-gray-800';
      case 'hybrid': return 'bg-orange-100 text-orange-800';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  // Categorize static funds for tabs when no search
  const categorizedFunds = {
    all: allFunds,
    largecap: allFunds.filter(f => f.category === 'Large Cap'),
    midcap: allFunds.filter(f => f.category === 'Mid Cap'),
    smallcap: allFunds.filter(f => f.category === 'Small Cap'),
    elss: allFunds.filter(f => f.category === 'ELSS'),
    hybrid: allFunds.filter(f => f.category === 'Hybrid')
  };

  return (
    <section id="funds" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Explore Mutual Funds</h2>
          <p className="text-gray-600">Search and discover from 1000+ mutual funds across different categories.</p>
        </div>

        {/* Enhanced Search Bar */}
        <div className="mb-6 relative">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search from 1000+ mutual funds (e.g., 'HDFC small cap', 'SBI equity')..."
              className="block w-full p-3 pl-10 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {loading && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
              </div>
            )}
          </div>

          {/* Search Results */}
          {showResults && (
            <div className="max-w-4xl mx-auto mt-4">
              <Card className="shadow-lg">
                <CardContent className="p-0 max-h-96 overflow-y-auto">
                  {loading && searchResults.length === 0 ? (
                    <div className="p-6 text-center">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                      <p className="text-gray-600">Searching through 1000+ funds...</p>
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      {searchTerm.length >= 2 ? (
                        <div>
                          <p>No funds found matching "{searchTerm}"</p>
                          <p className="text-sm mt-1">Try keywords like "HDFC equity", "SBI small cap", or "Axis large cap"</p>
                        </div>
                      ) : (
                        'Type at least 2 characters to search...'
                      )}
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {searchResults.map((fund, index) => (
                        <div
                          key={`${fund.schemeCode}-${index}`}
                          className="p-4 hover:bg-blue-50 cursor-pointer transition-colors"
                          onClick={() => handleFundClick(fund)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                                {fund.schemeName}
                              </h4>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${getCategoryColor(fund.category)}`}
                                >
                                  {fund.category}
                                </Badge>
                                <span className="text-xs text-gray-500">Code: {fund.schemeCode}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Category Tabs - Only show when not searching */}
        {!showResults && (
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {funds.slice(0, 12).map((fund) => (
                    <Card key={fund.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => navigate(`/fund/${fund.id}`)}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <Badge variant="outline" className={getCategoryColor(fund.category)}>
                            {fund.category}
                          </Badge>
                          <span className="text-sm font-bold text-green-600">
                            {fund.returns}%
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                          {fund.name}
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Min SIP:</span>
                            <span>₹{fund.minSip}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Risk:</span>
                            <span className={`font-medium ${
                              fund.risk === 'High' ? 'text-red-600' : 
                              fund.risk === 'Moderate' ? 'text-yellow-600' : 'text-green-600'
                            }`}>
                              {fund.risk}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Rating:</span>
                            <span className="font-medium">⭐ {fund.rating}/5</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </section>
  );
};

export default FundCategories;

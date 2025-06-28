
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, TrendingUp, Star, ArrowRight } from 'lucide-react';
import KYCGuard from '@/components/KYCGuard';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Navigate } from 'react-router-dom';

const InvestmentExplorer = () => {
  const { user, loading } = useSupabaseAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const topFunds = [
    {
      id: 1,
      name: "HDFC Top 100 Fund",
      category: "Large Cap",
      returns: { "1Y": 18.5, "3Y": 15.2, "5Y": 12.8 },
      risk: "Moderate",
      minSIP: 500,
      rating: 4.5,
      amc: "HDFC"
    },
    {
      id: 2,
      name: "SBI Small Cap Fund",
      category: "Small Cap",
      returns: { "1Y": 24.3, "3Y": 18.7, "5Y": 16.2 },
      risk: "High",
      minSIP: 500,
      rating: 4.2,
      amc: "SBI"
    },
    {
      id: 3,
      name: "Axis Long Term Equity",
      category: "ELSS",
      returns: { "1Y": 16.8, "3Y": 14.5, "5Y": 13.1 },
      risk: "Moderate",
      minSIP: 500,
      rating: 4.3,
      amc: "Axis"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Funds', count: 3000 },
    { id: 'equity', name: 'Equity', count: 1200 },
    { id: 'debt', name: 'Debt', count: 800 },
    { id: 'hybrid', name: 'Hybrid', count: 600 },
    { id: 'elss', name: 'ELSS', count: 400 }
  ];

  return (
    <KYCGuard requireKYC={true}>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore & Invest</h1>
            <p className="text-gray-600">Discover the best mutual funds for your investment goals</p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search funds by name, AMC, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Advanced Filters
                </Button>
              </div>

              {/* Category Tabs */}
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-1"
                    >
                      {category.name}
                      <Badge variant="secondary" className="ml-1">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="popular" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="popular">Popular Funds</TabsTrigger>
              <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
              <TabsTrigger value="new">New Launches</TabsTrigger>
              <TabsTrigger value="tax-saver">Tax Saver</TabsTrigger>
            </TabsList>

            <TabsContent value="popular">
              <div className="grid gap-4">
                {topFunds.map((fund) => (
                  <Card key={fund.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{fund.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{fund.amc}</span>
                            <span>•</span>
                            <Badge variant="outline">{fund.category}</Badge>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{fund.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant={fund.risk === 'High' ? 'destructive' : fund.risk === 'Moderate' ? 'default' : 'secondary'}
                        >
                          {fund.risk} Risk
                        </Badge>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">1Y Returns</p>
                          <p className="text-lg font-semibold text-green-600">
                            {fund.returns["1Y"]}%
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">3Y Returns</p>
                          <p className="text-lg font-semibold text-green-600">
                            {fund.returns["3Y"]}%
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">5Y Returns</p>
                          <p className="text-lg font-semibold text-green-600">
                            {fund.returns["5Y"]}%
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Min SIP</p>
                          <p className="text-lg font-semibold">₹{fund.minSIP}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button className="flex-1">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Start SIP
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Invest Now
                        </Button>
                        <Button variant="ghost">
                          View Details <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="top-rated">
              <div className="text-center py-8">
                <p className="text-gray-600">Top rated funds coming soon...</p>
              </div>
            </TabsContent>

            <TabsContent value="new">
              <div className="text-center py-8">
                <p className="text-gray-600">New fund launches coming soon...</p>
              </div>
            </TabsContent>

            <TabsContent value="tax-saver">
              <div className="text-center py-8">
                <p className="text-gray-600">Tax saver funds coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </KYCGuard>
  );
};

export default InvestmentExplorer;

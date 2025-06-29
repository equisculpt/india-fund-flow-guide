
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  BarChart3,
  Target,
  Shield,
  Zap,
  Eye,
  Heart,
  Plus,
  ArrowRight,
  Info
} from 'lucide-react';

const FundExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('returns');

  // Mock fund data
  const funds = [
    {
      id: 1,
      name: 'HDFC Top 100 Fund',
      amc: 'HDFC Mutual Fund',
      category: 'Large Cap',
      subCategory: 'Large Cap Equity',
      nav: 785.45,
      returns: {
        '1y': 18.5,
        '3y': 16.2,
        '5y': 14.8
      },
      rating: 4.5,
      riskLevel: 'Moderate',
      minSip: 500,
      minLumpsum: 5000,
      expenseRatio: 1.25,
      aum: 28450,
      isTopRated: true,
      isTaxSaver: false
    },
    {
      id: 2,
      name: 'Axis Small Cap Fund',
      amc: 'Axis Mutual Fund',
      category: 'Small Cap',
      subCategory: 'Small Cap Equity',
      nav: 156.23,
      returns: {
        '1y': 25.8,
        '3y': 22.1,
        '5y': 18.9
      },
      rating: 4.2,
      riskLevel: 'High',
      minSip: 1000,
      minLumpsum: 5000,
      expenseRatio: 1.45,
      aum: 8950,
      isTopRated: false,
      isTaxSaver: false
    },
    {
      id: 3,
      name: 'SBI Long Term Equity Fund',
      amc: 'SBI Mutual Fund',
      category: 'ELSS',
      subCategory: 'Tax Saver',
      nav: 142.67,
      returns: {
        '1y': 16.8,
        '3y': 14.5,
        '5y': 13.2
      },
      rating: 4.0,
      riskLevel: 'Moderate',
      minSip: 500,
      minLumpsum: 500,
      expenseRatio: 1.15,
      aum: 15600,
      isTopRated: false,
      isTaxSaver: true
    },
    {
      id: 4,
      name: 'Mirae Asset Large Cap Fund',
      amc: 'Mirae Asset',
      category: 'Large Cap',
      subCategory: 'Large Cap Equity',
      nav: 89.45,
      returns: {
        '1y': 17.2,
        '3y': 15.8,
        '5y': 14.1
      },
      rating: 4.3,
      riskLevel: 'Moderate',
      minSip: 1000,
      minLumpsum: 5000,
      expenseRatio: 1.05,
      aum: 18750,
      isTopRated: true,
      isTaxSaver: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Large Cap', label: 'Large Cap' },
    { value: 'Mid Cap', label: 'Mid Cap' },
    { value: 'Small Cap', label: 'Small Cap' },
    { value: 'ELSS', label: 'Tax Saver (ELSS)' },
    { value: 'Debt', label: 'Debt Funds' },
    { value: 'Hybrid', label: 'Hybrid Funds' }
  ];

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFunds = funds.filter(fund => {
    const matchesSearch = fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fund.amc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || fund.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Fund Explorer</h2>
          <p className="text-gray-600 mt-1">Discover and compare 3000+ mutual funds</p>
        </div>
        <Button className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          Watchlist
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search funds by name or AMC..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="returns">Best Returns</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="aum">Largest AUM</SelectItem>
                <SelectItem value="expense">Lowest Expense</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all-funds" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all-funds">All Funds</TabsTrigger>
          <TabsTrigger value="top-performers">Top Performers</TabsTrigger>
          <TabsTrigger value="tax-savers">Tax Savers</TabsTrigger>
          <TabsTrigger value="compare">Compare Funds</TabsTrigger>
        </TabsList>

        <TabsContent value="all-funds">
          <div className="space-y-4">
            {filteredFunds.map((fund) => (
              <Card key={fund.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                    {/* Fund Info */}
                    <div className="lg:col-span-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{fund.name}</h3>
                            {fund.isTopRated && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                            {fund.isTaxSaver && <Badge className="bg-green-100 text-green-800 text-xs">Tax Saver</Badge>}
                          </div>
                          <p className="text-sm text-gray-600">{fund.amc}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{fund.category}</Badge>
                            <Badge className={`${getRiskColor(fund.riskLevel)} text-xs`}>
                              {fund.riskLevel} Risk
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* NAV */}
                    <div className="lg:col-span-2 text-center">
                      <div className="text-sm text-gray-600">NAV</div>
                      <div className="font-bold text-lg">₹{fund.nav}</div>
                    </div>

                    {/* Returns */}
                    <div className="lg:col-span-3">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-xs text-gray-600">1Y</div>
                          <div className={`font-semibold ${fund.returns['1y'] > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {fund.returns['1y'] > 0 ? '+' : ''}{fund.returns['1y']}%
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">3Y</div>
                          <div className={`font-semibold ${fund.returns['3y'] > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {fund.returns['3y'] > 0 ? '+' : ''}{fund.returns['3y']}%
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">5Y</div>
                          <div className={`font-semibold ${fund.returns['5y'] > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {fund.returns['5y'] > 0 ? '+' : ''}{fund.returns['5y']}%
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Rating & Details */}
                    <div className="lg:col-span-2 text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < Math.floor(fund.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-sm ml-1">{fund.rating}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        AUM: ₹{fund.aum}Cr | ER: {fund.expenseRatio}%
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:col-span-1 flex flex-col gap-2">
                      <Button size="sm" className="w-full">
                        <Plus className="h-3 w-3 mr-1" />
                        Invest
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        <Eye className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-4 pt-4 border-t flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>Min SIP: {formatCurrency(fund.minSip)}</span>
                    <span>Min Lumpsum: {formatCurrency(fund.minLumpsum)}</span>
                    <span>Expense Ratio: {fund.expenseRatio}%</span>
                    <span>AUM: ₹{fund.aum} Cr</span>
                    <span>{fund.subCategory}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="top-performers">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Best 1-Year Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {funds.sort((a, b) => b.returns['1y'] - a.returns['1y']).slice(0, 3).map((fund, index) => (
                    <div key={fund.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold">{fund.name}</div>
                          <div className="text-sm text-gray-600">{fund.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">+{fund.returns['1y']}%</div>
                        <div className="text-sm text-gray-600">1Y Return</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  Highest Rated Funds
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {funds.sort((a, b) => b.rating - a.rating).slice(0, 3).map((fund, index) => (
                    <div key={fund.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold">{fund.name}</div>
                          <div className="text-sm text-gray-600">{fund.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-bold">{fund.rating}</span>
                        </div>
                        <div className="text-sm text-gray-600">Rating</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tax-savers">
          <div className="space-y-4">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Shield className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-bold text-green-900 mb-1">Tax Saving Funds (ELSS)</h3>
                    <p className="text-green-700 text-sm">
                      Save up to ₹46,800 in taxes under Section 80C with a 3-year lock-in period
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {funds.filter(fund => fund.isTaxSaver).map((fund) => (
              <Card key={fund.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{fund.name}</h3>
                        <Badge className="bg-green-100 text-green-800">Tax Saver</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{fund.amc}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">3Y Return</div>
                          <div className="font-bold text-green-600">+{fund.returns['3y']}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Min SIP</div>
                          <div className="font-bold">{formatCurrency(fund.minSip)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Lock-in Period</div>
                          <div className="font-bold">3 Years</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Tax Benefit</div>
                          <div className="font-bold text-green-600">Up to ₹46,800</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button>
                        Start SIP
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compare">
          <Card>
            <CardHeader>
              <CardTitle>Fund Comparison Tool</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Compare Funds Side by Side</h3>
                <p className="text-gray-600 mb-6">Select funds from the list above to compare their performance, fees, and features.</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Funds to Compare
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FundExplorer;

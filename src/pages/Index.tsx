import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, TrendingUp, TrendingDown, Search, Calculator, Target, BarChart3, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FundSearch from '@/components/FundSearch';
import RiskProfiling from '@/components/RiskProfiling';
import InvestmentCalculator from '@/components/InvestmentCalculator';
import GoalBasedInvesting from '@/components/GoalBasedInvesting';
import ComplianceFooter from '@/components/ComplianceFooter';
import TopLevelFundComparison from '@/components/TopLevelFundComparison';

interface Fund {
  id: string;
  name: string;
  category: string;
  returns: number;
  rating: number;
  risk: string;
  returns1Y: number;
  returns3Y: number;
  minSip: number;
  fundHouse: string;
  nav: number;
}

const Index = () => {
  const navigate = useNavigate();
  
  // Fixed fund data with correct scheme codes
  const [allFunds] = useState<Fund[]>([
    {
      id: '120503', // HDFC Top 100 Fund
      name: 'HDFC Top 100 Fund - Direct Growth',
      category: 'Large Cap',
      returns: 16.3,
      rating: 4.6,
      risk: 'Moderate',
      returns1Y: 16.3,
      returns3Y: 19.1,
      minSip: 500,
      fundHouse: 'HDFC Mutual Fund',
      nav: 889.45
    },
    {
      id: '125497', // SBI Small Cap Fund
      name: 'SBI Small Cap Fund - Direct Growth',
      category: 'Small Cap',
      returns: 18.5,
      rating: 4.7,
      risk: 'High',
      returns1Y: 18.5,
      returns3Y: 22.3,
      minSip: 500,
      fundHouse: 'SBI Mutual Fund',
      nav: 170.08
    },
    {
      id: '130502', // HDFC Small Cap Fund
      name: 'HDFC Small Cap Fund - Growth',
      category: 'Small Cap',
      returns: 22.1,
      rating: 4.8,
      risk: 'High',
      returns1Y: 22.1,
      returns3Y: 25.6,
      minSip: 500,
      fundHouse: 'HDFC Mutual Fund',
      nav: 136.98
    },
    {
      id: '118989', // ICICI Prudential Bluechip
      name: 'ICICI Prudential Bluechip Fund - Direct',
      category: 'Large Cap',
      returns: 14.8,
      rating: 4.4,
      risk: 'Moderate',
      returns1Y: 14.8,
      returns3Y: 17.2,
      minSip: 1000,
      fundHouse: 'ICICI Prudential MF',
      nav: 71.23
    },
    {
      id: '119533', // SBI Large & Midcap
      name: 'SBI Large & Midcap Fund - Direct',
      category: 'Mid Cap',
      returns: 19.2,
      rating: 4.5,
      risk: 'Moderate',
      returns1Y: 19.2,
      returns3Y: 21.8,
      minSip: 500,
      fundHouse: 'SBI Mutual Fund',
      nav: 178.92
    },
    {
      id: '122639', // Axis ELSS Tax Saver
      name: 'Axis ELSS Tax Saver Fund - Direct',
      category: 'ELSS',
      returns: 17.8,
      rating: 4.3,
      risk: 'Moderate',
      returns1Y: 17.8,
      returns3Y: 20.4,
      minSip: 500,
      fundHouse: 'Axis Mutual Fund',
      nav: 67.34
    },
    {
      id: '120376', // Kotak Small Cap
      name: 'Kotak Small Cap Fund - Direct Growth',
      category: 'Small Cap',
      returns: 21.5,
      rating: 4.6,
      risk: 'High',
      returns1Y: 21.5,
      returns3Y: 24.8,
      minSip: 1000,
      fundHouse: 'Kotak Mahindra MF',
      nav: 245.67
    },
    {
      id: '119827', // HDFC Balanced Advantage
      name: 'HDFC Balanced Advantage Fund - Direct',
      category: 'Hybrid',
      returns: 12.8,
      rating: 4.2,
      risk: 'Low',
      returns1Y: 12.8,
      returns3Y: 15.3,
      minSip: 500,
      fundHouse: 'HDFC Mutual Fund',
      nav: 23.45
    },
    {
      id: '120588', // Parag Parikh Long Term Equity
      name: 'Parag Parikh Long Term Equity Fund',
      category: 'Mid Cap',
      returns: 20.1,
      rating: 4.7,
      risk: 'Moderate',
      returns1Y: 20.1,
      returns3Y: 23.2,
      minSip: 1000,
      fundHouse: 'PPFAS Mutual Fund',
      nav: 56.78
    },
    {
      id: '100042', // Axis Bluechip Fund - CORRECT MAPPING
      name: 'Axis Bluechip Fund - Direct Growth',
      category: 'Large Cap',
      returns: 15.2,
      rating: 4.5,
      risk: 'Moderate',
      returns1Y: 15.2,
      returns3Y: 18.5,
      minSip: 500,
      fundHouse: 'Axis Mutual Fund',
      nav: 52.75
    }
  ]);

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

  const handleRiskProfilingComplete = (result: any) => {
    console.log('Risk profiling completed:', result);
  };

  const handleViewFundDetails = (fund: Fund) => {
    console.log('Navigating to fund details for:', fund.name, 'with correct ID:', fund.id);
    navigate(`/fund/${fund.id}`, {
      state: {
        fundData: {
          id: fund.id,
          scheme_name: fund.name,
          amc_name: fund.fundHouse,
          category: fund.category,
          nav: fund.nav,
          returns_1y: fund.returns1Y,
          returns_3y: fund.returns3Y,
          risk_level: fund.risk,
          min_sip_amount: fund.minSip,
          schemeCode: fund.id // Ensure schemeCode matches id
        }
      }
    });
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

  const getRiskColor = (risk: string) => {
    switch (risk?.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Fund Comparison Tool - New Section */}
      <section id="fund-comparison" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">AI Fund Comparison</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Compare mutual funds with AI-powered analysis. Get insights on portfolio quality, recent performance trends, and market conditions.
            </p>
          </div>
          <TopLevelFundComparison />
        </div>
      </section>

      {/* Explore Mutual Funds - Restored Original with Categories */}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {funds.map(fund => (
                    <Card key={fund.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewFundDetails(fund)}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold line-clamp-2 leading-tight">{fund.name}</CardTitle>
                        <CardDescription className="text-xs text-gray-600">{fund.fundHouse}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-xs font-medium">{fund.rating}</span>
                          </div>
                          <Badge variant="outline" className="text-xs px-1 py-0">
                            {fund.category}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-600">NAV:</span>
                            <div className="font-semibold">₹{fund.nav.toFixed(2)}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Min SIP:</span>
                            <div className="font-semibold">₹{fund.minSip}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-600">1Y Returns:</span>
                            <div className={`font-semibold ${fund.returns1Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {fund.returns1Y >= 0 ? '+' : ''}{fund.returns1Y}%
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">3Y Returns:</span>
                            <div className={`font-semibold ${fund.returns3Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {fund.returns3Y >= 0 ? '+' : ''}{fund.returns3Y}%
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge className={getRiskColor(fund.risk)} variant="outline">
                            {fund.risk} Risk
                          </Badge>
                        </div>

                        <Button size="sm" className="w-full text-xs h-6" onClick={(e) => {
                          e.stopPropagation();
                          handleViewFundDetails(fund);
                        }}>
                          <BarChart3 className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  {funds.length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-500">No funds found in this category.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Risk Profiling */}
      <section id="risk-profiling" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Risk Profiling</h2>
            <p className="text-gray-600">Determine your risk tolerance and find suitable investment options.</p>
          </div>
          <RiskProfiling onComplete={handleRiskProfilingComplete} />
        </div>
      </section>

      {/* SIP Calculator */}
      <section id="sip-calculator" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">SIP Calculator</h2>
            <p className="text-gray-600">Calculate the potential returns on your SIP investments.</p>
          </div>
          <InvestmentCalculator />
        </div>
      </section>

      {/* Goal-Based Investing */}
      <section id="goal-investing" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Goal-Based Investing</h2>
            <p className="text-gray-600">Plan your investments to achieve your financial goals.</p>
          </div>
          <GoalBasedInvesting />
        </div>
      </section>

      {/* Trading Disclaimer and Footer */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <ComplianceFooter />
        </div>
      </section>
    </div>
  );
};

export default Index;

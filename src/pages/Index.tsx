import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, TrendingDown, Search, Calculator, Target, BarChart3, Shield } from 'lucide-react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FundSearch from '@/components/FundSearch';
import RiskProfiling from '@/components/RiskProfiling';
import InvestmentCalculator from '@/components/InvestmentCalculator';
import GoalBasedInvesting from '@/components/GoalBasedInvesting';
import ComplianceFooter from '@/components/ComplianceFooter';
import TopLevelFundComparison from '@/components/TopLevelFundComparison';
import AIFundComparison from '@/components/AIFundComparison';

interface Fund {
  id: string;
  name: string;
  category: string;
  returns: number;
  rating: number;
  risk: string;
}

const Index = () => {
  const [funds, setFunds] = useState<Fund[]>([
    {
      id: '1',
      name: 'Axis Bluechip Fund',
      category: 'Large Cap',
      returns: 15.2,
      rating: 4.5,
      risk: 'Moderate',
    },
    {
      id: '2',
      name: 'HDFC Small Cap Fund',
      category: 'Small Cap',
      returns: 18.5,
      rating: 4.7,
      risk: 'High',
    },
    {
      id: '3',
      name: 'ICICI Prudential Balanced Advantage Fund',
      category: 'Hybrid',
      returns: 12.8,
      rating: 4.3,
      risk: 'Moderate',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFunds, setFilteredFunds] = useState<Fund[]>(funds);

  useEffect(() => {
    const results = funds.filter(fund =>
      fund.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFunds(results);
  }, [searchTerm, funds]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRiskProfilingComplete = (result: any) => {
    console.log('Risk profiling completed:', result);
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

      {/* Fund Search and Analysis - Restored Original View */}
      <section id="funds" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Explore Mutual Funds</h2>
            <p className="text-gray-600">Discover top-rated funds for your investment portfolio.</p>
          </div>

          {/* Original AI Fund Comparison Component */}
          <div className="mb-8">
            <AIFundComparison />
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search for funds..."
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Fund Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFunds.map(fund => (
              <Card key={fund.id}>
                <CardHeader>
                  <CardTitle>{fund.name}</CardTitle>
                  <CardDescription>{fund.category} Fund</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-2" />
                    <span>{fund.rating}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Returns:</span> {fund.returns}%
                  </div>
                  <div>
                    <span className="font-semibold">Risk:</span> {fund.risk}
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredFunds.length === 0 && (
              <div className="col-span-full text-center">
                <p className="text-gray-500">No funds found matching your search.</p>
              </div>
            )}
          </div>
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

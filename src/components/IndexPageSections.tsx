
import React from 'react';
import InvestmentCalculator from '@/components/InvestmentCalculator';
import GoalBasedInvesting from '@/components/GoalBasedInvesting';
import ComplianceFooter from '@/components/ComplianceFooter';
import TopLevelFundComparison from '@/components/TopLevelFundComparison';
import { useSupabaseAuthContext } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';

interface IndexPageSectionsProps {
  onRiskProfilingComplete: (result: any) => void;
}

const IndexPageSections = ({ onRiskProfilingComplete }: IndexPageSectionsProps) => {
  const { user } = useSupabaseAuthContext();

  return (
    <>
      {/* Fund Comparison Tool */}
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

      {/* Goal-Based Investing - Only for authenticated users */}
      {user ? (
        <section id="goal-investing" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Goal-Based Investing</h2>
              <p className="text-gray-600">Plan your investments to achieve your financial goals.</p>
            </div>
            <GoalBasedInvesting />
          </div>
        </section>
      ) : (
        <section id="goal-investing" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Goal-Based Investing</h2>
              <p className="text-gray-600 mb-6">Plan your investments to achieve your financial goals.</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 max-w-md mx-auto">
                <p className="text-blue-800 mb-4">Sign in to access goal-based investment planning features</p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Sign In to Get Started
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trading Disclaimer and Footer */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <ComplianceFooter />
        </div>
      </section>
    </>
  );
};

export default IndexPageSections;

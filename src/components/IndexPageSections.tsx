
import React from 'react';
import InvestmentCalculator from '@/components/InvestmentCalculator';
import GoalBasedInvesting from '@/components/GoalBasedInvesting';
import ComplianceFooter from '@/components/ComplianceFooter';
import TopLevelFundComparison from '@/components/TopLevelFundComparison';

interface IndexPageSectionsProps {
  onRiskProfilingComplete: (result: any) => void;
}

const IndexPageSections = ({ onRiskProfilingComplete }: IndexPageSectionsProps) => {
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
    </>
  );
};

export default IndexPageSections;


import React from 'react';
import InvestmentCalculator from '@/components/InvestmentCalculator';
import GoalBasedInvesting from '@/components/GoalBasedInvesting';
import TopLevelFundComparison from '@/components/TopLevelFundComparison';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';

interface IndexPageSectionsProps {
  onRiskProfilingComplete: (result: any) => void;
}

const IndexPageSections = ({ onRiskProfilingComplete }: IndexPageSectionsProps) => {
  const { user } = useSupabaseAuth();

  return (
    <>
      {/* Fund Comparison Tool */}
      <section id="fund-comparison" className="py-16" style={{
        background: 'linear-gradient(135deg, #2d1b69 0%, #3A0CA3 50%, #1e1852 100%)'
      }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">AI Fund Comparison</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare mutual funds with AI-powered analysis. Get insights on portfolio quality, recent performance trends, and market conditions.
            </p>
          </div>
          <TopLevelFundComparison />
        </div>
      </section>

      {/* SIP Calculator */}
      <section id="sip-calculator" className="py-16" style={{
        background: 'linear-gradient(135deg, #1e1852 0%, #0f1a3d 50%, #0B132B 100%)'
      }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-foreground">SIP Calculator</h2>
            <p className="text-muted-foreground">Calculate the potential returns on your SIP investments.</p>
          </div>
          <InvestmentCalculator />
        </div>
      </section>

      {/* Goal-Based Investing - Only for authenticated users */}
      {user ? (
        <section id="goal-investing" className="py-16" style={{
          background: 'linear-gradient(135deg, #0B132B 0%, #1a0f3a 50%, #2d1b69 100%)'
        }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Goal-Based Investing</h2>
              <p className="text-muted-foreground">Plan your investments to achieve your financial goals.</p>
            </div>
            <GoalBasedInvesting />
          </div>
        </section>
      ) : (
        <section id="goal-investing" className="py-16" style={{
          background: 'linear-gradient(135deg, #0B132B 0%, #1a0f3a 50%, #2d1b69 100%)'
        }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Goal-Based Investing</h2>
              <p className="text-muted-foreground mb-6">Plan your investments to achieve your financial goals.</p>
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
    </>
  );
};

export default IndexPageSections;

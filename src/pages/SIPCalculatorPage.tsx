
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import InvestmentCalculator from '@/components/InvestmentCalculator';

const SIPCalculatorPage = () => {
  return (
    <>
      <Helmet>
        <title>SIP Calculator | Calculate SIP Returns & Investment Growth | SIP Brewery</title>
        <meta name="description" content="Calculate your SIP returns with our advanced SIP calculator. Plan your investments, set goals, and track potential wealth creation over time." />
        <meta name="keywords" content="SIP calculator, SIP returns calculator, investment calculator, mutual fund calculator, wealth calculator" />
      </Helmet>
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <InvestmentCalculator />
        </div>
      </Layout>
    </>
  );
};

export default SIPCalculatorPage;

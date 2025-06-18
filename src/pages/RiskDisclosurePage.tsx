
import React, { useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RiskDisclosurePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Risk Disclosure</h1>
          <p className="text-gray-600 text-lg">Important information about mutual fund investments</p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <section className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
            <h2 className="text-2xl font-bold text-red-900 mb-4">⚠️ Important Risk Warning</h2>
            <div className="bg-red-100 p-4 rounded-md">
              <p className="text-red-800 font-semibold text-lg leading-relaxed">
                Mutual Fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. Past performance is not indicative of future results.
              </p>
            </div>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Market Risk</h2>
            <div className="bg-white p-4 rounded-md">
              <p className="text-gray-700 mb-4 leading-relaxed">
                The value of mutual fund investments may fluctuate due to various market factors:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-3">
                <li><strong>Stock Market Volatility:</strong> Equity fund values rise and fall with stock market movements</li>
                <li><strong>Interest Rate Changes:</strong> Debt funds are sensitive to interest rate fluctuations</li>
                <li><strong>Economic Factors:</strong> GDP growth, inflation, and economic policies affect fund performance</li>
                <li><strong>Global Events:</strong> International market conditions can impact domestic funds</li>
              </ul>
            </div>
          </section>

          <section className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Credit Risk</h2>
            <div className="bg-white p-4 rounded-md">
              <p className="text-gray-700 mb-4 leading-relaxed">
                Particularly relevant for debt funds:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-3">
                <li><strong>Default Risk:</strong> Possibility of bond issuers failing to repay</li>
                <li><strong>Credit Rating Changes:</strong> Downgrades can affect bond values</li>
                <li><strong>Liquidity Risk:</strong> Difficulty in selling certain securities quickly</li>
              </ul>
            </div>
          </section>

          <section className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Concentration Risk</h2>
            <div className="bg-white p-4 rounded-md">
              <ul className="list-disc pl-6 text-gray-700 space-y-3">
                <li><strong>Sectoral Concentration:</strong> Over-exposure to specific sectors</li>
                <li><strong>Single Stock Risk:</strong> Heavy investment in few stocks</li>
                <li><strong>Geographic Concentration:</strong> Limited diversification across regions</li>
              </ul>
            </div>
          </section>

          <section className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Liquidity Risk</h2>
            <div className="bg-white p-4 rounded-md">
              <p className="text-gray-700 mb-4 leading-relaxed">
                Factors affecting your ability to redeem investments:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-3">
                <li><strong>Lock-in Periods:</strong> Some funds have mandatory holding periods</li>
                <li><strong>Exit Loads:</strong> Charges for early redemption</li>
                <li><strong>Market Conditions:</strong> Difficult market conditions may affect redemption</li>
                <li><strong>Large Redemptions:</strong> May force fund managers to sell at unfavorable prices</li>
              </ul>
            </div>
          </section>

          <section className="bg-orange-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Management Risk</h2>
            <div className="bg-white p-4 rounded-md">
              <ul className="list-disc pl-6 text-gray-700 space-y-3">
                <li><strong>Fund Manager Changes:</strong> New managers may have different strategies</li>
                <li><strong>Investment Decisions:</strong> Poor stock selection can impact returns</li>
                <li><strong>Style Drift:</strong> Fund may deviate from stated investment objective</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tax Implications</h2>
            <div className="bg-white p-4 rounded-md">
              <p className="text-gray-700 mb-4 leading-relaxed">
                Understand the tax impact of your investments:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-3">
                <li><strong>Capital Gains Tax:</strong> Different rates for short-term vs long-term gains</li>
                <li><strong>Dividend Distribution Tax:</strong> May apply on dividend payouts</li>
                <li><strong>Tax Law Changes:</strong> Modifications in tax regulations can affect returns</li>
              </ul>
            </div>
          </section>

          <section className="bg-blue-100 p-6 rounded-lg border-2 border-blue-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Regulatory Information</h2>
            <div className="bg-white p-4 rounded-md">
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>SEBI Registration:</strong> Equisculpt Ventures Pvt. Ltd. is registered with SEBI as a mutual fund distributor and investment advisor.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Disclaimer:</strong> The information provided is for educational purposes only and should not be considered as investment advice. Please consult with qualified financial advisors before making investment decisions.
              </p>
            </div>
          </section>

          <section className="bg-red-100 p-6 rounded-lg border-2 border-red-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact for Clarifications</h2>
            <div className="bg-white p-4 rounded-md">
              <p className="text-gray-700 leading-relaxed">
                For any questions about these risks or our services, please contact us at{' '}
                <a href="mailto:hello@equisculpt.in" className="text-blue-600 hover:underline font-semibold">hello@equisculpt.in</a>{' '}
                or <a href="tel:+917760997030" className="text-blue-600 hover:underline font-semibold">+91 7760997030</a>.
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RiskDisclosurePage;


import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RiskDisclosurePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Risk Disclosure</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Risk Disclosure Statement</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <p className="text-red-800 font-semibold text-lg">
                Mutual fund investments are subject to market risks. Please read all scheme related documents carefully before investing.
              </p>
            </div>
            <p className="text-gray-700">
              This risk disclosure document outlines the various risks associated with mutual fund investments. 
              As a SEBI registered Investment Advisor and AMFI registered Mutual Fund Distributor, we are required 
              to ensure that all investors understand these risks before making investment decisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Market Risk</h2>
            <p className="text-gray-700 mb-4">
              The value of mutual fund investments may fluctuate due to various market factors including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Economic conditions and policy changes</li>
              <li>Interest rate movements</li>
              <li>Currency fluctuations</li>
              <li>Political and regulatory changes</li>
              <li>Global market conditions</li>
              <li>Sectoral and company-specific factors</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Investment Risk Categories</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Equity Funds</h3>
                <p className="text-gray-700">
                  <strong>High Risk:</strong> Subject to equity market volatility. Returns can vary significantly 
                  and may result in capital loss. Suitable for investors with high risk tolerance and long-term investment horizon.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Debt Funds</h3>
                <p className="text-gray-700">
                  <strong>Low to Moderate Risk:</strong> Subject to interest rate risk, credit risk, and liquidity risk. 
                  Duration risk increases with longer maturity securities.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Hybrid Funds</h3>
                <p className="text-gray-700">
                  <strong>Moderate Risk:</strong> Combination of equity and debt risks. Risk level depends on 
                  asset allocation between equity and debt components.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Specific Risk Factors</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Liquidity Risk</h4>
                <p className="text-sm text-gray-700">Difficulty in selling investments at fair value due to lack of buyers</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Credit Risk</h4>
                <p className="text-sm text-gray-700">Risk of default by issuers of debt securities</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Concentration Risk</h4>
                <p className="text-sm text-gray-700">Risk from investing in limited number of securities or sectors</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Currency Risk</h4>
                <p className="text-sm text-gray-700">Risk from fluctuations in foreign exchange rates for international funds</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Past Performance Disclaimer</h2>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Important:</strong> Past performance of mutual funds does not guarantee future returns. 
                The NAV of mutual fund schemes may go up or down depending upon the factors and forces affecting 
                the securities market. All performance data is historical and does not predict future performance.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Investor Responsibilities</h2>
            <p className="text-gray-700 mb-4">
              Before investing, investors must:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Read and understand the Scheme Information Document (SID)</li>
              <li>Review the Key Information Memorandum (KIM)</li>
              <li>Understand their risk profile and investment objectives</li>
              <li>Consider the investment horizon and liquidity requirements</li>
              <li>Regularly monitor their investments</li>
              <li>Consult with qualified financial advisors if needed</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exit Load and Charges</h2>
            <p className="text-gray-700 mb-4">
              Mutual funds may charge various fees that can impact returns:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Exit load for early redemption (varies by scheme)</li>
              <li>Expense ratio as annual fund management charge</li>
              <li>Transaction charges as per SEBI regulations</li>
              <li>Stamp duty and other statutory charges</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tax Implications</h2>
            <p className="text-gray-700">
              Mutual fund investments have tax implications including capital gains tax, dividend distribution tax (where applicable), 
              and Securities Transaction Tax (STT). Tax treatment may change based on government policies. 
              Investors should consult tax advisors for personalized advice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Regulatory Information</h2>
            <p className="text-gray-700 mb-4">
              Equisculpt Ventures Pvt. Ltd. (operating as SIP Brewery) is:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>SEBI Registered Investment Advisor</li>
              <li>AMFI Registered Mutual Fund Distributor</li>
              <li>Compliant with all applicable SEBI and AMFI regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact for Queries</h2>
            <p className="text-gray-700">
              For any queries regarding risks or investments, please contact us at hello@equisculpt.in or +91 7760997030.
              For unresolved grievances, you may approach SEBI/AMFI grievance redressal mechanisms.
            </p>
          </section>

          <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Final Disclaimer:</strong> This risk disclosure is for informational purposes only and does not constitute 
              investment advice. Investors should make their own investment decisions based on their financial situation, 
              risk tolerance, and investment objectives. Please read all scheme documents carefully before investing.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RiskDisclosurePage;

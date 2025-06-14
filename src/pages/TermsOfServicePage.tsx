
import Header from "@/components/Header";

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using Equisculpt Ventures' services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Services</h2>
            <p className="text-gray-700 mb-4">
              Equisculpt Ventures provides mutual fund investment services including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Regular mutual fund schemes (not direct plans)</li>
              <li>Investment advisory services</li>
              <li>Portfolio management guidance</li>
              <li>Annual gift card rewards program (0.2% of equity investments)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Investment Risks</h2>
            <p className="text-gray-700 mb-4">
              All mutual fund investments are subject to market risks. Key points:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Past performance does not guarantee future returns</li>
              <li>The value of investments may go up or down</li>
              <li>You may receive less than you invested</li>
              <li>Please read all scheme documents carefully before investing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Gift Card Program</h2>
            <p className="text-gray-700 mb-4">
              Our gift card reward program offers:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>0.2% annual reward on equity mutual fund investments</li>
              <li>Rewards calculated based on average annual investment value</li>
              <li>Gift cards issued annually after 12 months of investment</li>
              <li>Terms and conditions apply</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fees and Charges</h2>
            <p className="text-gray-700">
              We offer regular mutual fund plans which include distributor commissions. All applicable fees and charges will be disclosed before investment.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700">
              For any questions regarding these terms, please contact us at support@equisculpt.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;

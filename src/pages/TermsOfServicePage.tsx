
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
              By accessing and using SIP Brewery (a trademark of Equisculpt Ventures Pvt. Ltd.) services, you accept and agree to be bound by the terms and provisions of this agreement. These terms are subject to applicable SEBI and AMFI regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Our Services</h2>
            <p className="text-gray-700 mb-4">
              Equisculpt Ventures Pvt. Ltd. is a SEBI registered Investment Advisor and AMFI registered Mutual Fund Distributor providing:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Mutual fund distribution services</li>
              <li>Investment advisory services</li>
              <li>Portfolio management guidance</li>
              <li>Educational content and market insights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Regulatory Compliance</h2>
            <p className="text-gray-700 mb-4">
              Our services are provided in accordance with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Securities and Exchange Board of India (SEBI) regulations</li>
              <li>Association of Mutual Funds in India (AMFI) guidelines</li>
              <li>All applicable laws and regulations governing mutual fund distribution in India</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Investment Risks and Disclaimers</h2>
            <p className="text-gray-700 mb-4">
              <strong>Important:</strong> Mutual fund investments are subject to market risks. Please read all scheme related documents carefully before investing.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Past performance does not guarantee future returns</li>
              <li>The value of investments may go up or down based on market conditions</li>
              <li>You may receive back less than you invested</li>
              <li>There is no assurance that the investment objectives will be achieved</li>
              <li>The NAV of mutual fund schemes may fluctuate based on market movements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Distribution and Advisory Fees</h2>
            <p className="text-gray-700 mb-4">
              As a SEBI registered distributor and advisor:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>We may receive distribution commissions from mutual fund companies as per SEBI regulations</li>
              <li>Advisory fees, if applicable, will be clearly disclosed</li>
              <li>All fees and charges will be communicated transparently before investment</li>
              <li>We follow SEBI guidelines on commission disclosure and investor protection</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Client Responsibilities</h2>
            <p className="text-gray-700 mb-4">
              As our client, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide accurate and complete information for KYC compliance</li>
              <li>Read and understand all scheme documents before investing</li>
              <li>Make investment decisions based on your own risk appetite and financial goals</li>
              <li>Comply with all applicable tax obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Grievance Redressal</h2>
            <p className="text-gray-700 mb-4">
              For any complaints or grievances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Contact us directly at hello@equisculpt.in</li>
              <li>If not resolved, you may approach SEBI/AMFI grievance redressal mechanisms</li>
              <li>Details of our grievance officer are available on request</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Data Protection</h2>
            <p className="text-gray-700">
              We are committed to protecting your personal information in accordance with applicable data protection laws and SEBI regulations on client confidentiality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700">
              Our liability is limited to the extent permitted by applicable laws and SEBI regulations. We shall not be liable for market losses or investment performance variations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications to Terms</h2>
            <p className="text-gray-700">
              These terms may be updated from time to time to comply with regulatory changes. Continued use of our services constitutes acceptance of modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700">
              For any questions regarding these terms or our services, please contact us at hello@equisculpt.in or +91 7760997030.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfServicePage;

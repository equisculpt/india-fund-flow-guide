
import React from 'react';

const SEOContentSection = () => {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-slate-900 to-gray-900 mobile-optimized"  style={{
      background: 'linear-gradient(135deg, #0B132B 0%, #1e293b 100%)'
    }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">India's Trusted AMFI Registered Mutual Fund Distributor & SIP Investment Platform</h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-lg border border-white/20">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-cyan-400">Start SIP Online - ₹500 Monthly</h3>
              <p className="text-gray-300 text-sm md:text-base">Begin your SIP investment journey with India's top mutual fund platform. Professional advisory, instant portfolio tracking, and consistency rewards on regular SIPs.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-lg border border-white/20">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-green-400">Best SIP Plans India 2025</h3>
              <p className="text-gray-300 text-sm md:text-base">Discover top-performing SIP plans with professional recommendations. Compare mutual funds, calculate returns, and invest in regular schemes with expert guidance.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-lg border border-white/20">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-purple-400">SIP Calculator & Comparison</h3>
              <p className="text-gray-300 text-sm md:text-base">Use our advanced SIP calculator to compare SIP vs lump sum strategies. Track fund performance and get personalized investment recommendations.</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-lg border border-white/20">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">Why Choose SIP Brewery - India's Trusted SIP Investment Platform?</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-base md:text-lg mb-2 text-yellow-400">🏆 AMFI Registered & Compliant Mutual Fund Distributor</h4>
                  <p className="text-gray-300 text-sm md:text-base">Fully regulated and registered with AMFI. Your investments are safe and secure with India's most trusted mutual fund platform.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-base md:text-lg mb-2 text-yellow-400">💰 Regular Mutual Funds + SIP Consistency Rewards</h4>
                  <p className="text-gray-300 text-sm md:text-base">Invest in regular mutual funds with professional advisory. Earn consistency rewards and gift cards for maintaining regular SIPs. Terms apply as per SEBI guidelines.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-base md:text-lg mb-2 text-yellow-400">👨‍💼 Professional Fund Recommendations</h4>
                  <p className="text-gray-300 text-sm md:text-base">Get personalized mutual fund recommendations based on your risk profile, goals, and market conditions from experienced professionals.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-base md:text-lg mb-2 text-yellow-400">📊 Advanced SIP Calculator & Performance Tracker</h4>
                  <p className="text-gray-300 text-sm md:text-base">Calculate SIP returns, compare SIP vs lump sum, track portfolio performance, and get detailed fund analysis reports.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOContentSection;

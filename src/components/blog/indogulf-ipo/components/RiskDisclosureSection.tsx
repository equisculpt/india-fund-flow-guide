
import React from 'react';

const RiskDisclosureSection = () => {
  return (
    <div className="bg-red-50 p-8 rounded-lg border-l-4 border-red-400 mb-12">
      <h4 className="font-semibold text-red-800 mb-4 flex items-center gap-2 text-xl">
        <span>⚖️</span>
        Important Risk Disclosure & Legal Disclaimer
      </h4>
      <div className="text-red-700 space-y-3 text-sm leading-relaxed">
        <p>
          <strong>Research Purpose Only:</strong> This research analysis is for informational and educational purposes only. 
          It does not constitute investment advice, solicitation, or any form of recommendation to buy, sell, or hold securities. 
          All content is based on publicly available information and our independent research.
        </p>
        <p>
          <strong>Investment Risks:</strong> Investing in IPOs and securities carries significant risks including high volatility, 
          market fluctuations, and potential complete loss of capital. Past performance does not guarantee future results. 
          Market conditions can change rapidly and unpredictably.
        </p>
        <p>
          <strong>Due Diligence Required:</strong> Readers must conduct their own thorough research, read the complete 
          Red Herring Prospectus (RHP), and consult with SEBI-registered investment advisors before making any investment decisions. 
          Consider your risk tolerance, investment horizon, and financial goals carefully.
        </p>
        <p>
          <strong>Data Accuracy:</strong> Financial data is based on company's restated consolidated financials as available 
          in public domain and regulatory filings. While we strive for accuracy, readers should verify all information 
          from official company documents and regulatory sources.
        </p>
        <p>
          <strong>Regulatory Notice:</strong> SIP Brewery and its affiliates are not SEBI-registered investment advisors 
          or research analysts. This analysis represents our independent research opinion based on publicly available information. 
          We do not provide personalized investment advice or recommendations for any specific individual or entity.
        </p>
      </div>
    </div>
  );
};

export default RiskDisclosureSection;

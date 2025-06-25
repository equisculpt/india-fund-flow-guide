
import React from 'react';

const RiskDisclosureSection = () => {
  return (
    <div className="bg-red-50 p-8 rounded-lg border-l-4 border-red-400 mb-12">
      <h4 className="font-semibold text-red-800 mb-4 flex items-center gap-2 text-xl">
        <span>⚖️</span>
        Important Risk Disclosure & Disclaimer
      </h4>
      <div className="text-red-700 space-y-3 text-sm leading-relaxed">
        <p>
          <strong>Investment Risks:</strong> This IPO analysis is for informational purposes only and does not constitute investment advice. 
          Investing in IPOs carries significant risks including high volatility, market fluctuations, and potential loss of capital. 
          Past performance does not guarantee future results.
        </p>
        <p>
          <strong>Due Diligence:</strong> Investors must conduct their own research, read the complete Red Herring Prospectus (RHP), 
          and consult with qualified financial advisors before making investment decisions. Consider your risk tolerance, 
          investment horizon, and financial goals.
        </p>
        <p>
          <strong>Data Accuracy:</strong> Financial data is based on company's restated consolidated financials as available in public domain. 
          Investors should verify all information from official company documents and regulatory filings.
        </p>
        <p>
          <strong>Regulatory Notice:</strong> SIP Brewery and its affiliates are not SEBI-registered investment advisors. 
          This analysis is based on publicly available information and our research. Market conditions, company performance, 
          and regulatory changes can significantly impact investment outcomes.
        </p>
      </div>
    </div>
  );
};

export default RiskDisclosureSection;

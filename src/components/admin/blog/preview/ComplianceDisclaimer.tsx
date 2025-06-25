
import React from 'react';

const ComplianceDisclaimer = () => {
  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg border-l-4 border-gray-400">
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <span className="text-xl">⚖️</span>
        Important Legal Disclaimer
      </h4>
      <p className="text-sm text-gray-600 leading-relaxed">
        This blog post is for informational purposes only and does not constitute investment advice. 
        SIP Brewery and Equisculpt Venture are not registered investment advisors with SEBI. 
        Investing in IPOs carries significant risk, including the potential loss of your entire investment. 
        Past performance does not guarantee future results. Always conduct thorough research, read the 
        complete prospectus, and consult with a registered financial advisor before making any investment decisions.
      </p>
    </div>
  );
};

export default ComplianceDisclaimer;

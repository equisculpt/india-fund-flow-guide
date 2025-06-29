
import React from 'react';

const HeroDisclaimer = () => {
  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-sm text-red-700 leading-relaxed shadow-lg">
      <p className="font-semibold mb-2">⚠️ Important Disclaimers:</p>
      <p>
        *Rewards are discretionary, not guaranteed, and may be changed or withdrawn at any time. 
        AI-generated research and analysis are for informational purposes only and do not constitute investment advice. 
        Please see our Terms & Conditions and Commission Disclosure for details. 
        Mutual fund investments are subject to market risk.
      </p>
    </div>
  );
};

export default HeroDisclaimer;

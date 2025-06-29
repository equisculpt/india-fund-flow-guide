
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const HeroDisclaimer = () => {
  return (
    <div className="bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 border-2 border-red-200 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 w-full">
      <div className="flex items-start gap-4 lg:gap-6">
        <div className="bg-red-100 p-3 lg:p-4 rounded-2xl border border-red-200 flex-shrink-0">
          <AlertTriangle className="h-6 w-6 lg:h-7 lg:w-7 text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg lg:text-xl text-red-800 mb-3 lg:mb-4">
            ⚠️ Important Disclaimers & Risk Disclosure
          </h3>
          <div className="text-sm lg:text-base text-red-700 leading-relaxed space-y-2 lg:space-y-3">
            <p>
              <strong className="text-red-800">Investment Risks:</strong> Mutual fund investments are subject to market risks. 
              Please read all scheme related documents carefully before investing. Past performance is not indicative of future returns.
            </p>
            <p>
              <strong className="text-red-800">Platform Rewards:</strong> Rewards are discretionary, not guaranteed, and may be changed or withdrawn at any time. 
              Research and analysis are for informational purposes only and do not constitute investment advice.
            </p>
            <p>
              <strong className="text-red-800">Regulatory Compliance:</strong> We are AMFI registered mutual fund distributors. 
              Please see our Terms & Conditions and Commission Disclosure for complete details about fees and commissions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDisclaimer;

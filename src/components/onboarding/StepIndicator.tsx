
import React from 'react';

interface StepIndicatorProps {
  step: number;
}

const StepIndicator = ({ step }: StepIndicatorProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between text-gray-500">
        <span className={`step ${step > 1 ? 'completed' : 'active'}`}>
          1. Personal Info
        </span>
        <span className={`step ${step > 2 ? 'completed' : step === 2 ? 'active' : ''}`}>
          2. Terms & Conditions
        </span>
        <span className={`step ${step > 3 ? 'completed' : step === 3 ? 'active' : ''}`}>
          3. KYC Verification
        </span>
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(step - 1) * 50}%` }}></div>
      </div>
    </div>
  );
};

export default StepIndicator;


import React from 'react';

interface OnboardingHeaderProps {
  step: number;
}

const OnboardingHeader = ({ step }: OnboardingHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
      <p className="text-gray-600">
        {step === 1
          ? 'Tell us a bit about yourself to get started.'
          : step === 2
            ? 'Please review and accept our terms and conditions.'
            : 'Verify your identity to unlock all features.'}
      </p>
    </div>
  );
};

export default OnboardingHeader;

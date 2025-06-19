
import { AlertTriangle } from "lucide-react";

interface OnboardingHeaderProps {
  socialLoginUser?: any;
}

const OnboardingHeader = ({ socialLoginUser }: OnboardingHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        {socialLoginUser ? "Complete Your Profile" : "Client Onboarding"}
      </h1>
      <p className="text-gray-600 text-center">
        {socialLoginUser 
          ? "Complete your onboarding with proper KYC verification and risk profiling"
          : "Secure client onboarding with regulatory compliant KYC verification"
        }
      </p>
      
      {/* KYC Information Panel */}
      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1 text-center">
            <h3 className="font-semibold text-amber-800 mb-2 text-center">KYC Verification Process</h3>
            <div className="text-sm text-amber-700 space-y-1">
              <p className="text-center"><strong>Current Status:</strong> Demo Mode - For production, integrate with:</p>
              <div className="text-center">
                <div className="space-y-1">
                  <div>• Aadhaar verification APIs (UIDAI)</div>
                  <div>• PAN verification services</div>
                  <div>• Bank account verification</div>
                  <div>• Document upload and OCR systems</div>
                  <div>• Video KYC compliance</div>
                </div>
              </div>
              <p className="mt-2 text-center"><strong>Note:</strong> This demo uses simulated verification for testing purposes only.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingHeader;

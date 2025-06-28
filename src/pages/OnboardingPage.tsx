
import { useSearchParams } from "react-router-dom";
import AgentClientOnboarding from "@/components/AgentClientOnboarding";
import BreweryLogo from "@/components/BreweryLogo";
import { useSupabaseAuth } from "@/contexts/SupabaseAuthContext";
import { useEffect } from "react";

const OnboardingPage = () => {
  const [searchParams] = useSearchParams();
  const agentId = searchParams.get("agent");
  const referralCode = searchParams.get("ref");
  const isFromAgent = !!agentId;
  const isFromReferral = !!referralCode;
  const { user, profile, loading, isKYCRequired } = useSupabaseAuth();

  // If user is already KYC verified, redirect to main app
  useEffect(() => {
    if (!loading && user && profile && !isKYCRequired) {
      window.location.href = '/dashboard';
    }
  }, [user, profile, loading, isKYCRequired]);

  // If no user, redirect to home
  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/';
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <BreweryLogo size="md" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {isFromAgent && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-center">
              You've been referred by one of our agents. Complete your KYC verification to start investing!
            </p>
          </div>
        )}

        {isFromReferral && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-center">
              🎉 Welcome! You've been referred by a friend. Complete your KYC and make your first investment to help them earn rewards!
            </p>
          </div>
        )}

        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h2 className="text-amber-800 font-semibold mb-2">KYC Verification Required</h2>
          <p className="text-amber-700">
            To comply with regulatory requirements and ensure the security of your investments, 
            you must complete KYC (Know Your Customer) verification before accessing our platform.
          </p>
        </div>
        
        <AgentClientOnboarding 
          agentId={agentId || undefined} 
          socialLoginUser={user}
          referralCode={referralCode || undefined}
        />
      </div>
    </div>
  );
};

export default OnboardingPage;


import { useSearchParams } from "react-router-dom";
import AgentClientOnboarding from "@/components/AgentClientOnboarding";
import BreweryLogo from "@/components/BreweryLogo";
import { useEnhancedAuth } from "@/contexts/EnhancedAuthContext";
import { useEffect } from "react";

const OnboardingPage = () => {
  const [searchParams] = useSearchParams();
  const agentId = searchParams.get("agent");
  const isFromAgent = !!agentId;
  const { user, firebaseUser } = useEnhancedAuth();

  // If user is already onboarded, redirect to dashboard
  useEffect(() => {
    if (user?.isOnboardingComplete) {
      window.location.href = '/dashboard';
    }
  }, [user]);

  // Check if this is a social login user who needs onboarding
  const isSocialLoginUser = firebaseUser && (!user?.isOnboardingComplete);

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
              You've been referred by one of our agents. Complete your onboarding to start investing!
            </p>
          </div>
        )}

        {isSocialLoginUser && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-center">
              Welcome! Please complete your profile to finish setting up your account.
            </p>
          </div>
        )}
        
        <AgentClientOnboarding 
          agentId={agentId || undefined} 
          socialLoginUser={isSocialLoginUser ? user : undefined}
        />
      </div>
    </div>
  );
};

export default OnboardingPage;

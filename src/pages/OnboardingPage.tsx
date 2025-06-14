
import { useSearchParams } from "react-router-dom";
import AgentClientOnboarding from "@/components/AgentClientOnboarding";
import BreweryLogo from "@/components/BreweryLogo";

const OnboardingPage = () => {
  const [searchParams] = useSearchParams();
  const agentId = searchParams.get("agent");
  const isFromAgent = !!agentId;

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
        
        <AgentClientOnboarding agentId={agentId || undefined} />
      </div>
    </div>
  );
};

export default OnboardingPage;

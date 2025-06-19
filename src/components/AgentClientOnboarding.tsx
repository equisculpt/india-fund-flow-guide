
import { useState, useEffect } from "react";
import { useEnhancedAuth } from "@/contexts/EnhancedAuthContext";
import OnboardingHeader from "./onboarding/OnboardingHeader";
import AgentTabs from "./onboarding/AgentTabs";
import OnboardingSteps from "./onboarding/OnboardingSteps";

interface AgentClientOnboardingProps {
  isAgent?: boolean;
  agentId?: string;
  socialLoginUser?: any;
}

const AgentClientOnboarding = ({ isAgent = false, agentId, socialLoginUser }: AgentClientOnboardingProps) => {
  const [activeTab, setActiveTab] = useState("self-onboard");
  const [onboardingLink, setOnboardingLink] = useState("");

  // Form states - pre-populate if social login user but allow editing
  const [clientData, setClientData] = useState({
    fullName: socialLoginUser?.name || "",
    email: socialLoginUser?.email || "",
    phone: "",
    panNumber: "",
    aadhaarNumber: "",
    dateOfBirth: "",
    address: "",
    nomineeName: "",
    nomineeRelation: "",
    bankAccount: "",
    ifscCode: ""
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <OnboardingHeader socialLoginUser={socialLoginUser} />

      {isAgent && (
        <AgentTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          clientData={clientData}
          setClientData={setClientData}
          onboardingLink={onboardingLink}
          setOnboardingLink={setOnboardingLink}
          agentId={agentId}
        />
      )}

      <OnboardingSteps
        clientData={clientData}
        setClientData={setClientData}
        socialLoginUser={socialLoginUser}
      />
    </div>
  );
};

export default AgentClientOnboarding;

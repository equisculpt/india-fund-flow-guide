
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import DigioKYCVerification from './onboarding/DigioKYCVerification';
import OnboardingHeader from './onboarding/OnboardingHeader';
import StepIndicator from './onboarding/StepIndicator';
import PersonalInfoStep from './onboarding/PersonalInfoStep';
import TermsConditionsStep from './onboarding/TermsConditionsStep';
import { useReferralProcessing } from './onboarding/hooks/useReferralProcessing';
import { useOnboardingData } from './onboarding/hooks/useOnboardingData';

interface AgentClientOnboardingProps {
  agentId?: string;
  socialLoginUser?: any;
  referralCode?: string;
}

const AgentClientOnboarding = ({ agentId, socialLoginUser, referralCode }: AgentClientOnboardingProps) => {
  const [step, setStep] = useState(1);
  const [tncAccepted, setTncAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const { clientData, onboardingSource, handleInputChange } = useOnboardingData(
    socialLoginUser, 
    agentId, 
    referralCode
  );

  // Process referral code if provided
  useReferralProcessing(referralCode, socialLoginUser);

  const handleSubmit = async () => {
    if (step === 1 && (!clientData.fullName || !clientData.email || !clientData.phone)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (step === 2 && !tncAccepted) {
      toast({
        title: "Terms Not Accepted",
        description: "Please accept the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (socialLoginUser) {
      setIsLoading(true);
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: clientData.fullName,
            phone: clientData.phone,
            onboarding_source: onboardingSource,
            is_direct_customer: onboardingSource === 'direct'
          })
          .eq('id', socialLoginUser.id);

        if (error) {
          console.error('Error updating profile:', error);
          toast({
            title: "Error",
            description: "Failed to update profile. Please try again.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
        setStep(step + 1);
      } catch (error) {
        console.error('Update profile error:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleKYCComplete = () => {
    toast({
      title: "KYC Completed",
      description: "Your KYC verification has been completed successfully!",
    });
    navigate('/dashboard');
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <OnboardingHeader step={step} />
      <StepIndicator step={step} />

      <div className="bg-white rounded-lg shadow-md p-6">
        {step === 1 && (
          <PersonalInfoStep
            clientData={clientData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            referralCode={referralCode}
            socialLoginUser={socialLoginUser}
          />
        )}

        {step === 2 && (
          <TermsConditionsStep
            tncAccepted={tncAccepted}
            onTncChange={setTncAccepted}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )}

        {step === 3 && (
          <DigioKYCVerification
            clientData={clientData}
            onKYCComplete={handleKYCComplete}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default AgentClientOnboarding;

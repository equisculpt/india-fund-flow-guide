
import { useState, useEffect } from 'react';

interface ClientData {
  fullName: string;
  email: string;
  phone: string;
  panNumber: string;
  aadhaarNumber: string;
  nominee: string;
}

export const useOnboardingData = (socialLoginUser?: any, agentId?: string, referralCode?: string) => {
  const [clientData, setClientData] = useState<ClientData>({
    fullName: '',
    email: '',
    phone: '',
    panNumber: '',
    aadhaarNumber: '',
    nominee: ''
  });

  const [onboardingSource, setOnboardingSource] = useState<'direct' | 'agent' | 'referral'>('direct');

  useEffect(() => {
    if (socialLoginUser) {
      setClientData({
        fullName: socialLoginUser.user_metadata?.full_name || socialLoginUser.user_metadata?.name || '',
        email: socialLoginUser.email || '',
        phone: socialLoginUser.user_metadata?.phone || '',
        panNumber: '',
        aadhaarNumber: '',
        nominee: ''
      });

      // Set onboarding source based on context
      if (agentId) {
        setOnboardingSource('agent');
      } else if (referralCode) {
        setOnboardingSource('referral');
      } else {
        setOnboardingSource('direct');
      }
    }
  }, [socialLoginUser, agentId, referralCode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClientData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return {
    clientData,
    setClientData,
    onboardingSource,
    handleInputChange
  };
};

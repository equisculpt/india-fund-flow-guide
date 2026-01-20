
import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { mockProfiles } from '@/services/mockDatabase';

export const useReferralProcessing = (referralCode?: string, socialLoginUser?: any) => {
  const { toast } = useToast();

  useEffect(() => {
    const processReferralCode = async () => {
      if (referralCode && socialLoginUser) {
        // Mock referral processing for prototype
        const referrer = mockProfiles.find(p => p.referral_code === referralCode);

        if (!referrer) {
          toast({
            title: "Invalid Referral Code",
            description: "The referral code you used is not valid.",
            variant: "destructive"
          });
          return;
        }

        toast({
          title: "Referral Applied!",
          description: `You've been successfully referred by ${referrer.full_name}`,
        });
      }
    };

    processReferralCode();
  }, [referralCode, socialLoginUser, toast]);
};

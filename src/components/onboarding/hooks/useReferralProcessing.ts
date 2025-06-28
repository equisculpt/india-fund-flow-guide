
import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

export const useReferralProcessing = (referralCode?: string, socialLoginUser?: any) => {
  const { toast } = useToast();

  useEffect(() => {
    const processReferralCode = async () => {
      if (referralCode && socialLoginUser) {
        try {
          // Find the referrer by referral code
          const { data: referrer, error } = await supabase
            .from('profiles')
            .select('id, full_name')
            .eq('referral_code', referralCode)
            .single();

          if (error) {
            console.error('Invalid referral code:', error);
            toast({
              title: "Invalid Referral Code",
              description: "The referral code you used is not valid.",
              variant: "destructive"
            });
            return;
          }

          if (referrer) {
            // Update user profile with referrer information
            const { error: updateError } = await supabase
              .from('profiles')
              .update({ 
                referred_by: referrer.id,
                onboarding_source: 'referral',
                is_direct_customer: true // Referral users are still direct customers
              })
              .eq('id', socialLoginUser.id);

            if (updateError) {
              console.error('Error updating referral info:', updateError);
            } else {
              toast({
                title: "Referral Applied!",
                description: `You've been successfully referred by ${referrer.full_name}`,
              });
            }
          }
        } catch (error) {
          console.error('Error processing referral:', error);
        }
      }
    };

    processReferralCode();
  }, [referralCode, socialLoginUser, toast]);
};

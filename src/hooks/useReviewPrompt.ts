
import { useEffect, useState } from 'react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useReviewPrompt = () => {
  const [shouldShowReview, setShouldShowReview] = useState(false);
  const { user, profile } = useSupabaseAuth();

  useEffect(() => {
    const checkReviewStatus = async () => {
      if (!user || !profile || profile.user_type !== 'customer') {
        return;
      }

      // Check if user has already submitted a review
      const { data: existingReview } = await supabase
        .from('investor_reviews')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (existingReview) {
        return; // User already reviewed
      }

      // Check if user has any investments (should have some experience to review)
      const { data: investments } = await supabase
        .from('investments')
        .select('id')
        .eq('user_id', user.id)
        .limit(1);

      if (investments && investments.length > 0) {
        // Check localStorage to see if we should prompt (not too frequently)
        const lastPromptDate = localStorage.getItem(`reviewPrompt_${user.id}`);
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        if (!lastPromptDate || new Date(lastPromptDate) < thirtyDaysAgo) {
          setShouldShowReview(true);
          localStorage.setItem(`reviewPrompt_${user.id}`, now.toISOString());
        }
      }
    };

    checkReviewStatus();
  }, [user, profile]);

  const dismissReview = () => {
    setShouldShowReview(false);
  };

  return { shouldShowReview, dismissReview };
};

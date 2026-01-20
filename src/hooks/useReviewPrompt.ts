
import { useEffect, useState } from 'react';
import { useBackendAuth } from '@/contexts/BackendAuthContext';

export const useReviewPrompt = () => {
  const [shouldShowReview, setShouldShowReview] = useState(false);
  const { user, profile } = useBackendAuth();

  useEffect(() => {
    const checkReviewStatus = async () => {
      if (!user || !profile) {
        return;
      }

      // For prototype, simulate review logic
      // Check localStorage to see if we should prompt (not too frequently)
      const lastPromptDate = localStorage.getItem(`reviewPrompt_${user.id}`);
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      if (!lastPromptDate || new Date(lastPromptDate) < thirtyDaysAgo) {
        // 30% chance to show review prompt for prototype demo
        if (Math.random() < 0.3) {
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

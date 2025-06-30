
import { useState } from 'react';

export const useSIPStatusManager = () => {
  const [sipStatuses, setSipStatuses] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({});

  const setProcessingState = (sipId: string, processing: boolean) => {
    setIsProcessing(prev => ({ ...prev, [sipId]: processing }));
  };

  const updateSIPStatus = (sipId: string, newStatus: string) => {
    setSipStatuses(prev => ({ ...prev, [sipId]: newStatus }));
  };

  return {
    sipStatuses,
    isProcessing,
    setProcessingState,
    updateSIPStatus
  };
};

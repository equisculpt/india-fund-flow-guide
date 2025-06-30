
import { useToast } from '@/hooks/use-toast';
import { useSIPStatusManager } from './useSIPStatusManager';
import { SIPOperationService } from '../services/sipOperationService';
import { PDFDownloadService } from '@/services/pdf/PDFDownloadService';
import type { SIPOperationHooks, SIPData } from './types';

export const useSIPOperations = (): SIPOperationHooks => {
  const { toast } = useToast();
  const {
    sipStatuses,
    isProcessing,
    setProcessingState,
    updateSIPStatus
  } = useSIPStatusManager();

  const sipOperationService = new SIPOperationService(toast);
  const pdfDownloadService = new PDFDownloadService(toast);

  const handlePauseSIP = async (sipId: string) => {
    setProcessingState(sipId, true);
    try {
      const result = await sipOperationService.pauseSIP(sipId);
      if (result.success) {
        const currentStatus = sipStatuses[sipId] || 'Active';
        const newStatus = currentStatus === 'Active' ? 'Paused' : 'Active';
        updateSIPStatus(sipId, newStatus);
      }
    } finally {
      setProcessingState(sipId, false);
    }
  };

  const handleStopSIP = async (sipId: string) => {
    setProcessingState(sipId, true);
    try {
      const result = await sipOperationService.stopSIP(sipId);
      if (result.success) {
        updateSIPStatus(sipId, 'Stopped');
      }
    } finally {
      setProcessingState(sipId, false);
    }
  };

  const handleModifySIP = async (sipId: string, newAmount?: number) => {
    setProcessingState(sipId, true);
    try {
      await sipOperationService.modifySIP(sipId, newAmount);
    } finally {
      setProcessingState(sipId, false);
    }
  };

  const handleStartNewSIP = async (sipData?: SIPData) => {
    await sipOperationService.startNewSIP(sipData);
  };

  const handleDownloadStatement = async (type: string, params?: any) => {
    await pdfDownloadService.downloadPDFStatement(type, params);
  };

  return {
    sipStatuses,
    isProcessing,
    handlePauseSIP,
    handleStopSIP,
    handleModifySIP,
    handleStartNewSIP,
    handleDownloadStatement
  };
};

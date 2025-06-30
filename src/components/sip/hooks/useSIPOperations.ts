
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useSIPOperations = () => {
  const [sipStatuses, setSipStatuses] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const setProcessingState = (sipId: string, processing: boolean) => {
    setIsProcessing(prev => ({ ...prev, [sipId]: processing }));
  };

  const handlePauseSIP = async (sipId: string) => {
    setProcessingState(sipId, true);
    try {
      console.log('BSE STAR MF API: Pause SIP', sipId);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const currentStatus = sipStatuses[sipId] || 'Active';
      const newStatus = currentStatus === 'Active' ? 'Paused' : 'Active';
      
      setSipStatuses(prev => ({ ...prev, [sipId]: newStatus }));
      
      toast({
        title: `SIP ${newStatus}`,
        description: `SIP has been ${newStatus.toLowerCase()} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update SIP status",
        variant: "destructive",
      });
    } finally {
      setProcessingState(sipId, false);
    }
  };

  const handleStopSIP = async (sipId: string) => {
    setProcessingState(sipId, true);
    try {
      console.log('BSE STAR MF API: Stop SIP', sipId);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSipStatuses(prev => ({ ...prev, [sipId]: 'Stopped' }));
      
      toast({
        title: "SIP Stopped",
        description: "SIP has been stopped successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to stop SIP",
        variant: "destructive",
      });
    } finally {
      setProcessingState(sipId, false);
    }
  };

  const handleModifySIP = async (sipId: string, newAmount: number) => {
    setProcessingState(sipId, true);
    try {
      console.log('BSE STAR MF API: Modify SIP', sipId, newAmount);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "SIP Amount Modified",
        description: `SIP amount has been updated to ₹${newAmount.toLocaleString()}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to modify SIP amount",
        variant: "destructive",
      });
    } finally {
      setProcessingState(sipId, false);
    }
  };

  const handleStartNewSIP = async () => {
    try {
      console.log('BSE STAR MF API: Start new SIP');
      
      toast({
        title: "New SIP",
        description: "Redirecting to SIP creation form...",
      });
      
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start new SIP",
        variant: "destructive",
      });
    }
  };

  const handleDownloadStatement = async (type: string) => {
    try {
      console.log('BSE STAR MF API: Download Statement', type);
      
      toast({
        title: "Downloading Statement",
        description: "Your statement is being prepared...",
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Download Complete",
        description: "Statement has been downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download statement",
        variant: "destructive",
      });
    }
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


import { useToast } from '@/hooks/use-toast';
import { bseStarMFService } from '@/services/bseStarMFService';
import { portfolioService } from '@/services/api/portfolioService';
import { ApiError } from '@/services/api/baseApiService';

export class SIPOperationService {
  private toast: ReturnType<typeof useToast>['toast'];

  constructor(toast: ReturnType<typeof useToast>['toast']) {
    this.toast = toast;
  }

  async pauseSIP(sipId: string): Promise<{ success: boolean; newStatus?: string }> {
    try {
      console.log('BSE STAR MF API: Pause SIP', sipId);
      
      const response = await bseStarMFService.pauseSIP(sipId);
      
      if (response.status === 'success') {
        this.toast({
          title: "SIP Status Updated Successfully! 🎉",
          description: "Your SIP status has been updated via BSE STAR MF and will reflect in your account shortly.",
        });
        return { success: true };
      }
      
      return { success: false };
    } catch (error) {
      console.error('BSE STAR MF API Error:', error);
      this.toast({
        title: "Operation Failed",
        description: "Unable to update SIP status via BSE STAR MF API. Please try again or contact support.",
        variant: "destructive",
      });
      return { success: false };
    }
  }

  async stopSIP(sipId: string): Promise<{ success: boolean }> {
    try {
      console.log('BSE STAR MF API: Stop SIP', sipId);
      
      const response = await bseStarMFService.stopSIP(sipId);
      
      if (response.status === 'success') {
        this.toast({
          title: "SIP Stopped Successfully! ⏹️",
          description: "Your SIP has been permanently stopped via BSE STAR MF. You can start a new SIP anytime.",
        });
        return { success: true };
      }
      
      return { success: false };
    } catch (error) {
      console.error('BSE STAR MF API Error:', error);
      this.toast({
        title: "Stop SIP Failed",
        description: "Unable to stop SIP via BSE STAR MF API. Please try again or contact support.",
        variant: "destructive",
      });
      return { success: false };
    }
  }

  async modifySIP(sipId: string, newAmount?: number): Promise<{ success: boolean }> {
    try {
      console.log('BSE STAR MF API: Modify SIP', sipId, newAmount);
      
      // Mock modify SIP via BSE STAR MF API
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      const amount = newAmount || Math.floor(Math.random() * 5000) + 1000;
      
      this.toast({
        title: "SIP Modified Successfully! ✏️",
        description: `SIP amount has been updated to ₹${amount.toLocaleString()} via BSE STAR MF. Changes will apply from next installment.`,
      });
      
      return { success: true };
    } catch (error) {
      console.error('BSE STAR MF API Error:', error);
      this.toast({
        title: "Modification Failed",
        description: "Unable to modify SIP amount via BSE STAR MF API. Please try again or contact support.",
        variant: "destructive",
      });
      return { success: false };
    }
  }

  async startNewSIP(sipData?: {
    schemeCode: string;
    amount: number;
    frequency: 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
    sipDate: number;
  }): Promise<{ success: boolean }> {
    try {
      console.log('BSE STAR MF API: Start new SIP', sipData);
      
      if (sipData) {
        const response = await bseStarMFService.startSIP({
          ...sipData,
          clientCode: 'SB123456',
          mandateId: 'MANDATE001'
        });
        
        if (response.status === 'success') {
          this.toast({
            title: "New SIP Started Successfully! 🚀",
            description: `Your SIP of ₹${sipData.amount.toLocaleString()} has been started via BSE STAR MF. SIP ID: ${response.sipId}`,
          });
          return { success: true };
        }
      } else {
        this.toast({
          title: "Redirecting to Fund Explorer 🚀",
          description: "Choose from 2000+ mutual funds to start your new SIP journey via BSE STAR MF!",
        });
        return { success: true };
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: false };
    } catch (error) {
      console.error('BSE STAR MF API Error:', error);
      this.toast({
        title: "Start SIP Failed",
        description: "Unable to start new SIP via BSE STAR MF API. Please try again.",
        variant: "destructive",
      });
      return { success: false };
    }
  }
}

import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface KYCData {
  panNumber: string;
  aadhaarNumber: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

interface KYCStatus {
  status: 'idle' | 'initiating' | 'pending' | 'in_progress' | 'completed' | 'failed';
  referenceId?: string;
  verificationUrl?: string;
  panVerified: boolean;
  aadhaarVerified: boolean;
  kycComplete: boolean;
  error?: string;
}

export const useDigioKYC = () => {
  const [kycStatus, setKycStatus] = useState<KYCStatus>({
    status: 'idle',
    panVerified: false,
    aadhaarVerified: false,
    kycComplete: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const callDigioAPI = async (action: string, data: any) => {
    const { data: result, error } = await supabase.functions.invoke('digio-kyc', {
      body: { action, data }
    });

    if (error) {
      throw new Error(error.message || 'Failed to call Digio API');
    }

    return result;
  };

  const generateReferenceId = (prefix: string = 'SB'): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${prefix}_${timestamp}_${random}`;
  };

  const initiateKYC = useCallback(async (kycData: KYCData) => {
    setIsLoading(true);
    setKycStatus(prev => ({ ...prev, status: 'initiating' }));

    try {
      const referenceId = generateReferenceId('KYC');

      // Step 1: Verify PAN
      const panResult = await callDigioAPI('pan_verification', {
        referenceId: `${referenceId}_PAN`,
        panNumber: kycData.panNumber,
        customerName: kycData.fullName
      });

      if (panResult.status === 'success') {
        setKycStatus(prev => ({ ...prev, panVerified: true }));
        toast({
          title: "PAN Verified",
          description: "Your PAN has been successfully verified.",
        });
      }

      // Step 2: Verify Aadhaar
      const aadhaarResult = await callDigioAPI('aadhaar_verification', {
        referenceId: `${referenceId}_AADHAAR`,
        aadhaarNumber: kycData.aadhaarNumber,
        customerName: kycData.fullName
      });

      if (aadhaarResult.status === 'success') {
        setKycStatus(prev => ({ ...prev, aadhaarVerified: true }));
        toast({
          title: "Aadhaar Verified",
          description: "Your Aadhaar has been successfully verified.",
        });
      }

      // Step 3: Initiate full KYC
      const kycResult = await callDigioAPI('initiate_kyc', {
        referenceId,
        email: kycData.email,
        name: kycData.fullName,
        mobile: kycData.phone,
        pan: kycData.panNumber,
        aadhaar: kycData.aadhaarNumber
      });

      setKycStatus(prev => ({
        ...prev,
        status: 'pending',
        referenceId: kycResult.id,
        verificationUrl: kycResult.verification_url
      }));

      toast({
        title: "KYC Initiated",
        description: "Your KYC process has been started. Please complete the verification.",
      });

      return {
        success: true,
        referenceId: kycResult.id,
        verificationUrl: kycResult.verification_url
      };

    } catch (error: any) {
      console.error('KYC initiation failed:', error);
      setKycStatus(prev => ({
        ...prev,
        status: 'failed',
        error: error.message
      }));

      toast({
        title: "KYC Failed",
        description: error.message || "Failed to initiate KYC process.",
        variant: "destructive",
      });

      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const checkKYCStatus = useCallback(async (referenceId: string) => {
    try {
      const result = await callDigioAPI('get_status', { referenceId });
      
      setKycStatus(prev => ({
        ...prev,
        status: result.status === 'success' ? 'completed' : 'pending',
        kycComplete: result.status === 'success'
      }));

      return result;
    } catch (error: any) {
      console.error('Failed to check KYC status:', error);
      throw error;
    }
  }, []);

  const resetKYC = useCallback(() => {
    setKycStatus({
      status: 'idle',
      panVerified: false,
      aadhaarVerified: false,
      kycComplete: false
    });
    setIsLoading(false);
  }, []);

  return {
    kycStatus,
    isLoading,
    initiateKYC,
    checkKYCStatus,
    resetKYC
  };
};

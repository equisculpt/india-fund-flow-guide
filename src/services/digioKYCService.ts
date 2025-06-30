
// Digio KYC API Service - Mock implementation ready for live API integration
export interface DigioKYCInitiateResponse {
  status: 'success' | 'error';
  verification_url: string;
  reference_id: string;
  expires_at: string;
  errorMessage?: string;
}

export interface DigioKYCStatusResponse {
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'expired';
  reference_id: string;
  verification_details?: {
    pan_verified: boolean;
    aadhaar_verified: boolean;
    bank_verified: boolean;
    video_kyc_completed: boolean;
  };
  documents?: {
    pan_url?: string;
    aadhaar_url?: string;
    bank_statement_url?: string;
  };
  errorMessage?: string;
}

export interface DigioPANVerificationResponse {
  status: 'success' | 'error';
  pan_verified: boolean;
  pan_holder_name: string;
  reference_id: string;
  errorMessage?: string;
}

class DigioKYCService {
  private baseUrl = '/api/digio/kyc';

  async initiateKYC(kycData: {
    referenceId: string;
    email: string;
    name: string;
    mobile: string;
  }): Promise<DigioKYCInitiateResponse> {
    // Mock response matching Digio API format
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      status: 'success',
      verification_url: `https://app.digio.in/kyc/verify/${kycData.referenceId}`,
      reference_id: kycData.referenceId,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };
  }

  async verifyPAN(panData: {
    referenceId: string;
    panNumber: string;
    customerName: string;
  }): Promise<DigioPANVerificationResponse> {
    // Mock PAN verification response
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate PAN verification logic
    const isValidPAN = panData.panNumber.length === 10 && /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panData.panNumber);
    
    return {
      status: isValidPAN ? 'success' : 'error',
      pan_verified: isValidPAN,
      pan_holder_name: isValidPAN ? panData.customerName : '',
      reference_id: panData.referenceId,
      errorMessage: isValidPAN ? undefined : 'Invalid PAN format or PAN not found'
    };
  }

  async getKYCStatus(referenceId: string): Promise<DigioKYCStatusResponse> {
    // Mock KYC status response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate random status for demo
    const statuses = ['pending', 'in_progress', 'completed', 'failed'] as const;
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      status: randomStatus,
      reference_id: referenceId,
      verification_details: randomStatus === 'completed' ? {
        pan_verified: true,
        aadhaar_verified: true,
        bank_verified: true,
        video_kyc_completed: true
      } : undefined,
      documents: randomStatus === 'completed' ? {
        pan_url: `https://docs.digio.in/pan/${referenceId}.pdf`,
        aadhaar_url: `https://docs.digio.in/aadhaar/${referenceId}.pdf`,
        bank_statement_url: `https://docs.digio.in/bank/${referenceId}.pdf`
      } : undefined
    };
  }
}

export const digioKYCService = new DigioKYCService();

interface DigioConfig {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
  environment: 'sandbox' | 'production';
}

interface KYCRequest {
  reference_id: string;
  customer_identifier: string;
  template_name?: string;
  expire_in_days?: number;
  entity_type?: 'individual' | 'nri' | 'corporate';
}

interface DocumentVerificationRequest {
  reference_id: string;
  document_type: 'pan' | 'aadhaar' | 'passport' | 'driving_license' | 'voter_id';
  document_number: string;
  customer_name?: string;
  date_of_birth?: string;
  entity_type?: 'individual' | 'nri' | 'corporate';
}

interface ESignRequest {
  reference_id: string;
  document_name: string;
  document_content: string; // Base64 encoded
  signer_details: {
    name: string;
    email: string;
    mobile: string;
  };
  expire_in_days?: number;
  sign_type?: 'aadhaar' | 'dsc' | 'coordinates';
}

interface VideoKYCRequest {
  reference_id: string;
  customer_name: string;
  email: string;
  mobile: string;
  nationality: string;
  document_type: 'passport' | 'aadhaar' | 'pan';
  document_number: string;
}

interface CorporateKYCRequest {
  reference_id: string;
  company_name: string;
  company_type: 'private_limited' | 'llp' | 'trust' | 'partnership';
  pan_number: string;
  gst_number?: string;
  directors: Array<{
    name: string;
    pan: string;
    aadhaar?: string;
    email: string;
    mobile: string;
  }>;
  authorized_signatories: Array<{
    name: string;
    designation: string;
    pan: string;
    email: string;
    mobile: string;
  }>;
}

interface DigioResponse {
  id: string;
  reference_id: string;
  status: 'success' | 'pending' | 'failed';
  message: string;
  download_url?: string;
  verification_url?: string;
  data?: any;
}

export class DigioService {
  private config: DigioConfig;

  constructor() {
    this.config = {
      clientId: '', // Will be set from environment
      clientSecret: '', // Will be set from environment
      baseUrl: 'https://ext.digio.in:444',
      environment: 'sandbox' // Change to 'production' for live
    };
  }

  private async makeRequest(endpoint: string, method: 'GET' | 'POST' | 'PUT', data?: any): Promise<any> {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(this.config.clientId + ':' + this.config.clientSecret)}`
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'API request failed');
      }
      
      return result;
    } catch (error) {
      console.error('Digio API Error:', error);
      throw error;
    }
  }

  // Individual KYC Methods
  async initiatePANVerification(panNumber: string, customerName: string, referenceId: string): Promise<DigioResponse> {
    const endpoint = '/v2/client/kyc/pan_verification';
    const data: DocumentVerificationRequest = {
      reference_id: referenceId,
      document_type: 'pan',
      document_number: panNumber,
      customer_name: customerName,
      entity_type: 'individual'
    };

    return this.makeRequest(endpoint, 'POST', data);
  }

  async initiateAadhaarVerification(aadhaarNumber: string, customerName: string, referenceId: string): Promise<DigioResponse> {
    const endpoint = '/v2/client/kyc/aadhaar_verification';
    const data: DocumentVerificationRequest = {
      reference_id: referenceId,
      document_type: 'aadhaar',
      document_number: aadhaarNumber,
      customer_name: customerName,
      entity_type: 'individual'
    };

    return this.makeRequest(endpoint, 'POST', data);
  }

  async initiateKYC(customerData: {
    name: string;
    email: string;
    mobile: string;
    pan?: string;
    aadhaar?: string;
  }, referenceId: string): Promise<DigioResponse> {
    const endpoint = '/v2/client/kyc';
    const data: KYCRequest = {
      reference_id: referenceId,
      customer_identifier: customerData.email,
      template_name: 'kyc_template_v1',
      expire_in_days: 30,
      entity_type: 'individual'
    };

    return this.makeRequest(endpoint, 'POST', data);
  }

  // NRI KYC Methods
  async initiateNRIKYC(customerData: {
    name: string;
    email: string;
    mobile: string;
    nationality: string;
    passport_number: string;
    country_of_residence: string;
  }, referenceId: string): Promise<DigioResponse> {
    const endpoint = '/v2/client/kyc/nri';
    const data = {
      reference_id: referenceId,
      customer_identifier: customerData.email,
      customer_name: customerData.name,
      mobile: customerData.mobile,
      nationality: customerData.nationality,
      passport_number: customerData.passport_number,
      country_of_residence: customerData.country_of_residence,
      template_name: 'nri_kyc_template_v1',
      expire_in_days: 30
    };

    return this.makeRequest(endpoint, 'POST', data);
  }

  async initiateVideoKYC(customerData: VideoKYCRequest): Promise<DigioResponse> {
    const endpoint = '/v2/client/kyc/video_kyc';
    return this.makeRequest(endpoint, 'POST', customerData);
  }

  async initiatePassportVerification(passportNumber: string, customerName: string, referenceId: string): Promise<DigioResponse> {
    const endpoint = '/v2/client/kyc/passport_verification';
    const data: DocumentVerificationRequest = {
      reference_id: referenceId,
      document_type: 'passport',
      document_number: passportNumber,
      customer_name: customerName,
      entity_type: 'nri'
    };

    return this.makeRequest(endpoint, 'POST', data);
  }

  // Corporate KYC Methods
  async initiateCorporateKYC(corporateData: CorporateKYCRequest): Promise<DigioResponse> {
    const endpoint = '/v2/client/kyc/corporate';
    return this.makeRequest(endpoint, 'POST', corporateData);
  }

  async initiateCorporatePANVerification(panNumber: string, companyName: string, referenceId: string): Promise<DigioResponse> {
    const endpoint = '/v2/client/kyc/corporate_pan_verification';
    const data: DocumentVerificationRequest = {
      reference_id: referenceId,
      document_type: 'pan',
      document_number: panNumber,
      customer_name: companyName,
      entity_type: 'corporate'
    };

    return this.makeRequest(endpoint, 'POST', data);
  }

  // eSign Methods
  async createESignDocument(documentData: {
    name: string;
    email: string;
    mobile: string;
    documentName: string;
    documentContent: string;
    signType?: 'aadhaar' | 'dsc' | 'coordinates';
  }, referenceId: string): Promise<DigioResponse> {
    const endpoint = '/v2/client/document/upload';
    const data: ESignRequest = {
      reference_id: referenceId,
      document_name: documentData.documentName,
      document_content: documentData.documentContent,
      signer_details: {
        name: documentData.name,
        email: documentData.email,
        mobile: documentData.mobile
      },
      expire_in_days: 30,
      sign_type: documentData.signType || 'aadhaar'
    };

    return this.makeRequest(endpoint, 'POST', data);
  }

  // Bank Account Verification (Penny Drop)
  async initiateBankVerification(accountNumber: string, ifscCode: string, accountHolderName: string, referenceId: string): Promise<DigioResponse> {
    const endpoint = '/v2/client/kyc/bank_verification';
    const data = {
      reference_id: referenceId,
      account_number: accountNumber,
      ifsc_code: ifscCode,
      account_holder_name: accountHolderName,
      verification_type: 'penny_drop'
    };

    return this.makeRequest(endpoint, 'POST', data);
  }

  // CKYC Fetch
  async fetchCKYC(ckycNumber: string, referenceId: string): Promise<DigioResponse> {
    const endpoint = '/v2/client/kyc/ckyc_fetch';
    const data = {
      reference_id: referenceId,
      ckyc_number: ckycNumber
    };

    return this.makeRequest(endpoint, 'POST', data);
  }

  // Status and Download Methods
  async getKYCStatus(referenceId: string): Promise<DigioResponse> {
    const endpoint = `/v2/client/kyc/${referenceId}`;
    return this.makeRequest(endpoint, 'GET');
  }

  async getDocumentStatus(documentId: string): Promise<DigioResponse> {
    const endpoint = `/v2/client/document/${documentId}`;
    return this.makeRequest(endpoint, 'GET');
  }

  async downloadDocument(documentId: string): Promise<string> {
    const endpoint = `/v2/client/document/${documentId}/download`;
    const response = await this.makeRequest(endpoint, 'GET');
    return response.download_url;
  }

  // Webhook handler for status updates
  handleWebhook(webhookData: any): { status: string; reference_id: string; data: any } {
    return {
      status: webhookData.status,
      reference_id: webhookData.reference_id,
      data: webhookData
    };
  }

  // Generate unique reference ID
  generateReferenceId(prefix: string = 'SB'): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${prefix}_${timestamp}_${random}`;
  }

  setCredentials(clientId: string, clientSecret: string) {
    this.config.clientId = clientId;
    this.config.clientSecret = clientSecret;
  }

  setEnvironment(env: 'sandbox' | 'production') {
    this.config.environment = env;
    this.config.baseUrl = env === 'production' 
      ? 'https://ext.digio.in:444' 
      : 'https://ext.digio.in:444'; // Same URL for both environments
  }
}

export const digioService = new DigioService();

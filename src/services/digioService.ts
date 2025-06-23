
interface DigioConfig {
  apiKey: string;
  baseUrl: string;
  environment: 'sandbox' | 'production';
}

interface KYCRequest {
  reference_id: string;
  customer_identifier: string;
  template_name?: string;
  expire_in_days?: number;
}

interface DocumentVerificationRequest {
  reference_id: string;
  document_type: 'pan' | 'aadhaar' | 'driving_license' | 'voter_id';
  document_number: string;
  customer_name?: string;
  date_of_birth?: string;
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
      apiKey: '', // Will be set from environment
      baseUrl: 'https://ext.digio.in:444',
      environment: 'sandbox' // Change to 'production' for live
    };
  }

  private async makeRequest(endpoint: string, method: 'GET' | 'POST' | 'PUT', data?: any): Promise<any> {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(this.config.apiKey + ':')}`
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

  async initiatePANVerification(panNumber: string, customerName: string, referenceId: string): Promise<DigioResponse> {
    const endpoint = '/v2/client/kyc/pan_verification';
    const data: DocumentVerificationRequest = {
      reference_id: referenceId,
      document_type: 'pan',
      document_number: panNumber,
      customer_name: customerName
    };

    return this.makeRequest(endpoint, 'POST', data);
  }

  async initiateAadhaarVerification(aadhaarNumber: string, customerName: string, referenceId: string): Promise<DigioResponse> {
    const endpoint = '/v2/client/kyc/aadhaar_verification';
    const data: DocumentVerificationRequest = {
      reference_id: referenceId,
      document_type: 'aadhaar',
      document_number: aadhaarNumber,
      customer_name: customerName
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
      expire_in_days: 30
    };

    return this.makeRequest(endpoint, 'POST', data);
  }

  async createESignDocument(documentData: {
    name: string;
    email: string;
    mobile: string;
    documentName: string;
    documentContent: string;
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
      expire_in_days: 30
    };

    return this.makeRequest(endpoint, 'POST', data);
  }

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

  setApiKey(apiKey: string) {
    this.config.apiKey = apiKey;
  }

  setEnvironment(env: 'sandbox' | 'production') {
    this.config.environment = env;
    this.config.baseUrl = env === 'production' 
      ? 'https://ext.digio.in:444' 
      : 'https://ext.digio.in:444'; // Same URL for both environments
  }
}

export const digioService = new DigioService();

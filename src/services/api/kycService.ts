import { BaseApiService } from './baseApiService';

interface Address {
  line1: string;
  city: string;
  state: string;
  pincode: string;
}

interface KYCInitiateRequest {
  panNumber: string;
  aadhaarNumber: string;
  dateOfBirth: string;
  address: Address;
}

interface KYCInitiateResponse {
  kycId: string;
  status: string;
  digioUrl: string;
  expiresAt: string;
}

interface KYCStatus {
  kycId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
  approvedAt?: string;
  rejectionReason?: string;
}

interface BankAccount {
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
}

interface EMandateRequest {
  bankAccount: BankAccount;
  amount: number;
  frequency: string;
}

interface EMandateResponse {
  mandateId: string;
  status: string;
  npcUrl: string;
  expiresAt: string;
}

export class KYCService extends BaseApiService {
  async initiateKYC(kycData: KYCInitiateRequest): Promise<KYCInitiateResponse> {
    return this.post<KYCInitiateResponse>('/api/kyc/initiate', kycData);
  }

  async getKYCStatus(kycId: string): Promise<KYCStatus> {
    return this.get<KYCStatus>(`/api/kyc/status/${kycId}`);
  }

  async setupEMandate(mandateData: EMandateRequest): Promise<EMandateResponse> {
    return this.post<EMandateResponse>('/api/kyc/emandate', mandateData);
  }
}

export const kycService = new KYCService();
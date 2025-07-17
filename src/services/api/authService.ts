import { BaseApiService } from './baseApiService';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  investmentGoals: string[];
  timeHorizon: 'short-term' | 'medium-term' | 'long-term';
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    kycStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
    riskProfile: string;
  };
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  riskProfile: string;
  investmentGoals: string[];
  timeHorizon: string;
  kycStatus: string;
  isActive: boolean;
  createdAt: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

interface RefreshTokenRequest {
  refreshToken: string;
}

export class AuthService extends BaseApiService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>('/auth/login', credentials);
    this.setAuthToken(response.token);
    return response;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>('/auth/register', userData);
    this.setAuthToken(response.token);
    return response;
  }

  async logout(): Promise<void> {
    this.clearAuthToken();
    // Could also call a logout endpoint if needed
    // await this.post('/api/auth/logout');
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>('/auth/refresh', { refreshToken });
    this.setAuthToken(response.token);
    return response;
  }

  async getProfile(): Promise<UserProfile> {
    return this.get<UserProfile>('/auth/profile');
  }

  async checkAuth(): Promise<{ success: boolean; data: any }> {
    return this.get('/auth/check');
  }

  async getKYCStatus(): Promise<{ kycStatus: string }> {
    return this.get('/auth/kyc/status');
  }

  async updateKYCStatus(kycStatus: string): Promise<{ message: string }> {
    return this.put('/auth/kyc/status', { kycStatus });
  }

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    return this.put<UserProfile>('/auth/profile', updates);
  }

  async forgotPassword(email: ForgotPasswordRequest): Promise<{ message: string }> {
    return this.post('/auth/forgot-password', email);
  }

  async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    return this.post('/auth/reset-password', data);
  }

  async changePassword(data: ChangePasswordRequest): Promise<{ message: string }> {
    return this.put('/auth/change-password', data);
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}

export const authService = new AuthService();
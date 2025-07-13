interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errorCode?: string;
  timestamp?: string;
}

interface PaginationResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export class BaseApiService {
  private baseUrl: string;
  private authToken: string | null = null;

  constructor() {
    this.baseUrl = import.meta.env.DEV 
      ? 'http://localhost:3000' 
      : 'https://api.sipbrewery.com';
  }

  setAuthToken(token: string) {
    this.authToken = token;
    localStorage.setItem('authToken', token);
  }

  getAuthToken(): string | null {
    if (!this.authToken) {
      this.authToken = localStorage.getItem('authToken');
    }
    return this.authToken;
  }

  clearAuthToken() {
    this.authToken = null;
    localStorage.removeItem('authToken');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();
    
    if (!data.success) {
      throw new ApiError(data.message, data.errorCode, data.error);
    }
    
    return data;
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      const result = await this.handleResponse<T>(response);
      return result.data!;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error occurred', 'NETWORK_ERROR');
    }
  }

  async post<T>(endpoint: string, body?: any): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: body ? JSON.stringify(body) : undefined,
      });

      const result = await this.handleResponse<T>(response);
      return result.data!;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error occurred', 'NETWORK_ERROR');
    }
  }

  async put<T>(endpoint: string, body?: any): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: body ? JSON.stringify(body) : undefined,
      });

      const result = await this.handleResponse<T>(response);
      return result.data!;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error occurred', 'NETWORK_ERROR');
    }
  }

  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      const result = await this.handleResponse<T>(response);
      return result.data!;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error occurred', 'NETWORK_ERROR');
    }
  }

  async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    try {
      const headers: HeadersInit = {};
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
      });

      const result = await this.handleResponse<T>(response);
      return result.data!;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error occurred', 'NETWORK_ERROR');
    }
  }

  async download(endpoint: string): Promise<Blob> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new ApiError('Failed to download file', 'DOWNLOAD_ERROR');
      }

      return await response.blob();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error occurred', 'NETWORK_ERROR');
    }
  }
}

export class ApiError extends Error {
  constructor(
    message: string, 
    public errorCode?: string, 
    public details?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export type { ApiResponse, PaginationResponse };
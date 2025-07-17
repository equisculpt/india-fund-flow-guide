import { BaseApiService } from './baseApiService';

export interface HealthCheckResponse {
  status: string;
  message: string;
  timestamp: string;
  version?: string;
  uptime?: number;
}

export class HealthCheckService extends BaseApiService {
  static async checkHealth(): Promise<HealthCheckResponse> {
    const service = new HealthCheckService();
    return service.get<HealthCheckResponse>('/health');
  }

  static async checkConnectivity(): Promise<{
    isConnected: boolean;
    responseTime: number;
    status: string;
    error?: string;
  }> {
    const startTime = Date.now();
    
    try {
      const healthData = await this.checkHealth();
      const responseTime = Date.now() - startTime;
      
      return {
        isConnected: true,
        responseTime,
        status: healthData.status,
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      return {
        isConnected: false,
        responseTime,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
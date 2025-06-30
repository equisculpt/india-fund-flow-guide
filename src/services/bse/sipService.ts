
import { BSESIPResponse, SIPData } from './types';

export class BSESIPService {
  async getSIPs(clientCode: string): Promise<BSESIPResponse[]> {
    // Mock SIP data matching BSE STAR MF format
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      {
        status: 'success',
        sipId: `SIP${Date.now()}001`,
        clientCode,
        schemeCode: '120503',
        sipAmount: 5000,
        sipFrequency: 'MONTHLY',
        sipDate: 15,
        startDate: '2024-01-15',
        mandateId: 'MANDATE001',
        sipStatus: 'ACTIVE',
        nextDueDate: '2025-01-15'
      },
      {
        status: 'success',
        sipId: `SIP${Date.now()}002`,
        clientCode,
        schemeCode: '119551',
        sipAmount: 3000,
        sipFrequency: 'MONTHLY',
        sipDate: 20,
        startDate: '2024-02-20',
        mandateId: 'MANDATE002',
        sipStatus: 'ACTIVE',
        nextDueDate: '2025-01-20'
      }
    ];
  }

  async startSIP(sipData: SIPData): Promise<BSESIPResponse> {
    // Mock SIP start response
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    return {
      status: 'success',
      sipId: `SIP${Date.now()}${Math.floor(Math.random() * 1000)}`,
      clientCode: sipData.clientCode,
      schemeCode: sipData.schemeCode,
      sipAmount: sipData.amount,
      sipFrequency: sipData.frequency,
      sipDate: sipData.sipDate,
      startDate: new Date().toISOString().split('T')[0],
      mandateId: sipData.mandateId,
      sipStatus: 'ACTIVE',
      nextDueDate: this.calculateNextDueDate(sipData.frequency, sipData.sipDate)
    };
  }

  async pauseSIP(sipId: string): Promise<{ status: string; message: string; sipId: string }> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      status: 'success',
      message: 'SIP paused successfully',
      sipId
    };
  }

  async stopSIP(sipId: string): Promise<{ status: string; message: string; sipId: string }> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      status: 'success',
      message: 'SIP stopped successfully',
      sipId
    };
  }

  private calculateNextDueDate(frequency: string, sipDate: number): string {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, sipDate);
    return nextMonth.toISOString().split('T')[0];
  }
}

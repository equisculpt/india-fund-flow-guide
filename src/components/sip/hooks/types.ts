
export interface SIPOperationHooks {
  sipStatuses: Record<string, string>;
  isProcessing: Record<string, boolean>;
  handlePauseSIP: (sipId: string) => Promise<void>;
  handleStopSIP: (sipId: string) => Promise<void>;
  handleModifySIP: (sipId: string, newAmount?: number) => Promise<void>;
  handleStartNewSIP: (sipData?: {
    schemeCode: string;
    amount: number;
    frequency: 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
    sipDate: number;
  }) => Promise<void>;
  handleDownloadStatement: (type: string, params?: any) => Promise<void>;
}

export interface SIPData {
  schemeCode: string;
  amount: number;
  frequency: 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  sipDate: number;
}

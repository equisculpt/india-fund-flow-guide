import { BaseApiService } from './baseApiService';

interface VoiceSessionRequest {
  language: string;
  context: string;
}

interface VoiceSessionResponse {
  sessionId: string;
  websocketUrl: string;
  language: string;
}

interface VoiceMessageRequest {
  sessionId: string;
  audio?: string;
  message: string;
}

interface VoiceMessageResponse {
  response: string;
  audio: string;
  suggestions: string[];
}

export class VoiceService extends BaseApiService {
  async startVoiceSession(sessionData: VoiceSessionRequest): Promise<VoiceSessionResponse> {
    return this.post<VoiceSessionResponse>('/api/voice/start-session', sessionData);
  }

  async sendVoiceMessage(messageData: VoiceMessageRequest): Promise<VoiceMessageResponse> {
    return this.post<VoiceMessageResponse>('/api/voice/message', messageData);
  }
}

export const voiceService = new VoiceService();
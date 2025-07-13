import { BaseApiService } from './baseApiService';

interface VoiceSession {
  sessionId: string;
  websocketUrl: string;
  language: string;
}

interface VoiceMessage {
  response: string;
  audio: string;
  suggestions: string[];
}

interface VoiceCommand {
  command: string;
  parameters?: Record<string, any>;
  confidence: number;
}

export class VoiceService extends BaseApiService {
  // Voice Session Management
  async startVoiceSession(params: {
    language: string;
    context?: string;
  }): Promise<VoiceSession> {
    return this.post('/api/voice/start-session', params);
  }

  async sendVoiceMessage(params: {
    sessionId: string;
    audio?: string;
    message?: string;
  }): Promise<VoiceMessage> {
    return this.post('/api/voice/message', params);
  }

  async endVoiceSession(sessionId: string): Promise<{ success: boolean }> {
    return this.post('/api/voice/end-session', { sessionId });
  }

  // Voice Commands
  async processVoiceCommand(params: {
    audio: string;
    language?: string;
  }): Promise<VoiceCommand> {
    return this.post('/api/voice/command', params);
  }

  async getVoiceCommands(): Promise<{
    commands: Array<{
      command: string;
      description: string;
      examples: string[];
    }>;
  }> {
    return this.get('/api/voice/commands');
  }

  // Text-to-Speech
  async textToSpeech(params: {
    text: string;
    language?: string;
    voice?: string;
  }): Promise<{ audio: string }> {
    return this.post('/api/voice/text-to-speech', params);
  }

  // Speech-to-Text
  async speechToText(params: {
    audio: string;
    language?: string;
  }): Promise<{ text: string; confidence: number }> {
    return this.post('/api/voice/speech-to-text', params);
  }
}

export const voiceService = new VoiceService();

// Export individual functions for backward compatibility
export const startVoiceSession = (params: any) => voiceService.startVoiceSession(params);
export const sendVoiceMessage = (params: any) => voiceService.sendVoiceMessage(params);
export const processVoiceCommand = (params: any) => voiceService.processVoiceCommand(params);
export const textToSpeech = (params: any) => voiceService.textToSpeech(params);
export const speechToText = (params: any) => voiceService.speechToText(params);
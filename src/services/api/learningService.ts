import { BaseApiService } from './baseApiService';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  completed: boolean;
  progress: number;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface LearningSession {
  sessionId: string;
  module: {
    id: string;
    title: string;
    content: string;
    questions: Question[];
  };
}

interface QuizResponse {
  correct: boolean;
  explanation: string;
  points: number;
  nextQuestion?: string;
}

export class LearningService extends BaseApiService {
  // Learning Modules
  async getLearningModules(params?: {
    category?: string;
    difficulty?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    modules: LearningModule[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) queryParams.set(key, value.toString());
      });
    }
    return this.get(`/api/learning/modules?${queryParams.toString()}`);
  }

  // Learning Sessions
  async startLearningSession(moduleId: string): Promise<LearningSession> {
    return this.post('/api/learning/start-session', { moduleId });
  }

  async submitAnswer(params: {
    sessionId: string;
    questionId: string;
    answer: string;
  }): Promise<QuizResponse> {
    return this.post('/api/learning/submit-answer', params);
  }

  async completeLearningSession(sessionId: string): Promise<{
    completed: boolean;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    certificateUrl?: string;
  }> {
    return this.post('/api/learning/complete-session', { sessionId });
  }

  // Progress Tracking
  async getLearningProgress(): Promise<{
    totalModules: number;
    completedModules: number;
    totalPoints: number;
    level: number;
    certificates: any[];
  }> {
    return this.get('/api/learning/progress');
  }

  async getLearningPath(goal: string): Promise<{
    path: LearningModule[];
    estimatedDuration: string;
    difficulty: string;
  }> {
    return this.get(`/api/learning/path?goal=${goal}`);
  }

  // Certificates
  async getCertificates(): Promise<any[]> {
    return this.get('/api/learning/certificates');
  }

  async downloadCertificate(certificateId: string): Promise<Blob> {
    return this.download(`/api/learning/certificates/${certificateId}/download`);
  }
}

export const learningService = new LearningService();

// Export individual functions for backward compatibility
export const getLearningModules = (params?: any) => learningService.getLearningModules(params);
export const startLearningSession = (moduleId: string) => learningService.startLearningSession(moduleId);
export const submitAnswer = (params: any) => learningService.submitAnswer(params);
export const getLearningProgress = () => learningService.getLearningProgress();
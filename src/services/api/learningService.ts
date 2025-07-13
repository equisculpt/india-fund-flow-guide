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

interface LearningModulesResponse {
  modules: LearningModule[];
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface LearningSession {
  id: string;
  title: string;
  content: string;
  questions: Question[];
}

interface StartSessionResponse {
  sessionId: string;
  module: LearningSession;
}

interface SubmitAnswerRequest {
  sessionId: string;
  questionId: string;
  answer: string;
}

interface SubmitAnswerResponse {
  correct: boolean;
  explanation: string;
  points: number;
  nextQuestion?: string;
}

export class LearningService extends BaseApiService {
  async getLearningModules(params?: {
    category?: string;
    page?: number;
    limit?: number;
  }): Promise<LearningModulesResponse> {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.set('category', params.category);
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());

    const endpoint = `/api/learning/modules${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get<LearningModulesResponse>(endpoint);
  }

  async startLearningSession(moduleId: string): Promise<StartSessionResponse> {
    return this.post<StartSessionResponse>('/api/learning/start-session', { moduleId });
  }

  async submitAnswer(answerData: SubmitAnswerRequest): Promise<SubmitAnswerResponse> {
    return this.post<SubmitAnswerResponse>('/api/learning/submit-answer', answerData);
  }
}

export const learningService = new LearningService();
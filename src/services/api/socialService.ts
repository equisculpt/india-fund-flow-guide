import { BaseApiService } from './baseApiService';

interface LeaderboardUser {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  score: number;
  return: number;
  investedAmount: number;
}

interface LeaderboardResponse {
  leaderboard: LeaderboardUser[];
  userRank: {
    rank: number;
    score: number;
  };
}

interface SharePortfolioRequest {
  message: string;
  platform: 'whatsapp' | 'twitter' | 'facebook';
}

interface SharePortfolioResponse {
  shareId: string;
  shareUrl: string;
  message: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  points: number;
}

interface AchievementsResponse {
  achievements: Achievement[];
  totalPoints: number;
  level: number;
}

export class SocialService extends BaseApiService {
  async getLeaderboard(params?: {
    type?: string;
    page?: number;
    limit?: number;
  }): Promise<LeaderboardResponse> {
    const queryParams = new URLSearchParams();
    if (params?.type) queryParams.set('type', params.type);
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());

    const endpoint = `/api/social/leaderboard${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get<LeaderboardResponse>(endpoint);
  }

  async sharePortfolio(shareData: SharePortfolioRequest): Promise<SharePortfolioResponse> {
    return this.post<SharePortfolioResponse>('/api/social/share-portfolio', shareData);
  }

  async getAchievements(): Promise<AchievementsResponse> {
    return this.get<AchievementsResponse>('/api/social/achievements');
  }
}

export const socialService = new SocialService();
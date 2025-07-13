import { BaseApiService } from './baseApiService';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  score: number;
  return: number;
  investedAmount: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  points: number;
}

interface ShareResponse {
  shareId: string;
  shareUrl: string;
  message: string;
}

export class SocialService extends BaseApiService {
  // Leaderboard
  async getLeaderboard(params: {
    type: 'daily' | 'weekly' | 'monthly' | 'yearly';
    page?: number;
    limit?: number;
  }): Promise<{
    leaderboard: LeaderboardEntry[];
    userRank: { rank: number; score: number };
  }> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) queryParams.set(key, value.toString());
    });
    return this.get(`/api/social/leaderboard?${queryParams.toString()}`);
  }

  // Portfolio Sharing
  async sharePortfolio(params: {
    message: string;
    platform: 'whatsapp' | 'twitter' | 'facebook' | 'linkedin';
  }): Promise<ShareResponse> {
    return this.post('/api/social/share-portfolio', params);
  }

  // Achievements & Gamification
  async getAchievements(): Promise<{
    achievements: Achievement[];
    totalPoints: number;
    level: number;
  }> {
    return this.get('/api/social/achievements');
  }

  async getUserStats(): Promise<{
    totalPoints: number;
    level: number;
    rank: number;
    achievements: number;
    referrals: number;
  }> {
    return this.get('/api/social/user-stats');
  }

  // Social Interactions
  async followUser(userId: string): Promise<any> {
    return this.post('/api/social/follow', { userId });
  }

  async unfollowUser(userId: string): Promise<any> {
    return this.post('/api/social/unfollow', { userId });
  }

  async getFollowers(): Promise<any> {
    return this.get('/api/social/followers');
  }

  async getFollowing(): Promise<any> {
    return this.get('/api/social/following');
  }
}

export const socialService = new SocialService();

// Export individual functions for backward compatibility
export const getLeaderboard = (params: any) => socialService.getLeaderboard(params);
export const sharePortfolio = (params: any) => socialService.sharePortfolio(params);
export const getAchievements = () => socialService.getAchievements();
export const getUserStats = () => socialService.getUserStats();
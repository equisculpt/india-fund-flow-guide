import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Users, Share2, Target, Award, TrendingUp, Star } from 'lucide-react';
import { socialService, getLeaderboard, getAchievements, sharePortfolio } from '@/services/api/socialService';
import { toast } from 'sonner';

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

const SocialGamificationHub = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userStats, setUserStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSocialData();
  }, []);

  const fetchSocialData = async () => {
    try {
      setLoading(true);
      
      const [leaderboardData, achievementsData, userStatsData] = await Promise.all([
        getLeaderboard({ type: 'monthly', limit: 10 }),
        getAchievements(),
        socialService.getUserStats()
      ]);

      setLeaderboard(leaderboardData.leaderboard);
      setAchievements(achievementsData.achievements);
      setUserStats(userStatsData);
    } catch (error) {
      console.error('Error fetching social data:', error);
      toast.error('Failed to load social features');
    } finally {
      setLoading(false);
    }
  };

  const handleSharePortfolio = async (platform: 'whatsapp' | 'twitter' | 'facebook') => {
    try {
      const result = await sharePortfolio({
        message: 'Check out my investment portfolio performance! 🚀',
        platform
      });
      
      // Open share URL
      window.open(result.shareUrl, '_blank');
      toast.success('Portfolio shared successfully!');
    } catch (error) {
      console.error('Error sharing portfolio:', error);
      toast.error('Failed to share portfolio');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Stats Overview */}
      {userStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.rank}</div>
              <div className="text-sm text-muted-foreground">Your Rank</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.achievements}</div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.referrals}</div>
              <div className="text-sm text-muted-foreground">Referrals</div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="leaderboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="share">Share & Earn</TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Monthly Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((entry, index) => (
                  <div
                    key={entry.userId}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      index < 3 
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-amber-600 text-white' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {entry.rank}
                      </div>
                      <div>
                        <div className="font-semibold">{entry.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ₹{entry.investedAmount.toLocaleString()} invested
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        +{entry.return.toFixed(2)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {entry.score} points
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-500" />
                Your Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200"
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {achievement.description}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">+{achievement.points} points</Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="share">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-blue-500" />
                Share & Earn Rewards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                <h3 className="font-semibold text-lg mb-2">Share Your Portfolio Performance</h3>
                <p className="text-muted-foreground mb-4">
                  Share your investment success with friends and earn points for every share!
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleSharePortfolio('whatsapp')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Share on WhatsApp
                  </Button>
                  <Button
                    onClick={() => handleSharePortfolio('twitter')}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Share on Twitter
                  </Button>
                  <Button
                    onClick={() => handleSharePortfolio('facebook')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Share on Facebook
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Target className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="font-semibold">Refer Friends</div>
                  <div className="text-sm text-muted-foreground">
                    Earn ₹500 for each friend who invests
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">Performance Sharing</div>
                  <div className="text-sm text-muted-foreground">
                    Get 50 points for each portfolio share
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold">Achievement Unlock</div>
                  <div className="text-sm text-muted-foreground">
                    Bonus points for reaching milestones
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialGamificationHub;
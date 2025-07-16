import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Brain, 
  Users, 
  BookOpen, 
  Mic, 
  Globe,
  Smartphone,
  Eye,
  EyeOff
} from 'lucide-react';
import PortfolioAnalyticsDashboard from './dashboard/PortfolioAnalyticsDashboard';
import AIInsightsDashboard from './AIInsightsDashboard';
import SocialGamificationHub from './SocialGamificationHub';
import LearningEducationCenter from './LearningEducationCenter';
import { useQuery } from '@tanstack/react-query';
import { voiceService } from '@/services/api/voiceService';
import { regionalService } from '@/services/api/regionalService';

const EnhancedDashboard = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // Fetch voice chat status
  const { data: voiceStatus } = useQuery({
    queryKey: ['voiceStatus'],
    queryFn: () => voiceService.getVoiceStatus()
  });

  // Fetch regional content
  const { data: regionalContent } = useQuery({
    queryKey: ['regionalContent', selectedLanguage],
    queryFn: () => regionalService.getLocalizedContent(selectedLanguage)
  });

  const quickStats = [
    { label: 'Portfolio Value', value: '₹12,45,678', change: '+8.5%', positive: true },
    { label: 'Monthly SIP', value: '₹25,000', change: 'Active', positive: true },
    { label: 'Total Returns', value: '₹1,85,432', change: '+15.2%', positive: true },
    { label: 'AI Score', value: '85/100', change: 'Excellent', positive: true }
  ];

  const formatCurrency = (amount: string) => {
    if (hideBalance) return "₹****";
    return amount;
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Smart Investment Dashboard
          </h1>
          <p className="text-gray-600 mt-1">AI-powered insights for smarter investing</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setHideBalance(!hideBalance)}
          >
            {hideBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm">
            <Smartphone className="h-4 w-4 mr-2" />
            Mobile App
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-xl font-bold text-foreground">{formatCurrency(stat.value)}</div>
              <div className={`text-xs flex items-center gap-1 mt-1 ${
                stat.positive ? 'text-success' : 'text-destructive'
              }`}>
                <TrendingUp className="h-3 w-3" />
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Voice Assistant */}
      {voiceStatus?.available && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mic className="h-6 w-6 text-purple-600" />
                <div>
                  <h3 className="font-semibold">Voice Assistant Available</h3>
                  <p className="text-sm text-gray-600">Ask questions about your portfolio</p>
                </div>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Start Voice Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Language Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Available in your language</span>
            </div>
            <div className="flex gap-2">
              {['en', 'hi', 'ta', 'te', 'kn'].map((lang) => (
                <Badge
                  key={lang}
                  variant={selectedLanguage === lang ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Tabs */}
      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 h-12">
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="ai-insights" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Social
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Learning
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            Voice Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <PortfolioAnalyticsDashboard />
        </TabsContent>

        <TabsContent value="ai-insights">
          <AIInsightsDashboard />
        </TabsContent>

        <TabsContent value="social">
          <SocialGamificationHub />
        </TabsContent>

        <TabsContent value="learning">
          <LearningEducationCenter />
        </TabsContent>

        <TabsContent value="voice">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5" />
                Voice Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mic className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Voice Investment Assistant</h3>
                  <p className="text-gray-600 mb-6">Ask questions about your portfolio, market trends, or get investment advice</p>
                </div>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Start Voice Conversation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedDashboard;
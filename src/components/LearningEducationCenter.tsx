import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Award, Target, Play, CheckCircle, Clock, Brain } from 'lucide-react';
import { learningService, getLearningModules, startLearningSession, getLearningProgress } from '@/services/api/learningService';
import { toast } from 'sonner';

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

interface LearningProgress {
  totalModules: number;
  completedModules: number;
  totalPoints: number;
  level: number;
  certificates: any[];
}

const LearningEducationCenter = () => {
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [progress, setProgress] = useState<LearningProgress | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLearningData();
  }, [selectedCategory]);

  const fetchLearningData = async () => {
    try {
      setLoading(true);
      
      const [modulesData, progressData] = await Promise.all([
        getLearningModules({ 
          category: selectedCategory === 'all' ? undefined : selectedCategory,
          limit: 20 
        }),
        getLearningProgress()
      ]);

      setModules(modulesData.modules);
      setProgress(progressData);
    } catch (error) {
      console.error('Error fetching learning data:', error);
      toast.error('Failed to load learning content');
    } finally {
      setLoading(false);
    }
  };

  const handleStartModule = async (moduleId: string) => {
    try {
      const session = await startLearningSession(moduleId);
      toast.success('Learning session started!');
      
      // Navigate to learning session (you would implement this routing)
      // navigate(`/learning/session/${session.sessionId}`);
      
    } catch (error) {
      console.error('Error starting learning session:', error);
      toast.error('Failed to start learning session');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const categories = [
    { id: 'all', label: 'All Modules', icon: BookOpen },
    { id: 'basics', label: 'Investment Basics', icon: Target },
    { id: 'advanced', label: 'Advanced Strategies', icon: Brain },
    { id: 'tax', label: 'Tax Planning', icon: Award },
  ];

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
      {/* Progress Overview */}
      {progress && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{progress.completedModules}</div>
              <div className="text-sm text-muted-foreground">Modules Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{progress.totalPoints}</div>
              <div className="text-sm text-muted-foreground">Learning Points</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">Level {progress.level}</div>
              <div className="text-sm text-muted-foreground">Current Level</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{progress.certificates.length}</div>
              <div className="text-sm text-muted-foreground">Certificates</div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="modules">Learning Modules</TabsTrigger>
          <TabsTrigger value="progress">My Progress</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="modules">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Learning Modules
              </CardTitle>
              
              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {category.label}
                    </Button>
                  );
                })}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules.map((module) => (
                  <Card key={module.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <Badge className={getDifficultyColor(module.difficulty)}>
                          {module.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {module.duration}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold mb-2">{module.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {module.description}
                      </p>
                      
                      {module.progress > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-2" />
                        </div>
                      )}
                      
                      <Button
                        className="w-full"
                        onClick={() => handleStartModule(module.id)}
                        disabled={module.completed}
                        variant={module.completed ? "outline" : "default"}
                      >
                        {module.completed ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Completed
                          </>
                        ) : module.progress > 0 ? (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Continue
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start Learning
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              {progress && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-lg mb-2">Overall Progress</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span>Modules Completed</span>
                      <span className="font-bold">
                        {progress.completedModules} / {progress.totalModules}
                      </span>
                    </div>
                    <Progress 
                      value={(progress.completedModules / progress.totalModules) * 100} 
                      className="h-3 mb-4" 
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {progress.totalPoints}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Points Earned</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">
                          Level {progress.level}
                        </div>
                        <div className="text-sm text-muted-foreground">Current Level</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">Achievements</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">First Module Completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">5 Modules Milestone</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold text-yellow-800 mb-2">Next Goals</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">Complete Advanced Strategies</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">Earn Tax Planning Certificate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                My Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              {progress?.certificates.length === 0 ? (
                <div className="text-center py-8">
                  <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    No Certificates Yet
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Complete learning modules to earn certificates
                  </p>
                  <Button onClick={() => setSelectedCategory('basics')}>
                    Start Learning
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {progress?.certificates.map((certificate) => (
                    <div
                      key={certificate.id}
                      className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Award className="h-8 w-8 text-yellow-600" />
                        <div>
                          <h3 className="font-semibold">{certificate.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Earned on {new Date(certificate.earnedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        Download Certificate
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningEducationCenter;
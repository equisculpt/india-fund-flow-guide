import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Eye, ThumbsUp, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Question {
  id: string;
  title: string;
  content: string;
  category: string;
  expert_only: boolean;
  is_answered: boolean;
  views_count: number;
  upvotes_count: number;
  status: string;
  created_at: string;
  user_id: string;
  profiles?: {
    full_name: string;
  } | null;
  community_answers: Array<{
    id: string;
    is_expert_answer: boolean;
  }>;
}

const CommunityQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unanswered' | 'expert'>('all');
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      let query = supabase
        .from('community_questions')
        .select(`
          *,
          community_answers(id, is_expert_answer)
        `)
        .order('created_at', { ascending: false });

      if (filter === 'unanswered') {
        query = query.eq('is_answered', false);
      } else if (filter === 'expert') {
        query = query.eq('expert_only', true);
      }

      const { data: questionsData, error } = await query;

      if (error) throw error;

      // Fetch profiles separately
      const userIds = questionsData?.map(q => q.user_id) || [];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', userIds);

      // Combine data with profiles
      const questionsWithProfiles = (questionsData || []).map(question => ({
        ...question,
        profiles: profiles?.find(p => p.id === question.user_id) || null
      }));

      setQuestions(questionsWithProfiles);
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [filter]);

  const handleQuestionClick = (questionId: string) => {
    navigate(`/community/question/${questionId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Loading questions...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All Questions
        </Button>
        <Button
          variant={filter === 'unanswered' ? 'default' : 'outline'}
          onClick={() => setFilter('unanswered')}
        >
          Unanswered
        </Button>
        <Button
          variant={filter === 'expert' ? 'default' : 'outline'}
          onClick={() => setFilter('expert')}
        >
          Expert Only
        </Button>
      </div>

      <div className="space-y-4">
        {questions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No questions found. Be the first to ask!</p>
            </CardContent>
          </Card>
        ) : (
          questions.map((question) => (
            <Card 
              key={question.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleQuestionClick(question.id)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{question.title}</CardTitle>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {question.content.substring(0, 150)}...
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {question.is_answered && (
                      <Badge variant="secondary" className="text-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Answered
                      </Badge>
                    )}
                    {question.expert_only && (
                      <Badge variant="outline" className="text-blue-600">
                        Expert Only
                      </Badge>
                    )}
                    <Badge variant="outline">{question.category}</Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {question.views_count} views
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {question.community_answers.length} answers
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      {question.upvotes_count} upvotes
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Asked by {question.profiles?.full_name || 'Anonymous'}</span>
                    <span>{new Date(question.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityQuestions;

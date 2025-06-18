
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Question {
  id: string;
  title: string;
  content: string;
  category: string;
  expert_only: boolean;
  is_answered: boolean;
  status: string;
  created_at: string;
  user_id: string;
  profiles?: {
    full_name: string;
  } | null;
}

interface QuestionsTabProps {
  questions: Question[];
  onAnswerQuestion: (questionId: string) => void;
}

const QuestionsTab = ({ questions, onAnswerQuestion }: QuestionsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {questions.map((question) => (
            <div key={question.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{question.title}</h4>
                <div className="flex gap-2">
                  {!question.is_answered && (
                    <Badge variant="destructive">Unanswered</Badge>
                  )}
                  {question.expert_only && (
                    <Badge variant="outline">Expert Only</Badge>
                  )}
                  <Badge variant="secondary">{question.category}</Badge>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {question.content}
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  By {question.profiles?.full_name || 'Anonymous'} • {new Date(question.created_at).toLocaleDateString()}
                </span>
                <Button 
                  size="sm" 
                  onClick={() => onAnswerQuestion(question.id)}
                  variant={question.is_answered ? "outline" : "default"}
                >
                  {question.is_answered ? 'View' : 'Answer'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionsTab;

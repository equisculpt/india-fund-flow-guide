
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, BookOpen } from 'lucide-react';

interface CommunityNotificationsProps {
  newQuestionsCount: number;
  pendingBlogsCount: number;
}

const CommunityNotifications = ({ newQuestionsCount, pendingBlogsCount }: CommunityNotificationsProps) => {
  if (newQuestionsCount === 0 && pendingBlogsCount === 0) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {newQuestionsCount > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <span className="font-medium text-orange-800">
                {newQuestionsCount} unanswered question{newQuestionsCount > 1 ? 's' : ''}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
      
      {pendingBlogsCount > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-800">
                {pendingBlogsCount} blog post{pendingBlogsCount > 1 ? 's' : ''} pending review
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommunityNotifications;


import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, BookOpen, CheckCircle } from 'lucide-react';

interface CommunityTabNavigationProps {
  newQuestionsCount: number;
  pendingBlogsCount: number;
}

const CommunityTabNavigation = ({ newQuestionsCount, pendingBlogsCount }: CommunityTabNavigationProps) => {
  return (
    <TabsList className="grid w-full grid-cols-3">
      <TabsTrigger value="questions" className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4" />
        Questions
        {newQuestionsCount > 0 && (
          <Badge variant="destructive" className="ml-1">
            {newQuestionsCount}
          </Badge>
        )}
      </TabsTrigger>
      <TabsTrigger value="blogs" className="flex items-center gap-2">
        <BookOpen className="h-4 w-4" />
        Recent Blogs
      </TabsTrigger>
      <TabsTrigger value="moderation" className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4" />
        Blog Moderation
        {pendingBlogsCount > 0 && (
          <Badge variant="secondary" className="ml-1">
            {pendingBlogsCount}
          </Badge>
        )}
      </TabsTrigger>
    </TabsList>
  );
};

export default CommunityTabNavigation;


import React from 'react';
import { Eye, Users } from 'lucide-react';
import { useBlogViews } from '@/hooks/useBlogViews';

interface BlogViewCounterProps {
  blogSlug: string;
  className?: string;
  showUniqueViews?: boolean;
}

const BlogViewCounter = ({ blogSlug, className = '', showUniqueViews = false }: BlogViewCounterProps) => {
  const { viewCount, loading } = useBlogViews(blogSlug);

  if (loading) {
    return (
      <div className={`flex items-center gap-2 text-gray-500 ${className}`}>
        <Eye className="h-4 w-4" />
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  if (!viewCount) {
    return null;
  }

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className={`flex items-center gap-4 text-gray-600 ${className}`}>
      <div className="flex items-center gap-1">
        <Eye className="h-4 w-4" />
        <span className="text-sm font-medium">
          {formatCount(viewCount.total_views)} views
        </span>
      </div>
      {showUniqueViews && (
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span className="text-sm font-medium">
            {formatCount(viewCount.unique_views)} readers
          </span>
        </div>
      )}
    </div>
  );
};

export default BlogViewCounter;

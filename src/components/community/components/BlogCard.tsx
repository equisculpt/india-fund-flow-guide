
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, User, ArrowRight, Edit, BookOpen } from 'lucide-react';
import { CombinedBlog } from '../types/blogTypes';
import TranslatedText from '@/components/TranslatedText';

interface BlogCardProps {
  blog: CombinedBlog;
  onBlogClick: (blog: CombinedBlog) => void;
}

const BlogCard = ({ blog, onBlogClick }: BlogCardProps) => {
  const getDisplayTitle = () => {
    if (blog.type === 'static') {
      return blog.title;
    }
    return (blog as any).admin_edited_title || blog.title;
  };

  const getDisplayExcerpt = () => {
    if (blog.type === 'static') {
      return blog.excerpt;
    }
    return blog.excerpt || ((blog as any).admin_edited_content || (blog as any).content).substring(0, 120) + '...';
  };

  const getDisplayAuthor = () => {
    if (blog.type === 'static') {
      return (blog as any).author;
    }
    return (blog as any).profiles?.full_name || 'Anonymous';
  };

  const getDisplayViews = () => {
    if (blog.type === 'static') {
      return '1.2k';
    }
    return (blog as any).views_count;
  };

  const getDisplayDate = () => {
    if (blog.type === 'static') {
      return new Date(blog.published_at).toLocaleDateString();
    }
    return new Date(blog.published_at || (blog as any).created_at).toLocaleDateString();
  };

  const getFeaturedImage = () => {
    return blog.featured_image_url || (blog as any).featured_image_url;
  };

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onBlogClick(blog)}
    >
      {getFeaturedImage() && (
        <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
          <img 
            src={getFeaturedImage()} 
            alt={getDisplayTitle()}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline"><TranslatedText text={blog.category} /></Badge>
            {blog.type === 'static' && (
              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                <BookOpen className="h-3 w-3 mr-1" />
                <TranslatedText text="Editorial" />
              </Badge>
            )}
          </div>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {getDisplayViews()}
          </span>
        </div>
        <CardTitle className="text-lg line-clamp-2">
          <TranslatedText text={getDisplayTitle()} />
          {blog.type === 'dynamic' && (blog as any).edited_by_admin && (
            <span className="ml-2 inline-flex items-center">
              <Edit className="h-3 w-3 text-blue-500" />
            </span>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          <TranslatedText text={getDisplayExcerpt()} />
        </p>
        
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                <TranslatedText text={tag} />
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <User className="h-3 w-3" />
            <span><TranslatedText text={getDisplayAuthor()} /></span>
            {blog.type === 'dynamic' && (blog as any).edited_by_admin && (
              <Badge variant="outline" className="text-xs bg-blue-50">
                <TranslatedText text="Edited by SIPBrewery" />
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{getDisplayDate()}</span>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-3 flex items-center gap-2"
        >
          <TranslatedText text="Read More" /> <ArrowRight className="h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogCard;

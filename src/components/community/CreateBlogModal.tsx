import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MinusCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from 'sonner';

interface CreateBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateBlogModal = ({ isOpen, onClose }: CreateBlogModalProps) => {
  const { user } = useSupabaseAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'market-analysis', label: 'Market Analysis' },
    { value: 'investment-tips', label: 'Investment Tips' },
    { value: 'fund-reviews', label: 'Fund Reviews' },
    { value: 'news', label: 'News & Updates' },
    { value: 'beginner-guide', label: 'Beginner Guide' }
  ];

  const handleAddTag = () => {
    if (tag.trim() && !tags.includes(tag.trim()) && tags.length < 5) {
      setTags([...tags, tag.trim()]);
      setTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!title || !content || !category) {
      toast.error('Please fill out all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.from('blog_posts').insert({
        title,
        content,
        excerpt: excerpt || content.substring(0, 150) + '...',
        category,
        featured_image_url: imageUrl,
        author_id: user?.id,
        tags,
        status: 'draft',
        moderation_status: 'pending',
      });

      if (error) throw error;

      toast.success('Blog post submitted for review!');
      setTitle('');
      setContent('');
      setExcerpt('');
      setCategory('');
      setImageUrl('');
      setTags([]);
      onClose();
    } catch (error) {
      console.error('Error submitting blog post:', error);
      toast.error('Failed to submit blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Write a New Blog Post</DialogTitle>
        </DialogHeader>

        <div className="bg-yellow-50 border-yellow-200 border p-3 rounded-md mb-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-800 font-medium">Moderation Notice</p>
              <p className="text-xs text-yellow-700">
                Your blog post will be reviewed by moderators before publishing. If needed, 
                moderators may edit your post for clarity or grammar while preserving your ideas. 
                Edited posts will be marked with "Edited by SIPBrewery.com".
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-base font-medium">
              Blog Title <span className="text-red-500">*</span>
            </Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter a catchy title"
            />
          </div>

          <div>
            <Label htmlFor="content" className="text-base font-medium">
              Blog Content <span className="text-red-500">*</span>
            </Label>
            <Textarea 
              id="content" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder="Write your blog content here..."
              className="min-h-[200px]"
            />
          </div>

          <div>
            <Label htmlFor="excerpt" className="text-base font-medium">
              Short Excerpt
            </Label>
            <Textarea 
              id="excerpt" 
              value={excerpt} 
              onChange={(e) => setExcerpt(e.target.value)} 
              placeholder="A brief summary of your blog (optional)"
              className="h-20"
            />
            <p className="text-xs text-gray-500 mt-1">If left empty, the first 150 characters of your content will be used</p>
          </div>

          <div>
            <Label htmlFor="category" className="text-base font-medium">
              Category <span className="text-red-500">*</span>
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="imageUrl" className="text-base font-medium">
              Featured Image URL
            </Label>
            <Input 
              id="imageUrl" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
              placeholder="https://example.com/image.jpg (optional)"
            />
          </div>

          <div>
            <Label htmlFor="tags" className="text-base font-medium">
              Tags
            </Label>
            <div className="flex gap-2">
              <Input 
                id="tags" 
                value={tag} 
                onChange={(e) => setTag(e.target.value)} 
                placeholder="Add a tag (optional)"
              />
              <Button 
                type="button" 
                onClick={handleAddTag} 
                variant="outline"
                disabled={!tag.trim() || tags.length >= 5}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((t) => (
                  <Badge key={t} variant="secondary" className="pl-2 pr-1 py-1">
                    {t}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => handleRemoveTag(t)}
                    >
                      <MinusCircle className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">Add up to 5 tags to help categorize your post</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit for Review'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlogModal;

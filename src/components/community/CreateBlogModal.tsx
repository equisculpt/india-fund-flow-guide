
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseAuthContext } from '@/contexts/SupabaseAuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from 'sonner';

interface CreateBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateBlogModal = ({ isOpen, onClose }: CreateBlogModalProps) => {
  const { user } = useSupabaseAuthContext();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('general');
  const [tags, setTags] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [publishNow, setPublishNow] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    { value: 'market-analysis', label: 'Market Analysis' },
    { value: 'investment-tips', label: 'Investment Tips' },
    { value: 'fund-reviews', label: 'Fund Reviews' },
    { value: 'news', label: 'News & Updates' },
    { value: 'beginner-guide', label: 'Beginner Guide' },
    { value: 'general', label: 'General' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to create a blog post');
      return;
    }

    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
      
      const { error } = await supabase
        .from('blog_posts')
        .insert({
          author_id: user.id,
          title: title.trim(),
          content: content.trim(),
          excerpt: excerpt.trim() || content.substring(0, 200) + '...',
          category,
          tags: tagsArray,
          featured_image_url: featuredImage.trim() || null,
          status: publishNow ? 'published' : 'draft',
          published_at: publishNow ? new Date().toISOString() : null
        });

      if (error) throw error;

      toast.success(publishNow ? 'Blog post published successfully!' : 'Blog post saved as draft!');
      setTitle('');
      setContent('');
      setExcerpt('');
      setCategory('general');
      setTags('');
      setFeaturedImage('');
      setPublishNow(false);
      onClose();
    } catch (error) {
      console.error('Error creating blog post:', error);
      toast.error('Failed to create blog post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Blog Post</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Blog Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="SIP, mutual funds, investment..."
              />
            </div>
          </div>

          <div>
            <Label htmlFor="featured-image">Featured Image URL (optional)</Label>
            <Input
              id="featured-image"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt (optional)</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short description of your blog post..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              rows={12}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="publish-now"
              checked={publishNow}
              onCheckedChange={setPublishNow}
            />
            <Label htmlFor="publish-now">
              Publish immediately (otherwise save as draft)
            </Label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : (publishNow ? 'Publish' : 'Save Draft')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlogModal;

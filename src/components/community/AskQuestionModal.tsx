
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
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

interface AskQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AskQuestionModal = ({ isOpen, onClose }: AskQuestionModalProps) => {
  const { user } = useSupabaseAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [expertOnly, setExpertOnly] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    { value: 'general', label: 'General Investment' },
    { value: 'sip', label: 'SIP Investment' },
    { value: 'mutual-funds', label: 'Mutual Funds' },
    { value: 'tax-planning', label: 'Tax Planning' },
    { value: 'portfolio', label: 'Portfolio Management' },
    { value: 'market-analysis', label: 'Market Analysis' },
    { value: 'insurance', label: 'Insurance' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to ask a question');
      return;
    }

    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('community_questions')
        .insert({
          user_id: user.id,
          title: title.trim(),
          content: content.trim(),
          category,
          expert_only: expertOnly
        });

      if (error) throw error;

      toast.success('Question posted successfully!');
      setTitle('');
      setContent('');
      setCategory('general');
      setExpertOnly(false);
      onClose();
    } catch (error) {
      console.error('Error posting question:', error);
      toast.error('Failed to post question. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ask a Question</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Question Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What would you like to know?"
              required
            />
          </div>

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
            <Label htmlFor="content">Question Details *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide more details about your question..."
              rows={6}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="expert-only"
              checked={expertOnly}
              onCheckedChange={setExpertOnly}
            />
            <Label htmlFor="expert-only">
              Expert answers only (only verified experts can answer)
            </Label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Posting...' : 'Post Question'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AskQuestionModal;

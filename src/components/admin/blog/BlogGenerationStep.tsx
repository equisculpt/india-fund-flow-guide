
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface BlogGenerationStepProps {
  requirements: string;
  setRequirements: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const BlogGenerationStep = ({ 
  requirements, 
  setRequirements, 
  onGenerate, 
  isGenerating 
}: BlogGenerationStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Blog Requirements</h3>
      <Textarea
        placeholder="Describe what kind of blog you want to generate. Include tone, target audience, key points to cover, style preferences, etc."
        value={requirements}
        onChange={(e) => setRequirements(e.target.value)}
        rows={6}
      />
      <Button 
        onClick={onGenerate}
        disabled={isGenerating || !requirements.trim()}
        className="w-full"
      >
        {isGenerating ? 'Generating Blog...' : 'Generate Blog with AI'}
      </Button>
    </div>
  );
};

export default BlogGenerationStep;

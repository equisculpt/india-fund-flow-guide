
import { Button } from '@/components/ui/button';

interface BlogStepNavigationProps {
  currentStep: 'upload' | 'generate' | 'edit' | 'preview';
  uploadedFiles: any[];
  generatedBlog: any;
  onStepChange: (step: 'upload' | 'generate' | 'edit' | 'preview') => void;
}

const BlogStepNavigation = ({ 
  currentStep, 
  uploadedFiles, 
  generatedBlog, 
  onStepChange 
}: BlogStepNavigationProps) => {
  return (
    <div className="flex gap-2 mb-6">
      <Button 
        variant={currentStep === 'upload' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onStepChange('upload')}
      >
        1. Upload Files
      </Button>
      <Button 
        variant={currentStep === 'generate' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onStepChange('generate')}
        disabled={uploadedFiles.length === 0}
      >
        2. Generate
      </Button>
      <Button 
        variant={currentStep === 'edit' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onStepChange('edit')}
        disabled={!generatedBlog}
      >
        3. Edit & Chat
      </Button>
      <Button 
        variant={currentStep === 'preview' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onStepChange('preview')}
        disabled={!generatedBlog}
      >
        4. Preview & Publish
      </Button>
    </div>
  );
};

export default BlogStepNavigation;


import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GeneratedBlog {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  slug: string;
}

interface BlogPreviewStepProps {
  generatedBlog: GeneratedBlog;
  onBackToEdit: () => void;
  onPublish: () => void;
  isPublishing: boolean;
}

const BlogPreviewStep = ({ 
  generatedBlog, 
  onBackToEdit, 
  onPublish, 
  isPublishing 
}: BlogPreviewStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Final Preview</h3>
      <div className="border rounded-lg p-6 bg-white">
        <h1 className="text-3xl font-bold mb-4">{generatedBlog.title}</h1>
        <p className="text-lg text-gray-600 mb-6 italic">{generatedBlog.excerpt}</p>
        <div className="prose prose-lg max-w-none">
          {generatedBlog.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 pt-4 border-t">
          <p className="text-sm text-gray-500">
            Tags: {generatedBlog.tags.join(', ')}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Slug: {generatedBlog.slug}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <Button onClick={onBackToEdit} variant="outline" className="flex-1">
          <Eye className="w-4 h-4 mr-2" />
          Back to Edit
        </Button>
        <Button onClick={onPublish} disabled={isPublishing} className="flex-1">
          {isPublishing ? 'Publishing...' : 'Publish Blog'}
        </Button>
      </div>
    </div>
  );
};

export default BlogPreviewStep;

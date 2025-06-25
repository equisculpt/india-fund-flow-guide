
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlogHeroHeader from './preview/BlogHeroHeader';
import IPOQuickSummary from './preview/IPOQuickSummary';
import BlogContentFormatter from './preview/BlogContentFormatter';
import IPOTimelineTable from './preview/IPOTimelineTable';
import FinancialChartsSection from './preview/FinancialChartsSection';
import InvestmentHighlights from './preview/InvestmentHighlights';
import ComplianceDisclaimer from './preview/ComplianceDisclaimer';
import BlogMetadata from './preview/BlogMetadata';

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
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <span className="text-2xl">📄</span>
        Final Blog Preview
      </h3>
      
      <div className="border rounded-lg bg-white shadow-lg overflow-hidden">
        <BlogHeroHeader title={generatedBlog.title} excerpt={generatedBlog.excerpt} />
        
        <div className="p-8 max-w-4xl mx-auto">
          <IPOQuickSummary />
          <BlogContentFormatter content={generatedBlog.content} />
          <IPOTimelineTable />
          <FinancialChartsSection />
          <InvestmentHighlights />
          <ComplianceDisclaimer />
          <BlogMetadata tags={generatedBlog.tags} slug={generatedBlog.slug} />
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={onBackToEdit} variant="outline" className="flex-1">
          <Eye className="w-4 h-4 mr-2" />
          Back to Edit
        </Button>
        <Button onClick={onPublish} disabled={isPublishing} className="flex-1 bg-green-600 hover:bg-green-700">
          {isPublishing ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Publishing...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-lg">🚀</span>
              Publish Blog
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BlogPreviewStep;

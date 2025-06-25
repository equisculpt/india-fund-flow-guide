
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  // Parse content to create structured sections
  const formatContent = (content: string) => {
    const sections = content.split('\n\n');
    return sections.map((section, index) => {
      if (section.startsWith('**') && section.endsWith('**')) {
        return (
          <h2 key={index} className="text-2xl font-bold mb-4 text-blue-900">
            {section.replace(/\*\*/g, '')}
          </h2>
        );
      } else if (section.startsWith('*') && section.includes(':')) {
        // Handle bullet points or key dates
        const lines = section.split('\n');
        return (
          <div key={index} className="mb-6">
            <ul className="space-y-2">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex} className="text-gray-700">
                  {line.replace(/^\*\s*/, '• ')}
                </li>
              ))}
            </ul>
          </div>
        );
      } else if (section.includes('₹') && section.includes('crore')) {
        // Handle financial data - create a simple table
        return (
          <div key={index} className="mb-6">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <p className="text-gray-800 font-medium">{section}</p>
              </CardContent>
            </Card>
          </div>
        );
      } else {
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-4">
            {section}
          </p>
        );
      }
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Final Preview</h3>
      
      {/* Blog Preview in Beautiful Format */}
      <div className="border rounded-lg bg-white shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
          <h1 className="text-3xl font-bold mb-3">{generatedBlog.title}</h1>
          <p className="text-blue-100 text-lg italic">{generatedBlog.excerpt}</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            {formatContent(generatedBlog.content)}
          </div>

          {/* Key Highlights Section */}
          <Card className="mt-8 bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                💡 Key Investment Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Positive Factors</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Growing agricultural sector</li>
                    <li>• Competitive pricing in IPO</li>
                    <li>• Strategic market positioning</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">⚠️ Risk Factors</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Market volatility risks</li>
                    <li>• Regulatory changes</li>
                    <li>• Competition in sector</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* IPO Timeline Table */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>📅 IPO Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Event</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">IPO Opens</td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">June 26, 2025</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">IPO Closes</td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-red-600">June 30, 2025</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Allotment</td>
                      <td className="border border-gray-300 px-4 py-2">July 1, 2025</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Listing</td>
                      <td className="border border-gray-300 px-4 py-2">July 3, 2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Financial Summary */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>💰 Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">₹200 Cr</div>
                  <div className="text-sm text-blue-700">Total Issue Size</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">₹105-111</div>
                  <div className="text-sm text-green-700">Price Band</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">135</div>
                  <div className="text-sm text-purple-700">Lot Size</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">₹14,985</div>
                  <div className="text-sm text-orange-700">Min Investment</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Disclaimer */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border-l-4 border-gray-400">
            <h4 className="font-semibold text-gray-800 mb-2">⚖️ Important Disclaimer</h4>
            <p className="text-sm text-gray-600">
              This blog post is for informational purposes only and does not constitute investment advice. 
              SIP Brewery and Equisculpt Venture are not registered investment advisors with SEBI. 
              Investing in IPOs carries significant risk, and you could lose some or all of your investment. 
              Always conduct thorough research and consult with a registered financial advisor before making any investment decisions.
            </p>
          </div>

          {/* Tags */}
          <div className="mt-8 pt-4 border-t">
            <p className="text-sm text-gray-500 mb-2">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {generatedBlog.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Slug: <code className="bg-gray-100 px-2 py-1 rounded">{generatedBlog.slug}</code>
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
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

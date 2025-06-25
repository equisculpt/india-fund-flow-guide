
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

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
  // Parse content and create structured sections with rich formatting
  const parseAndFormatContent = (content: string) => {
    const sections = content.split('\n\n');
    const parsedSections: JSX.Element[] = [];
    
    sections.forEach((section, index) => {
      const trimmedSection = section.trim();
      if (!trimmedSection) return;

      // Handle main headings (wrapped in **)
      if (trimmedSection.startsWith('**') && trimmedSection.endsWith('**')) {
        const headingText = trimmedSection.replace(/\*\*/g, '');
        parsedSections.push(
          <h2 key={`heading-${index}`} className="text-2xl font-bold mb-6 text-blue-900 border-b border-blue-200 pb-2">
            {headingText}
          </h2>
        );
        return;
      }

      // Handle bullet points (lines starting with *)
      if (trimmedSection.includes('*') && trimmedSection.includes('\n')) {
        const lines = trimmedSection.split('\n');
        const bulletItems = lines
          .filter(line => line.trim().startsWith('*'))
          .map(line => line.replace(/^\s*\*\s*/, '').trim());
        
        if (bulletItems.length > 0) {
          parsedSections.push(
            <ul key={`bullets-${index}`} className="mb-6 space-y-2">
              {bulletItems.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          );
          return;
        }
      }

      // Handle financial data (contains ₹ and numbers)
      if (trimmedSection.includes('₹') && /\d/.test(trimmedSection)) {
        parsedSections.push(
          <Card key={`financial-${index}`} className="mb-6 bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">💰</span>
                <h4 className="font-semibold text-green-800">Financial Highlight</h4>
              </div>
              <p className="text-green-700 font-medium">{trimmedSection}</p>
            </CardContent>
          </Card>
        );
        return;
      }

      // Handle regular paragraphs
      parsedSections.push(
        <p key={`para-${index}`} className="text-gray-700 leading-relaxed mb-4 text-justify">
          {trimmedSection}
        </p>
      );
    });

    return parsedSections;
  };

  // Sample financial data for charts
  const financialData = [
    { metric: 'Revenue', value: 200, year: '2023' },
    { metric: 'Growth', value: 15, year: '2023' },
    { metric: 'Market Share', value: 8, year: '2023' },
  ];

  const performanceData = [
    { quarter: 'Q1', performance: 12 },
    { quarter: 'Q2', performance: 15 },
    { quarter: 'Q3', performance: 18 },
    { quarter: 'Q4', performance: 22 },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <span className="text-2xl">📄</span>
        Final Blog Preview
      </h3>
      
      {/* Blog Preview with Rich Formatting */}
      <div className="border rounded-lg bg-white shadow-lg overflow-hidden">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 leading-tight">{generatedBlog.title}</h1>
            <p className="text-blue-100 text-xl italic leading-relaxed">{generatedBlog.excerpt}</p>
            <div className="flex items-center gap-4 mt-6 text-blue-200">
              <span className="flex items-center gap-1">
                <span>📅</span>
                {new Date().toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span className="flex items-center gap-1">
                <span>👤</span>
                SIP Brewery Research Team
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 max-w-4xl mx-auto">
          {/* Quick Summary Box */}
          <Card className="mb-8 bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <span className="text-2xl">⚡</span>
                Quick Investment Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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

          {/* Main Content with Rich Formatting */}
          <div className="prose prose-lg max-w-none mb-8">
            {parseAndFormatContent(generatedBlog.content)}
          </div>

          {/* IPO Timeline Table */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📅</span>
                IPO Timeline & Key Dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead className="font-semibold">Event</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">IPO Opens</TableCell>
                    <TableCell className="font-semibold text-green-600">June 26, 2025</TableCell>
                    <TableCell><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Upcoming</span></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">IPO Closes</TableCell>
                    <TableCell className="font-semibold text-red-600">June 30, 2025</TableCell>
                    <TableCell><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Pending</span></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Basis of Allotment</TableCell>
                    <TableCell>July 1, 2025</TableCell>
                    <TableCell><span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Scheduled</span></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Listing Date</TableCell>
                    <TableCell>July 3, 2025</TableCell>
                    <TableCell><span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Scheduled</span></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Financial Performance Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Expected Performance Trajectory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{
                performance: { label: "Performance %", color: "#3b82f6" }
              }} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="performance" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Investment Highlights */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <span className="text-2xl">✅</span>
                  Investment Positives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="text-green-700">Growing agricultural market in India</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="text-green-700">Strong management team with proven track record</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="text-green-700">Competitive pricing in the IPO band</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="text-green-700">Focus on sustainable farming solutions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <span className="text-2xl">⚠️</span>
                  Risk Considerations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span className="text-red-700">Dependence on monsoon and weather conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span className="text-red-700">Regulatory changes in agricultural sector</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span className="text-red-700">High competition from established players</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span className="text-red-700">Market volatility in commodity prices</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Key Metrics Bar Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📈</span>
                Key Financial Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{
                value: { label: "Value", color: "#10b981" }
              }} className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Compliance Disclaimer */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border-l-4 border-gray-400">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-xl">⚖️</span>
              Important Legal Disclaimer
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              This blog post is for informational purposes only and does not constitute investment advice. 
              SIP Brewery and Equisculpt Venture are not registered investment advisors with SEBI. 
              Investing in IPOs carries significant risk, including the potential loss of your entire investment. 
              Past performance does not guarantee future results. Always conduct thorough research, read the 
              complete prospectus, and consult with a registered financial advisor before making any investment decisions.
            </p>
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3 font-medium">Tags:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {generatedBlog.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              URL Slug: <code className="bg-gray-100 px-2 py-1 rounded font-mono text-xs">{generatedBlog.slug}</code>
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

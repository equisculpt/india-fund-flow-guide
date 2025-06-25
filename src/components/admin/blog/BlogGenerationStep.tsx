
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  const [selectedTemplate, setSelectedTemplate] = useState<string>('ipo-analysis');

  const templates = [
    {
      id: 'ipo-analysis',
      name: 'IPO Analysis Blog',
      description: 'Comprehensive IPO analysis with financial data, SWOT, timeline, and investment considerations',
      prompt: `Create a comprehensive IPO analysis blog post that includes:
- Company overview and business model
- Financial performance analysis with key metrics
- IPO details (timeline, pricing, lot size)
- SWOT analysis
- Industry landscape and competitive positioning
- Investment considerations and risks
- Key highlights and actionable insights
- Compliance disclaimers

Format with clear headings, bullet points, and financial data presentation.`
    },
    {
      id: 'sector-analysis',
      name: 'Sector Deep Dive',
      description: 'In-depth sector analysis with market trends, key players, and investment themes',
      prompt: `Create a detailed sector analysis blog post covering:
- Sector overview and market size
- Key growth drivers and trends
- Major players and competitive landscape
- Financial performance metrics
- Investment opportunities and themes
- Regulatory environment
- Future outlook and projections
- Risk factors and challenges

Include data-rich content with charts and tables where relevant.`
    },
    {
      id: 'fund-analysis',
      name: 'Mutual Fund Analysis',
      description: 'Detailed mutual fund review with performance metrics and recommendations',
      prompt: `Create a comprehensive mutual fund analysis including:
- Fund overview and investment objective
- Portfolio composition and top holdings
- Performance analysis with benchmarking
- Risk metrics and volatility analysis
- Fund manager profile and track record
- Expense ratios and fee structure
- Investment rationale and suitability
- Comparison with peers

Present data in an easy-to-understand format with visual elements.`
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setRequirements(template.prompt + '\n\n' + requirements);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Blog Template</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {templates.map((template) => (
            <Card 
              key={template.id}
              className={`cursor-pointer transition-all ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{template.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{template.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Additional Requirements</h3>
        <Textarea
          placeholder="Add any specific requirements, target audience details, tone preferences, or special focus areas for your blog..."
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          rows={8}
          className="min-h-[200px]"
        />
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Tips for Better Results</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Specify your target audience (retail investors, institutions, etc.)</li>
            <li>• Mention preferred tone (professional, accessible, technical)</li>
            <li>• Include any specific data points or metrics to highlight</li>
            <li>• Request specific sections like charts, tables, or comparisons</li>
            <li>• Add compliance requirements or disclaimers needed</li>
          </ul>
        </div>
      </div>

      <Button 
        onClick={onGenerate}
        disabled={isGenerating || !requirements.trim()}
        className="w-full h-12 text-lg"
      >
        {isGenerating ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Generating Blog with AI...
          </div>
        ) : (
          'Generate Blog with AI'
        )}
      </Button>
    </div>
  );
};

export default BlogGenerationStep;

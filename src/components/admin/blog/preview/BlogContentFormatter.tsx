
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface BlogContentFormatterProps {
  content: string;
}

const BlogContentFormatter = ({ content }: BlogContentFormatterProps) => {
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

  return (
    <div className="prose prose-lg max-w-none mb-8">
      {parseAndFormatContent(content)}
    </div>
  );
};

export default BlogContentFormatter;

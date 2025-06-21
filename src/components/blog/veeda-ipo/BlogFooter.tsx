
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogFooter = () => {
  return (
    <>
      {/* Footer Section */}
      <div className="text-center bg-gray-50 p-8 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">💬 Join the Discussion</h3>
        <p className="text-gray-600 mb-4">
          What do you think about India's role in the global clinical trial ecosystem? 
          Have questions about IPO analysis or other healthcare investments?
        </p>
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 font-medium">
            <strong>Important Reminder:</strong> Always consult with SEBI-registered financial advisors before making investment decisions. 
            This content is for educational purposes only and not personalized investment advice.
          </AlertDescription>
        </Alert>
      </div>

      {/* Related Articles */}
      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">🧠 Suggested Reading</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <Link to="/blog/ipo-analysis-guide" className="bg-white p-4 rounded border hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-blue-600 mb-2 hover:text-blue-800">📊 IPO Analysis Guide</h4>
            <p className="text-gray-600">Understanding key metrics for IPO evaluation with professional techniques</p>
          </Link>
          
          <Link to="/blog/healthcare-sector-outlook" className="bg-white p-4 rounded border hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-blue-600 mb-2 hover:text-blue-800">🏥 Healthcare Sector Outlook</h4>
            <p className="text-gray-600">India's healthcare investment themes and growth opportunities for 2025</p>
          </Link>
          
          <Link to="/blog/sebi-guidelines" className="bg-white p-4 rounded border hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-blue-600 mb-2 hover:text-blue-800">⚖️ SEBI Guidelines</h4>
            <p className="text-gray-600">Understanding IPO eligibility norms and investor protection measures</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogFooter;

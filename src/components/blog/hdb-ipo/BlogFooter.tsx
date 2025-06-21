
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogFooter = () => {
  return (
    <>
      {/* Final Investment Considerations */}
      <div className="text-center bg-gradient-to-r from-gray-50 to-blue-50 p-8 rounded-lg mb-8">
        <h3 className="text-2xl font-semibold mb-4">🏁 Final Investment Reflections</h3>
        <p className="text-gray-700 mb-6 max-w-4xl mx-auto leading-relaxed">
          HDB Financial Services IPO represents a landmark opportunity in India's NBFC sector, combining 
          deep market presence, strong parentage, and compelling growth prospects. The company's recovery 
          post-pandemic, diversified business model, and HDFC Bank backing create a strong investment case. 
          However, sectoral risks, competitive pressures, and the nature of OFS-heavy structure require 
          careful evaluation.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">Strong</div>
            <div className="text-sm text-green-700">Fundamentals & Recovery</div>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">Diversified</div>
            <div className="text-sm text-blue-700">Business Model</div>
          </div>
          <div className="p-4 bg-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">Growth</div>
            <div className="text-sm text-purple-700">Market Opportunity</div>
          </div>
        </div>
        
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 font-medium">
            <strong>Investment Reminder:</strong> This analysis is for educational purposes only. 
            Always read the RHP, consult SEBI-registered advisors, and invest with a long-term perspective. 
            Past performance doesn't guarantee future results.
          </AlertDescription>
        </Alert>
      </div>

      {/* Related Articles */}
      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">📚 Continue Learning</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <Link to="/blog/ipo-analysis-guide" className="bg-white p-4 rounded border hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-blue-600 mb-2 hover:text-blue-800">📊 IPO Analysis Framework</h4>
            <p className="text-gray-600">Master the art of IPO evaluation with professional analysis techniques</p>
          </Link>
          
          <Link to="/blog/nbfc-sector-outlook" className="bg-white p-4 rounded border hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-blue-600 mb-2 hover:text-blue-800">🏦 NBFC Sector Deep Dive</h4>
            <p className="text-gray-600">Understanding India's non-banking financial sector opportunities</p>
          </Link>
          
          <Link to="/blog/sebi-guidelines" className="bg-white p-4 rounded border hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-blue-600 mb-2 hover:text-blue-800">⚖️ SEBI Investment Guidelines</h4>
            <p className="text-gray-600">Know your rights and regulations for safe IPO investing</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogFooter;

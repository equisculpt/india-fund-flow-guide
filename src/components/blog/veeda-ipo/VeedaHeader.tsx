
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BlogViewCounter from '@/components/blog/BlogViewCounter';

const VeedaHeader = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/community', { state: { tab: 'blogs' } });
  };

  return (
    <>
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={handleBackClick}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blogs
        </button>
      </div>

      {/* Header Section */}
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-purple-600 text-white px-4 py-2">IPO Analysis • CRO Sector</Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          🧬 Veeda Clinical Research IPO: Complete Analysis & Investment Guide (2025)
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-4xl mx-auto">
          In-depth review of India's leading CRO company - Financial performance, growth prospects, risks & investment recommendation
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-4">
          <span>⏱ Estimated Read Time: 25-30 minutes</span>
          <span>📍 Category: IPO Analysis | Healthcare CRO</span>
          <span>🗓 Updated: {new Date().toLocaleDateString()}</span>
        </div>
        <BlogViewCounter blogSlug="veeda-clinical-research-ipo-analysis" className="justify-center" showUniqueViews />
      </div>
    </>
  );
};

export default VeedaHeader;

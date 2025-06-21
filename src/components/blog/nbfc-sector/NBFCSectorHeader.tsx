
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BlogViewCounter from '@/components/blog/BlogViewCounter';

const NBFCSectorHeader = () => {
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
        <Badge className="mb-4 bg-green-600 text-white px-4 py-2">Sector Analysis • NBFC Deep Dive</Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          🏦 NBFC Sector Deep Dive: Complete Investment Analysis & Future Outlook (2025)
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-4xl mx-auto">
          Comprehensive analysis of India's NBFC sector - Market dynamics, key players, growth drivers, risks & investment strategies
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-4">
          <span>⏱ Estimated Read Time: 45-50 minutes</span>
          <span>📍 Category: Sector Analysis | Financial Services</span>
          <span>🗓 Updated: {new Date().toLocaleDateString()}</span>
        </div>
        <BlogViewCounter blogSlug="nbfc-sector-analysis-india-2025" className="justify-center" showUniqueViews />
      </div>
    </>
  );
};

export default NBFCSectorHeader;

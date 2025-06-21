
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HDBHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      {/* Header Section */}
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-blue-600 text-white px-4 py-2">IPO Analysis</Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          🏦 HDB Financial Services IPO: The Ultimate Deep Dive Analysis
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-4xl mx-auto">
          Comprehensive Review of India's Largest NBFC IPO - Strengths, Risks, Numbers, and Growth Story
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <span>⏱ Estimated Read Time: 30-40 minutes</span>
          <span>📍 Category: IPO Tracker | NBFC Sector</span>
          <span>🗓 Published: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </>
  );
};

export default HDBHeader;

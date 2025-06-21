
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Calendar, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BlogViewCounter from '../BlogViewCounter';

const NBFCSectorHeader = () => {
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
        <Badge className="mb-4 bg-blue-600 text-white px-4 py-2">Sector Analysis</Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          🏦 India's NBFC Sector: The Complete Deep Dive Analysis 2025
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
          Comprehensive analysis of India's Non-Banking Financial Companies sector - from regulatory changes 
          to investment opportunities, growth drivers, and future outlook
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>40-45 min read</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Sector Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Live View Counter */}
        <div className="flex justify-center mb-8">
          <BlogViewCounter 
            blogSlug="nbfc-sector-analysis-india-2025" 
            showUniqueViews={true}
            className="bg-white px-4 py-2 rounded-lg shadow-sm"
          />
        </div>

        {/* Key Stats Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">₹27.9 Lakh Cr</div>
            <div className="text-sm text-gray-600">Total AUM (FY24)</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">15.2%</div>
            <div className="text-sm text-gray-600">CAGR Growth</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">9,500+</div>
            <div className="text-sm text-gray-600">Registered NBFCs</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">400+</div>
            <div className="text-sm text-gray-600">Systemically Important</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NBFCSectorHeader;

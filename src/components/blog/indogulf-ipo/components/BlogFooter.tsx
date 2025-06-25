
import React from 'react';

const BlogFooter = () => {
  return (
    <div className="border-t border-gray-200 pt-8">
      <p className="text-sm text-gray-500 mb-3 font-medium">Related Topics:</p>
      <div className="flex flex-wrap gap-3 mb-6">
        {['IPO Analysis 2025', 'Indogulf Cropsciences', 'Agrochemicals', 'Mainboard IPO', 'Export Business', 'Crop Protection', 'Investment Guide', 'China+1 Strategy', 'Technical Manufacturing', 'Agricultural Sector'].map((tag, index) => (
          <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer">
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>
          <span className="font-medium">Published:</span> June 25, 2025 | 
          <span className="font-medium ml-2">Updated:</span> {new Date().toLocaleDateString('en-IN')}
        </div>
        <div>
          <span className="font-medium">Reading Time:</span> 45 minutes
        </div>
      </div>
    </div>
  );
};

export default BlogFooter;


import React from 'react';

interface BlogHeroHeaderProps {
  title: string;
  excerpt: string;
}

const BlogHeroHeader = ({ title, excerpt }: BlogHeroHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 leading-tight">{title}</h1>
        <p className="text-blue-100 text-xl italic leading-relaxed">{excerpt}</p>
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
  );
};

export default BlogHeroHeader;


import React from 'react';

interface NBFCSectorBlogLayoutProps {
  children: React.ReactNode;
}

const NBFCSectorBlogLayout = ({ children }: NBFCSectorBlogLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {children}
      </div>
    </div>
  );
};

export default NBFCSectorBlogLayout;

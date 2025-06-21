
import React from 'react';

interface VeedaBlogLayoutProps {
  children: React.ReactNode;
}

const VeedaBlogLayout = ({ children }: VeedaBlogLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {children}
      </div>
    </div>
  );
};

export default VeedaBlogLayout;


import React from 'react';
import Layout from '@/components/Layout';

const IndogulfCropsciencesIPOBlogPage = () => {
  // Only render Indogulf-specific content if we're on the exact Indogulf page
  const isIndogulfPage = typeof window !== 'undefined' && window.location.pathname === '/blog/indogulf-cropsciences-ipo-complete-analysis-2024';

  console.log('📄 INDOGULF PAGE V10 - STRICT PATH CHECK:', {
    component: 'IndogulfCropsciencesIPOBlogPage',
    currentPath: typeof window !== 'undefined' ? window.location.pathname : 'SSR',
    isIndogulfPage,
    renderingBlog: isIndogulfPage,
    timestamp: new Date().toISOString()
  });

  // Conditional import - only load Indogulf blog when absolutely necessary
  const IndogulfIPOBlog = isIndogulfPage ? React.lazy(() => import('@/components/blog/indogulf-ipo/IndogulfIPOBlog')) : null;

  return (
    <Layout>
      {/* Only render Indogulf blog when confirmed on Indogulf page */}
      {isIndogulfPage && IndogulfIPOBlog && (
        <React.Suspense fallback={<div>Loading...</div>}>
          <IndogulfIPOBlog />
        </React.Suspense>
      )}
      {/* Show nothing if not on Indogulf page */}
      {!isIndogulfPage && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
            <p className="text-gray-600">The requested blog post could not be found.</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default IndogulfCropsciencesIPOBlogPage;

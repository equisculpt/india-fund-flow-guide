
import React from 'react';
import Layout from '@/components/Layout';

const IndogulfCropsciencesIPOBlogPage = () => {
  // Get current pathname - this is the ONLY way to check path in React Router
  const currentPath = window.location.pathname;
  const isExactIndogulfPath = currentPath === '/blog/indogulf-cropsciences-ipo-complete-analysis-2024';

  console.log('🔍 INDOGULF PAGE V11 - ABSOLUTE PATH ISOLATION:', {
    component: 'IndogulfCropsciencesIPOBlogPage',
    currentPath,
    isExactIndogulfPath,
    'ISOLATION_STATUS': isExactIndogulfPath ? 'LOADING_INDOGULF_CONTENT' : 'BLOCKING_ALL_INDOGULF_CONTENT',
    timestamp: new Date().toISOString()
  });

  // If not on exact Indogulf path, return nothing - don't even load components
  if (!isExactIndogulfPath) {
    console.log('🚫 INDOGULF PAGE V11 - NOT ON INDOGULF PATH - RETURNING NULL');
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
            <p className="text-gray-600">The requested page could not be found.</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Only load Indogulf components when on exact Indogulf path
  const IndogulfIPOBlog = React.lazy(() => import('@/components/blog/indogulf-ipo/IndogulfIPOBlog'));

  console.log('✅ INDOGULF PAGE V11 - LOADING INDOGULF CONTENT ON CORRECT PATH');

  return (
    <Layout>
      <React.Suspense fallback={<div>Loading...</div>}>
        <IndogulfIPOBlog />
      </React.Suspense>
    </Layout>
  );
};

export default IndogulfCropsciencesIPOBlogPage;

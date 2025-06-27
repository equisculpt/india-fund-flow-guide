
import React from 'react';
import Layout from '@/components/Layout';

const HDBFinancialServicesIPOBlog = () => {
  // Get current pathname - this is the ONLY way to check path in React Router
  const currentPath = window.location.pathname;
  const isExactHDBPath = currentPath === '/blog/hdb-financial-services-ipo-analysis';

  console.log('🔍 HDB PAGE V12 - LAZY IMPORT FIX:', {
    component: 'HDBFinancialServicesIPOBlog',
    currentPath,
    isExactHDBPath,
    'ISOLATION_STATUS': isExactHDBPath ? 'LOADING_HDB_CONTENT' : 'BLOCKING_ALL_HDB_CONTENT',
    timestamp: new Date().toISOString()
  });

  // If not on exact HDB path, return nothing - don't even load components
  if (!isExactHDBPath) {
    console.log('🚫 HDB PAGE V12 - NOT ON HDB PATH - RETURNING NULL');
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

  // ✅ CRITICAL FIX: Move lazy imports INSIDE the conditional block
  // This prevents React from resolving these imports on wrong routes
  const HDBBlogSEO = React.lazy(() => import('@/components/blog/hdb-ipo/HDBBlogSEO'));
  const HDBBlogLayout = React.lazy(() => import('@/components/blog/hdb-ipo/HDBBlogLayout'));
  const HDBBlogContent = React.lazy(() => import('@/components/blog/hdb-ipo/HDBBlogContent'));

  console.log('✅ HDB PAGE V12 - LOADING HDB CONTENT ON CORRECT PATH - LAZY IMPORTS SAFE');

  return (
    <Layout>
      <React.Suspense fallback={null}>
        <HDBBlogSEO />
        <HDBBlogLayout>
          <HDBBlogContent />
        </HDBBlogLayout>
      </React.Suspense>
    </Layout>
  );
};

export default HDBFinancialServicesIPOBlog;

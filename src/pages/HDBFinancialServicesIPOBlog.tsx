
import React from 'react';
import Layout from '@/components/Layout';
import HDBBlogLayout from '@/components/blog/hdb-ipo/HDBBlogLayout';
import HDBBlogContent from '@/components/blog/hdb-ipo/HDBBlogContent';

const HDBFinancialServicesIPOBlog = () => {
  // Only load HDB SEO if we're definitely on the HDB page
  const isHDBPage = typeof window !== 'undefined' && window.location.pathname === '/blog/hdb-financial-services-ipo-analysis';

  console.log('📄 HDB PAGE V9 - PATH CHECK:', {
    component: 'HDBFinancialServicesIPOBlog',
    currentPath: typeof window !== 'undefined' ? window.location.pathname : 'SSR',
    isHDBPage,
    timestamp: new Date().toISOString()
  });

  // Import and render HDB SEO only when confirmed on HDB page
  const HDBSEOComponent = React.useMemo(() => {
    if (!isHDBPage) return null;
    
    // Dynamic import that only happens when we're on HDB page
    const HDBBlogSEO = React.lazy(() => import('@/components/blog/hdb-ipo/HDBBlogSEO'));
    return <React.Suspense fallback={null}><HDBBlogSEO /></React.Suspense>;
  }, [isHDBPage]);

  return (
    <Layout>
      {/* Only render HDB SEO when absolutely confirmed on HDB page */}
      {isHDBPage && HDBSEOComponent}
      <HDBBlogLayout>
        <HDBBlogContent />
      </HDBBlogLayout>
    </Layout>
  );
};

export default HDBFinancialServicesIPOBlog;

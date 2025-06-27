
import React from 'react';
import Layout from '@/components/Layout';
import HDBBlogLayout from '@/components/blog/hdb-ipo/HDBBlogLayout';
import HDBBlogContent from '@/components/blog/hdb-ipo/HDBBlogContent';

const HDBFinancialServicesIPOBlog = () => {
  // Only render HDB-specific content if we're on the exact HDB page
  const isHDBPage = typeof window !== 'undefined' && window.location.pathname === '/blog/hdb-financial-services-ipo-analysis';

  console.log('📄 HDB PAGE V10 - STRICT PATH CHECK:', {
    component: 'HDBFinancialServicesIPOBlog',
    currentPath: typeof window !== 'undefined' ? window.location.pathname : 'SSR',
    isHDBPage,
    renderingSEO: isHDBPage,
    timestamp: new Date().toISOString()
  });

  // Conditional import - only load HDB SEO when absolutely necessary
  const HDBBlogSEO = isHDBPage ? React.lazy(() => import('@/components/blog/hdb-ipo/HDBBlogSEO')) : null;

  return (
    <Layout>
      {/* Only render HDB SEO when confirmed on HDB page */}
      {isHDBPage && HDBBlogSEO && (
        <React.Suspense fallback={null}>
          <HDBBlogSEO />
        </React.Suspense>
      )}
      <HDBBlogLayout>
        <HDBBlogContent />
      </HDBBlogLayout>
    </Layout>
  );
};

export default HDBFinancialServicesIPOBlog;

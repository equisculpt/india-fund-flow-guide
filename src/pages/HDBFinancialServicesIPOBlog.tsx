
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import HDBBlogLayout from '@/components/blog/hdb-ipo/HDBBlogLayout';
import HDBBlogContent from '@/components/blog/hdb-ipo/HDBBlogContent';

const HDBFinancialServicesIPOBlog = () => {
  const [shouldRenderHDBSEO, setShouldRenderHDBSEO] = useState(false);
  const [HDBBlogSEOComponent, setHDBBlogSEOComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Only check and load HDB SEO after component mounts
    const currentPath = window.location.pathname;
    const isHDBPage = currentPath === '/blog/hdb-financial-services-ipo-analysis';
    
    console.log('📄 HDB BLOG PAGE V7 - MOUNT CHECK:', {
      component: 'HDBFinancialServicesIPOBlog',
      timestamp: new Date().toISOString(),
      currentPath,
      isHDBPage,
      'DYNAMIC_IMPORT_STATUS': isHDBPage ? 'WILL_LOAD_SEO' : 'BLOCKED_SEO'
    });

    if (isHDBPage) {
      // Dynamic import to prevent loading HDB SEO on other pages
      import('@/components/blog/hdb-ipo/HDBBlogSEO').then((module) => {
        setHDBBlogSEOComponent(() => module.default);
        setShouldRenderHDBSEO(true);
      });
    }
  }, []);

  return (
    <Layout>
      {/* Only render HDB SEO if we're on the correct page and component is loaded */}
      {shouldRenderHDBSEO && HDBBlogSEOComponent && <HDBBlogSEOComponent />}
      <HDBBlogLayout>
        <HDBBlogContent />
      </HDBBlogLayout>
    </Layout>
  );
};

export default HDBFinancialServicesIPOBlog;

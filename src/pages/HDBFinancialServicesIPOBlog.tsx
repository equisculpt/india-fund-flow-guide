
import React from 'react';
import Layout from '@/components/Layout';
import HDBBlogSEO from '@/components/blog/hdb-ipo/HDBBlogSEO';
import HDBBlogLayout from '@/components/blog/hdb-ipo/HDBBlogLayout';
import HDBBlogContent from '@/components/blog/hdb-ipo/HDBBlogContent';

const HDBFinancialServicesIPOBlog = () => {
  // CRITICAL: Only proceed if we're on the correct path
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const isHDBPage = currentPath === '/blog/hdb-financial-services-ipo-analysis';

  console.log('📄 HDB BLOG PAGE V6 - ULTRA STRICT:', {
    component: 'HDBFinancialServicesIPOBlog',
    timestamp: new Date().toISOString(),
    currentPath,
    isHDBPage,
    'PAGE_RENDER_STATUS': isHDBPage ? 'FULL_RENDER' : 'MINIMAL_RENDER',
    'CRITICAL_CHECK': 'This page should ONLY render HDB SEO on correct path'
  });

  return (
    <Layout>
      {/* CRITICAL: Only render HDB SEO if we're actually on the HDB page */}
      {isHDBPage && <HDBBlogSEO />}
      <HDBBlogLayout>
        <HDBBlogContent />
      </HDBBlogLayout>
    </Layout>
  );
};

export default HDBFinancialServicesIPOBlog;

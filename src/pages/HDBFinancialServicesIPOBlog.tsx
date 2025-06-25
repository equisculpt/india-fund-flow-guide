
import React from 'react';
import Layout from '@/components/Layout';
import HDBBlogSEO from '@/components/blog/hdb-ipo/HDBBlogSEO';
import HDBBlogLayout from '@/components/blog/hdb-ipo/HDBBlogLayout';
import HDBBlogContent from '@/components/blog/hdb-ipo/HDBBlogContent';

const HDBFinancialServicesIPOBlog = () => {
  // FORENSIC DEBUGGING - Page level
  console.log('📄 HDB BLOG PAGE FORENSIC AUDIT V4:', {
    component: 'HDBFinancialServicesIPOBlog',
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
    message: 'HDB Page component rendering - SEO should ONLY render here',
    'CRITICAL_CHECK': 'This page should be the ONLY place HDB SEO renders'
  });

  return (
    <Layout>
      <HDBBlogSEO />
      <HDBBlogLayout>
        <HDBBlogContent />
      </HDBBlogLayout>
    </Layout>
  );
};

export default HDBFinancialServicesIPOBlog;

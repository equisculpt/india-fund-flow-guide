
import React from 'react';
import Layout from '@/components/Layout';
import HDBBlogSEO from '@/components/blog/hdb-ipo/HDBBlogSEO';
import HDBBlogLayout from '@/components/blog/hdb-ipo/HDBBlogLayout';
import HDBBlogContent from '@/components/blog/hdb-ipo/HDBBlogContent';

const HDBFinancialServicesIPOBlog = () => {
  // FORENSIC DEBUGGING - Page level
  console.log('📄 HDB BLOG PAGE FORENSIC AUDIT:', {
    component: 'HDBFinancialServicesIPOBlog',
    timestamp: new Date().toISOString(),
    message: 'Page component rendering with Layout wrapper'
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

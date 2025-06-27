
import React from 'react';
import Layout from '@/components/Layout';
import HDBBlogSEO from '@/components/blog/hdb-ipo/HDBBlogSEO';
import HDBBlogLayout from '@/components/blog/hdb-ipo/HDBBlogLayout';
import HDBBlogContent from '@/components/blog/hdb-ipo/HDBBlogContent';

const HDBFinancialServicesIPOBlog = () => {
  console.log('✅ HDB PAGE V13 - ROUTER-LEVEL LAZY LOADING - ONLY LOADS ON CORRECT ROUTE:', {
    component: 'HDBFinancialServicesIPOBlog',
    route: '/blog/hdb-financial-services-ipo-analysis',
    timestamp: new Date().toISOString()
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

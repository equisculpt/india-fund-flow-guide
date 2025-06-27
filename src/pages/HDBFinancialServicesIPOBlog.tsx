
import React from 'react';
import Layout from '@/components/Layout';
import HDBBlogSEO from '@/components/blog/hdb-ipo/HDBBlogSEO';
import HDBBlogLayout from '@/components/blog/hdb-ipo/HDBBlogLayout';
import HDBBlogContent from '@/components/blog/hdb-ipo/HDBBlogContent';

const HDBFinancialServicesIPOBlog = () => {
  console.log('🎯 HDB Blog Page - Nuclear SEO Control Active');

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


import React from 'react';
import HDBBlogSEO from '@/components/blog/hdb-ipo/HDBBlogSEO';
import HDBBlogLayout from '@/components/blog/hdb-ipo/HDBBlogLayout';
import HDBBlogContent from '@/components/blog/hdb-ipo/HDBBlogContent';

const HDBFinancialServicesIPOBlog = () => {
  return (
    <>
      <HDBBlogSEO />
      <HDBBlogLayout>
        <HDBBlogContent />
      </HDBBlogLayout>
    </>
  );
};

export default HDBFinancialServicesIPOBlog;

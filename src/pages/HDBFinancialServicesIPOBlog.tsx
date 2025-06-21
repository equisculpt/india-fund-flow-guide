
import React from 'react';
import HDBBlogSEO from '@/components/blog/hdb-ipo/HDBBlogSEO';
import HDBBlogLayout from '@/components/blog/hdb-ipo/HDBBlogLayout';
import HDBBlogContent from '@/components/blog/hdb-ipo/HDBBlogContent';

const HDBFinancialServicesIPOBlog = () => {
  // FORENSIC DEBUGGING - Page level
  console.log('📄 HDB BLOG PAGE FORENSIC AUDIT:', {
    component: 'HDBFinancialServicesIPOBlog',
    timestamp: new Date().toISOString(),
    message: 'Page component rendering - SEO should be first'
  });

  return (
    <>
      {/* SEO MUST BE FIRST - NO OTHER HELMET COMPONENTS SHOULD INTERFERE */}
      <HDBBlogSEO />
      <HDBBlogLayout>
        <HDBBlogContent />
      </HDBBlogLayout>
    </>
  );
};

export default HDBFinancialServicesIPOBlog;

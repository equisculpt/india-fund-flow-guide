
import React from 'react';
import Layout from '@/components/Layout';
import NBFCSectorBlogSEO from '@/components/blog/nbfc-sector/NBFCSectorBlogSEO';
import NBFCSectorBlogLayout from '@/components/blog/nbfc-sector/NBFCSectorBlogLayout';
import NBFCSectorBlogContent from '@/components/blog/nbfc-sector/NBFCSectorBlogContent';

const NBFCSectorDeepDiveBlog = () => {
  return (
    <Layout>
      <NBFCSectorBlogSEO />
      <NBFCSectorBlogLayout>
        <NBFCSectorBlogContent />
      </NBFCSectorBlogLayout>
    </Layout>
  );
};

export default NBFCSectorDeepDiveBlog;

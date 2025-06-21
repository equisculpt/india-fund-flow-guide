
import React from 'react';
import NBFCSectorBlogSEO from '@/components/blog/nbfc-sector/NBFCSectorBlogSEO';
import NBFCSectorBlogLayout from '@/components/blog/nbfc-sector/NBFCSectorBlogLayout';
import NBFCSectorBlogContent from '@/components/blog/nbfc-sector/NBFCSectorBlogContent';

const NBFCSectorDeepDiveBlog = () => {
  return (
    <>
      <NBFCSectorBlogSEO />
      <NBFCSectorBlogLayout>
        <NBFCSectorBlogContent />
      </NBFCSectorBlogLayout>
    </>
  );
};

export default NBFCSectorDeepDiveBlog;
